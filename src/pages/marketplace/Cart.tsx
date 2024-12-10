import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Grid,
  IconButton,
  Divider,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  license: 'standard' | 'extended';
}

const mockCartItems: CartItem[] = [
  {
    id: '1',
    title: 'Business Pro Template',
    price: 29.99,
    image: '/images/templates/business-pro.jpg',
    license: 'standard',
  },
  {
    id: '2',
    title: 'E-commerce Starter',
    price: 49.99,
    image: '/images/templates/ecommerce-starter.jpg',
    license: 'extended',
  },
];

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = React.useState<CartItem[]>(mockCartItems);

  const handleRemoveItem = (itemId: string) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = () => {
    navigate('/marketplace/checkout');
  };

  if (cartItems.length === 0) {
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
          <Typography variant="h5" gutterBottom>
            Tu carrito está vacío
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            ¡Explora nuestro marketplace para encontrar templates increíbles!
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
      <Typography variant="h4" gutterBottom>
        Carrito de Compras
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            {cartItems.map((item, index) => (
              <React.Fragment key={item.id}>
                {index > 0 && <Divider sx={{ my: 2 }} />}
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="100"
                        image={item.image}
                        alt={item.title}
                        sx={{ objectFit: 'cover' }}
                      />
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Licencia {item.license === 'standard' ? 'Estándar' : 'Extendida'}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6">
                      ${item.price.toFixed(2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </React.Fragment>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resumen del Pedido
            </Typography>
            <Box sx={{ my: 2 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography>Subtotal</Typography>
                </Grid>
                <Grid item>
                  <Typography>${calculateTotal().toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ my: 2 }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="h6">Total</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    ${calculateTotal().toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<ShoppingCartCheckoutIcon />}
              onClick={handleCheckout}
              sx={{ mt: 2 }}
            >
              Proceder al Pago
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
