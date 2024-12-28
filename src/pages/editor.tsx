import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Fab, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Add as AddIcon, ArrowBack, Save, Preview, Publish } from '@mui/icons-material';
import { EditorLayout } from '../components/editor/EditorLayout';
import { ComponentPicker } from '../components/editor/ComponentPicker';
import { EditorThemeProvider } from '../themes/ThemeProvider';
import { useEditor } from '../hooks/useEditor';
import { templates } from '../templates';
import { Template } from '../types/template';
import { templateService } from '../services/templateService';
import { toast } from 'sonner';

export const EditorPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [template, setTemplate] = useState<Template | null>(null);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const {
    landing,
    loading,
    saving,
    error,
    updateComponent,
    addComponent,
    saveLanding,
    publishLanding
  } = useEditor(id || '');

  // Cargar el template cuando se carga la landing page
  useEffect(() => {
    const loadTemplate = async () => {
      if (landing?.templateId) {
        try {
          const loadedTemplate = await templateService.getTemplateById(landing.templateId);
          setTemplate(loadedTemplate);
        } catch (error) {
          console.error('Error al cargar el template:', error);
          setTemplate(templates[0]);
          toast.error('Error al cargar el template. Usando template por defecto.');
        }
      } else {
        setTemplate(templates[0]);
      }
    };

    if (landing) {
      loadTemplate();
    }
  }, [landing]);

  // Guardar automáticamente cada 30 segundos si hay cambios
  useEffect(() => {
    let autoSaveInterval: NodeJS.Timeout;

    if (hasUnsavedChanges && !saving) {
      autoSaveInterval = setInterval(() => {
        handleSave();
      }, 30000);
    }

    return () => {
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
      }
    };
  }, [hasUnsavedChanges, saving]);

  // Preguntar antes de salir si hay cambios sin guardar
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  if (loading || !template) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !landing) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <h2>Error</h2>
        <p>{error || 'No se pudo cargar la página'}</p>
        <Button 
          variant="contained" 
          startIcon={<ArrowBack />}
          onClick={() => navigate('/dashboard/landing-pages')}
        >
          Volver al Dashboard
        </Button>
      </Box>
    );
  }

  const handleSave = async () => {
    try {
      await saveLanding();
      setHasUnsavedChanges(false);
      toast.success('Cambios guardados correctamente');
    } catch (error) {
      toast.error('Error al guardar los cambios');
    }
  };

  const handlePublish = async () => {
    try {
      await publishLanding();
      toast.success('Página publicada correctamente');
      setShowPublishDialog(false);
    } catch (error) {
      toast.error('Error al publicar la página');
    }
  };

  const handleComponentUpdate = (componentId: string, content: any) => {
    updateComponent(componentId, content);
    setHasUnsavedChanges(true);
  };

  const handleComponentAdd = (type: string) => {
    addComponent(type);
    setHasUnsavedChanges(true);
    setPickerOpen(false);
  };

  return (
    <EditorThemeProvider templateStyle={template.style}>
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        {/* Barra de herramientas */}
        <Box sx={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          zIndex: 1000, 
          backgroundColor: 'background.paper',
          boxShadow: 1,
          p: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => {
              if (hasUnsavedChanges) {
                if (window.confirm('Hay cambios sin guardar. ¿Deseas salir de todas formas?')) {
                  navigate('/dashboard/landing-pages');
                }
              } else {
                navigate('/dashboard/landing-pages');
              }
            }}
          >
            Volver
          </Button>

          <Button
            startIcon={isEditing ? <Preview /> : <Edit />}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Vista Previa' : 'Editar'}
          </Button>

          <Button
            startIcon={<Save />}
            onClick={handleSave}
            disabled={saving || !hasUnsavedChanges}
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </Button>

          <Button
            color="success"
            startIcon={<Publish />}
            onClick={() => setShowPublishDialog(true)}
            disabled={saving || hasUnsavedChanges}
          >
            Publicar
          </Button>
        </Box>

        {/* Contenido del editor */}
        <Box sx={{ pt: 7 }}>
          <EditorLayout
            components={landing.components}
            onComponentEdit={handleComponentUpdate}
            isEditing={isEditing}
            template={template}
          />
        </Box>

        {/* Botón flotante para agregar componentes */}
        {isEditing && (
          <Fab
            color="primary"
            sx={{ position: 'fixed', bottom: 16, right: 16 }}
            onClick={() => setPickerOpen(true)}
          >
            <AddIcon />
          </Fab>
        )}

        {/* Modal del selector de componentes */}
        <ComponentPicker
          open={pickerOpen}
          onClose={() => setPickerOpen(false)}
          onSelect={handleComponentAdd}
          template={template}
        />

        {/* Diálogo de confirmación de publicación */}
        <Dialog open={showPublishDialog} onClose={() => setShowPublishDialog(false)}>
          <DialogTitle>Publicar Landing Page</DialogTitle>
          <DialogContent>
            <p>¿Estás seguro de que deseas publicar esta página?</p>
            <p>Una vez publicada, será visible para todos los usuarios.</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowPublishDialog(false)}>Cancelar</Button>
            <Button onClick={handlePublish} color="success" variant="contained">
              Publicar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </EditorThemeProvider>
  );
};
