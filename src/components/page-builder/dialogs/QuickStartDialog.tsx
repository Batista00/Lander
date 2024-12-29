import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TemplateSelectionDialog } from './TemplateSelectionDialog';
import { AIQuickStartDialog } from '@/components/ai/AIQuickStartDialog';
import { Template } from '@/types/landing';

interface QuickStartDialogProps {
  open: boolean;
  onClose: () => void;
  isPremiumUser?: boolean;
}

export function QuickStartDialog({
  open,
  onClose,
  isPremiumUser = false,
}: QuickStartDialogProps) {
  const navigate = useNavigate();
  const [showTemplates, setShowTemplates] = React.useState(false);
  const [showAIDialog, setShowAIDialog] = React.useState(false);

  const handleStartFromScratch = () => {
    navigate('/editor/new');
    onClose();
  };

  const handleStartFromTemplate = (template: Template) => {
    navigate(`/editor/template/${template.id}`);
    onClose();
  };

  const handleAIQuickStart = () => {
    setShowAIDialog(true);
  };

  return (
    <>
      <Dialog open={open && !showAIDialog} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>¡Comienza a crear tu Landing Page!</DialogTitle>
            <DialogDescription>
              Elige cómo quieres comenzar tu proyecto
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-32 flex flex-col items-center justify-center space-y-2 hover:border-[#00E5B0] hover:bg-[#00E5B0]/5"
                onClick={handleStartFromScratch}
              >
                <div className="text-2xl">🎨</div>
                <div className="font-medium">Comenzar desde cero</div>
                <div className="text-sm text-muted-foreground">
                  Crea tu landing page desde cero
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-32 flex flex-col items-center justify-center space-y-2 hover:border-[#00E5B0] hover:bg-[#00E5B0]/5"
                onClick={() => setShowTemplates(true)}
              >
                <div className="text-2xl">📝</div>
                <div className="font-medium">Usar una plantilla</div>
                <div className="text-sm text-muted-foreground">
                  Elige entre nuestras plantillas prediseñadas
                </div>
              </Button>

              {isPremiumUser && (
                <Button
                  variant="outline"
                  className="h-32 col-span-2 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-[#00E5B0] to-[#00A699] text-white hover:from-[#00A699] hover:to-[#00E5B0]"
                  onClick={handleAIQuickStart}
                >
                  <Wand2 className="h-6 w-6" />
                  <div className="font-medium">Quick Start con IA</div>
                  <div className="text-sm opacity-90">
                    Deja que nuestra IA cree una landing page perfecta para ti
                  </div>
                </Button>
              )}
            </div>
          </div>

          <DialogFooter className="sm:justify-start">
            <div className="text-xs text-muted-foreground">
              Puedes cambiar y personalizar todo más tarde
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <TemplateSelectionDialog
        open={showTemplates}
        onClose={() => setShowTemplates(false)}
        onSelect={handleStartFromTemplate}
        isPremiumUser={isPremiumUser}
      />

      {showAIDialog && (
        <AIQuickStartDialog
          open={showAIDialog}
          onClose={() => {
            setShowAIDialog(false);
            onClose();
          }}
        />
      )}
    </>
  );
}
