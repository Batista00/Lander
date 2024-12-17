import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  Button,
  IconButton,
  Divider,
  Chip,
  Rating,
  CircularProgress,
} from '@mui/material';
import {
  LocationOn,
  Language,
  Twitter,
  LinkedIn,
  GitHub,
} from '@mui/icons-material';
import { db } from '../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface SellerInfo {
  id: string;
  name: string;
  avatar: string;
  location: string;
  website: string;
  bio: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  stats: {
    templates: number;
    sales: number;
    rating: number;
    reviews: number;
  };
  skills: string[];
}

export const SellerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [seller, setSeller] = useState<SellerInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSellerData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const sellerDoc = await getDoc(doc(db, 'sellers', id));
        
        if (!sellerDoc.exists()) {
          setError('Vendedor no encontrado');
          return;
        }

        const sellerData = sellerDoc.data() as Omit<SellerInfo, 'id'>;
        setSeller({ id: sellerDoc.id, ...sellerData });
      } catch (err) {
        console.error('Error loading seller data:', err);
        setError('Error al cargar los datos del vendedor');
      } finally {
        setLoading(false);
      }
    };

    loadSellerData();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !seller) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error" variant="h6">
            {error || 'No se pudo cargar el perfil del vendedor'}
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Perfil Principal */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item>
                <Avatar
                  src={seller.avatar}
                  sx={{ width: 120, height: 120 }}
                />
              </Grid>
              <Grid item xs>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" gutterBottom>
                      {seller.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography color="text.secondary">
                        {seller.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Language sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography color="text.secondary">
                        {seller.website}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Button variant="contained" color="primary">
                      Seguir
                    </Button>
                    <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                      {seller.socialLinks.twitter && (
                        <IconButton href={seller.socialLinks.twitter} target="_blank">
                          <Twitter />
                        </IconButton>
                      )}
                      {seller.socialLinks.linkedin && (
                        <IconButton href={seller.socialLinks.linkedin} target="_blank">
                          <LinkedIn />
                        </IconButton>
                      )}
                      {seller.socialLinks.github && (
                        <IconButton href={seller.socialLinks.github} target="_blank">
                          <GitHub />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Typography sx={{ mt: 2 }}>
                  {seller.bio}
                </Typography>

                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {seller.skills.map((skill) => (
                    <Chip key={skill} label={skill} />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Estadísticas */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Estadísticas
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography color="text.secondary">Templates</Typography>
                <Typography variant="h4">{seller.stats.templates}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography color="text.secondary">Ventas Totales</Typography>
                <Typography variant="h4">{seller.stats.sales}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography color="text.secondary">Calificación</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={seller.stats.rating} precision={0.1} readOnly />
                  <Typography>
                    ({seller.stats.reviews} reseñas)
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Templates del Vendedor */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Templates Destacados
            </Typography>
            {/* Aquí iría un grid de templates */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
