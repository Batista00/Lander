import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { TokenCost } from '@/components/ui/token-cost';
import { useAIActions } from '@/hooks/useAIActions';
import { Wand2 } from 'lucide-react';
import { TOKEN_COSTS } from '@/types/token';

interface AIActionsMenuProps {
  onAction: (type: keyof typeof TOKEN_COSTS) => Promise<void>;
  disabled?: boolean;
}

export function AIActionsMenu({ onAction, disabled }: AIActionsMenuProps) {
  const { loading, canExecute, getCost } = useAIActions();

  const actions = [
    {
      type: 'ANALYZE_PAGE' as const,
      label: 'Analizar página',
      description: 'Analiza el contenido y estructura de tu landing'
    },
    {
      type: 'GENERATE_COMPONENT' as const,
      label: 'Generar componente',
      description: 'Crea un nuevo componente con IA'
    },
    {
      type: 'IMPROVE_COMPONENT' as const,
      label: 'Mejorar componente',
      description: 'Optimiza el componente seleccionado'
    },
    {
      type: 'SEO_OPTIMIZE' as const,
      label: 'Optimizar SEO',
      description: 'Mejora el posicionamiento'
    },
    {
      type: 'STYLE_SUGGESTIONS' as const,
      label: 'Sugerencias de estilo',
      description: 'Mejora el diseño visual'
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          disabled={disabled || loading}
        >
          <Wand2 className="w-4 h-4" />
          Acciones IA
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {actions.map((action) => (
          <DropdownMenuItem
            key={action.type}
            onClick={() => onAction(action.type)}
            disabled={loading || !canExecute(action.type)}
            className="flex flex-col items-start py-2 gap-1"
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-medium">{action.label}</span>
              <TokenCost 
                cost={getCost(action.type)}
                tooltipText={`Esta acción cuesta ${getCost(action.type)} tokens`}
              />
            </div>
            <span className="text-sm text-gray-400">
              {action.description}
            </span>
          </DropdownMenuItem>
        ))}
        
        <div className="px-2 py-2 text-sm border-t border-gray-800">
          <a 
            href="/dashboard/tokens" 
            className="text-[#00DC8F] hover:underline flex items-center justify-between"
          >
            <span>Comprar más tokens</span>
            <Wand2 className="w-4 h-4" />
          </a>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
