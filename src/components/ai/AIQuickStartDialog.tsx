import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TokenCost } from '@/components/ui/token-cost';
import { useAIActions } from '@/hooks/useAIActions';
import { Wand2 } from 'lucide-react';
import { toast } from 'sonner';
import { AIQuickStart } from './AIQuickStart';
import { BusinessContext } from '@/types/landing';

const QUICK_START_OPTIONS = [
  {
    id: 'analyze',
    title: 'Analizar mi negocio',
    description: 'La IA analizará tu negocio y sugerirá la mejor estructura',
    type: 'ANALYZE_PAGE' as const,
  },
  {
    id: 'generate',
    title: 'Generar landing completa',
    description: 'La IA generará una landing page completa basada en tu negocio',
    type: 'GENERATE_COMPONENT' as const,
  },
  {
    id: 'improve',
    title: 'Mejorar landing existente',
    description: 'La IA sugerirá mejoras para tu landing page actual',
    type: 'IMPROVE_COMPONENT' as const,
  },
  {
    id: 'seo',
    title: 'Optimizar SEO',
    description: 'La IA optimizará tu landing page para buscadores',
    type: 'SEO_OPTIMIZE' as const,
  }
];

interface AIQuickStartDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AIQuickStartDialog({ open, onClose }: AIQuickStartDialogProps) {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showQuickStart, setShowQuickStart] = useState(false);
  const { executeAction, loading, canExecute, getCost } = useAIActions();

  const handleAction = async () => {
    if (!selectedOption) return;
    
    const option = QUICK_START_OPTIONS.find(opt => opt.id === selectedOption);
    if (!option) return;

    if (option.id === 'generate') {
      setShowQuickStart(true);
    } else {
      const result = await executeAction({
        type: option.type,
        description: option.title,
        handler: async () => {
          // Aquí iría la lógica específica de cada acción
          await new Promise(resolve => setTimeout(resolve, 2000)); // Simulación
          return true;
        }
      });

      if (result) {
        toast.success('¡Acción completada con éxito!');
        onClose();
      }
    }
  };

  const handleQuickStartComplete = (templateId: string, context: BusinessContext) => {
    // Navegar al editor con el contexto
    navigate('/dashboard/landing-pages/editor/new', {
      state: { templateId, context }
    });
    onClose();
  };

  if (showQuickStart) {
    return (
      <AIQuickStart 
        onClose={() => {
          setShowQuickStart(false);
          onClose();
        }}
        onComplete={handleQuickStartComplete}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-[#00DC8F]" />
            Quick Start con IA
          </DialogTitle>
          <DialogDescription>
            Selecciona una acción para comenzar. Cada acción tiene un costo en tokens.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {QUICK_START_OPTIONS.map((option) => (
            <div
              key={option.id}
              className={`
                relative flex flex-col gap-1 p-4 rounded-lg cursor-pointer
                border border-gray-800 transition-colors
                ${selectedOption === option.id ? 'border-[#00DC8F]' : 'hover:border-gray-700'}
                ${!canExecute(option.type) ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              onClick={() => canExecute(option.type) && setSelectedOption(option.id)}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{option.title}</h3>
                <TokenCost 
                  cost={getCost(option.type)}
                  tooltipText={`Esta acción cuesta ${getCost(option.type)} tokens`}
                />
              </div>
              <p className="text-sm text-gray-400">
                {option.description}
              </p>
            </div>
          ))}
        </div>

        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              onClick={handleAction}
              disabled={!selectedOption || loading || !selectedOption || !canExecute(QUICK_START_OPTIONS.find(opt => opt.id === selectedOption)?.type || 'ANALYZE_PAGE')}
              className="bg-[#00DC8F] hover:bg-[#00DC8F]/90"
            >
              {loading ? 'Procesando...' : 'Comenzar'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
