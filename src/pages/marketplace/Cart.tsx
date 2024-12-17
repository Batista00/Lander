import React, { useEffect } from 'react';
import { useMarketplace } from '../../contexts/MarketplaceContext';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  IconButton,
  Divider,
  TextField,
  Alert,
  Skeleton,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function Cart() {
  const {
    cart,
    loadCart,
    updateCartItemQuantity,
    removeFromCart,
    applyPromoCode,
    loading,
    error,
  } = useMarketplace();

  const [promoCode, setPromoCode] = React.useState('');

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const handleQuantityChange = async (itemId: string, change: number) => {
    try {
      await updateCartItemQuantity(itemId, change);
    } catch (error) {
      toast.error('Error al actualizar la cantidad');
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
      toast.success('Producto eliminado del carrito');
    } catch (error) {
      toast.error('Error al eliminar el producto');
    }
  };

  const handleApplyPromoCode = async () => {
    if (!promoCode.trim()) {
      toast.error('Ingresa un código promocional');
      return;
    }

    try {
      await applyPromoCode(promoCode);
      toast.success('Código promocional aplicado');
      setPromoCode('');
    } catch (error) {
      toast.error('Código promocional inválido');
    }
  };

  const calculateSubtotal = () => {
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Carrito de Compras
      </Typography>

      {loading ? (
        <Grid container spacing={3}>
          {Array.from(new Array(2)).map((_, index) => (
            <Grid item xs={12} key={index}>
              <Card>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                      <Skeleton variant="rectangular" height={150} />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Skeleton variant="text" height={40} />
                      <Skeleton variant="text" width="60%" />
                      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                        <Skeleton variant="rectangular" width={100} height={36} />
                        <Skeleton variant="rectangular" width={100} height={36} />
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : cart.items.length === 0 ? (
        <Card sx={{ textAlign: 'center', py: 8 }}>
          <ShoppingCart sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Tu carrito está vacío
          </Typography>
          <Typography color="text.secondary" paragraph>
            Explora nuestro marketplace y encuentra templates increíbles
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
          <Grid item xs={12} md={8}>
            {cart.items.map((item) => (
              <Card key={item.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={3}>
                      <CardMedia
                        component="img"
                        height="150"
                        image={item.previewUrl}
                        alt={item.title}
                        sx={{ borderRadius: 1 }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Box>
                          <Typography variant="h6" component={Link} to={`/dashboard/marketplace/product/${item.id}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                            {item.title}
                          </Typography>
                          <Typography color="text.secondary" gutterBottom>
                            por {item.developer.name}
                          </Typography>
                        </Box>
                        <IconButton onClick={() => handleRemoveItem(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            disabled={item.quantity <= 1}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                        <Typography variant="h6" color="primary">
                          ${(item.price * item.quantity).toLocaleString()}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Resumen del Pedido
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Código promocional"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button
                      variant="outlined"
                      onClick={handleApplyPromoCode}
                      disabled={!promoCode.trim()}
                    >
                      Aplicar
                    </Button>
                  </Box>
                  {cart.discount > 0 && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                      ¡Descuento de ${cart.discount.toLocaleString()} aplicado!
                    </Alert>
                  )}
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Subtotal</Typography>
                    <Typography>${calculateSubtotal().toLocaleString()}</Typography>
                  </Box>
                  {cart.discount > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography>Descuento</Typography>
                      <Typography color="success.main">-${cart.discount.toLocaleString()}</Typography>
                    </Box>
                  )}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Impuestos</Typography>
                    <Typography>${cart.taxes.toLocaleString()}</Typography>
                  </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="primary">
                    ${cart.total.toLocaleString()}
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/dashboard/marketplace/checkout"
                >
                  Proceder al Pago
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
