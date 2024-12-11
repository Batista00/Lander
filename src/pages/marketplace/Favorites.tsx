import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Skeleton } from '@mui/material';
import { Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

interface Template {
  id: string;
  title: string;
  description: string;
  price: number;
  previewImage: string;
}

export const Favorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      try {
        // Primero obtenemos los IDs de los templates favoritos del usuario
        const favoritesQuery = query(
          collection(db, 'favorites'),
          where('userId', '==', user.uid)
        );
        const favoritesSnapshot = await getDocs(favoritesQuery);
        const templateIds = favoritesSnapshot.docs.map(doc => doc.data().templateId);

        // Luego obtenemos los detalles de cada template
        const templatesData: Template[] = [];
        for (const templateId of templateIds) {
          const templateDoc = await db.collection('templates').doc(templateId).get();
          const data = templateDoc.data();
          if (data) {
            templatesData.push({
              id: templateDoc.id,
              title: data.title,
              description: data.description,
              price: data.price,
              previewImage: data.previewImage,
            });
          }
        }

        setFavorites(templatesData);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const removeFavorite = async (templateId: string) => {
    if (!user) return;

    try {
      const favoritesRef = collection(db, 'favorites');
      const q = query(
        favoritesRef,
        where('userId', '==', user.uid),
        where('templateId', '==', templateId)
      );
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach(async (doc) => {
        await doc.ref.delete();
      });

      setFavorites(favorites.filter(template => template.id !== templateId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  if (loading) {
    return (
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          My Favorites
        </Typography>
        <Grid container spacing={3}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" width="60%" height={40} />
                  <Skeleton variant="text" width="40%" height={30} />
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Skeleton variant="rectangular" width={120} height={36} />
                    <Skeleton variant="rectangular" width={120} height={36} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (!favorites.length) {
    return (
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          My Favorites
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body1" color="text.secondary" align="center">
              You haven't added any templates to your favorites yet.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        My Favorites
      </Typography>
      <Grid container spacing={3}>
        {favorites.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <Card>
              <img
                src={template.previewImage}
                alt={template.title}
                style={{ width: '100%', height: 200, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {template.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  ${template.price}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFavorite(template.id)}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    asChild
                  >
                    <Link to={`/dashboard/marketplace/template/${template.id}`}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
