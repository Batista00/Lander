import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const paymentId = searchParams.get('payment_id');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!user) return;

        const response = await fetch(`http://localhost:5000/api/payment/verify/${paymentId}`, {
          headers: {
            'Authorization': `Bearer ${await user.getIdToken()}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al verificar el pago');
        }

        const data = await response.json();
        toast.success(data.message || 'Pago procesado correctamente');
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al verificar el pago');
      }
    };

    verifyPayment();
  }, [paymentId, user]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 3
        }}
      >
        <CheckCircleIcon
          sx={{
            fontSize: 64,
            color: 'rgb(0, 200, 83)'
          }}
        />
        
        <Typography variant="h4" component="h1" gutterBottom>
          ¡Pago Exitoso!
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Tu pago ha sido procesado correctamente. Tu plan ha sido actualizado y ya puedes comenzar a disfrutar de los beneficios.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/dashboard')}
          sx={{
            mt: 2,
            bgcolor: 'rgb(0, 200, 83)',
            '&:hover': {
              bgcolor: 'rgb(0, 180, 75)'
            }
          }}
        >
          Ir al Dashboard
        </Button>
      </Box>
    </Container>
  );
}
