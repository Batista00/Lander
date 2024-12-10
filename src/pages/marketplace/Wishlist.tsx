import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  IconButton,
  Rating,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface WishlistItem {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
}

const mockWishlistItems: WishlistItem[] = [
  {
    id: '1',
    title: 'Business Pro Template',
    description: 'Template profesional para empresas modernas',
    price: 29.99,
    image: '/images/templates/business-pro.jpg',
    category: 'Business',
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: '2',
    title: 'E-commerce Starter',
    description: 'Solución completa para tu tienda online',
    price: 49.99,
    image: '/images/templates/ecommerce-starter.jpg',
    category: 'E-commerce',
    rating: 4.8,
    reviewCount: 95,
  },
  {
    id: '3',
    title: 'Portfolio Master',
    description: 'Muestra tu trabajo de forma profesional',
    price: 24.99,
    image: '/images/templates/portfolio-master.jpg',
    category: 'Portfolio',
    rating: 4.6,
    reviewCount: 73,
  },
];

export const Wishlist: React.FC = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = React.useState<WishlistItem[]>(mockWishlistItems);

  const handleRemoveFromWishlist = (itemId: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
  };

  const handleAddToCart = (itemId: string) => {
    // Implementar lógica para agregar al carrito
    console.log('Agregando al carrito:', itemId);
    navigate('/marketplace/cart');
  };

  if (wishlistItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            py: 8,
          }}
        >
          <FavoriteIcon sx={{ fontSize: 60, color: 'text.secondary' }} />
          <Typography variant="h5" gutterBottom>
            Tu lista de deseos está vacía
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Guarda tus templates favoritos para comprarlos más tarde
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/marketplace')}
          >
            Explorar Templates
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Lista de Deseos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {wishlistItems.length} templates guardados
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {wishlistItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
                sx={{ objectFit: 'cover' }}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'background.paper' },
                }}
                onClick={() => handleRemoveFromWishlist(item.id)}
              >
                <DeleteIcon color="error" />
              </IconButton>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {item.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip label={item.category} size="small" />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Rating value={item.rating} precision={0.5} size="small" readOnly />
                    <Typography variant="body2" color="text.secondary">
                      ({item.reviewCount})
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="h6" color="primary">
                  ${item.price}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => handleAddToCart(item.id)}
                >
                  Agregar al Carrito
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
