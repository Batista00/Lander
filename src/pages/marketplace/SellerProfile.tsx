import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  Chip,
  Rating,
  Divider,
} from '@mui/material';
import {
  LocationOn,
  Language,
  Twitter,
  LinkedIn,
  GitHub,
} from '@mui/icons-material';

interface SellerStats {
  templates: number;
  sales: number;
  rating: number;
  reviews: number;
}

interface SellerInfo {
  id: string;
  name: string;
  avatar: string;
  location: string;
  website: string;
  bio: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  stats: SellerStats;
  skills: string[];
}

const mockSeller: SellerInfo = {
  id: '1',
  name: 'Alex Developer',
  avatar: '/images/avatars/alex.jpg',
  location: 'Buenos Aires, Argentina',
  website: 'www.alexdev.com',
  bio: 'Desarrollador Full Stack con más de 8 años de experiencia. Especializado en crear templates modernos y responsivos con las últimas tecnologías.',
  socialLinks: {
    twitter: 'https://twitter.com/alexdev',
    linkedin: 'https://linkedin.com/in/alexdev',
    github: 'https://github.com/alexdev',
  },
  stats: {
    templates: 25,
    sales: 1240,
    rating: 4.8,
    reviews: 156,
  },
  skills: [
    'React',
    'TypeScript',
    'Material-UI',
    'Responsive Design',
    'Next.js',
    'Tailwind CSS',
  ],
};

export const SellerProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const seller = mockSeller; // En un caso real, cargaríamos los datos del vendedor usando el ID

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Perfil Principal */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item>
                <Avatar
                  src={seller.avatar}
                  sx={{ width: 120, height: 120 }}
                />
              </Grid>
              <Grid item xs>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h4" gutterBottom>
                      {seller.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography color="text.secondary">
                        {seller.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Language sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography color="text.secondary">
                        {seller.website}
                      </Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Button variant="contained" color="primary">
                      Seguir
                    </Button>
                    <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                      {seller.socialLinks.twitter && (
                        <IconButton href={seller.socialLinks.twitter}>
                          <Twitter />
                        </IconButton>
                      )}
                      {seller.socialLinks.linkedin && (
                        <IconButton href={seller.socialLinks.linkedin}>
                          <LinkedIn />
                        </IconButton>
                      )}
                      {seller.socialLinks.github && (
                        <IconButton href={seller.socialLinks.github}>
                          <GitHub />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </Box>

                <Typography sx={{ mt: 2 }}>
                  {seller.bio}
                </Typography>

                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {seller.skills.map((skill) => (
                    <Chip key={skill} label={skill} />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Estadísticas */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Estadísticas
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography color="text.secondary">Templates</Typography>
                <Typography variant="h4">{seller.stats.templates}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography color="text.secondary">Ventas Totales</Typography>
                <Typography variant="h4">{seller.stats.sales}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography color="text.secondary">Calificación</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Rating value={seller.stats.rating} precision={0.1} readOnly />
                  <Typography>
                    ({seller.stats.reviews} reseñas)
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Templates del Vendedor */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Templates Destacados
            </Typography>
            {/* Aquí iría un grid de templates */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const IconButton: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <Button
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    sx={{
      minWidth: 'auto',
      p: 1,
      color: 'text.secondary',
      '&:hover': { color: 'primary.main' },
    }}
  >
    {children}
  </Button>
);
