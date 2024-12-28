import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Skeleton,
  Tooltip,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { landingPageService } from '../../services/landingPageService';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { 
  DeleteForever, 
  RestoreFromTrash, 
  VisibilityOutlined,
  InfoOutlined,
  AccessTime
} from '@mui/icons-material';

interface ArchivedPage {
  id: string;
  title: string;
  archivedDate: Date;
  reason?: string;
  stats?: {
    totalViews: number;
    totalConversions: number;
    revenue?: number;
  };
  previewImage?: string;
}

const LandingArchived = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [archived, setArchived] = useState<ArchivedPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState<ArchivedPage | null>(null);
  const [statsDialogOpen, setStatsDialogOpen] = useState(false);

  useEffect(() => {
    if (user) {
      loadArchived();
    }
  }, [user]);

  const loadArchived = async () => {
    try {
      if (!user) {
        toast.error('Por favor inicia sesión para ver tus páginas archivadas');
        return;
      }

      const archivedData = await landingPageService.getArchivedPages();
      setArchived(archivedData);
    } catch (error) {
      console.error('Error loading archived pages:', error);
      toast.error('Error al cargar las páginas archivadas');
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await landingPageService.restorePage(id);
      toast.success('Página restaurada exitosamente');
      loadArchived();
    } catch (error) {
      console.error('Error restoring page:', error);
      toast.error('Error al restaurar la página');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await landingPageService.deletePagePermanently(id);
      toast.success('Página eliminada permanentemente');
      loadArchived();
    } catch (error) {
      console.error('Error deleting page:', error);
      toast.error('Error al eliminar la página');
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Páginas Archivadas
      </Typography>

      <Grid container spacing={3}>
        {loading ? (
          Array.from(new Array(3)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" width="60%" />
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
          <>
            {archived.length === 0 ? (
              <Grid item xs={12}>
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 8,
                  backgroundColor: 'grey.50',
                  borderRadius: 2
                }}>
                  <Typography variant="h6" gutterBottom>
                    No tienes páginas archivadas
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Las páginas que archives aparecerán aquí
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => navigate('/dashboard/landing-pages')}
                  >
                    Ver Landing Pages Activas
                  </Button>
                </Box>
              </Grid>
            ) : (
              archived.map((page) => (
                <Grid item xs={12} sm={6} md={4} key={page.id}>
                  <Card sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4
                    }
                  }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6">
                          {page.title}
                        </Typography>
                        <Chip 
                          icon={<AccessTime sx={{ fontSize: 16 }} />}
                          label={new Date(page.archivedDate).toLocaleDateString()}
                          size="small"
                          color="default"
                          variant="outlined"
                        />
                      </Box>

                      {page.reason && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          Razón: {page.reason}
                        </Typography>
                      )}

                      {page.stats && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Vistas totales: {page.stats.totalViews.toLocaleString()}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Conversiones: {page.stats.totalConversions.toLocaleString()}
                          </Typography>
                          {page.stats.revenue !== undefined && (
                            <Typography variant="body2" color="text.secondary">
                              Ingresos: {formatCurrency(page.stats.revenue)}
                            </Typography>
                          )}
                        </Box>
                      )}

                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Ver estadísticas">
                            <IconButton 
                              size="small"
                              onClick={() => {
                                setSelectedPage(page);
                                setStatsDialogOpen(true);
                              }}
                            >
                              <InfoOutlined />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Vista previa">
                            <IconButton 
                              size="small"
                              onClick={() => navigate(`/dashboard/landing-pages/preview/${page.id}`)}
                            >
                              <VisibilityOutlined />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Restaurar">
                            <IconButton 
                              size="small"
                              onClick={() => handleRestore(page.id)}
                              color="primary"
                            >
                              <RestoreFromTrash />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar permanentemente">
                            <IconButton 
                              size="small"
                              onClick={() => handleDelete(page.id)}
                              color="error"
                            >
                              <DeleteForever />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </>
        )}
      </Grid>

      {/* Diálogo de Estadísticas */}
      <Dialog
        open={statsDialogOpen}
        onClose={() => setStatsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Estadísticas de {selectedPage?.title}
        </DialogTitle>
        <DialogContent>
          {selectedPage?.stats && (
            <Box sx={{ py: 2 }}>
              <Typography variant="h6" gutterBottom>
                Resumen General
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Vistas Totales
                  </Typography>
                  <Typography variant="h6">
                    {selectedPage.stats.totalViews.toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Conversiones Totales
                  </Typography>
                  <Typography variant="h6">
                    {selectedPage.stats.totalConversions.toLocaleString()}
                  </Typography>
                </Grid>
                {selectedPage.stats.revenue !== undefined && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Ingresos Totales
                    </Typography>
                    <Typography variant="h6">
                      {formatCurrency(selectedPage.stats.revenue)}
                    </Typography>
                  </Grid>
                )}
              </Grid>

              <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
                Información Adicional
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Archivada el: {new Date(selectedPage.archivedDate).toLocaleDateString()}
              </Typography>
              {selectedPage.reason && (
                <Typography variant="body2" color="text.secondary">
                  Razón: {selectedPage.reason}
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStatsDialogOpen(false)}>
            Cerrar
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              setStatsDialogOpen(false);
              handleRestore(selectedPage!.id);
            }}
          >
            Restaurar Página
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LandingArchived;
