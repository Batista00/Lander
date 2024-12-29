import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Skeleton,
  LinearProgress,
  Tooltip,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { landingPageService } from '../../services/landingPageService';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import { DeleteOutline, EditOutlined, VisibilityOutlined, RestoreFromTrash } from '@mui/icons-material';

interface DraftPage {
  id: string;
  title: string;
  lastEdited: Date;
  completionPercentage: number;
  previewImage?: string;
}

export function LandingDrafts() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [drafts, setDrafts] = useState<DraftPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDrafts();
    }
  }, [user]);

  const loadDrafts = async () => {
    try {
      if (!user) {
        toast.error('Por favor inicia sesión para ver tus borradores');
        return;
      }

      const draftsData = await landingPageService.getDraftPages();
      setDrafts(draftsData);
    } catch (error) {
      console.error('Error loading drafts:', error);
      toast.error('Error al cargar los borradores');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await landingPageService.deletePage(id);
      toast.success('Borrador eliminado');
      loadDrafts();
    } catch (error) {
      console.error('Error deleting draft:', error);
      toast.error('Error al eliminar el borrador');
    }
  };

  const handleRestore = async (id: string) => {
    try {
      await landingPageService.restoreDraft(id);
      toast.success('Borrador restaurado');
      loadDrafts();
    } catch (error) {
      console.error('Error restoring draft:', error);
      toast.error('Error al restaurar el borrador');
    }
  };

  const getCompletionColor = (percentage: number) => {
    if (percentage < 30) return 'error';
    if (percentage < 70) return 'warning';
    return 'success';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Borradores
      </Typography>

      <Grid container spacing={3}>
        {loading ? (
          Array.from(new Array(3)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton variant="rectangular" height={4} width="100%" sx={{ my: 2 }} />
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
            {drafts.length === 0 ? (
              <Grid item xs={12}>
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 8,
                  backgroundColor: 'grey.50',
                  borderRadius: 2
                }}>
                  <Typography variant="h6" gutterBottom>
                    No tienes borradores
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Los borradores que guardes aparecerán aquí
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => navigate('/dashboard/landing-pages/templates')}
                  >
                    Crear Landing Page
                  </Button>
                </Box>
              </Grid>
            ) : (
              drafts.map((draft) => (
                <Grid item xs={12} sm={6} md={4} key={draft.id}>
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
                      <Typography variant="h6" gutterBottom>
                        {draft.title}
                      </Typography>
                      
                      <Box sx={{ my: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Progreso
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {draft.completionPercentage}%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={draft.completionPercentage}
                          color={getCompletionColor(draft.completionPercentage)}
                          sx={{ height: 4, borderRadius: 2 }}
                        />
                      </Box>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Última edición: {new Date(draft.lastEdited).toLocaleDateString()}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Editar">
                            <IconButton 
                              size="small"
                              onClick={() => navigate(`/dashboard/landing-pages/${draft.id}`)}
                            >
                              <EditOutlined />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Vista previa">
                            <IconButton 
                              size="small"
                              onClick={() => navigate(`/dashboard/landing-pages/preview/${draft.id}`)}
                            >
                              <VisibilityOutlined />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Restaurar">
                            <IconButton 
                              size="small"
                              onClick={() => handleRestore(draft.id)}
                              color="primary"
                            >
                              <RestoreFromTrash />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar">
                            <IconButton 
                              size="small"
                              onClick={() => handleDelete(draft.id)}
                              color="error"
                            >
                              <DeleteOutline />
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
    </Box>
  );
}
