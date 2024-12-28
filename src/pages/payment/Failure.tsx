import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export function Failure() {
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
        <ErrorOutlineIcon
          sx={{
            fontSize: 64,
            color: 'error.main'
          }}
        />
        
        <Typography variant="h4" component="h1" gutterBottom>
          Error en el Pago
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Lo sentimos, hubo un problema al procesar tu pago. Por favor, intenta nuevamente o contacta a nuestro soporte si el problema persiste.
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => navigate('/pricing')}
          >
            Volver a Intentar
          </Button>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/support')}
          >
            Contactar Soporte
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
