import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';

const SellerProducts = () => {
  // Mock data - replace with real data from your backend
  const products = [
    {
      id: '1',
      title: 'Landing Page Template 1',
      status: 'active',
      sales: 15,
      revenue: 449.85
    },
    // Add more mock products as needed
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Mis Productos
        </Typography>
        <Button variant="contained" color="primary">
          Nuevo Producto
        </Button>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={12} key={product.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Estado: {product.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ventas: {product.sales}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ingresos: ${product.revenue}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" size="small">
                    Editar
                  </Button>
                  <Button variant="outlined" size="small" color="error">
                    Desactivar
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

export default SellerProducts;
