import React from 'react';
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  LayoutGrid, 
  Upload, 
  Settings2, 
  Trash2, 
  Plus,
  X 
} from "lucide-react";
import { toast } from "sonner";
import { 
  TopBarEditor,
  HeaderEditor,
  PricingEditor,
  ContactEditor,
  HeroEditor,
  ServicesEditor,
  FeaturesEditor,
  TestimonialsEditor,
  HeadingEditor,
  TextEditor,
  ImageEditor
} from '../editors';

interface EditComponentDialogProps {
  open: boolean;
  onClose: () => void;
  component: any;
  onSave: (component: any) => void;
}

export const EditComponentDialog: React.FC<EditComponentDialogProps> = ({
  open,
  onClose,
  component,
  onSave,
}) => {
  const [editedComponent, setEditedComponent] = React.useState({
    type: '',
    data: {}
  });

  React.useEffect(() => {
    if (component) {
      setEditedComponent({
        type: component.type || '',
        data: component.data || {}
      });
    }
  }, [component]);

  const handleSave = () => {
    onSave(editedComponent);
    onClose();
  };

  if (!component) {
    return null;
  }

  const componentData = editedComponent.data || {};

  const handleDataChange = (key: string, value: any) => {
    setEditedComponent(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [key]: value
      }
    }));
  };

  const handleStyleChange = (key: string, value: any) => {
    setEditedComponent(prev => ({
      ...prev,
      data: {
        ...prev.data,
        style: {
          ...(prev.data?.style || {}),
          [key]: value
        }
      }
    }));
  };

  const handleMenuChange = (index: number, key: string, value: string) => {
    setEditedComponent(prev => {
      const newMenu = [...(prev.data?.menu || [])];
      newMenu[index] = { ...newMenu[index], [key]: value };
      return {
        ...prev,
        data: {
          ...prev.data,
          menu: newMenu
        }
      };
    });
  };

  const handleAddMenuItem = () => {
    setEditedComponent(prev => ({
      ...prev,
      data: {
        ...prev.data,
        menu: [...(prev.data?.menu || []), { text: '', link: '' }]
      }
    }));
  };

  const handleRemoveMenuItem = (index: number) => {
    setEditedComponent(prev => ({
      ...prev,
      data: {
        ...prev.data,
        menu: (prev.data?.menu || []).filter((_, i) => i !== index)
      }
    }));
  };

  const handleCtaChange = (key: string, value: string) => {
    setEditedComponent(prev => ({
      ...prev,
      data: {
        ...prev.data,
        cta: {
          ...(prev.data?.cta || {}),
          [key]: value
        }
      }
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = URL.createObjectURL(file);
      handleDataChange('logo', imageUrl);
      toast.success('Logo cargado correctamente');
    } catch (error) {
      console.error('Error al cargar el logo:', error);
      toast.error('Error al cargar el logo');
    }
  };

  const getLogoUrl = (logo: any): string => {
    if (!logo) return '';
    if (typeof logo === 'string') return logo;
    if (typeof logo === 'object' && logo.url) return logo.url;
    return '';
  };

  const renderEditor = () => {
    switch (editedComponent.type) {
      case 'header':
        return <HeaderEditor 
          data={componentData}
          onDataChange={handleDataChange}
          onStyleChange={handleStyleChange}
          onMenuChange={handleMenuChange}
          onAddMenuItem={handleAddMenuItem}
          onRemoveMenuItem={handleRemoveMenuItem}
          onCtaChange={handleCtaChange}
          onImageUpload={handleImageUpload}
          getLogoUrl={getLogoUrl}
        />;
      case 'hero':
        return <HeroEditor 
          data={componentData}
          onDataChange={handleDataChange}
          onStyleChange={handleStyleChange}
        />;
      case 'services':
        return <ServicesEditor 
          data={componentData}
          onDataChange={handleDataChange}
          onStyleChange={handleStyleChange}
        />;
      case 'features':
        return <FeaturesEditor 
          data={componentData}
          onDataChange={handleDataChange}
          onStyleChange={handleStyleChange}
        />;
      case 'testimonials':
        return <TestimonialsEditor 
          data={componentData}
          onDataChange={handleDataChange}
          onStyleChange={handleStyleChange}
        />;
      case 'pricing':
        return <PricingEditor 
          data={componentData}
          onDataChange={handleDataChange}
          onStyleChange={handleStyleChange}
        />;
      case 'contact':
        return <ContactEditor 
          data={componentData}
          onDataChange={handleDataChange}
          onStyleChange={handleStyleChange}
        />;
      case 'heading':
        return <HeadingEditor 
          data={componentData}
          onDataChange={handleDataChange}
          onStyleChange={handleStyleChange}
        />;
      case 'text':
        return <TextEditor 
          data={componentData}
          onDataChange={handleDataChange}
          onStyleChange={handleStyleChange}
        />;
      case 'image':
        return <ImageEditor 
          data={componentData}
          onDataChange={handleDataChange}
          onStyleChange={handleStyleChange}
        />;
      case 'topbar':
        return <TopBarEditor 
          data={componentData}
          onDataChange={handleDataChange}
          onStyleChange={handleStyleChange}
        />;
      default:
        return (
          <div className="p-4 text-center text-gray-500">
            Editor no disponible para este tipo de componente
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] h-[90vh] flex flex-col">
        <DialogHeader className="px-6 py-4 border-b bg-white">
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Editar {editedComponent.type || 'Componente'}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 mt-1">
            Configura las propiedades y el estilo de tu componente
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {renderEditor()}
        </div>

        <DialogFooter className="px-6 py-4 border-t bg-gray-50 mt-auto">
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Guardar Cambios
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
