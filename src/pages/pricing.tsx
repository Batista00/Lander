// @ts-nocheck
import React from 'react';
import { Container, Grid, Card, CardContent, CardActions, Button, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { PlanType } from '@/types/plans';
import { PLANS } from '@/data/plans';

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export function Pricing() {
  const { user } = useAuth();

  const handleUpgrade = async (planId: PlanType) => {
    try {
      if (!user) {
        toast.error('Debes iniciar sesión para actualizar tu plan');
        return;
      }

      if (planId === 'free') {
        // Actualizar directamente al plan gratuito
        const response = await fetch('http://localhost:5000/api/payment/upgrade-free', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await user.getIdToken()}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al actualizar al plan gratuito');
        }

        const data = await response.json();
        toast.success('Plan actualizado correctamente');
        return;
      }

      // Crear preferencia de pago para planes pagos
      const plan = PLANS[planId];
      const response = await fetch('http://localhost:5000/api/payment/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`
        },
        body: JSON.stringify({
          planId,
          title: `Plan ${plan.name}`,
          price: plan.price
        })
      });

      if (!response.ok) {
        throw new Error('Error al crear la preferencia de pago');
      }

      const { preferenceId } = await response.json();
      
      // Inicializar el botón de pago de MercadoPago
      const mp = new window.MercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, {
        locale: 'es-AR'
      });

      // Mostrar el modal de pago
      const modal = document.createElement('div');
      modal.className = 'payment-modal';
      modal.innerHTML = `
        <div class="modal-content">
          <h2>Proceder al Pago</h2>
          <div class="cho-container"></div>
        </div>
      `;
      document.body.appendChild(modal);

      // Agregar estilos para el modal
      const style = document.createElement('style');
      style.textContent = `
        .payment-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          text-align: center;
        }
      `;
      document.head.appendChild(style);

      // Inicializar el botón de pago
      mp.checkout({
        preference: {
          id: preferenceId
        },
        render: {
          container: '.cho-container',
          label: 'Pagar',
        }
      });

      // Cerrar el modal cuando se hace clic fuera de él
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          document.body.removeChild(modal);
          document.head.removeChild(style);
        }
      });

    } catch (error) {
      console.error('Error:', error);
      toast.error('Error al procesar la solicitud');
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" align="center" gutterBottom>
        Planes y Precios
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Elige el plan que mejor se adapte a tus necesidades
      </Typography>

      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        {Object.values(PLANS).map((plan) => (
          <Grid item key={plan.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'visible',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                  transition: 'all 0.3s ease'
                }
              }}
            >
              {plan.id === 'premium' && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: -12,
                    right: -12,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.875rem',
                    fontWeight: 'bold'
                  }}
                >
                  Popular
                </Box>
              )}

              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" align="center">
                  {plan.name}
                </Typography>
                <Typography variant="h4" component="p" align="center" sx={{ my: 2 }}>
                  ${plan.price}
                  <Typography variant="subtitle1" component="span" color="text.secondary">
                    /mes
                  </Typography>
                </Typography>

                <List dense>
                  {plan.features.map((feature, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <CheckIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>

              <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                <Button
                  variant={plan.id === 'premium' ? 'contained' : 'outlined'}
                  color="primary"
                  size="large"
                  onClick={() => handleUpgrade(plan.id)}
                  sx={{
                    px: 4,
                    ...(plan.id === 'premium' && {
                      bgcolor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.dark'
                      }
                    })
                  }}
                >
                  {plan.price === 0 ? 'Comenzar Gratis' : 'Actualizar Plan'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
