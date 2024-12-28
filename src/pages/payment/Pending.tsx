import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';
import PendingIcon from '@mui/icons-material/Pending';

export function Pending() {
  const navigate = useNavigate();

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
        <PendingIcon
          sx={{
            fontSize: 64,
            color: 'warning.main'
          }}
        />
        
        <Typography variant="h4" component="h1" gutterBottom>
          Pago en Proceso
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Tu pago está siendo procesado. Una vez que se confirme, actualizaremos tu plan automáticamente.
          Puedes revisar el estado de tu pago en tu panel de control.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate('/dashboard')}
          sx={{ mt: 2 }}
        >
          Ir al Dashboard
        </Button>
      </Box>
    </Container>
  );
}
