import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button, Skeleton } from '@mui/material';
import { landingPageService } from '../../services/landingPageService';
import { toast } from 'sonner';

const templates = [
  {
    id: 'business',
    title: 'Business Landing',
    description: 'Template profesional para sitios web empresariales',
    image: 'https://via.placeholder.com/300x200',
    components: [
      {
        id: 'header-1',
        type: 'hero',
        content: {
          title: 'Bienvenido a Nuestra Empresa',
          subtitle: 'Soluciones profesionales para tu negocio',
          ctaText: 'Contáctanos',
          ctaLink: '#contact'
        }
      },
      {
        id: 'features',
        type: 'features',
        content: {
          title: 'Nuestros Servicios',
          items: [
            { title: 'Consultoría', description: 'Asesoramiento experto' },
            { title: 'Desarrollo', description: 'Soluciones tecnológicas' },
            { title: 'Marketing', description: 'Estrategias digitales' }
          ]
        }
      }
    ]
  },
  {
    id: 'startup',
    title: 'Startup Landing',
    description: 'Template moderno para startups y productos digitales',
    image: 'https://via.placeholder.com/300x200',
    components: [
      {
        id: 'hero',
        type: 'hero',
        content: {
          title: 'La Próxima Gran Innovación',
          subtitle: 'Transformando el futuro con tecnología',
          ctaText: 'Comenzar Ahora',
          ctaLink: '#signup'
        }
      },
      {
        id: 'pricing',
        type: 'pricing',
        content: {
          title: 'Planes y Precios',
          plans: [
            { name: 'Básico', price: '9.99', features: ['Feature 1', 'Feature 2'] },
            { name: 'Pro', price: '29.99', features: ['Feature 1', 'Feature 2', 'Feature 3'] }
          ]
        }
      }
    ]
  },
  {
    id: 'product',
    title: 'Product Landing',
    description: 'Template optimizado para presentación de productos',
    image: 'https://via.placeholder.com/300x200',
    components: [
      {
        id: 'product-hero',
        type: 'hero',
        content: {
          title: 'Descubre Nuestro Producto',
          subtitle: 'La solución que estabas buscando',
          ctaText: 'Ver Detalles',
          ctaLink: '#details'
        }
      },
      {
        id: 'testimonials',
        type: 'testimonials',
        content: {
          title: 'Lo que dicen nuestros clientes',
          items: [
            { name: 'Juan Pérez', text: 'Excelente producto', role: 'CEO' },
            { name: 'María García', text: 'Muy satisfecha', role: 'Directora' }
          ]
        }
      }
    ]
  }
];

const LandingTemplates = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const handleUseTemplate = async (template: any) => {
    try {
      setLoading(true);
      const newPage = await landingPageService.createLandingPage(template.title, template);
      
      if (newPage) {
        toast.success('Template aplicado correctamente');
        navigate(`/dashboard/landing-pages/${newPage.id}`);
      }
    } catch (error) {
      console.error('Error al usar el template:', error);
      if ((error as any)?.code === 'auth/not-authenticated') {
        toast.error('Por favor inicia sesión para crear una landing page');
      } else {
        toast.error('Error al aplicar el template');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Templates
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Selecciona un template para comenzar tu landing page. Podrás personalizarlo completamente después.
      </Typography>

      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)'
              }
            }}>
              {loading ? (
                <Skeleton variant="rectangular" height={200} />
              ) : (
                <CardMedia
                  component="img"
                  height="200"
                  image={template.image}
                  alt={template.title}
                />
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {template.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {template.description}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  onClick={() => handleUseTemplate(template)}
                  disabled={loading}
                >
                  {loading ? 'Aplicando...' : 'Usar Template'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LandingTemplates;
