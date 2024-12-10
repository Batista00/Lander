import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  Chip,
  Divider,
  Rating,
  Skeleton,
  Tab,
  Tabs,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Heart,
  Share2,
  ShoppingCart,
  Eye,
  Package,
  Clock,
  Award,
  FileCheck,
  Star,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { motion } from 'framer-motion';

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

interface Template {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  previewImage: string;
  downloadUrl: string;
  sellerId: string;
  seller: {
    name: string;
    verified: boolean;
    bio: string;
    portfolio: string;
    contactEmail: string;
  };
  rating: number;
  sales: number;
  tags: string[];
  features: string[];
  lastUpdated: Date;
  version: string;
  compatibleWith: string[];
  requirements: string[];
  includes: string[];
}

export const ProductDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        if (!id) return;

        const templateDoc = await getDoc(doc(db, 'templates', id));
        if (templateDoc.exists()) {
          const data = templateDoc.data();
          setTemplate({
            id: templateDoc.id,
            ...data,
            lastUpdated: data.lastUpdated?.toDate()
          } as Template);

          // Fetch reviews
          const reviewsQuery = query(
            collection(db, 'reviews'),
            where('templateId', '==', id)
          );
          const reviewsSnapshot = await getDocs(reviewsQuery);
          const reviewsData = reviewsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            date: doc.data().date.toDate()
          })) as Review[];
          setReviews(reviewsData);

          // Check if user has favorited
          if (user) {
            const favoriteQuery = query(
              collection(db, 'favorites'),
              where('userId', '==', user.uid),
              where('templateId', '==', id)
            );
            const favoriteSnapshot = await getDocs(favoriteQuery);
            setIsFavorite(!favoriteSnapshot.empty);
          }
        }
      } catch (error) {
        console.error('Error fetching template:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [id, user]);

  const handleFavorite = async () => {
    if (!user || !template) return;

    try {
      const favoritesRef = collection(db, 'favorites');
      if (isFavorite) {
        const q = query(
          favoritesRef,
          where('userId', '==', user.uid),
          where('templateId', '==', template.id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await doc.ref.delete();
        });
      } else {
        await addDoc(favoritesRef, {
          userId: user.uid,
          templateId: template.id,
          createdAt: new Date()
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // Mostrar notificación de éxito
  };

  if (loading) {
    return (
      <Box p={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="rectangular" height={100} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (!template) {
    return (
      <Box p={4}>
        <Alert severity="error">
          Template not found
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Grid container spacing={4}>
        {/* Imagen y Galería */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 3
              }}
            >
              <img
                src={template.previewImage}
                alt={template.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block'
                }}
              />
            </Box>
          </motion.div>
        </Grid>

        {/* Información del Producto */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="h4" gutterBottom>
              {template.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="h5" color="primary" fontWeight="bold">
                ${template.price}
              </Typography>
              <Link href={template.seller.portfolio} target="_blank" style={{ textDecoration: 'none' }}>
                <Chip
                  icon={<Award size={16} />}
                  label={template.seller.name}
                  color="primary"
                  variant={template.seller.verified ? "filled" : "outlined"}
                />
              </Link>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Rating value={template.rating} precision={0.1} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({template.rating})
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Typography variant="body2" color="text.secondary">
                {template.sales} ventas
              </Typography>
            </Box>

            <Typography variant="body1" paragraph>
              {template.description}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
              {template.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  onClick={() => {/* Agregar al carrito */}}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={handleFavorite}
                >
                  <Heart
                    className={cn(
                      "w-4 h-4",
                      isFavorite && "fill-red-500 text-red-500"
                    )}
                  />
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </Grid>
            </Grid>

            {/* Información del Vendedor */}
            <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                About the Seller
              </Typography>
              <Typography variant="body2" paragraph>
                {template.seller.bio}
              </Typography>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = `mailto:${template.seller.contactEmail}`}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Seller
              </Button>
            </Box>

            {/* Compatibilidad y Requisitos */}
            <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1, mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Technical Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Version
                  </Typography>
                  <Typography variant="body2">
                    {template.version}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Last Updated
                  </Typography>
                  <Typography variant="body2">
                    {template.lastUpdated.toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </motion.div>
        </Grid>

        {/* Tabs de Información Adicional */}
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              aria-label="template information tabs"
            >
              <Tab label="Features" />
              <Tab label="Requirements" />
              <Tab label="Reviews" />
            </Tabs>
          </Box>

          {/* Features Tab */}
          {activeTab === 0 && (
            <Box sx={{ py: 3 }}>
              <Grid container spacing={2}>
                {template.features?.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FileCheck size={16} className="text-green-500" />
                      <Typography variant="body2">{feature}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Requirements Tab */}
          {activeTab === 1 && (
            <Box sx={{ py: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Compatible With
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                {template.compatibleWith.map((tech) => (
                  <Chip key={tech} label={tech} size="small" />
                ))}
              </Box>

              <Typography variant="subtitle2" gutterBottom>
                Requirements
              </Typography>
              <List dense>
                {template.requirements.map((req, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <FileCheck size={16} />
                    </ListItemIcon>
                    <ListItemText primary={req} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                What's Included
              </Typography>
              <List dense>
                {template.includes.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Package size={16} />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Reviews Tab */}
          {activeTab === 2 && (
            <Box sx={{ py: 3 }}>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <Box key={review.id} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                      <Typography variant="subtitle2">{review.userName}</Typography>
                      <Rating value={review.rating} size="small" readOnly />
                      <Typography variant="caption" color="text.secondary">
                        {review.date.toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography variant="body2">{review.comment}</Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No reviews yet.
                </Typography>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
