import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button, 
  Skeleton,
  Chip,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Collapse,
  ImageList,
  ImageListItem,
  Paper,
  Divider,
  Stack,
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Close as CloseIcon,
  Devices as DevicesIcon,
  Phone as PhoneIcon,
  Laptop as LaptopIcon,
  Star as StarIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { landingPageService } from '../../services/landingPageService';
import { toast } from 'sonner';
import { PlanType } from '../../types/plans';
import { PLANS } from '../../data/plans';
import { FREE_TEMPLATES, PREMIUM_TEMPLATES, TEMPLATE_CATEGORIES } from '../../data/templates';
import type { Template } from '../../types/templates';
import TemplateCard from '../../components/templates/TemplateCard';
import { initializeTemplates } from '../../services/templateInitializer';

// Simulación temporal del plan del usuario (igual que en LandingPages)
const useUserPlan = () => {
  return {
    planId: 'free' as PlanType,
    activeLandingPages: 1,
    trialEndsAt: null,
    maxLandingPages: PLANS.free.maxLandingPages
  };
};

// Tipos
interface PreviewState {
  open: boolean;
  template: Template | null;
  device: 'desktop' | 'tablet' | 'mobile';
}

const DevicePreviewButton = ({ isSelected, ...props }) => (
  <IconButton
    {...props}
    sx={{
      color: isSelected ? 'primary.main' : 'text.secondary',
      '&:hover': {
        color: 'primary.main',
      },
    }}
  />
);

