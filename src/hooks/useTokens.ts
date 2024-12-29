import { useState, useEffect } from 'react';
import { TokenState } from '@/types/landing';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

export function useTokens() {
  const { user } = useAuth();
  const [tokens, setTokens] = useState<TokenState>({
    remaining: 0,
    used: 0,
    total: 0,
    lastRefill: null,
    monthlyRefillDate: null,
    monthlyLimit: 100
  });
  const [loading, setLoading] = useState(true);

  const checkTokens = async (amount: number): Promise<boolean> => {
    return tokens.remaining >= amount;
  };

  const useTokens = async (amount: number): Promise<void> => {
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    if (!(await checkTokens(amount))) {
      throw new Error('No hay suficientes tokens disponibles');
    }
    
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      'tokens.remaining': increment(-amount),
      'tokens.used': increment(amount),
      'tokens.updatedAt': new Date()
    });

    setTokens(prev => ({
      ...prev,
      remaining: prev.remaining - amount,
      used: prev.used + amount,
      updatedAt: new Date()
    }));
  };

  const refillTokens = async (amount: number): Promise<void> => {
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      'tokens.remaining': increment(amount),
      'tokens.total': increment(amount),
      'tokens.lastRefill': new Date(),
      'tokens.updatedAt': new Date()
    });

    setTokens(prev => ({
      ...prev,
      remaining: prev.remaining + amount,
      total: (prev.total || 0) + amount,
      lastRefill: new Date(),
      updatedAt: new Date()
    }));
  };

  useEffect(() => {
    const loadTokens = async () => {
      try {
        if (!user) {
          setTokens({
            remaining: 0,
            used: 0,
            total: 0,
            lastRefill: null,
            monthlyRefillDate: null,
            monthlyLimit: 100
          });
          return;
        }

        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.tokens) {
            setTokens(userData.tokens);
          } else {
            // Si no hay tokens, inicializar con valores por defecto
            const defaultTokens = {
              remaining: 100,
              used: 0,
              total: 100,
              lastRefill: new Date(),
              monthlyRefillDate: new Date(),
              monthlyLimit: 100
            };
            await updateDoc(userRef, { tokens: defaultTokens });
            setTokens(defaultTokens);
          }
        }
      } catch (error) {
        console.error('Error loading tokens:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTokens();
  }, [user]);

  return {
    tokens,
    loading,
    checkTokens,
    useTokens,
    refillTokens,
    spendTokens: useTokens // Alias para mantener compatibilidad
  };
}
