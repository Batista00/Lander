import { usePlanStore } from '@/store/planStore';

export function usePlanRestrictions() {
  const { currentPlan, usage, isTrialing } = usePlanStore();

  const canCreateLandingPage = (): boolean => {
    if (!currentPlan) return false;
    return currentPlan.features.landingPages === -1 || 
           usage.landingPages < currentPlan.features.landingPages;
  };

  const canUsePremiumTemplate = (): boolean => {
    if (!currentPlan) return false;
    if (!currentPlan.features.templates.premium) return false;
    return currentPlan.features.templates.premiumCount === -1 || 
           usage.templates.premium < currentPlan.features.templates.premiumCount;
  };

  const canUseCustomDomain = (): boolean => {
    if (!currentPlan) return false;
    if (!currentPlan.features.customDomain) return false;
    return currentPlan.features.customDomainCount === -1 || 
           usage.domains.length < currentPlan.features.customDomainCount;
  };

  const getRemainingResources = () => {
    if (!currentPlan) return null;

    return {
      landingPages: currentPlan.features.landingPages === -1 
        ? 'unlimited' 
        : currentPlan.features.landingPages - usage.landingPages,
      premiumTemplates: currentPlan.features.templates.premiumCount === -1 
        ? 'unlimited' 
        : currentPlan.features.templates.premiumCount - usage.templates.premium,
      storage: currentPlan.features.storage - usage.storage,
      domains: currentPlan.features.customDomainCount === -1 
        ? 'unlimited' 
        : currentPlan.features.customDomainCount - usage.domains.length
    };
  };

  const getUpgradeReason = (): string | null => {
    if (!currentPlan) return 'Plan no encontrado';
    if (currentPlan.id === 'enterprise') return null;

    if (!canCreateLandingPage()) {
      return 'Has alcanzado el límite de landing pages';
    }

    if (!canUsePremiumTemplate()) {
      return 'Has alcanzado el límite de templates premium';
    }

    if (!canUseCustomDomain() && currentPlan.id === 'free') {
      return 'Necesitas un plan pago para usar dominios personalizados';
    }

    return null;
  };

  return {
    canCreateLandingPage,
    canUsePremiumTemplate,
    canUseCustomDomain,
    getRemainingResources,
    getUpgradeReason,
    isTrialing
  };
}
