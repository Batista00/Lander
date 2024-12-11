import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { ComponentRenderer } from './ComponentRenderer';
import { AddComponentDialog } from './dialogs/AddComponentDialog';
import { EditComponentDialog } from './dialogs/EditComponentDialog';
import { PublishDialog } from './dialogs/PublishDialog';
import { Button } from '@/components/ui/Button';
import { Plus, Eye, Save, Globe, ArrowLeft, Loader2, Check, History, Pencil, Trash2, Copy, Undo, Redo, ExternalLink, GripVertical } from 'lucide-react';
import { landingPageService } from '@/services/landingPageService';
import { toast } from 'react-hot-toast';
import { Input } from '@/components/ui/input';
import { Layout } from 'lucide-react';
import { Edit } from 'lucide-react';
import cn from 'classnames';
import { Tooltip } from '@/components/ui/Tooltip';

export function getDefaultContentForType(type: string) {
  switch (type) {
    case 'topbar':
      return {
        email: 'contacto@empresa.com',
        phone: '+1 234 567 890',
        showEmail: true,
        showPhone: true,
        showSocial: true,
        social: {
          facebook: 'https://facebook.com',
          twitter: 'https://twitter.com',
          instagram: 'https://instagram.com'
        },
        style: {
          backgroundColor: 'bg-blue-600',
          textColor: 'text-white'
        }
      };
    case 'header':
      return {
        logo: {
          url: '/logo.png',
          alt: 'Logo',
          width: 150,
          height: 40
        },
        navigation: [
          { label: 'Inicio', href: '#' },
          { label: 'Servicios', href: '#services' },
          { label: 'Precios', href: '#pricing' },
          { label: 'Contacto', href: '#contact' }
        ],
        social: {
          facebook: 'https://facebook.com',
          twitter: 'https://twitter.com',
          instagram: 'https://instagram.com'
        },
        showSocial: true,
        sticky: true,
        style: {
          backgroundColor: 'bg-white',
          textColor: 'text-gray-900',
          shadow: true
        }
      };
    case 'hero':
      return {
        title: 'Título Principal',
        subtitle: 'Subtítulo atractivo',
        description: 'Una descripción convincente de tu producto o servicio.',
        cta: {
          text: 'Comenzar Ahora',
          url: '#',
          enabled: true
        },
        image: {
          url: '/placeholder-hero.jpg',
          alt: 'Hero Image',
          enabled: true
        },
        style: {
          alignment: 'center',
          backgroundColor: '#ffffff',
          textColor: '#000000'
        }
      };
    case 'services':
      return {
        title: 'Nuestros Servicios',
        subtitle: 'Lo que ofrecemos',
        services: [
          {
            title: 'Servicio 1',
            description: 'Descripción detallada del servicio 1',
            icon: '💼',
            features: ['Característica 1', 'Característica 2', 'Característica 3']
          },
          {
            title: 'Servicio 2',
            description: 'Descripción detallada del servicio 2',
            icon: '🎯',
            features: ['Característica 1', 'Característica 2', 'Característica 3']
          },
          {
            title: 'Servicio 3',
            description: 'Descripción detallada del servicio 3',
            icon: '🚀',
            features: ['Característica 1', 'Característica 2', 'Característica 3']
          }
        ],
        style: {
          backgroundColor: 'bg-gray-50',
          textColor: 'text-gray-900'
        }
      };
    case 'pricing':
      return {
        title: 'Precios',
        subtitle: 'Planes que se adaptan a tus necesidades',
        plans: [
          {
            name: 'Básico',
            price: '9.99',
            period: 'mes',
            description: 'Perfecto para empezar',
            features: [
              'Característica básica 1',
              'Característica básica 2',
              'Característica básica 3'
            ],
            buttonText: 'Empezar ahora',
            popular: false
          },
          {
            name: 'Pro',
            price: '19.99',
            period: 'mes',
            description: 'Para profesionales',
            features: [
              'Todo lo del plan Básico',
              'Característica pro 1',
              'Característica pro 2',
              'Característica pro 3'
            ],
            buttonText: 'Empezar ahora',
            popular: true
          },
          {
            name: 'Enterprise',
            price: '49.99',
            period: 'mes',
            description: 'Para grandes empresas',
            features: [
              'Todo lo del plan Pro',
              'Característica enterprise 1',
              'Característica enterprise 2',
              'Característica enterprise 3'
            ],
            buttonText: 'Contactar ventas',
            popular: false
          }
        ],
        style: {
          backgroundColor: 'bg-white',
          textColor: 'text-gray-900'
        }
      };
    case 'contact':
      return {
        title: 'Contacto',
        subtitle: 'Estamos aquí para ayudarte',
        email: 'contacto@empresa.com',
        phone: '+1 234 567 890',
        address: '123 Calle Principal, Ciudad, País',
        formFields: [
          { type: 'text', name: 'name', label: 'Nombre', required: true },
          { type: 'email', name: 'email', label: 'Email', required: true },
          { type: 'text', name: 'subject', label: 'Asunto', required: true },
          { type: 'textarea', name: 'message', label: 'Mensaje', required: true }
        ],
        buttonText: 'Enviar mensaje',
        showMap: true,
        mapLocation: {
          lat: -34.603722,
          lng: -58.381592,
          zoom: 15
        },
        style: {
          backgroundColor: 'bg-gray-50',
          textColor: 'text-gray-900'
        }
      };
    case 'about':
      return {
        title: 'Sobre Nosotros',
        description: 'Conoce más sobre nuestra empresa y lo que hacemos',
        imagePosition: 'right',
        statistics: [
          { value: '100+', label: 'Clientes' },
          { value: '50+', label: 'Proyectos' }
        ]
      };
    case 'gallery':
      return {
        title: 'Galería',
        subtitle: 'Nuestros trabajos',
        images: [],
        layout: 'grid',
        columns: 3,
        gap: '4',
        aspectRatio: '1:1'
      };
    case 'cta':
      return {
        title: '¿Listo para empezar?',
        description: 'Únete a nosotros y lleva tu negocio al siguiente nivel',
        buttonText: 'Comenzar Ahora',
        buttonStyle: 'primary',
        style: 'simple'
      };
    case 'features':
      return {
        title: 'Características',
        subtitle: 'Todo lo que necesitas',
        items: [
          {
            title: 'Característica 1',
            description: 'Descripción de la característica 1',
            icon: '⚡'
          },
          {
            title: 'Característica 2',
            description: 'Descripción de la característica 2',
            icon: '🚀'
          },
          {
            title: 'Característica 3',
            description: 'Descripción de la característica 3',
            icon: '💡'
          }
        ],
        columns: 3,
        style: {
          backgroundColor: 'bg-white',
          textColor: 'text-gray-900'
        }
      };
    default:
      return {};
  }
};

