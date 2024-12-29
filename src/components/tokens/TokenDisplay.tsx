import { useTokens } from '@/hooks/useTokens';
import { Coins } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TokenDisplayProps {
  className?: string;
  showCost?: boolean;
  cost?: number;
}

export function TokenDisplay({ className, showCost, cost }: TokenDisplayProps) {
  const { tokens, loading } = useTokens();

  if (loading || !tokens) return null;

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm"
            className="flex items-center gap-2"
          >
            <Coins className="h-4 w-4 text-yellow-500" />
            <span>{tokens.remaining}</span>
            {showCost && cost && (
              <span className="text-muted-foreground">(-{cost})</span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="p-2 space-y-2">
            <p className="font-medium">Tus Tokens</p>
            <div className="text-sm space-y-1">
              <p className="text-muted-foreground">
                Disponibles: {tokens.remaining}
              </p>
              <p className="text-muted-foreground">
                Usados: {tokens.used}
              </p>
              {tokens.lastRefill && (
                <p className="text-xs text-muted-foreground">
                  Última recarga: {new Date(tokens.lastRefill).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
