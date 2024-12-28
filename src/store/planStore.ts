import { create } from 'zustand';
import { Plan, PlanId, BillingPeriod } from '../types/plans';

interface PlanStore {
  currentPlan: Plan | null;
  trialEndDate: Date | null;
  isTrialing: boolean;
  billing: {
    period: BillingPeriod;
    nextBillingDate: Date | null;
  };
  usage: {
    landingPages: number;
    templates: {
      free: number;
      premium: number;
    };
    storage: number;
    domains: string[];
  };
  setPlan: (plan: Plan) => void;
  startTrial: (planId: PlanId) => void;
  endTrial: () => void;
  updateUsage: (usage: Partial<PlanStore['usage']>) => void;
  setBillingPeriod: (period: BillingPeriod) => void;
}

const plans: Record<PlanId, Plan> = {
  free: {
    id: 'free',
    name: 'Free',
    price: 0,
    billing: 'monthly',
    features: {
      landingPages: 1,
      templates: {
        free: true,
        premium: false,
        premiumCount: 0
      },
      storage: 1,
      customDomain: false,
      customDomainCount: 0,
      analytics: 'basic',
      abTesting: false,
      teamMembers: 1,
      api: false,
      support: 'email'
    },
    trial: {
      days: 0,
      available: false
    }
  },
  business: {
    id: 'business',
    name: 'Negocio',
    price: 29,
    billing: 'monthly',
    features: {
      landingPages: 5,
      templates: {
        free: true,
        premium: true,
        premiumCount: 5
      },
      storage: 10,
      customDomain: true,
      customDomainCount: 1,
      analytics: 'advanced',
      abTesting: true,
      teamMembers: 3,
      api: false,
      support: 'priority'
    },
    trial: {
      days: 14,
      available: true
    }
  },
  enterprise: {
    id: 'enterprise',
    name: 'Empresa',
    price: 99,
    billing: 'monthly',
    features: {
      landingPages: -1,
      templates: {
        free: true,
        premium: true,
        premiumCount: -1
      },
      storage: 100,
      customDomain: true,
      customDomainCount: -1,
      analytics: 'advanced',
      abTesting: true,
      teamMembers: -1,
      api: true,
      support: '24/7'
    },
    trial: {
      days: 14,
      available: true
    }
  }
};

export const usePlanStore = create<PlanStore>((set) => ({
  currentPlan: plans.free,
  trialEndDate: null,
  isTrialing: false,
  billing: {
    period: 'monthly',
    nextBillingDate: null,
  },
  usage: {
    landingPages: 0,
    templates: {
      free: 0,
      premium: 0,
    },
    storage: 0,
    domains: [],
  },
  setPlan: (plan) => set({ currentPlan: plan }),
  startTrial: (planId) => {
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + plans[planId].trial.days);
    set({
      currentPlan: plans[planId],
      trialEndDate,
      isTrialing: true,
    });
  },
  endTrial: () => {
    set({
      currentPlan: plans.free,
      trialEndDate: null,
      isTrialing: false,
    });
  },
  updateUsage: (usage) => set((state) => ({
    usage: { ...state.usage, ...usage },
  })),
  setBillingPeriod: (period) => set((state) => ({
    billing: { ...state.billing, period },
  })),
}));

export const getAvailablePlans = () => plans;