export const PageBuilder: React.FC = () => {
  const navigate = useNavigate();
  const { pageId } = useParams<{ pageId: string }>();
  const [components, setComponents] = React.useState<any[]>([]);
  const [selectedComponent, setSelectedComponent] = React.useState<any>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [isPublishDialogOpen, setIsPublishDialogOpen] = React.useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = React.useState(false);
  const [pageTitle, setPageTitle] = React.useState('');
  const [isSaving, setIsSaving] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [previewMode, setPreviewMode] = React.useState(false);
  const [splitView, setSplitView] = React.useState(false);
  const [clipboardComponent, setClipboardComponent] = React.useState<any>(null);
  const [history, setHistory] = React.useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState(-1);

  // Cargar la landing page
  React.useEffect(() => {
    const loadLandingPage = async () => {
      if (!pageId) {
        toast.error('ID de página no válido');
        navigate('/dashboard/landing-pages');
        return;
      }

      try {
        console.log('Cargando landing page:', pageId);
        const page = await landingPageService.getLandingPageById(pageId);
        console.log('Landing page cargada:', page);
        
        if (page) {
          setComponents(page.components || []);
          setPageTitle(page.name || '');
        } else {
          toast.error('La página no existe');
          navigate('/dashboard/landing-pages');
        }
      } catch (error) {
        console.error('Error al cargar la landing page:', error);
        toast.error('Error al cargar la landing page');
        navigate('/dashboard/landing-pages');
      } finally {
        setLoading(false);
      }
    };

    loadLandingPage();
  }, [pageId, navigate]);

  // Guardar cambios
  const handleSave = async () => {
    if (!pageId) return;

    setIsSaving(true);
    try {
      await landingPageService.updateLandingPage(pageId, {
        components,
        name: pageTitle,
        updatedAt: new Date(),
      });
      toast.success('Cambios guardados correctamente');
    } catch (error) {
      console.error('Error al guardar:', error);
      toast.error('Error al guardar los cambios');
    } finally {
      setIsSaving(false);
    }
  };

  // Guardado automático
  React.useEffect(() => {
    const autoSave = async () => {
      if (!pageId || components.length === 0) return;
      await handleSave();
    };

    const timeoutId = setTimeout(autoSave, 2000);
    return () => clearTimeout(timeoutId);
  }, [components, pageTitle]);

  // Añadir componente
  const handleAddComponent = async (type: string) => {
    if (!pageId) return;

    const newComponent = {
      id: crypto.randomUUID(),
      type,
      data: getDefaultContentForType(type),
      order: components.length,
      visible: true
    };

    const newComponents = [...components, newComponent];
    setComponents(newComponents);
    addToHistory(newComponents);
    setIsAddDialogOpen(false);

    try {
      await landingPageService.updateLandingPage(pageId, {
        components: newComponents,
        name: pageTitle,
        updatedAt: new Date()
      });
      toast.success('Componente agregado correctamente');
    } catch (error) {
      console.error('Error al agregar el componente:', error);
      toast.error('Error al agregar el componente');
    }
  };

  // Editar componente
  const handleEditComponent = async (updatedComponent: any) => {
    if (!pageId) return;

    try {
      const newComponent = {
        ...selectedComponent,
        ...updatedComponent,
        id: selectedComponent?.id,
        type: selectedComponent?.type,
        data: {
          ...selectedComponent?.data,
          ...updatedComponent.data
        }
      };

      // Actualizar el estado local inmediatamente
      const newComponents = components.map(comp =>
        comp.id === newComponent.id ? newComponent : comp
      );
      
      setComponents(newComponents);
      addToHistory(newComponents);

      // Actualizar preview en localStorage
      localStorage.setItem(`preview_${pageId}`, JSON.stringify({
        components: newComponents,
        lastUpdated: new Date().toISOString()
      }));

      // Guardar en el servidor en segundo plano
      landingPageService.updateLandingPage(pageId, {
        components: newComponents,
        name: pageTitle,
        updatedAt: new Date(),
      }).then(() => {
        toast.success('Componente actualizado');
      }).catch((error) => {
        console.error('Error al actualizar el componente:', error);
        toast.error('Error al actualizar el componente');
      });

    } catch (error) {
      console.error('Error al actualizar el componente:', error);
      toast.error('Error al actualizar el componente');
    }
  };

  // Copiar componente
  const handleCopyComponent = (componentId: string) => {
    const component = components.find(c => c.id === componentId);
    if (component) {
      const componentCopy = { ...component, id: crypto.randomUUID() };
      setClipboardComponent(componentCopy);
      toast.success('Componente copiado');
    }
  };

  // Pegar componente
  const handlePasteComponent = () => {
    if (clipboardComponent) {
      const newComponents = [...components, clipboardComponent];
      setComponents(newComponents);
      addToHistory(newComponents);
      toast.success('Componente pegado');
    }
  };

  const handleDragEnd = React.useCallback(async (result: DropResult) => {
    if (!result.destination || !pageId) return;

    const items = Array.from(components);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Actualizar el orden de los componentes
    const updatedComponents = items.map((item, index) => ({
      ...item,
      order: index
    }));

    setComponents(updatedComponents);
    addToHistory(updatedComponents);
    await handleSave();
  }, [components, pageId, handleSave]);

  const handlePreview = () => {
    // Guardar los datos de la landing page en localStorage
    const previewData = {
      components,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(`preview_${pageId}`, JSON.stringify(previewData));
    
    // Abrir la vista previa en una nueva pestaña
    window.open(`/preview/${pageId}`, '_blank');
  };

  const handleComponentUpdate = async (componentId: string, field: string, value: any) => {
    if (!pageId) return;

    try {
      console.log('Actualizando componente:', {
        componentId,
        field,
        value
      });

      const component = components.find(c => c.id === componentId);
      if (!component) {
        throw new Error('Componente no encontrado');
      }

      const updatedComponent = {
        ...component,
        data: {
          ...component.data,
          [field]: value
        }
      };

      const newComponents = components.map(c =>
        c.id === componentId ? updatedComponent : c
      );

      setComponents(newComponents);
      addToHistory(newComponents);

      await landingPageService.updateLandingPage(pageId, {
        components: newComponents,
        updatedAt: new Date()
      });

      toast.success('Componente actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el componente:', error);
      toast.error('Error al actualizar el componente');
    }
  };

  const handleComponentVisibility = async (componentId: string, visible: boolean) => {
    if (!pageId) return;

    try {
      const newComponents = components.map(c =>
        c.id === componentId ? { ...c, visible } : c
      );

      setComponents(newComponents);
      addToHistory(newComponents);

      await landingPageService.updateLandingPage(pageId, {
        components: newComponents,
        updatedAt: new Date()
      });

      toast.success(`Componente ${visible ? 'mostrado' : 'ocultado'} correctamente`);
    } catch (error) {
      console.error('Error al cambiar visibilidad del componente:', error);
      toast.error('Error al cambiar visibilidad del componente');
    }
  };

  const handleComponentDelete = async (componentId: string) => {
    if (!pageId) return;

    try {
      const newComponents = components.filter(c => c.id !== componentId);
      setComponents(newComponents);
      addToHistory(newComponents);

      await landingPageService.updateLandingPage(pageId, {
        components: newComponents,
        updatedAt: new Date()
      });

      toast.success('Componente eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el componente:', error);
      toast.error('Error al eliminar el componente');
    }
  };

  const addToHistory = (newComponents: any[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push([...newComponents]);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setComponents([...history[historyIndex - 1]]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setComponents([...history[historyIndex + 1]]);
    }
  };

  const renderComponent = (component: any, index: number) => {
    return (
      <Draggable key={component.id} draggableId={component.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="relative group bg-white rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 transition-colors"
          >
            {/* Barra de control del componente */}
            <div className="absolute inset-x-0 top-0 h-8 bg-gray-50 rounded-t-lg border-b border-gray-200 flex items-center justify-between px-3">
              <div className="flex items-center gap-2">
                <div {...provided.dragHandleProps} className="cursor-move text-gray-400 hover:text-gray-600">
                  <GripVertical className="w-4 h-4" />
                </div>
                <span className="text-sm text-gray-600 font-medium capitalize">
                  {component.type}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => handleCopyComponent(component.id)}
                  className="h-6 w-6 p-0 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Copy className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => setSelectedComponent(component)}
                  className="h-6 w-6 p-0 hover:bg-blue-50 hover:text-blue-600"
                >
                  <Pencil className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => handleComponentDelete(component.id)}
                  className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Contenido del componente con padding extra arriba para la barra de control */}
            <div className="pt-8 p-4">
              <ComponentRenderer
                component={component}
                isEditing={true}
                onEdit={() => setSelectedComponent(component)}
                onDelete={() => handleComponentDelete(component.id)}
              />
            </div>
          </div>
        )}
      </Draggable>
    );
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  const toggleSplitView = () => {
    setSplitView(!splitView);
  };

  return (
    <div className={cn("h-screen flex flex-col bg-gray-50")}>
      <div className="flex items-center justify-between p-2 border-b bg-[#1e293b] text-white">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/dashboard/landing-pages')}
            className="flex items-center gap-1 text-white hover:bg-[#334155]"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
          <div className="h-4 w-px bg-gray-600" />
          <Input
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            placeholder="Título de la página"
            className="w-48 h-8 text-sm bg-[#334155] border-[#475569] text-white placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 border border-[#475569] rounded-md bg-[#1e293b] p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAddDialogOpen(true)}
              className="h-7 px-2 text-white hover:bg-[#334155]"
            >
              <Plus className="w-3 h-3 mr-1" />
              Añadir
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePasteComponent}
              disabled={!clipboardComponent}
              className="h-7 px-2 text-white hover:bg-[#334155] disabled:text-gray-500"
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>

          <div className="flex items-center gap-1 border border-[#475569] rounded-md bg-[#1e293b] p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePreview}
              className={cn("h-7 px-2 text-white", {
                "bg-[#334155]": previewMode
              })}
            >
              <Eye className="w-3 h-3 mr-1" />
              Vista
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSplitView}
              className={cn("h-7 px-2 text-white", {
                "bg-[#334155]": splitView
              })}
            >
              <Layout className="w-3 h-3 mr-1" />
              Split
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(`/p/${pageId}`, '_blank')}
              className="h-7 px-2 text-white hover:bg-[#334155]"
            >
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>

          <div className="flex items-center gap-1 border border-[#475569] rounded-md bg-[#1e293b] p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="h-7 px-2 text-white hover:bg-[#334155] disabled:text-gray-500"
            >
              <Undo className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="h-7 px-2 text-white hover:bg-[#334155] disabled:text-gray-500"
            >
              <Redo className="w-3 h-3" />
            </Button>
          </div>

          <div className="h-4 w-px bg-gray-600" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsHistoryOpen(true)}
            className="h-7 text-white hover:bg-[#334155]"
          >
            <History className="w-3 h-3" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="h-7 text-white hover:bg-[#334155]"
          >
            {isSaving ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Save className="w-3 h-3" />
            )}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsPublishDialogOpen(true)}
            className="h-7 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Globe className="w-3 h-3 mr-1" />
            Publicar
          </Button>
        </div>
      </div>

      <div className={cn("flex-1 flex", {
        "flex-row": splitView
      })}>
        {(!previewMode || splitView) && (
          <div className={cn("flex-1 overflow-auto", {
            "border-r": splitView,
            "max-w-4xl mx-auto w-full": !splitView
          })}>
            <div className="p-4">
              {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
              ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                  <div className="space-y-4">
                    <Droppable droppableId="components">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="space-y-3"
                        >
                          {components.map((component, index) => (
                            renderComponent(component, index)
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>

                    <Button
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(true)}
                      className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Agregar componente
                    </Button>
                  </div>
                </DragDropContext>
              )}
            </div>
          </div>
        )}
        
        {(previewMode || splitView) && (
          <div className={cn("flex-1 overflow-auto bg-gray-50")}>
            <div className="max-w-5xl mx-auto">
              {components.map((component) => (
                <ComponentRenderer
                  key={component.id}
                  component={component}
                  isEditing={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Diálogos */}
      <AddComponentDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAdd={handleAddComponent}
      />

      <EditComponentDialog
        open={!!selectedComponent}
        onClose={() => setSelectedComponent(null)}
        component={selectedComponent}
        onSave={handleEditComponent}
      />

      <PublishDialog
        open={isPublishDialogOpen}
        onClose={() => setIsPublishDialogOpen(false)}
        landingPageId={pageId || ''}
      />
    </div>
  );
};
