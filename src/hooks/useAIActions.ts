import { useState } from 'react';
import { useTokens } from '@/contexts/TokenContext';
import { TOKEN_COSTS } from '@/types/token';
import { toast } from 'sonner';

export interface AIAction {
  type: keyof typeof TOKEN_COSTS;
  description: string;
  handler: () => Promise<any>;
}

export function useAIActions() {
  const { useTokens, balance } = useTokens();
  const [loading, setLoading] = useState(false);

  const executeAction = async (action: AIAction) => {
    const cost = TOKEN_COSTS[action.type];

    if (!balance || balance.available < cost) {
      toast.error(
        <div className="flex flex-col gap-2">
          <p>No tienes suficientes tokens</p>
          <a 
            href="/dashboard/tokens" 
            className="text-[#00DC8F] hover:underline"
          >
            Comprar tokens
          </a>
        </div>
      );
      return null;
    }

    try {
      setLoading(true);
      
      // Intentar usar los tokens primero
      const success = await useTokens(
        cost,
        `${action.description} (${action.type})`
      );

      if (!success) {
        throw new Error('No se pudieron usar los tokens');
      }

      // Ejecutar la acción
      return await action.handler();
    } catch (error) {
      console.error('Error executing AI action:', error);
      toast.error('No se pudo completar la acción');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    executeAction,
    loading,
    canExecute: (actionType: keyof typeof TOKEN_COSTS) => 
      balance ? balance.available >= TOKEN_COSTS[actionType] : false,
    getCost: (actionType: keyof typeof TOKEN_COSTS) => TOKEN_COSTS[actionType]
  };
}
