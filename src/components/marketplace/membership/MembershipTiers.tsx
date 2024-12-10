import React from 'react';
import { Box, Card, Typography, Button, Grid, Chip } from '@mui/material';
import { StarBorder, Star, StarHalf } from '@mui/icons-material';

interface MembershipTier {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: string[];
  discount: number;
  earningRate: number;
  icon: React.ReactNode;
}

const tiers: MembershipTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'monthly',
    features: [
      'Acceso a templates básicos',
      'Vista previa de templates',
      'Soporte básico',
    ],
    discount: 0,
    earningRate: 50, // 50% para el creador
    icon: <StarBorder />
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19.99,
    period: 'monthly',
    features: [
      'Todos los templates básicos',
      'Acceso a templates premium',
      'Soporte prioritario',
      'Sin marca de agua',
      'Descuentos exclusivos',
    ],
    discount: 15,
    earningRate: 65, // 65% para el creador
    icon: <StarHalf />
  },
  {
    id: 'creator',
    name: 'Creator',
    price: 49.99,
    period: 'monthly',
    features: [
      'Todos los beneficios Pro',
      'Publicar templates propios',
      'Analytics avanzados',
      'Soporte VIP',
      'Mayor porcentaje de ganancias',
      'Herramientas de marketing',
    ],
    discount: 25,
    earningRate: 80, // 80% para el creador
    icon: <Star />
  }
];

export const MembershipTiers: React.FC = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Planes de Membresía
      </Typography>
      <Grid container spacing={4} sx={{ mt: 2 }}>
        {tiers.map((tier) => (
          <Grid item xs={12} md={4} key={tier.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 3,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5">{tier.name}</Typography>
                {tier.icon}
              </Box>
              
              <Typography variant="h4" color="primary" gutterBottom>
                ${tier.price}
                <Typography variant="caption" sx={{ ml: 1 }}>
                  /{tier.period}
                </Typography>
              </Typography>

              <Box sx={{ flexGrow: 1 }}>
                {tier.features.map((feature, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    sx={{ py: 1, display: 'flex', alignItems: 'center' }}
                  >
                    • {feature}
                  </Typography>
                ))}
              </Box>

              <Box sx={{ mt: 2 }}>
                {tier.discount > 0 && (
                  <Chip
                    label={`${tier.discount}% descuento en templates`}
                    color="secondary"
                    size="small"
                    sx={{ mb: 2 }}
                  />
                )}
                {tier.earningRate > 0 && (
                  <Chip
                    label={`${tier.earningRate}% ganancias por venta`}
                    color="success"
                    size="small"
                    sx={{ mb: 2, ml: 1 }}
                  />
                )}
              </Box>

              <Button
                variant={tier.id === 'pro' ? 'contained' : 'outlined'}
                color="primary"
                size="large"
                fullWidth
              >
                {tier.id === 'free' ? 'Comenzar Gratis' : 'Suscribirse'}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
