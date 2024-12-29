import React from 'react';
import { useTokens } from '@/contexts/TokenContext';
import { Coins } from 'lucide-react';

export function TokenCounter() {
  const { balance, loading } = useTokens();

  if (loading || !balance) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1E1E1E] rounded-full">
      <Coins className="w-4 h-4 text-[#00DC8F]" />
      <span className="text-sm font-medium">
        {balance.available} tokens
      </span>
    </div>
  );
}
