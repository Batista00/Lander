import React, { createContext, useContext, useState, useCallback } from 'react';
import { 
  Template, 
  DeveloperProfile, 
  Order, 
  Review, 
  MarketplaceAnalytics,
  Promotion,
  MarketplaceSettings,
  MarketplaceFilters,
  ApiResponse 
} from '../types/marketplace';
import { marketplaceService } from '../services/marketplace';
import { useAuth } from './AuthContext';

interface MarketplaceContextType {
  // Templates
  templates: Template[];
  selectedTemplate: Template | null;
  loadTemplates: (filters?: MarketplaceFilters) => Promise<void>;
  getTemplateById: (id: string) => Promise<void>;
  createTemplate: (template: Partial<Template>) => Promise<void>;
  updateTemplate: (id: string, template: Partial<Template>) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
  
  // Developer Profile
  developerProfile: DeveloperProfile | null;
  loadDeveloperProfile: (developerId: string) => Promise<void>;
  updateDeveloperProfile: (id: string, profile: Partial<DeveloperProfile>) => Promise<void>;
  
  // Orders
  orders: Order[];
  selectedOrder: Order | null;
  createOrder: (order: Partial<Order>) => Promise<void>;
  loadOrders: () => Promise<void>;
  getOrderById: (id: string) => Promise<void>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<void>;
  
  // Reviews
  reviews: Review[];
  createReview: (review: Partial<Review>) => Promise<void>;
  loadReviews: (templateId: string) => Promise<void>;
  replyToReview: (reviewId: string, reply: string) => Promise<void>;
  
  // Analytics
  analytics: MarketplaceAnalytics | null;
  loadAnalytics: (timeRange: string) => Promise<void>;
  
  // Promotions
  promotions: Promotion[];
  selectedPromotion: Promotion | null;
  createPromotion: (promotion: Partial<Promotion>) => Promise<void>;
  loadPromotions: () => Promise<void>;
  updatePromotion: (id: string, promotion: Partial<Promotion>) => Promise<void>;
  deletePromotion: (id: string) => Promise<void>;
  
  // Settings
  settings: MarketplaceSettings | null;
  loadSettings: () => Promise<void>;
  updateSettings: (settings: Partial<MarketplaceSettings>) => Promise<void>;
  
  // Favorites
  favorites: Template[];
  loadFavorites: () => Promise<void>;
  
  // Loading States
  loading: boolean;
  error: string | null;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export function MarketplaceProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for each entity
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [developerProfile, setDeveloperProfile] = useState<DeveloperProfile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [analytics, setAnalytics] = useState<MarketplaceAnalytics | null>(null);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [settings, setSettings] = useState<MarketplaceSettings | null>(null);
  const [favorites, setFavorites] = useState<Template[]>([]);

  // Error Handler
  const handleError = (error: any) => {
    console.error('Marketplace Error:', error);
    setError(error.message || 'An error occurred');
    setLoading(false);
  };

