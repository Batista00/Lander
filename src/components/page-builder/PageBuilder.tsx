import { useState, useEffect, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Component, LandingPage, ComponentType } from '@/types/landing';
import { Editor } from './Editor';
import { AddComponentDialog } from './dialogs/AddComponentDialog';
import { EditComponentDialog } from './dialogs/EditComponentDialog';
import { defaultComponents } from './components/ComponentMap';
import { landingPageService } from '@/services/landingPageService';
import { toast } from '@/components/ui/toast';
import { PublishDialog } from './dialogs/PublishDialog';

interface PageBuilderProps {
  pageId: string;
  initialComponents?: Component[];
  onSave?: (components: Component[]) => void;
  isPremiumUser?: boolean;
}

export function PageBuilder({
  pageId,
  initialComponents = [],
  onSave,
  isPremiumUser = false
}: PageBuilderProps) {
  const [landingPage, setLandingPage] = useState<LandingPage>({
    id: pageId,
    components: initialComponents,
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'draft'
  });
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [componentToEdit, setComponentToEdit] = useState<Component | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Referencia para el temporizador de autosave
  const autoSaveTimerRef = useRef<NodeJS.Timeout>();
  
  // Estados para el manejo de autoguardado
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [saveRetryCount, setSaveRetryCount] = useState(0);
  const MAX_RETRY_ATTEMPTS = 3;
  const RETRY_DELAY = 5000;
  
  // Estados para el historial
  const [history, setHistory] = useState<Component[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const MAX_HISTORY_SIZE = 50;

  // Cargar la landing page desde Firebase
  useEffect(() => {
    const loadLandingPage = async () => {
      try {
        const page = await landingPageService.getLandingPageById(pageId);
        if (page) {
          setLandingPage(page);
          // También guardamos en localStorage para la vista previa
          localStorage.setItem(`preview_${pageId}`, JSON.stringify({
            components: page.components,
            lastUpdated: new Date().toISOString()
          }));
        }
      } catch (error) {
        console.error('Error loading landing page:', error);
        toast.error('Error al cargar la página');
      }
    };
    
    loadLandingPage();
  }, [pageId]);

  // Función de guardado con debounce
  const debouncedSave = useCallback(async (components: Component[]) => {
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    setHasUnsavedChanges(true);
    
    autoSaveTimerRef.current = setTimeout(async () => {
      try {
        setIsSaving(true);
        await landingPageService.updateLandingPage(pageId, {
          components,
          updatedAt: new Date()
        });
        setHasUnsavedChanges(false);
        toast.success('Cambios guardados');
      } catch (error) {
        console.error('Error saving:', error);
        toast.error('Error al guardar los cambios');
      } finally {
        setIsSaving(false);
      }
    }, 2000);
  }, [pageId]);

  const handleSave = useCallback(async (components: Component[]) => {
    const updatedLandingPage = {
      ...landingPage,
      components,
      updatedAt: new Date()
    };
    setLandingPage(updatedLandingPage);

    // Guardar en localStorage para vista previa
    localStorage.setItem(`preview_${pageId}`, JSON.stringify({
      components,
      lastUpdated: new Date().toISOString()
    }));

    // Llamar al callback onSave si existe
    onSave?.(components);

    // Iniciar el autosave
    debouncedSave(components);
  }, [landingPage, pageId, onSave, debouncedSave]);

  // Función para agregar al historial
  const addToHistory = useCallback((components: Component[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push([...components]);
      
      // Mantener el tamaño máximo del historial
      if (newHistory.length > MAX_HISTORY_SIZE) {
        newHistory.shift();
      }
      
      return newHistory;
    });
    setHistoryIndex(prev => Math.min(prev + 1, MAX_HISTORY_SIZE - 1));
  }, [historyIndex]);

  const handleAddComponent = useCallback(async (type: ComponentType) => {
    try {
      console.log('Añadiendo componente de tipo:', type);
      const defaultContent = defaultComponents[type];
      if (!defaultContent) {
        throw new Error(`No se encontró la configuración por defecto para el componente tipo ${type}`);
      }

      const newComponent: Component = {
        id: uuidv4(),
        type,
        content: defaultContent.content,
        styles: {} // Inicializamos con estilos vacíos
      };

      console.log('Nuevo componente creado:', newComponent);

      // Primero actualizamos el estado local para una respuesta inmediata
      const updatedComponents = [...landingPage.components, newComponent];
      setLandingPage(prev => ({
        ...prev,
        components: updatedComponents
      }));

      // Agregar al historial
      addToHistory(updatedComponents);

      // Luego intentamos guardar en Firebase
      try {
        await landingPageService.updateLandingPage(pageId, {
          components: updatedComponents,
          updatedAt: new Date()
        });
        
        console.log('Componente guardado en Firebase');
        toast.success('Componente añadido correctamente');
      } catch (error) {
        // Si falla el guardado en Firebase, revertimos el estado local
        console.error('Error al guardar en Firebase:', error);
        setLandingPage(prev => ({
          ...prev,
          components: landingPage.components // Revertimos al estado anterior
        }));
        throw error;
      }

      setShowAddDialog(false);
    } catch (error) {
      console.error('Error al añadir el componente:', error);
      toast.error('Error al añadir el componente. Por favor, inténtalo de nuevo.');
    }
  }, [landingPage, pageId]);

  // Efecto para depurar cambios en los componentes
  useEffect(() => {
    console.log('Componentes actualizados:', landingPage.components);
  }, [landingPage.components]);

  const handleDeleteComponent = useCallback(async (componentId: string) => {
    try {
      const updatedComponents = landingPage.components.filter(
        (component) => component.id !== componentId
      );
      
      // Primero intentamos guardar en Firebase
      await landingPageService.updateLandingPage(pageId, {
        components: updatedComponents,
        updatedAt: new Date()
      });
      
      // Si el guardado fue exitoso, actualizamos el estado local
      setLandingPage(prev => ({
        ...prev,
        components: updatedComponents
      }));

      // Agregar al historial
      addToHistory(updatedComponents);

      toast({
        title: "Componente eliminado",
        description: "El componente se ha eliminado correctamente"
      });
    } catch (error) {
      console.error('Error al eliminar el componente:', error);
      toast.error('Error al eliminar el componente. Por favor, inténtalo de nuevo.');
    }
  }, [landingPage.components, pageId]);

  const handleUpdateComponent = useCallback(async (updatedComponent: Component) => {
    try {
      const updatedComponents = landingPage.components.map((component) =>
        component.id === updatedComponent.id ? updatedComponent : component
      );

      // Primero actualizamos el estado local para una respuesta inmediata
      setLandingPage(prev => ({
        ...prev,
        components: updatedComponents
      }));

      // Agregar al historial
      addToHistory(updatedComponents);

      // Luego guardamos en Firebase
      await landingPageService.updateLandingPage(pageId, {
        components: updatedComponents,
        updatedAt: new Date()
      });

      setComponentToEdit(null);
      setShowEditDialog(false);
      toast.success('Cambios guardados correctamente');
    } catch (error) {
      // Si hay un error, revertimos los cambios locales
      setLandingPage(prev => ({
        ...prev,
        components: prev.components.map((component) =>
          component.id === updatedComponent.id ? 
            landingPage.components.find(c => c.id === updatedComponent.id)! : 
            component
        )
      }));
      
      console.error('Error al actualizar el componente:', error);
      toast.error('Error al guardar los cambios. Por favor, inténtalo de nuevo.');
    }
  }, [landingPage, pageId]);

  const handleEditComponent = (component: Component) => {
    setComponentToEdit(component);
    setShowEditDialog(true);
  };

  const handlePreview = () => {
    // Asegurarnos de que los cambios estén guardados en localStorage
    localStorage.setItem(`preview_${pageId}`, JSON.stringify({
      components: landingPage.components,
      lastUpdated: new Date().toISOString()
    }));
    
    // Obtener la URL base del entorno
    const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
    // Construir la URL completa de vista previa
    const previewUrl = `${baseUrl}/landing/preview/${pageId}`;
    window.open(previewUrl, '_blank');
  };

  const handlePublish = async (publishConfig: any) => {
    try {
      await landingPageService.publishLandingPage(pageId, publishConfig);
      toast.success('Página publicada exitosamente');
      setShowPublishDialog(false);
    } catch (error) {
      console.error('Error publishing:', error);
      toast.error('Error al publicar la página');
    }
  };

  // Funciones de undo/redo
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleUndo = useCallback(() => {
    if (!canUndo) return;
    
    const newIndex = historyIndex - 1;
    const previousState = history[newIndex];
    
    setHistoryIndex(newIndex);
    setLandingPage(prev => ({
      ...prev,
      components: [...previousState]
    }));
    setHasUnsavedChanges(true);
  }, [canUndo, history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (!canRedo) return;
    
    const newIndex = historyIndex + 1;
    const nextState = history[newIndex];
    
    setHistoryIndex(newIndex);
    setLandingPage(prev => ({
      ...prev,
      components: [...nextState]
    }));
    setHasUnsavedChanges(true);
  }, [canRedo, history, historyIndex]);

  // Agregar atajos de teclado para undo/redo
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && !e.shiftKey) {
          e.preventDefault();
          handleUndo();
        } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
          e.preventDefault();
          handleRedo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleUndo, handleRedo]);

  // Mejorar la función de autoguardado
  const handleAutoSave = useCallback(async () => {
    if (!autoSaveEnabled || !hasUnsavedChanges) return;

    try {
      setIsSaving(true);
      await landingPageService.updateLandingPage(pageId, {
        components: landingPage.components,
        updatedAt: new Date()
      });
      setLastSavedAt(new Date());
      setHasUnsavedChanges(false);
      setSaveRetryCount(0);
      
      // Guardar en localStorage para backup
      localStorage.setItem(`backup_${pageId}`, JSON.stringify({
        components: landingPage.components,
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error en autoguardado:', error);
      
      // Intentar guardar nuevamente si no excedimos el límite de intentos
      if (saveRetryCount < MAX_RETRY_ATTEMPTS) {
        setSaveRetryCount(prev => prev + 1);
        setTimeout(handleAutoSave, RETRY_DELAY);
      } else {
        toast({
          title: "Error al guardar",
          description: "No se pudieron guardar los cambios. Por favor, guarda manualmente.",
          variant: "destructive"
        });
        setAutoSaveEnabled(false);
      }
    } finally {
      setIsSaving(false);
    }
  }, [pageId, landingPage.components, hasUnsavedChanges, saveRetryCount, autoSaveEnabled]);

  // Actualizar el useEffect de autoguardado
  useEffect(() => {
    if (hasUnsavedChanges && autoSaveEnabled) {
      const timer = setTimeout(handleAutoSave, 30000);
      return () => clearTimeout(timer);
    }
  }, [hasUnsavedChanges, handleAutoSave, autoSaveEnabled]);

  // Agregar efecto para recuperar backup si es necesario
  useEffect(() => {
    const checkForBackup = async () => {
      const backup = localStorage.getItem(`backup_${pageId}`);
      if (backup) {
        const { components, timestamp } = JSON.parse(backup);
        const backupDate = new Date(timestamp);
        
        // Si el backup es más reciente que la última actualización
        if (backupDate > landingPage.updatedAt) {
          const shouldRestore = window.confirm(
            'Se encontró una versión más reciente de tu trabajo. ¿Deseas restaurarla?'
          );
          
          if (shouldRestore) {
            setLandingPage(prev => ({
              ...prev,
              components,
              updatedAt: backupDate
            }));
          }
        }
        
        // Limpiar backup después de 24 horas
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        if (backupDate < oneDayAgo) {
          localStorage.removeItem(`backup_${pageId}`);
        }
      }
    };
    
    checkForBackup();
  }, [pageId]);

  // Efecto para sincronizar cambios con localStorage
  useEffect(() => {
    const syncToLocalStorage = () => {
      localStorage.setItem(`preview_${pageId}`, JSON.stringify({
        components: landingPage.components,
        lastUpdated: new Date().toISOString()
      }));
    };

    // Sincronizar inmediatamente
    syncToLocalStorage();

    // También sincronizar antes de que la página se cierre
    window.addEventListener('beforeunload', syncToLocalStorage);
    return () => {
      window.removeEventListener('beforeunload', syncToLocalStorage);
    };
  }, [landingPage.components, pageId]);

  // Efecto para manejar la reconexión
  useEffect(() => {
    const handleOnline = async () => {
      try {
        // Cuando volvemos a estar online, sincronizamos con Firebase
        await landingPageService.updateLandingPage(pageId, {
          components: landingPage.components,
          updatedAt: new Date()
        });
        toast.success('Cambios sincronizados con el servidor');
      } catch (error) {
        console.error('Error al sincronizar con el servidor:', error);
        toast.error('Error al sincronizar los cambios');
      }
    };

    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, [landingPage.components, pageId]);

  // Prevenir cerrar la ventana con cambios sin guardar
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

  return (
    <div className="h-full flex">
      {/* Editor principal */}
      <div className="flex-1">
        <Editor
          landingPage={landingPage}
          onSave={handleSave}
          onAddComponent={() => setShowAddDialog(true)}
          onDeleteComponent={handleDeleteComponent}
          onUpdateComponent={handleUpdateComponent}
          onEditComponent={handleEditComponent}
          onPreview={handlePreview}
          onPublish={() => setShowPublishDialog(true)}
          isPremiumUser={isPremiumUser}
          isSaving={isSaving}
          hasUnsavedChanges={hasUnsavedChanges}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={handleUndo}
          onRedo={handleRedo}
        />
      </div>

      {/* Diálogos */}
      <AddComponentDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSelect={handleAddComponent}
      />

      {componentToEdit && (
        <EditComponentDialog
          component={componentToEdit}
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          onSave={(updatedComponent) => {
            handleUpdateComponent(updatedComponent);
            setShowEditDialog(false);
          }}
        />
      )}

      <PublishDialog
        open={showPublishDialog}
        onOpenChange={setShowPublishDialog}
        onPublish={handlePublish}
        landingPage={landingPage}
      />
    </div>
  );
}
