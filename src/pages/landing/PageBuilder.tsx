import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, Typography, Paper, Grid, IconButton, Button, 
  Dialog, DialogTitle, DialogContent, 
  DialogContentText, DialogActions, TextField, Drawer 
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { 
  Type, Image, Link2, Layout, Box as BoxIcon, 
  Save, Eye, ArrowLeft, Grid as GridIcon,
  MessageSquare, DollarSign, Star, Globe, Trash2, X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { landingPageService } from '../../services/landingPageService';

interface ComponentContent {
  title?: string;
  subtitle?: string;
  text?: string;
  ctaText?: string;
  ctaLink?: string;
  items?: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  plans?: Array<{
    name: string;
    price: string;
    features: string[];
  }>;
  level?: number;
  src?: string;
  alt?: string;
  link?: string;
}

interface ComponentType {
  id: string;
  type: string;
  content: ComponentContent;
}

const defaultComponents = [
  {
    type: 'hero',
    label: 'Hero',
    icon: Layout,
    defaultContent: {
      title: 'Título Principal',
      subtitle: 'Subtítulo descriptivo',
      ctaText: 'Empezar',
      ctaLink: '#'
    }
  },
  {
    type: 'features',
    label: 'Características',
    icon: Star,
    defaultContent: {
      title: 'Nuestras Características',
      items: [
        { title: 'Característica 1', description: 'Descripción de la característica 1' },
        { title: 'Característica 2', description: 'Descripción de la característica 2' },
        { title: 'Característica 3', description: 'Descripción de la característica 3' }
      ]
    }
  },
  {
    type: 'pricing',
    label: 'Precios',
    icon: DollarSign,
    defaultContent: {
      title: 'Planes y Precios',
      plans: [
        { name: 'Básico', price: '9.99', features: ['Feature 1', 'Feature 2'] },
        { name: 'Pro', price: '29.99', features: ['Feature 1', 'Feature 2', 'Feature 3'] }
      ]
    }
  },
  {
    type: 'testimonials',
    label: 'Testimonios',
    icon: MessageSquare,
    defaultContent: {
      title: 'Lo que dicen nuestros clientes',
      items: [
        { name: 'Cliente 1', text: 'Testimonio 1', role: 'CEO' },
        { name: 'Cliente 2', text: 'Testimonio 2', role: 'Director' }
      ]
    }
  },
  {
    type: 'heading',
    label: 'Encabezado',
    icon: Type,
    defaultContent: {
      text: 'Nuevo Encabezado',
      level: 1
    }
  },
  {
    type: 'text',
    label: 'Texto',
    icon: Type,
    defaultContent: {
      text: 'Nuevo texto'
    }
  },
  {
    type: 'image',
    label: 'Imagen',
    icon: Image,
    defaultContent: {
      src: '',
      alt: ''
    }
  },
  {
    type: 'button',
    label: 'Botón',
    icon: Link2,
    defaultContent: {
      text: 'Click aquí',
      link: '#'
    }
  },
  {
    type: 'section',
    label: 'Sección',
    icon: Layout,
    defaultContent: {
      title: 'Título de la sección',
      text: 'Texto de la sección'
    }
  },
  {
    type: 'container',
    label: 'Contenedor',
    icon: BoxIcon,
    defaultContent: {
      title: 'Título del contenedor',
      text: 'Texto del contenedor'
    }
  },
  {
    type: 'grid',
    label: 'Cuadrícula',
    icon: GridIcon,
    defaultContent: {
      title: 'Título de la cuadrícula',
      items: [
        { title: 'Item 1', text: 'Texto del item 1' },
        { title: 'Item 2', text: 'Texto del item 2' },
        { title: 'Item 3', text: 'Texto del item 3' }
      ]
    }
  }
];

const PageBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [components, setComponents] = useState<ComponentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<ComponentType | null>(null);
  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);

  const loadPage = useCallback(async () => {
    try {
      const pageRef = doc(db, 'landing_pages', id);
      const pageSnap = await getDoc(pageRef);
      
      if (pageSnap.exists()) {
        const pageData = pageSnap.data();
        const componentsWithIds = (pageData.components || []).map((comp: any) => ({
          ...comp,
          id: comp.id || uuidv4()
        }));
        setComponents(componentsWithIds);
      }
    } catch (error) {
      console.error('Error loading page:', error);
      toast.error('Error al cargar la página');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id && user) {
      loadPage();
    } else {
      setLoading(false);
    }
  }, [id, user, loadPage]);

  const savePage = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const pageData = {
        components,
        updatedAt: new Date(),
        userId: user.uid,
      };

      if (id) {
        await updateDoc(doc(db, 'landing_pages', id), pageData);
      } else {
        const newPageRef = doc(db, 'landing_pages');
        await setDoc(newPageRef, {
          ...pageData,
          createdAt: new Date(),
          status: 'draft'
        });
      }
      
      toast.success('Página guardada exitosamente');
    } catch (error) {
      console.error('Error saving page:', error);
      toast.error('Error al guardar la página');
    } finally {
      setSaving(false);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    
    const updatedComponents = Array.from(components);
    const [removed] = updatedComponents.splice(sourceIndex, 1);
    updatedComponents.splice(destinationIndex, 0, removed);

    setComponents(updatedComponents);
  };

  const addComponent = (type: string) => {
    const newComponent: ComponentType = {
      id: uuidv4(),
      type,
      content: defaultComponents.find(comp => comp.type === type)?.defaultContent || {}
    };

    setComponents([...components, newComponent]);
  };

  const deleteComponent = (id: string) => {
    setComponents(components.filter(comp => comp.id !== id));
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
  };

  const previewPage = () => {
    navigate(`/dashboard/landing-pages/preview/${id}`);
  };

  const handlePublish = useCallback(async (useCustomDomain: boolean) => {
    if (!id) {
      toast.error('No se encontró el ID de la página');
      return;
    }

    try {
      setPublishing(true);
      const domain = useCustomDomain ? customDomain : undefined;
      const url = await landingPageService.publishLandingPage(id, domain);
      toast.success('Página publicada exitosamente');
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error publishing page:', error);
      toast.error('Error al publicar la página');
    } finally {
      setPublishing(false);
      setPublishDialogOpen(false);
    }
  }, [id, customDomain]);

  const handleEditComponent = (component: ComponentType) => {
    setSelectedComponent(component);
    setEditDrawerOpen(true);
  };

  const handleSaveComponent = (component: ComponentType) => {
    const updatedComponents = components.map(comp => comp.id === component.id ? component : comp);
    setComponents(updatedComponents);
  };

  const handleComponentChange = (field: string, value: any) => {
    if (selectedComponent) {
      const updatedComponent = { ...selectedComponent };
      updatedComponent.content[field] = value;
      setSelectedComponent(updatedComponent);
      handleSaveComponent(updatedComponent);
    }
  };

  const handlePlanUpdate = (plan: any, index: number) => {
    if (!selectedComponent) return;
    
    const updatedComponent = { ...selectedComponent };
    const plans = [...(updatedComponent.content.plans || [])];
    plans[index] = plan;
    
    handleComponentChange('plans', plans);
  };

  const handleItemsUpdate = (items: any[]) => {
    if (!selectedComponent) return;
    handleComponentChange('items', items);
  };

  const handleDocRef = useCallback(() => {
    if (!user?.uid || !id) return null;
    return doc(db, `users/${user.uid}/pages/${id}`);
  }, [user?.uid, id]);

  const renderComponentEditor = (component: ComponentType) => {
    switch (component.type) {
      case 'hero':
        return (
          <Box>
            <Typography variant="h6">Editar Hero</Typography>
            <TextField
              label="Título"
              value={component.content.title}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, title: e.target.value } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Subtítulo"
              value={component.content.subtitle}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, subtitle: e.target.value } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Texto del botón"
              value={component.content.ctaText}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, ctaText: e.target.value } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Enlace del botón"
              value={component.content.ctaLink}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, ctaLink: e.target.value } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
          </Box>
        );
      case 'features':
        return (
          <Box>
            <Typography variant="h6">Editar Características</Typography>
            <TextField
              label="Título"
              value={component.content.title}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, title: e.target.value } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
            {component.content.items?.map((item, index) => (
              <Box key={index}>
                <TextField
                  label={`Título del item ${index + 1}`}
                  value={item.title}
                  onChange={(e) => {
                    const updatedComponent = { ...component, content: { ...component.content, items: component.content.items?.map((i, idx) => idx === index ? { ...i, title: e.target.value } : i) } };
                    handleSaveComponent(updatedComponent);
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label={`Descripción del item ${index + 1}`}
                  value={item.description}
                  onChange={(e) => {
                    const updatedComponent = { ...component, content: { ...component.content, items: component.content.items?.map((i, idx) => idx === index ? { ...i, description: e.target.value } : i) } };
                    handleSaveComponent(updatedComponent);
                  }}
                  sx={{ mb: 2 }}
                />
              </Box>
            ))}
          </Box>
        );
      case 'pricing':
        return (
          <Box>
            <Typography variant="h6">Editar Precios</Typography>
            <TextField
              label="Título"
              value={component.content.title}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, title: e.target.value } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
            {component.content.plans?.map((plan, index) => (
              <Box key={index}>
                <TextField
                  label={`Nombre del plan ${index + 1}`}
                  value={plan.name}
                  onChange={(e) => {
                    const updatedPlan = { ...plan, name: e.target.value };
                    handlePlanUpdate(updatedPlan, index);
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label={`Precio del plan ${index + 1}`}
                  value={plan.price}
                  onChange={(e) => {
                    const updatedPlan = { ...plan, price: e.target.value };
                    handlePlanUpdate(updatedPlan, index);
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label={`Características del plan ${index + 1}`}
                  value={plan.features?.join(', ')}
                  onChange={(e) => {
                    const updatedPlan = { ...plan, features: e.target.value.split(', ') };
                    handlePlanUpdate(updatedPlan, index);
                  }}
                  sx={{ mb: 2 }}
                />
              </Box>
            ))}
          </Box>
        );
      case 'testimonials':
        return (
          <Box>
            <Typography variant="h6">Editar Testimonios</Typography>
            <TextField
              label="Título"
              value={component.content.title}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, title: e.target.value } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
            {component.content.items?.map((item, index) => (
              <Box key={index}>
                <TextField
                  label={`Nombre del cliente ${index + 1}`}
                  value={item.name}
                  onChange={(e) => {
                    const updatedComponent = { ...component, content: { ...component.content, items: component.content.items?.map((i, idx) => idx === index ? { ...i, name: e.target.value } : i) } };
                    handleSaveComponent(updatedComponent);
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label={`Testimonio del cliente ${index + 1}`}
                  value={item.text}
                  onChange={(e) => {
                    const updatedComponent = { ...component, content: { ...component.content, items: component.content.items?.map((i, idx) => idx === index ? { ...i, text: e.target.value } : i) } };
                    handleSaveComponent(updatedComponent);
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label={`Cargo del cliente ${index + 1}`}
                  value={item.role}
                  onChange={(e) => {
                    const updatedComponent = { ...component, content: { ...component.content, items: component.content.items?.map((i, idx) => idx === index ? { ...i, role: e.target.value } : i) } };
                    handleSaveComponent(updatedComponent);
                  }}
                  sx={{ mb: 2 }}
                />
              </Box>
            ))}
          </Box>
        );
      case 'heading':
        return (
          <Box>
            <Typography variant="h6">Editar Encabezado</Typography>
            <TextField
              label="Texto del encabezado"
              value={component.content.text}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, text: e.target.value } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Nivel del encabezado"
              value={component.content.level}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, level: parseInt(e.target.value) } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
          </Box>
        );
      case 'text':
        return (
          <Box>
            <Typography variant="h6">Editar Texto</Typography>
            <TextField
              label="Texto"
              value={component.content.text}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, text: e.target.value } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
          </Box>
        );
      case 'image':
        return (
          <Box>
            <Typography variant="h6">Editar Imagen</Typography>
            <TextField
              label="URL de la imagen"
              value={component.content.src}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, src: e.target.value } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Texto alternativo de la imagen"
              value={component.content.alt}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, alt: e.target.value } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
          </Box>
        );
      case 'button':
        return (
          <Box>
            <Typography variant="h6">Editar Botón</Typography>
            <TextField
              label="Texto del botón"
              value={component.content.text}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, text: e.target.value } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Enlace del botón"
              value={component.content.link}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, link: e.target.value } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
          </Box>
        );
      case 'section':
        return (
          <Box>
            <Typography variant="h6">Editar Sección</Typography>
            <TextField
              label="Título de la sección"
              value={component.content.title}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, title: e.target.value } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Texto de la sección"
              value={component.content.text}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, text: e.target.value } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
          </Box>
        );
      case 'container':
        return (
          <Box>
            <Typography variant="h6">Editar Contenedor</Typography>
            <TextField
              label="Título del contenedor"
              value={component.content.title}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, title: e.target.value } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Texto del contenedor"
              value={component.content.text}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, text: e.target.value } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
          </Box>
        );
      case 'grid':
        return (
          <Box>
            <Typography variant="h6">Editar Cuadrícula</Typography>
            <TextField
              label="Título de la cuadrícula"
              value={component.content.title}
              onChange={(e) => {
                const updatedComponent = { ...component, content: { ...component.content, title: e.target.value } };
                handleSaveComponent(updatedComponent);
              }}
              sx={{ mb: 2 }}
            />
            {component.content.items?.map((item, index) => (
              <Box key={index}>
                <TextField
                  label={`Título del item ${index + 1}`}
                  value={item.title}
                  onChange={(e) => {
                    const updatedComponent = { ...component, content: { ...component.content, items: component.content.items?.map((i, idx) => idx === index ? { ...i, title: e.target.value } : i) } };
                    handleSaveComponent(updatedComponent);
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label={`Texto del item ${index + 1}`}
                  value={item.text}
                  onChange={(e) => {
                    const updatedComponent = { ...component, content: { ...component.content, items: component.content.items?.map((i, idx) => idx === index ? { ...i, text: e.target.value } : i) } };
                    handleSaveComponent(updatedComponent);
                  }}
                  sx={{ mb: 2 }}
                />
              </Box>
            ))}
          </Box>
        );
      default:
        return <Typography variant="body1">No hay editor para este tipo de componente</Typography>;
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Cargando...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex', 
      height: 'calc(100vh - 64px)', 
      bgcolor: 'background.default',
      position: 'relative'
    }}>
      {/* Barra lateral de componentes */}
      <Box sx={{ 
        width: 250, 
        p: 2, 
        borderRight: 1, 
        borderColor: 'divider',
        bgcolor: 'background.paper',
        boxShadow: 1,
        zIndex: 1
      }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Componentes</Typography>
        <Grid container spacing={1}>
          {defaultComponents.map((comp) => (
            <Grid item xs={12} key={comp.type}>
              <Button
                variant="outlined"
                startIcon={<comp.icon size={18} />}
                fullWidth
                onClick={() => addComponent(comp.type)}
                sx={{ 
                  justifyContent: 'flex-start', 
                  mb: 1,
                  bgcolor: 'background.paper',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                {comp.label}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Área de construcción */}
      <Box sx={{ 
        flex: 1, 
        p: 2, 
        bgcolor: 'grey.100', 
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Barra de herramientas fija */}
        <Paper sx={{ 
          position: 'sticky', 
          top: 0, 
          zIndex: 2,
          p: 1,
          mb: 2,
          display: 'flex',
          gap: 1,
          bgcolor: 'background.paper',
          boxShadow: 2
        }}>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={savePage}
            disabled={saving}
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </Button>
          <Button
            variant="outlined"
            startIcon={<Eye />}
            onClick={previewPage}
          >
            Vista Previa
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<Globe />}
            onClick={() => setPublishDialogOpen(true)}
          >
            Publicar
          </Button>
        </Paper>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="components">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{ minHeight: '100%' }}
              >
                {components.map((component, index) => (
                  <Draggable key={component.id} draggableId={component.id} index={index}>
                    {(provided) => (
                      <Paper
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        sx={{ 
                          mb: 2, 
                          position: 'relative',
                          '&:hover .component-actions': {
                            opacity: 1
                          }
                        }}
                      >
                        {/* Barra de acciones del componente */}
                        <Box
                          className="component-actions"
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            p: 1,
                            display: 'flex',
                            gap: 1,
                            bgcolor: 'rgba(0,0,0,0.1)',
                            borderRadius: '4px',
                            opacity: 0,
                            transition: 'opacity 0.2s',
                            zIndex: 1
                          }}
                        >
                          <IconButton
                            size="small"
                            {...provided.dragHandleProps}
                            sx={{ cursor: 'grab' }}
                          >
                            <GridIcon size={18} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleEditComponent(component)}
                          >
                            <Type size={18} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => deleteComponent(component.id)}
                            color="error"
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </Box>

                        {/* Contenido del componente */}
                        <Box sx={{ p: 2 }}>
                          {/* Aquí iría el contenido del componente */}
                        </Box>
                      </Paper>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>

      {/* Drawer de edición */}
      <Drawer
        anchor="right"
        open={editDrawerOpen}
        onClose={() => setEditDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: '400px',
            p: 2,
            bgcolor: 'background.paper'
          }
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Editar Componente</Typography>
            <IconButton onClick={() => setEditDrawerOpen(false)}>
              <X size={18} />
            </IconButton>
          </Box>
          
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            {selectedComponent && renderComponentEditor(selectedComponent)}
          </Box>

          <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => setEditDrawerOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleSaveComponent(selectedComponent!);
                setEditDrawerOpen(false);
              }}
            >
              Guardar Cambios
            </Button>
          </Box>
        </Box>
      </Drawer>

      {/* Diálogo de Publicación */}
      <Dialog open={publishDialogOpen} onClose={() => setPublishDialogOpen(false)}>
        <DialogTitle>Publicar Landing Page</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Elige cómo quieres publicar tu landing page:
          </DialogContentText>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              1. Usar un subdominio gratuito
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Tu página estará disponible en: page-xxx.tudominio.com
            </Typography>
            <Button
              variant="outlined"
              onClick={() => handlePublish(false)}
              disabled={publishing}
              fullWidth
              sx={{ mb: 2 }}
            >
              Usar Subdominio Gratuito
            </Button>

            <Typography variant="subtitle1" gutterBottom>
              2. Usar un dominio personalizado
            </Typography>
            <TextField
              fullWidth
              label="Tu dominio personalizado"
              variant="outlined"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="ejemplo.com"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={() => handlePublish(true)}
              disabled={publishing || !customDomain}
              fullWidth
            >
              Usar Dominio Personalizado
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPublishDialogOpen(false)}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PageBuilder;
