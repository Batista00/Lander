import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { landingPageService } from '../../services/landingPageService';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

interface LandingPage {
  id: string;
  title: string;
  status: 'draft' | 'published' | 'archived';
  views?: number;
  conversions?: number;
  createdAt: Date;
  updatedAt: Date;
}

const LandingPages = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadPages();
    }
  }, [user]);

  const loadPages = async () => {
    try {
      if (!user) {
        toast.error('Por favor inicia sesión para ver tus landing pages');
        return;
      }

      const pagesData = await landingPageService.getAllLandingPages();
      setPages(pagesData);
    } catch (error) {
      console.error('Error loading pages:', error);
      if ((error as any)?.code === 'auth/not-authenticated') {
        toast.error('Por favor inicia sesión para ver tus landing pages');
      } else {
        toast.error('Error al cargar las landing pages');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNewPage = () => {
    navigate('/dashboard/landing-pages/templates');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'success.main';
      case 'draft':
        return 'warning.main';
      case 'archived':
        return 'error.main';
      default:
        return 'text.secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Publicado';
      case 'draft':
        return 'Borrador';
      case 'archived':
        return 'Archivado';
      default:
        return status;
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Landing Pages
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={handleNewPage}
        >
          Nueva Landing Page
        </Button>
      </Box>

      <Grid container spacing={3}>
        {loading ? (
          Array.from(new Array(6)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="text" width="40%" />
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Skeleton variant="rectangular" width={80} height={36} />
                    <Skeleton variant="rectangular" width={80} height={36} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          pages.map((page) => (
            <Grid item xs={12} sm={6} md={4} key={page.id}>
              <Card sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)'
                }
              }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {page.title}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: getStatusColor(page.status), mb: 1 }}>
                      Estado: {getStatusText(page.status)}
                    </Typography>
                    {page.views !== undefined && (
                      <Typography variant="body2" color="text.secondary">
                        Vistas: {page.views.toLocaleString()}
                      </Typography>
                    )}
                    {page.conversions !== undefined && (
                      <Typography variant="body2" color="text.secondary">
                        Conversiones: {page.conversions.toLocaleString()}
                      </Typography>
                    )}
                    <Typography variant="body2" color="text.secondary">
                      Actualizado: {page.updatedAt?.toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      onClick={() => navigate(`/dashboard/landing-pages/${page.id}`)}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="outlined"
                      onClick={() => navigate(`/dashboard/landing-pages/preview/${page.id}`)}
                    >
                      Vista Previa
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {!loading && pages.length === 0 && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8,
          backgroundColor: 'grey.50',
          borderRadius: 2,
          mt: 3
        }}>
          <Typography variant="h6" gutterBottom>
            No tienes landing pages creadas
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Comienza creando tu primera landing page desde nuestros templates
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleNewPage}
          >
            Crear Landing Page
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default LandingPages;
