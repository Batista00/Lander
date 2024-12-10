import { create } from 'zustand';
import { FEATURES, PLAN_LIMITS } from '../config/features';

interface FeaturesState {
  userPlan: 'free' | 'premium';
  features: typeof FEATURES.free | typeof FEATURES.premium;
  limits: typeof PLAN_LIMITS.free | typeof PLAN_LIMITS.premium;
  isFeatureAvailable: (feature: keyof typeof FEATURES.premium) => boolean;
  isComponentAvailable: (component: string) => boolean;
  upgradeNeeded: (feature: keyof typeof FEATURES.premium) => boolean;
  setUserPlan: (plan: 'free' | 'premium') => void;
}

export const useFeatures = create<FeaturesState>((set, get) => ({
  userPlan: 'free',
  features: FEATURES.free,
  limits: PLAN_LIMITS.free,

  isFeatureAvailable: (feature) => {
    const { features } = get();
    return feature in features && features[feature as keyof typeof features];
  },

  isComponentAvailable: (component) => {
    const { limits } = get();
    return limits.components.includes(component);
  },

  upgradeNeeded: (feature) => {
    const { userPlan } = get();
    return userPlan === 'free' && feature in FEATURES.premium;
  },

  setUserPlan: (plan) => {
    set({
      userPlan: plan,
      features: FEATURES[plan],
      limits: PLAN_LIMITS[plan],
    });
  },
}));