export function LandingTemplates() {
  const navigate = useNavigate();
  const userPlan = useUserPlan();
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  const [previewState, setPreviewState] = useState<PreviewState>({
    open: false,
    template: null,
    device: 'desktop'
  });
  const [expandedTemplateId, setExpandedTemplateId] = useState<string | null>(null);

  useEffect(() => {
    // Inicializar templates si es necesario
    initializeTemplates().catch(console.error);
  }, []);

  // Filtrar templates basados en búsqueda y categoría
  const filteredTemplates = useMemo(() => {
    const templates = selectedTab === 0 ? FREE_TEMPLATES : PREMIUM_TEMPLATES;
    return templates.filter(template => {
      const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [selectedTab, searchQuery, selectedCategory]);

  // Función para manejar la expansión de la preview
  const handleExpandClick = (templateId: string) => {
    setExpandedTemplateId(expandedTemplateId === templateId ? null : templateId);
  };

  // Función para abrir el preview lateral
  const handlePreviewOpen = (template: Template) => {
    setPreviewState({
      open: true,
      template,
      device: 'desktop'
    });
  };

  // Función para cambiar el dispositivo de preview
  const handleDeviceChange = (device: 'desktop' | 'tablet' | 'mobile') => {
    setPreviewState(prev => ({ ...prev, device }));
  };

  const handleTemplateSelect = async (template: Template) => {
    if (template.premium && userPlan.planId === 'free') {
      setSelectedTemplate(template);
      setUpgradeDialogOpen(true);
      return;
    }

    // Verificar límite de páginas
    if (userPlan.activeLandingPages >= userPlan.maxLandingPages) {
      toast.error(
        'Has alcanzado el límite de landing pages de tu plan',
        {
          description: 'Actualiza tu plan para crear más landing pages',
          action: {
            label: 'Actualizar Plan',
            onClick: () => navigate('/pricing')
          }
        }
      );
      return;
    }

    try {
      toast.loading('Creando landing page...', { id: 'creating-landing' });
      
      const newPageId = await landingPageService.createFromTemplate(template.id);
      
      toast.success('Template aplicado correctamente', {
        id: 'creating-landing',
        description: 'Redirigiendo al editor...'
      });

      // Pequeña pausa para mostrar el mensaje de éxito
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirigir al editor
      navigate(`/dashboard/landing-pages/${newPageId}`);
    } catch (error) {
      console.error('Error applying template:', error);
      
      // Mostrar mensaje de error específico si está disponible
      if (error instanceof Error) {
        switch (error.message) {
          case 'Template no encontrado':
            toast.error('El template seleccionado no está disponible', {
              id: 'creating-landing',
              description: 'Por favor, selecciona otro template'
            });
            break;
          case 'Template inválido: no contiene componentes':
            toast.error('El template está mal configurado', {
              id: 'creating-landing',
              description: 'Por favor, selecciona otro template'
            });
            break;
          case 'Usuario no autenticado':
            toast.error('Sesión expirada', {
              id: 'creating-landing',
              description: 'Por favor, inicia sesión nuevamente'
            });
            // Redirigir a login si es necesario
            navigate('/login');
            break;
          default:
            toast.error('Error al aplicar el template', {
              id: 'creating-landing',
              description: 'Por favor, intenta nuevamente'
            });
        }
      } else {
        toast.error('Error al aplicar el template', {
          id: 'creating-landing',
          description: 'Por favor, intenta nuevamente'
        });
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4">
            Templates
          </Typography>
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
          alignItems: 'center',
          mb: 3
        }}>
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
              Plan {PLANS[userPlan.planId].name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userPlan.planId === 'free' ? 'Acceso a templates básicos' : 'Acceso a todos los templates'}
            </Typography>
          </Box>
          {userPlan.planId === 'free' && (
            <Button 
              variant="outlined" 
              color="primary"
              onClick={() => navigate('/pricing')}
              startIcon={<StarIcon />}
            >
              Actualizar Plan
            </Button>
          )}
        </Box>

        {/* Filtros y Búsqueda */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Buscar templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Categoría</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  label="Categoría"
                >
                  <MenuItem value="all">Todas las categorías</MenuItem>
                  {Object.entries(TEMPLATE_CATEGORIES).map(([key, value]) => (
                    <MenuItem key={key} value={value}>{value}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>

        {/* Tabs Gratis/Premium */}
        <Tabs 
          value={selectedTab} 
          onChange={(_, newValue) => setSelectedTab(newValue)}
          sx={{ mb: 3 }}
        >
          <Tab 
            label="Templates Gratuitos" 
            icon={<Chip 
              label={FREE_TEMPLATES.length} 
              size="small" 
              sx={{ ml: 1 }} 
            />}
          />
          <Tab 
            label="Templates Premium" 
            icon={<Chip 
              label={PREMIUM_TEMPLATES.length} 
              size="small" 
              color="primary" 
              sx={{ ml: 1 }} 
            />}
          />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {filteredTemplates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <TemplateCard
              template={template}
              onSelect={handleTemplateSelect}
              isPremium={template.premium && userPlan.planId === 'free'}
              expanded={expandedTemplateId === template.id}
              onExpand={() => handleExpandClick(template.id)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Preview Lateral */}
      <Box sx={{ 
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: '50%',
        zIndex: 1300,
        overflow: 'auto',
        transition: 'transform 0.3s ease-in-out',
        transform: previewState.open ? 'translateX(0)' : 'translateX(100%)',
      }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            {previewState.template?.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <DevicePreviewButton
              onClick={() => handleDeviceChange('desktop')}
              isSelected={previewState.device === 'desktop'}
            >
              <LaptopIcon />
            </DevicePreviewButton>
            <DevicePreviewButton
              onClick={() => handleDeviceChange('tablet')}
              isSelected={previewState.device === 'tablet'}
            >
              <DevicesIcon />
            </DevicePreviewButton>
            <DevicePreviewButton
              onClick={() => handleDeviceChange('mobile')}
              isSelected={previewState.device === 'mobile'}
            >
              <PhoneIcon />
            </DevicePreviewButton>
            <IconButton onClick={() => setPreviewState(prev => ({ ...prev, open: false }))}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ 
          p: 2, 
          height: 'calc(100% - 64px)',
          overflow: 'auto'
        }}>
          <Box sx={{ 
            width: previewState.device === 'mobile' ? '375px' : 
                   previewState.device === 'tablet' ? '768px' : '100%',
            margin: '0 auto',
            transition: 'width 0.3s ease'
          }}>
            {previewState.template?.sections?.map((section, index) => (
              <Box 
                key={index}
                component="img"
                src={section.preview}
                alt={section.name}
                sx={{ 
                  width: '100%',
                  height: 'auto',
                  mb: 2,
                  borderRadius: 1,
                  boxShadow: 1
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Diálogo de actualización */}
      <Dialog
        open={upgradeDialogOpen}
        onClose={() => setUpgradeDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Template Premium
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Este template está disponible solo para usuarios Premium y Enterprise.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Actualiza tu plan para acceder a:
          </Typography>
          <Box component="ul" sx={{ mt: 1 }}>
            <li>Todos los templates premium</li>
            <li>Hasta 5 landing pages activas</li>
            <li>Estadísticas avanzadas</li>
            <li>Sin marca de agua</li>
          </Box>
          {selectedTemplate?.price && (
            <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.light', borderRadius: 1, color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                ¡Oferta Especial!
              </Typography>
              <Typography variant="body1">
                50% de descuento en todos los templates premium
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography 
                  variant="body1" 
                  sx={{ textDecoration: 'line-through' }}
                >
                  ${selectedTemplate.price}
                </Typography>
                <Typography variant="h6">
                  ${selectedTemplate.discountedPrice}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUpgradeDialogOpen(false)}>
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              setUpgradeDialogOpen(false);
              navigate('/pricing');
            }}
          >
            Ver Planes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
