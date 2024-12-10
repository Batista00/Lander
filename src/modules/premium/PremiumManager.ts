import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: string;
}

interface PremiumState {
  features: PremiumFeature[];
  activateFeature: (featureId: string) => void;
  deactivateFeature: (featureId: string) => void;
  isFeatureEnabled: (featureId: string) => boolean;
  upgradeToPremiun: () => void;
  isPremium: boolean;
}

export const usePremiumStore = create<PremiumState>()(
  persist(
    (set, get) => ({
      features: [
        // Personalización Avanzada
        {
          id: 'customColors',
          name: 'Editor de Colores',
          description: 'Personaliza los colores de tu landing page',
          enabled: false,
          category: 'customization'
        },
        {
          id: 'customFonts',
          name: 'Selector de Fuentes',
          description: 'Accede a una biblioteca de fuentes premium',
          enabled: false,
          category: 'customization'
        },
        {
          id: 'customAnimations',
          name: 'Animaciones',
          description: 'Agrega animaciones personalizadas',
          enabled: false,
          category: 'customization'
        },
        // Componentes Premium
        {
          id: 'ecommerce',
          name: 'E-commerce',
          description: 'Vende productos en tu landing page',
          enabled: false,
          category: 'components'
        },
        {
          id: 'booking',
          name: 'Sistema de Reservas',
          description: 'Permite a tus clientes hacer reservas',
          enabled: false,
          category: 'components'
        },
        // Marketing
        {
          id: 'abTesting',
          name: 'A/B Testing',
          description: 'Prueba diferentes versiones de tu landing',
          enabled: false,
          category: 'marketing'
        },
        {
          id: 'heatmaps',
          name: 'Heatmaps',
          description: 'Analiza el comportamiento de tus usuarios',
          enabled: false,
          category: 'marketing'
        },
        // Productividad
        {
          id: 'versionHistory',
          name: 'Historial de Versiones',
          description: 'Accede a versiones anteriores',
          enabled: false,
          category: 'productivity'
        },
        {
          id: 'collaboration',
          name: 'Colaboración en Equipo',
          description: 'Trabaja con tu equipo en tiempo real',
          enabled: false,
          category: 'productivity'
        },
        // SEO
        {
          id: 'advancedSeo',
          name: 'SEO Avanzado',
          description: 'Optimiza tu landing para buscadores',
          enabled: false,
          category: 'seo'
        },
        // Seguridad
        {
          id: 'security',
          name: 'Seguridad Premium',
          description: 'SSL, DDoS, CDN y más',
          enabled: false,
          category: 'security'
        },
        // Integraciones
        {
          id: 'zapier',
          name: 'Integración Zapier',
          description: 'Conecta con miles de apps',
          enabled: false,
          category: 'integrations'
        },
        {
          id: 'crm',
          name: 'Integración CRM',
          description: 'Conecta con tu CRM favorito',
          enabled: false,
          category: 'integrations'
        },
      ],
      isPremium: false,

      activateFeature: (featureId) => {
        set((state) => ({
          features: state.features.map((feature) =>
            feature.id === featureId ? { ...feature, enabled: true } : feature
          ),
        }));
      },

      deactivateFeature: (featureId) => {
        set((state) => ({
          features: state.features.map((feature) =>
            feature.id === featureId ? { ...feature, enabled: false } : feature
          ),
        }));
      },

      isFeatureEnabled: (featureId) => {
        const state = get();
        const feature = state.features.find((f) => f.id === featureId);
        return feature?.enabled || false;
      },

      upgradeToPremiun: () => {
        set((state) => ({
          isPremium: true,
          features: state.features.map((feature) => ({ ...feature, enabled: true })),
        }));
      },
    }),
    {
      name: 'premium-storage',
    }
  )
);
