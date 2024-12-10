import { create } from 'zustand';

interface Template {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  isPremium: boolean;
}

interface MarketplaceStore {
  templates: Template[];
  purchasedTemplates: string[];
  loading: boolean;
  error: string | null;
  fetchTemplates: () => Promise<void>;
  purchaseTemplate: (templateId: string) => Promise<void>;
  isPurchased: (templateId: string) => boolean;
}

export const useMarketplaceStore = create<MarketplaceStore>((set, get) => ({
  templates: [],
  purchasedTemplates: [],
  loading: false,
  error: null,

  fetchTemplates: async () => {
    set({ loading: true });
    try {
      // Aquí se implementará la llamada a la API
      // Por ahora usamos datos mock
      const mockTemplates: Template[] = [
        {
          id: '1',
          title: 'Business Pro',
          description: 'Template profesional para negocios',
          price: 29.99,
          category: 'Business',
          imageUrl: '/templates/business-pro.jpg',
          isPremium: true,
        },
        {
          id: '2',
          title: 'Portfolio Plus',
          description: 'Showcase your work with style',
          price: 19.99,
          category: 'Portfolio',
          imageUrl: '/templates/portfolio.jpg',
          isPremium: true,
        },
      ];
      
      set({ templates: mockTemplates, loading: false });
    } catch (error) {
      set({ error: 'Error al cargar los templates', loading: false });
    }
  },

  purchaseTemplate: async (templateId: string) => {
    set({ loading: true });
    try {
      // Aquí se implementará la lógica de compra
      // Por ahora solo agregamos el ID a la lista de comprados
      set(state => ({
        purchasedTemplates: [...state.purchasedTemplates, templateId],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Error al realizar la compra', loading: false });
    }
  },

  isPurchased: (templateId: string) => {
    return get().purchasedTemplates.includes(templateId);
  },
}));
