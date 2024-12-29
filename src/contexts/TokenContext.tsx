import React, { createContext, useContext, useEffect, useState } from 'react';
import { TokenBalance, TokenTransaction } from '@/types/token';
import { TokenService } from '@/services/tokenService';
import { useAuth } from './AuthContext';

interface TokenContextType {
  balance: TokenBalance | null;
  transactions: TokenTransaction[];
  loading: boolean;
  error: string | null;
  refreshBalance: () => Promise<void>;
  useTokens: (amount: number, description: string, relatedEntityId?: string) => Promise<boolean>;
  purchaseTokens: (amount: number, cost: number) => Promise<string>;
}

const TokenContext = createContext<TokenContextType | undefined>(undefined);
const tokenService = new TokenService();

export function TokenProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [balance, setBalance] = useState<TokenBalance | null>(null);
  const [transactions, setTransactions] = useState<TokenTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshBalance = async () => {
    if (!user) return;
    try {
      const newBalance = await tokenService.getBalance(user.uid);
      setBalance(newBalance);
      
      // Obtener últimas transacciones
      const history = await tokenService.getTransactionHistory(user.uid, 10);
      setTransactions(history);
      
      setError(null);
    } catch (err) {
      console.error('Error refreshing token balance:', err);
      setError('No se pudo actualizar el balance de tokens');
    }
  };

  const useTokens = async (
    amount: number, 
    description: string, 
    relatedEntityId?: string
  ): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const success = await tokenService.useTokens(
        user.uid,
        amount,
        description,
        relatedEntityId
      );
      
      if (success) {
        await refreshBalance();
      }
      
      return success;
    } catch (err) {
      console.error('Error using tokens:', err);
      setError('No se pudieron usar los tokens');
      return false;
    }
  };

  const purchaseTokens = async (amount: number, cost: number): Promise<string> => {
    if (!user) throw new Error('Usuario no autenticado');
    
    try {
      const purchase = await tokenService.createPurchase(user.uid, amount, cost);
      return purchase.id;
    } catch (err) {
      console.error('Error creating token purchase:', err);
      throw new Error('No se pudo crear la compra de tokens');
    }
  };

  // Cargar balance inicial
  useEffect(() => {
    if (user) {
      setLoading(true);
      refreshBalance().finally(() => setLoading(false));
    } else {
      setBalance(null);
      setTransactions([]);
    }
  }, [user]);

  const value = {
    balance,
    transactions,
    loading,
    error,
    refreshBalance,
    useTokens,
    purchaseTokens,
  };

  return (
    <TokenContext.Provider value={value}>
      {children}
    </TokenContext.Provider>
  );
}

export function useTokens() {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error('useTokens must be used within a TokenProvider');
  }
  return context;
}
