import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface PlanFeatures {
  landingPages: number;
  storage: number;
  aiCredits: number;
}

interface Plan {
  id: string;
  name: string;
  features: PlanFeatures;
}

interface PlanContextType {
  plan: Plan | null;
  loading: boolean;
  error: string | null;
  isFeatureAvailable: (feature: string) => boolean;
  getRemainingQuota: (type: 'landingPages' | 'storage' | 'aiCredits') => number;
  isPlanActive: () => boolean;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setPlan(null);
      setLoading(false);
      return;
    }

    // TODO: Implementar lógica real de planes
    // Por ahora, plan gratuito por defecto
    setPlan({
      id: 'free',
      name: 'Free',
      features: {
        landingPages: 1,
        storage: 100,
        aiCredits: 100
      }
    });
    setLoading(false);
  }, [user]);

  const isFeatureAvailable = (feature: string) => {
    if (!plan) return false;
    return true; // TODO: Implementar lógica real
  };

  const getRemainingQuota = (type: 'landingPages' | 'storage' | 'aiCredits') => {
    if (!plan) return 0;
    return plan.features[type];
  };

  const isPlanActive = () => {
    return !!plan;
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        loading,
        error,
        isFeatureAvailable,
        getRemainingQuota,
        isPlanActive
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}
