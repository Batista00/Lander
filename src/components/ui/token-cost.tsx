import { Coins } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

interface TokenCostProps {
  cost: number;
  showTooltip?: boolean;
  tooltipText?: string;
  className?: string;
}

export function TokenCost({ 
  cost, 
  showTooltip = true, 
  tooltipText,
  className = ''
}: TokenCostProps) {
  const content = (
    <div className={`inline-flex items-center gap-1 text-sm ${className}`}>
      <Coins className="w-4 h-4 text-[#00DC8F]" />
      <span>{cost}</span>
    </div>
  );

  if (!showTooltip) return content;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText || `Costo: ${cost} tokens`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
