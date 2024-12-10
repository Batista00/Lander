import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Chip,
  Divider,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PreviewIcon from '@mui/icons-material/Preview';

interface TemplateFeature {
  title: string;
  description: string;
}

const mockTemplate = {
  id: '1',
  title: 'Business Pro',
  description: 'Un template profesional diseñado para empresas modernas que buscan destacar en línea. Incluye secciones para servicios, testimonios y llamados a la acción efectivos.',
  price: 29.99,
  category: 'Business',
  imageUrl: '/templates/business-pro.jpg',
  isPremium: true,
  features: [
    {
      title: 'Diseño Responsivo',
      description: 'Se adapta perfectamente a todos los dispositivos',
    },
    {
      title: 'Componentes Premium',
      description: 'Acceso a todos los componentes premium exclusivos',
    },
    {
      title: 'Soporte Prioritario',
      description: 'Asistencia técnica dedicada',
    },
  ],
};

export const TemplateDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handlePurchase = () => {
    // Implementar lógica de compra
    console.log('Comprando template:', id);
  };

  const handlePreview = () => {
    // Implementar vista previa
    console.log('Previsualizando template:', id);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Paper 
            elevation={3}
            sx={{
              height: 400,
              backgroundImage: `url(${mockTemplate.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mb: 2,
            }}
          />
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {mockTemplate.title}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip label={mockTemplate.category} variant="outlined" />
              {mockTemplate.isPremium && (
                <Chip label="Premium" color="secondary" />
              )}
            </Box>

            <Typography variant="h5" color="primary" gutterBottom>
              ${mockTemplate.price}
            </Typography>

            <Typography variant="body1" paragraph>
              {mockTemplate.description}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                onClick={handlePurchase}
                fullWidth
              >
                Comprar Ahora
              </Button>
              <Button
                variant="outlined"
                startIcon={<PreviewIcon />}
                onClick={handlePreview}
                fullWidth
              >
                Vista Previa
              </Button>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Características
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            {mockTemplate.features.map((feature, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
