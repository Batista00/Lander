import { useState, useEffect } from 'react';
import { db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

export interface UserPlan {
  type: 'free' | 'pro' | 'enterprise';
  features: string[];
  limits: {
    landingPages: number;
    storage: number;
    aiCredits: number;
  };
  expiresAt?: Date;
}

export const useUserPlan = () => {
  const { user } = useAuth();
  const [plan, setPlan] = useState<UserPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!user) {
        setPlan(null);
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();

        if (!userData?.planId) {
          // Plan gratuito por defecto
          setPlan({
            type: 'free',
            features: ['Páginas de aterrizaje básicas', 'Análisis básico'],
            limits: {
              landingPages: 3,
              storage: 100, // MB
              aiCredits: 10
            }
          });
        } else {
          const planDoc = await getDoc(doc(db, 'plans', userData.planId));
          const planData = planDoc.data() as UserPlan;

          if (planData) {
            setPlan({
              ...planData,
              expiresAt: userData.planExpiresAt?.toDate()
            });
          }
        }
      } catch (err) {
        console.error('Error fetching user plan:', err);
        setError('Error al cargar el plan del usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUserPlan();
  }, [user]);

  const isFeatureAvailable = (feature: string): boolean => {
    if (!plan) return false;
    return plan.features.includes(feature);
  };

  const getRemainingQuota = (type: keyof UserPlan['limits']): number => {
    if (!plan) return 0;
    return plan.limits[type];
  };

  const isPlanActive = (): boolean => {
    if (!plan) return false;
    if (!plan.expiresAt) return true; // Plan gratuito no expira
    return new Date() < plan.expiresAt;
  };

  return {
    plan,
    loading,
    error,
    isFeatureAvailable,
    getRemainingQuota,
    isPlanActive
  };
};
