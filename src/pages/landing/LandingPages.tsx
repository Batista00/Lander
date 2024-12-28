import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, Skeleton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { landingPageService } from '../../services/landingPageService';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { PLANS } from '../../data/plans';
import { PlanType } from '../../types/plans';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Trash2, Edit, Eye } from 'lucide-react';

interface LandingPage {
  id: string;
  title: string;
  status: 'draft' | 'published' | 'archived';
  views?: number;
  conversions?: number;
  createdAt: Date;
  updatedAt: Date;
  publishConfig?: {
    slug: string;
  };
}

// Simulación temporal del plan del usuario
const useUserPlan = () => {
  // TODO: Implementar esto con un contexto real
  return {
    planId: 'free' as PlanType,
    activeLandingPages: 1,
    trialEndsAt: null,
    maxLandingPages: PLANS.free.maxLandingPages
  };
};

const LandingPages = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [pages, setPages] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<LandingPage | null>(null);
  const userPlan = useUserPlan();

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

      const pagesData = await landingPageService.getLandingPages();
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
    if (pages.length >= userPlan.maxLandingPages) {
      toast.error(
        <div>
          <p>Has alcanzado el límite de landing pages de tu plan.</p>
          <Button 
            color="primary" 
            variant="contained" 
            size="small"
            onClick={() => navigate('/pricing')}
            sx={{ mt: 1 }}
          >
            Actualizar Plan
          </Button>
        </div>
      );
      return;
    }
    navigate('/dashboard/landing-pages/templates');
  };

  const handleDelete = (page: LandingPage) => {
    setPageToDelete(page);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!pageToDelete) return;

    try {
      await landingPageService.deleteLandingPage(pageToDelete.id);
      setPages(prev => prev.filter(p => p.id !== pageToDelete.id));
      toast.success("Landing page eliminada correctamente", {
        description: `Se ha eliminado "${pageToDelete.title}"`,
        action: {
          label: "Deshacer",
          onClick: () => loadPages()
        },
      });
    } catch (error) {
      console.error('Error deleting landing:', error);
      toast.error("No se pudo eliminar la landing page", {
        description: "Hubo un error al intentar eliminar la página. Por favor, intenta de nuevo.",
      });
    } finally {
      setDeleteDialogOpen(false);
      setPageToDelete(null);
    }
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
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
        
        {/* Plan Info */}
        <Box sx={{ 
          p: 2, 
          bgcolor: 'background.paper',
          borderRadius: 1,
          border: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
              Plan {PLANS[userPlan.planId].name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {pages.length} de {userPlan.maxLandingPages} landing pages utilizadas
            </Typography>
          </Box>
          {userPlan.planId === 'free' && (
            <Button 
              variant="contained"
              sx={{
                bgcolor: 'rgb(0, 200, 83)',
                '&:hover': {
                  bgcolor: 'rgb(0, 180, 75)'
                }
              }}
              onClick={() => navigate('/pricing')}
            >
              Actualizar Plan
            </Button>
          )}
        </Box>
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
              <Card>
                <CardContent>
                  <Typography variant="h6" noWrap title={page.title}>
                    {page.title}
                  </Typography>
                  
                  <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: getStatusColor(page.status),
                        mr: 1
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {getStatusText(page.status)}
                    </Typography>
                  </Box>

                  {page.views !== undefined && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {page.views} visualizaciones
                    </Typography>
                  )}

                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Tooltip title="Editar">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => navigate(`/dashboard/landing-pages/editor/${page.id}`)}
                        startIcon={<Edit className="h-4 w-4" />}
                      >
                        Editar
                      </Button>
                    </Tooltip>

                    <Tooltip title="Vista previa">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => navigate(`/dashboard/landing-pages/preview/${page.id}`)}
                        startIcon={<Eye className="h-4 w-4" />}
                      >
                        Vista previa
                      </Button>
                    </Tooltip>

                    {page.status === 'published' && (
                      <Tooltip title="Ver publicada">
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => window.open(`/dashboard/landing-pages/published/${page.publishConfig?.slug || page.id}`, '_blank')}
                          startIcon={<Eye className="h-4 w-4" />}
                        >
                          Ver publicada
                        </Button>
                      </Tooltip>
                    )}

                    <Tooltip title="Eliminar">
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(page)}
                        startIcon={<Trash2 className="h-4 w-4" />}
                      >
                        Eliminar
                      </Button>
                    </Tooltip>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Landing Page</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres eliminar esta landing page? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outlined" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="contained" color="error" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
