import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/toast";
import { Editor } from '@/components/page-builder/Editor';
import { landingPageService } from '@/services/landingPageService';
import { useAuth } from '@/contexts/AuthContext';
import { Component, ComponentType } from '@/types/components';
import { v4 as uuidv4 } from 'uuid';
import { defaultComponents } from '@/components/page-builder/components/ComponentMap';
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddComponentDialog } from "@/components/page-builder/components/AddComponentDialog";
import { EditComponentDialog } from "@/components/page-builder/components/EditComponentDialog";
import { PublishDialog } from "@/components/page-builder/dialogs/PublishDialog";
import { ArrowLeft } from "lucide-react";

export default function PageBuilder() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null);
  const [components, setComponents] = useState<Component[]>([]);
  const [showAddComponentDialog, setShowAddComponentDialog] = useState(false);
  const [editingComponent, setEditingComponent] = useState<Component | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);

  useEffect(() => {
    loadLandingPage();
  }, [id]);

  const loadLandingPage = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const page = await landingPageService.getLandingPageById(id);
      if (page) {
        setLandingPage(page);
        // Asegurarse de que components sea un array
        setComponents(Array.isArray(page.components) ? page.components : []);
      } else {
        toast({
          title: "Error",
          description: "Landing page no encontrada",
          variant: "destructive"
        });
        navigate('/dashboard/landing-pages');
      }
    } catch (error) {
      console.error('Error loading landing page:', error);
      toast({
        title: "Error",
        description: "Error al cargar la landing page",
        variant: "destructive"
      });
      navigate('/dashboard/landing-pages');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (components: Component[]) => {
    if (!id || !landingPage) return;

    try {
      setIsSaving(true);
      await landingPageService.updateLandingPage(id, {
        components
      });
      setComponents(components);
      toast({
        title: "Cambios guardados",
        description: "Los cambios se han guardado correctamente"
      });
    } catch (error: any) {
      console.error('Error saving landing page:', error);
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateComponent = async (updatedComponent: Component) => {
    if (!landingPage) return;

    try {
      const newComponents = components.map(comp =>
        comp.id === updatedComponent.id ? updatedComponent : comp
      );

      await handleSave(newComponents);
    } catch (error: any) {
      console.error('Error updating component:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el componente",
        variant: "destructive"
      });
    }
  };

  const handleAddComponent = async (type: string) => {
    if (!landingPage) return;

    try {
      const newComponent: Component = {
        id: uuidv4(),
        type: type as ComponentType,
        content: defaultComponents[type as keyof typeof defaultComponents],
        styles: {
          colors: {
            background: '#ffffff',
            text: '#000000',
            accent: '#1ce480'
          },
          spacing: {
            padding: '2rem',
            margin: '0'
          },
          typography: {
            fontFamily: 'Inter',
            fontSize: '16px'
          }
        }
      };

      const updatedComponents = [...components, newComponent];
      setComponents(updatedComponents);
      await handleSave(updatedComponents);

      toast({
        title: "Componente añadido",
        description: "El componente se ha añadido correctamente",
      });
    } catch (error: any) {
      console.error('Error adding component:', error);
      toast({
        title: "Error",
        description: "No se pudo añadir el componente",
        variant: "destructive"
      });
    }
  };

  const handleDeleteComponent = async (id: string) => {
    if (!landingPage) return;

    try {
      const newComponents = components.filter(comp => comp.id !== id);
      await handleSave(newComponents);
      
      toast({
        title: "Componente eliminado",
        description: "El componente se ha eliminado correctamente",
      });
    } catch (error: any) {
      console.error('Error deleting component:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el componente",
        variant: "destructive"
      });
    }
  };

  const handleEditComponent = (component: Component) => {
    setEditingComponent(component);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (updatedComponent: Component) => {
    try {
      await handleUpdateComponent(updatedComponent);
      setIsEditDialogOpen(false);
      setEditingComponent(null);
      toast({
        title: "Éxito",
        description: "Cambios guardados correctamente",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios",
        variant: "destructive"
      });
    }
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingComponent(null);
  };

  const handlePublish = async () => {
    if (!id || !landingPage) {
      toast({
        title: "Error",
        description: "ID de página no válido",
        variant: "destructive"
      });
      return;
    }

    setShowPublishDialog(true);
  };

  const handlePublishSuccess = (url: string) => {
    setLandingPage(prev => prev ? {
      ...prev,
      status: 'published',
      publishedAt: new Date(),
      publishConfig: {
        ...prev.publishConfig,
        lastPublishedAt: new Date().toISOString(),
        url
      }
    } : null);

    toast({
      title: "Página publicada",
      description: `La página se ha publicado correctamente en ${url}`,
    });

    setShowPublishDialog(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="border-b p-4 flex justify-between items-center bg-white">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-semibold">Editor de Landing Page</h1>
        </div>
        <div className="flex items-center gap-2">
          {isSaving && <Spinner className="w-4 h-4" />}
          <Button variant="outline" onClick={() => setShowAddComponentDialog(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Añadir Sección
          </Button>
          <Button
            variant="default"
            onClick={handlePublish}
          >
            Publicar
          </Button>
        </div>
      </header>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Spinner className="w-8 h-8" />
        </div>
      ) : (
        <Editor
          components={components}
          onSave={handleSave}
          onAddComponent={handleAddComponent}
          onDeleteComponent={handleDeleteComponent}
          onEditComponent={handleEditComponent}
          onUpdateComponent={handleUpdateComponent}
          onPublish={() => setShowPublishDialog(true)}
          isPremiumUser={user?.isPremium}
          isSaving={isSaving}
          hasUnsavedChanges={components.length > 0}
        />
      )}

      {showAddComponentDialog && (
        <AddComponentDialog
          open={showAddComponentDialog}
          onOpenChange={setShowAddComponentDialog}
          onSelect={handleAddComponent}
        />
      )}

      {editingComponent && (
        <EditComponentDialog
          component={editingComponent}
          open={isEditDialogOpen}
          onOpenChange={handleCloseEditDialog}
          onSave={handleSaveEdit}
        />
      )}

      {showPublishDialog && id && (
        <PublishDialog
          landingPageId={id}
          open={showPublishDialog}
          onOpenChange={setShowPublishDialog}
          onSuccess={(url) => {
            toast({
              title: "Landing page publicada",
              description: "La landing page se ha publicado correctamente",
            });
            window.open(url, '_blank');
          }}
        />
      )}
    </div>
  );
}
