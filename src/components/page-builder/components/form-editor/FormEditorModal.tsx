import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FormEditor } from './FormEditor';
import { LeadFormConfig } from '@/types';

interface FormEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialConfig: LeadFormConfig;
  onSave: (config: LeadFormConfig) => void;
}

export function FormEditorModal({
  isOpen,
  onClose,
  initialConfig,
  onSave,
}: FormEditorModalProps) {
  const [config, setConfig] = React.useState<LeadFormConfig>(initialConfig);

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configurar Formulario</DialogTitle>
        </DialogHeader>
        <FormEditor
          config={config}
          onChange={setConfig}
        />
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
