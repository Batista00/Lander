import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, LayoutTemplate, Plus, Save } from 'lucide-react';
import { useVersionStore } from '@/store/version-store';
import { PreviewPanel } from './preview-panel';
import { TemplateSelectionDialog } from './dialogs/template-selection-dialog';
import { VersionHistoryDialog } from './dialogs/version-history-dialog';
import { Template } from '@/lib/templates';
import { toast } from 'sonner';

interface PageBuilderProps {
  pageId: string;
  initialComponents?: any[];
  onSave?: (components: any[]) => void;
  isPremiumUser?: boolean;
}

export function PageBuilder({
  pageId,
  initialComponents = [],
  onSave,
  isPremiumUser = false
}: PageBuilderProps) {
  const [components, setComponents] = React.useState(initialComponents);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = React.useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = React.useState(false);
  const [previewLoading, setPreviewLoading] = React.useState(false);
  
  const { addVersion } = useVersionStore();

  // Cuando se cambian los componentes, actualizar la versión
  const handleComponentsChange = (newComponents: any[]) => {
    setComponents(newComponents);
    addVersion(pageId, newComponents, 'Cambios en componentes');
  };

  // Cuando se selecciona una plantilla
  const handleTemplateSelect = (template: Template) => {
    setPreviewLoading(true);
    // Simular carga para mejor UX
    setTimeout(() => {
      setComponents(template.components);
      addVersion(pageId, template.components, `Plantilla aplicada: ${template.name}`);
      setPreviewLoading(false);
    }, 1000);
  };

  // Cuando se restaura una versión
  const handleVersionRestore = (restoredComponents: any[]) => {
    setPreviewLoading(true);
    setTimeout(() => {
      setComponents(restoredComponents);
      setPreviewLoading(false);
    }, 500);
  };

  // Guardar cambios
  const handleSave = async () => {
    if (onSave) {
      try {
        await onSave(components);
        toast.success('Cambios guardados correctamente');
      } catch (error) {
        toast.error('Error al guardar los cambios');
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Panel de Herramientas */}
      <div className="w-80 border-r bg-white flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-4">Constructor de Página</h2>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setIsTemplateDialogOpen(true)}
            >
              <LayoutTemplate className="w-4 h-4 mr-2" />
              Elegir Template
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => setIsHistoryDialogOpen(true)}
            >
              <History className="w-4 h-4 mr-2" />
              Historial
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {components.map((component, index) => (
              <div
                key={component.id}
                className="p-3 border rounded-lg hover:border-violet-500 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{component.type}</span>
                  <Button variant="ghost" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <Button className="w-full" onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </div>

      {/* Panel de Preview */}
      <PreviewPanel loading={previewLoading}>
        <div className="min-h-screen">
          {components.map((component, index) => (
            <div key={component.id}>
              {/* Aquí renderizaremos los componentes según su tipo */}
              <pre className="p-4">{JSON.stringify(component, null, 2)}</pre>
            </div>
          ))}
        </div>
      </PreviewPanel>

      {/* Diálogos */}
      <TemplateSelectionDialog
        open={isTemplateDialogOpen}
        onClose={() => setIsTemplateDialogOpen(false)}
        onSelect={handleTemplateSelect}
        isPremiumUser={isPremiumUser}
      />

      <VersionHistoryDialog
        open={isHistoryDialogOpen}
        onClose={() => setIsHistoryDialogOpen(false)}
        pageId={pageId}
        onRestore={handleVersionRestore}
      />
    </div>
  );
}
