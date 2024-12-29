import React from 'react';
import { useTokens } from '@/contexts/TokenContext';
import { Coins } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function TokenBalance() {
  const { balance } = useTokens();
  const router = useRouter();

  if (!balance) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            onClick={() => router.push('/dashboard/tokens')}
          >
            <Coins className="w-4 h-4 text-[#00DC8F]" />
            <span>{balance.available}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col gap-1">
            <p>Tokens disponibles: {balance.available}</p>
            <p className="text-sm text-gray-400">
              Click para comprar más
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
