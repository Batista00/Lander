"use client";

import React from 'react';
import { Button, Box, Typography, Alert, CircularProgress } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { initializeMarketplace } from '@/services/marketplace/initialize';

// Este componente solo se debe usar en desarrollo
export const InitializeMarketplace: React.FC = () => {
  // Solo mostrar en desarrollo
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);

  const handleInitialize = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const result = await initializeMarketplace();
      
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || 'Error desconocido');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      maxWidth: 600, 
      mx: 'auto', 
      p: 3, 
      border: '2px dashed #ff9800',
      borderRadius: 2,
      bgcolor: '#fff3e0',
      my: 2
    }}>
      <Typography variant="h6" gutterBottom color="warning.main">
        🛠️ Herramienta de Desarrollo
      </Typography>
      
      <Typography variant="body2" sx={{ mb: 1 }} color="text.secondary">
        Este componente solo está disponible en desarrollo y no aparecerá en producción.
      </Typography>

      <Typography variant="body2" sx={{ mb: 3 }} color="text.secondary">
        Inicializa el marketplace con datos de ejemplo para pruebas.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Marketplace inicializado correctamente
        </Alert>
      )}

      <Button
        variant="contained"
        onClick={handleInitialize}
        disabled={loading}
        color="warning"
        size="small"
        startIcon={loading ? <CircularProgress size={20} /> : null}
      >
        {loading ? 'Inicializando...' : 'Inicializar Datos de Prueba'}
      </Button>
    </Box>
  );
};
