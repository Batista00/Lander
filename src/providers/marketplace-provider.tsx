"use client";

import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Template {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  sales: number;
  seller: {
    id: string;
    name: string;
    rating: number;
  };
  category: string;
  status: 'draft' | 'published' | 'archived';
}

interface CommissionSettings {
  baseCommission: number;
  categoryCommissions: Record<string, number>;
  volumeDiscounts: Array<{
    minSales: number;
    commission: number;
  }>;
}

interface MarketplaceState {
  commissionSettings: CommissionSettings;
  filters: {
    category: string | null;
    search: string;
    sort: "newest" | "popular" | "price-low" | "price-high";
  };
  templates: Template[];
  loading: boolean;
  error: string | null;
}

const initialState: MarketplaceState = {
  commissionSettings: {
    baseCommission: 10,
    categoryCommissions: {
      "landing-pages": 15,
      templates: 12,
      components: 8,
    },
    volumeDiscounts: [
      { minSales: 10, commission: 8 },
      { minSales: 50, commission: 6 },
      { minSales: 100, commission: 5 },
    ],
  },
  filters: {
    category: null,
    search: "",
    sort: "newest",
  },
  templates: [],
  loading: false,
  error: null,
};

type MarketplaceAction =
  | { type: "SET_CATEGORY"; payload: string | null }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_SORT"; payload: "newest" | "popular" | "price-low" | "price-high" }
  | { type: "UPDATE_COMMISSION_SETTINGS"; payload: Partial<CommissionSettings> }
  | { type: "SET_TEMPLATES"; payload: Template[] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

const MarketplaceContext = createContext<{
  state: MarketplaceState;
  dispatch: React.Dispatch<MarketplaceAction>;
  loadTemplates: () => Promise<void>;
} | undefined>(undefined);

function marketplaceReducer(state: MarketplaceState, action: MarketplaceAction): MarketplaceState {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, filters: { ...state.filters, category: action.payload } };
    case "SET_SEARCH":
      return { ...state, filters: { ...state.filters, search: action.payload } };
    case "SET_SORT":
      return { ...state, filters: { ...state.filters, sort: action.payload } };
    case "UPDATE_COMMISSION_SETTINGS":
      return {
        ...state,
        commissionSettings: { ...state.commissionSettings, ...action.payload },
      };
    case "SET_TEMPLATES":
      return { ...state, templates: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function MarketplaceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(marketplaceReducer, initialState);

  const loadTemplates = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      const templatesRef = collection(db, 'marketplace_templates');
      let templatesQuery = query(templatesRef);

      // Aplicar filtros
      if (state.filters.category) {
        templatesQuery = query(templatesQuery, where('category', '==', state.filters.category));
      }

      // Aplicar ordenamiento
      switch (state.filters.sort) {
        case 'newest':
          templatesQuery = query(templatesQuery, orderBy('createdAt', 'desc'));
          break;
        case 'popular':
          templatesQuery = query(templatesQuery, orderBy('sales', 'desc'));
          break;
        case 'price-low':
          templatesQuery = query(templatesQuery, orderBy('price', 'asc'));
          break;
        case 'price-high':
          templatesQuery = query(templatesQuery, orderBy('price', 'desc'));
          break;
      }

      const querySnapshot = await getDocs(templatesQuery);
      const templates = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Template[];

      // Aplicar búsqueda local
      const filteredTemplates = state.filters.search
        ? templates.filter(template =>
            template.title.toLowerCase().includes(state.filters.search.toLowerCase()) ||
            template.description.toLowerCase().includes(state.filters.search.toLowerCase())
          )
        : templates;

      dispatch({ type: "SET_TEMPLATES", payload: filteredTemplates });
    } catch (error) {
      console.error('Error loading templates:', error);
      dispatch({ type: "SET_ERROR", payload: error instanceof Error ? error.message : 'Error loading templates' });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Cargar templates cuando cambian los filtros
  useEffect(() => {
    loadTemplates();
  }, [state.filters]);

  return (
    <MarketplaceContext.Provider value={{ state, dispatch, loadTemplates }}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (context === undefined) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return context;
}
