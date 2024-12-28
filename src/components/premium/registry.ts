import { PremiumButton } from './cta/PremiumButton';
import { SmartPopup } from './cta/SmartPopup';

export const PREMIUM_COMPONENTS = {
  // Componentes CTA
  premiumButton: {
    component: PremiumButton,
    category: 'cta',
    name: 'Botón Premium',
    description: 'Botón con animaciones y tracking',
    icon: 'Button',
    features: ['animations', 'tracking', 'abTesting'],
    defaultProps: {
      variant: 'primary',
      text: 'Click Me',
      animation: 'pulse'
    }
  },
  
  smartPopup: {
    component: SmartPopup,
    category: 'cta',
    name: 'Pop-up Inteligente',
    description: 'Pop-up con triggers inteligentes',
    icon: 'MessageSquare',
    features: ['exitIntent', 'scrollTrigger', 'analytics'],
    defaultProps: {
      trigger: 'time',
      animation: 'fade',
      delay: 3000
    }
  }
};

// Tipos de componentes premium
export type PremiumComponentType = keyof typeof PREMIUM_COMPONENTS;

// Features disponibles por plan
export const PREMIUM_FEATURES = {
  free: ['basic'],
  pro: ['animations', 'tracking', 'abTesting'],
  business: ['exitIntent', 'scrollTrigger', 'analytics']
};

// Validador de características premium
export function isPremiumFeatureAvailable(feature: string, plan: string): boolean {
  const availableFeatures = PREMIUM_FEATURES[plan as keyof typeof PREMIUM_FEATURES] || [];
  return availableFeatures.includes(feature);
}

// Obtener componentes disponibles según el plan
export function getAvailableComponents(plan: string) {
  return Object.entries(PREMIUM_COMPONENTS).reduce((acc, [key, component]) => {
    const isAvailable = component.features.some(feature => 
      isPremiumFeatureAvailable(feature, plan)
    );
    
    if (isAvailable) {
      acc[key] = component;
    }
    return acc;
  }, {} as typeof PREMIUM_COMPONENTS);
}