  // Template Operations
  const loadTemplates = useCallback(async (filters?: MarketplaceFilters) => {
    try {
      setLoading(true);
      setError(null);
      const response = await marketplaceService.getTemplates(filters);
      if (response.success && response.data) {
        setTemplates(response.data);
      } else {
        setError(response.error || 'Failed to load templates');
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getTemplateById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const response = await marketplaceService.getTemplateById(id);
      if (response.success && response.data) {
        setSelectedTemplate(response.data);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTemplate = useCallback(async (template: Partial<Template>) => {
    try {
      setLoading(true);
      const response = await marketplaceService.createTemplate(template);
      if (response.success && response.data) {
        setTemplates(prev => [...prev, response.data!]);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTemplate = useCallback(async (id: string, template: Partial<Template>) => {
    try {
      setLoading(true);
      const response = await marketplaceService.updateTemplate(id, template);
      if (response.success && response.data) {
        setTemplates(prev => prev.map(t => t.id === id ? response.data! : t));
        if (selectedTemplate?.id === id) {
          setSelectedTemplate(response.data);
        }
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [selectedTemplate?.id]);

  const deleteTemplate = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const response = await marketplaceService.deleteTemplate(id);
      if (response.success) {
        setTemplates(prev => prev.filter(t => t.id !== id));
        if (selectedTemplate?.id === id) {
          setSelectedTemplate(null);
        }
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [selectedTemplate?.id]);

  // Developer Profile Operations
  const loadDeveloperProfile = useCallback(async (developerId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await marketplaceService.getDeveloperProfile(developerId);
      
      if (!response) {
        throw new Error('No se recibió respuesta del servidor');
      }

      if (response.success && response.data) {
        setDeveloperProfile(response.data);
      } else {
        const errorMessage = response.error || 'Error al cargar el perfil del desarrollador';
        setError(errorMessage);
        setDeveloperProfile(null);
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Error inesperado al cargar el perfil';
      setError(errorMessage);
      setDeveloperProfile(null);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateDeveloperProfile = useCallback(async (id: string, profile: Partial<DeveloperProfile>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await marketplaceService.updateDeveloperProfile(id, profile);
      if (response.success) {
        await loadDeveloperProfile(id); // Recargar el perfil después de actualizar
      } else {
        setError(response.error || 'Failed to update developer profile');
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [loadDeveloperProfile]);

  // Order Operations
  const loadOrders = useCallback(async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const response = await marketplaceService.getOrders(user.id);
      if (response.success && response.data) {
        setOrders(response.data);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const getOrderById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const response = await marketplaceService.getOrderById(id);
      if (response.success && response.data) {
        setSelectedOrder(response.data);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createOrder = useCallback(async (order: Partial<Order>) => {
    try {
      setLoading(true);
      const response = await marketplaceService.createOrder(order);
      if (response.success && response.data) {
        setOrders(prev => [...prev, response.data!]);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateOrderStatus = useCallback(async (id: string, status: Order['status']) => {
    try {
      setLoading(true);
      const response = await marketplaceService.updateOrderStatus(id, status);
      if (response.success && response.data) {
        setOrders(prev => prev.map(o => o.id === id ? response.data! : o));
        if (selectedOrder?.id === id) {
          setSelectedOrder(response.data);
        }
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, [selectedOrder?.id]);

  // Review Operations
  const loadReviews = useCallback(async (templateId: string) => {
    try {
      setLoading(true);
      const response = await marketplaceService.getReviews(templateId);
      if (response.success && response.data) {
        setReviews(response.data);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createReview = useCallback(async (review: Partial<Review>) => {
    try {
      setLoading(true);
      const response = await marketplaceService.createReview(review);
      if (response.success && response.data) {
        setReviews(prev => [...prev, response.data!]);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const replyToReview = useCallback(async (reviewId: string, reply: string) => {
    try {
      setLoading(true);
      const response = await marketplaceService.replyToReview(reviewId, reply);
      if (response.success && response.data) {
        setReviews(prev => prev.map(r => r.id === reviewId ? response.data! : r));
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Analytics Operations
  const loadAnalytics = useCallback(async (timeRange: string = '7d') => {
    try {
      setLoading(true);
      setError(null);
      const response = await marketplaceService.getAnalytics(timeRange);
      if (response.success && response.data) {
        setAnalytics(response.data);
      } else {
        setError(response.error || 'Failed to load analytics');
        setAnalytics(null);
      }
    } catch (error) {
      handleError(error);
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Promotion Operations
  const loadPromotions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await marketplaceService.getPromotions();
      if (response.success) {
        setPromotions(response.data);
      } else if (response.error) {
        handleError(new Error(response.error));
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createPromotion = useCallback(async (promotion: Partial<Promotion>) => {
    try {
      setLoading(true);
      const response = await marketplaceService.createPromotion(promotion as Omit<Promotion, 'id'>);
      if (response.success && response.data) {
        setPromotions(prev => [...prev, response.data]);
      } else if (response.error) {
        handleError(new Error(response.error));
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePromotion = useCallback(async (id: string, promotion: Partial<Promotion>) => {
    try {
      setLoading(true);
      const response = await marketplaceService.updatePromotion(id, promotion);
      if (response.success && response.data) {
        setPromotions(prev => prev.map(p => p.id === id ? response.data! : p));
      } else if (response.error) {
        handleError(new Error(response.error));
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePromotion = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const response = await marketplaceService.deletePromotion(id);
      if (response.success) {
        setPromotions(prev => prev.filter(p => p.id !== id));
      } else if (response.error) {
        handleError(new Error(response.error));
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Settings Operations
  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await marketplaceService.getSettings();
      if (response.success && response.data) {
        setSettings(response.data);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSettings = useCallback(async (newSettings: Partial<MarketplaceSettings>) => {
    try {
      setLoading(true);
      const response = await marketplaceService.updateSettings(newSettings);
      if (response.success && response.data) {
        setSettings(response.data);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Favorites Operations
  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await marketplaceService.getFavorites();
      if (response.success && response.data) {
        setFavorites(response.data);
      } else {
        setError(response.error || 'Failed to load favorites');
        setFavorites([]); // Asegurarnos de que favorites siempre sea un array
      }
    } catch (error) {
      handleError(error);
      setFavorites([]); // Asegurarnos de que favorites siempre sea un array
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    // Templates
    templates,
    selectedTemplate,
    loadTemplates,
    getTemplateById,
    createTemplate,
    updateTemplate,
    deleteTemplate,

    // Developer Profile
    developerProfile,
    loadDeveloperProfile,
    updateDeveloperProfile,

    // Orders
    orders,
    selectedOrder,
    createOrder,
    loadOrders,
    getOrderById,
    updateOrderStatus,

    // Reviews
    reviews,
    createReview,
    loadReviews,
    replyToReview,

    // Analytics
    analytics,
    loadAnalytics,

    // Promotions
    promotions,
    selectedPromotion,
    createPromotion,
    loadPromotions,
    updatePromotion,
    deletePromotion,

    // Settings
    settings,
    loadSettings,
    updateSettings,

    // Favorites
    favorites,
    loadFavorites,

    // Loading States
    loading,
    error
  };

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}
