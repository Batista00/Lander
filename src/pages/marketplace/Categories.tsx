import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
} from '@mui/material';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  templateCount: number;
  tags: string[];
}

const categories: Category[] = [
  {
    id: 'landing-pages',
    name: 'Landing Pages',
    description: 'Templates optimizados para conversión y captación de leads',
    image: '/images/categories/landing-pages.jpg',
    templateCount: 45,
    tags: ['Marketing', 'Conversión', 'SEO'],
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Soluciones completas para tiendas online',
    image: '/images/categories/ecommerce.jpg',
    templateCount: 32,
    tags: ['Ventas', 'Productos', 'Pagos'],
  },
  {
    id: 'portfolio',
    name: 'Portafolios',
    description: 'Muestra tu trabajo de forma profesional',
    image: '/images/categories/portfolio.jpg',
    templateCount: 28,
    tags: ['Creativos', 'Personal', 'Showcase'],
  },
  {
    id: 'business',
    name: 'Negocios',
    description: 'Templates corporativos y profesionales',
    image: '/images/categories/business.jpg',
    templateCount: 38,
    tags: ['Corporativo', 'Servicios', 'Empresa'],
  },
  {
    id: 'blog',
    name: 'Blogs',
    description: 'Diseños optimizados para contenido',
    image: '/images/categories/blog.jpg',
    templateCount: 25,
    tags: ['Contenido', 'Editorial', 'Noticias'],
  },
  {
    id: 'admin',
    name: 'Admin Dashboards',
    description: 'Paneles de administración y analytics',
    image: '/images/categories/admin.jpg',
    templateCount: 20,
    tags: ['Dashboard', 'Analytics', 'Control'],
  },
];

export const Categories: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Categorías
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explora nuestra colección de templates por categoría
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
              onClick={() => navigate(`/marketplace/categories/${category.id}`)}
            >
              <CardMedia
                component="img"
                height="140"
                image={category.image}
                alt={category.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {category.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {category.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {category.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                    />
                  ))}
                </Box>
                <Typography variant="body2" color="primary">
                  {category.templateCount} templates disponibles
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
