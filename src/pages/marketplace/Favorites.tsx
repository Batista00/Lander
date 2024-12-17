import React, { useEffect } from 'react';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  Button,
  Skeleton,
} from '@mui/material';
import {
  Favorite as FavoriteIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export const Favorites: React.FC = () => {
  const { favorites = [], loading, error, removeFromFavorites, addToCart, loadFavorites } = useMarketplace();

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const handleRemoveFromFavorites = async (templateId: string) => {
    try {
      await removeFromFavorites(templateId);
      toast.success('Template removido de favoritos');
    } catch (error) {
      toast.error('Error al remover de favoritos');
    }
  };

  const handleAddToCart = async (templateId: string) => {
    try {
      await addToCart(templateId);
      toast.success('Template agregado al carrito');
    } catch (error) {
      toast.error('Error al agregar al carrito');
    }
  };

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Mis Favoritos
      </Typography>

      {loading ? (
        <Grid container spacing={3}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={32} />
                  <Skeleton variant="text" width="60%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : favorites.length === 0 ? (
        <Card sx={{ p: 4, textAlign: 'center' }}>
          <FavoriteIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No tienes templates favoritos
          </Typography>
          <Typography color="text.secondary" paragraph>
            Explora el marketplace y agrega templates a tus favoritos
          </Typography>
          <Button
            component={Link}
            to="/dashboard/marketplace"
            variant="contained"
            color="primary"
          >
            Explorar Marketplace
          </Button>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((template) => (
            <Grid item xs={12} sm={6} md={4} key={template.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={template.previewUrl}
                  alt={template.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" component={Link} to={`/dashboard/marketplace/product/${template.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                        {template.title}
                      </Typography>
                      <Typography color="text.secondary">
                        por {template.developer.name}
                      </Typography>
                    </Box>
                    <IconButton
                      color="primary"
                      onClick={() => handleRemoveFromFavorites(template.id)}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" color="primary">
                      ${template.price.toLocaleString()}
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => handleAddToCart(template.id)}
                    >
                      Agregar al Carrito
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
