import React from 'react';
import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/use-toast";
import { debounce } from 'lodash';
import { Component, ComponentType } from '@/types/landing';
import { ComponentEditor } from '../components/ComponentEditor';

interface EditComponentDialogProps {
  open: boolean;
  onClose: () => void;
  component: Component;
  onSave: (component: Component) => void;
}

export const EditComponentDialog: React.FC<EditComponentDialogProps> = ({
  open,
  onClose,
  component,
  onSave,
}) => {
  const [editedComponent, setEditedComponent] = React.useState(component);
  const [isSaving, setIsSaving] = React.useState(false);

  // Actualizar el estado cuando cambia el componente
  React.useEffect(() => {
    setEditedComponent(component);
  }, [component]);

  // Manejar cambios en el componente
  const handleComponentChange = React.useCallback((changes: Partial<Component>) => {
    setEditedComponent(prev => ({
      ...prev,
      ...changes
    }));
  }, []);

  // Guardar cambios
  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(editedComponent);
      toast({
        title: 'Componente guardado',
        description: 'Los cambios han sido guardados exitosamente.',
        variant: "default",
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error al guardar',
        description: 'Ocurrió un error al guardar los cambios. Por favor, intenta nuevamente.',
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Editar Componente</DialogTitle>
          <DialogDescription>
            Personaliza las propiedades del componente
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4">
          <ComponentEditor
            component={editedComponent}
            onChange={handleComponentChange}
          />
        </div>

        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
