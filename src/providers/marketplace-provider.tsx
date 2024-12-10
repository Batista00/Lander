"use client";

import { createContext, useContext, useReducer } from "react";

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
}

const initialState: MarketplaceState = {
  commissionSettings: {
    baseCommission: 10, // 10% comisión base
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
};

type MarketplaceAction =
  | { type: "SET_CATEGORY"; payload: string | null }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_SORT"; payload: "newest" | "popular" | "price-low" | "price-high" }
  | { type: "UPDATE_COMMISSION_SETTINGS"; payload: Partial<CommissionSettings> };

const MarketplaceContext = createContext<{
  state: MarketplaceState;
  dispatch: React.Dispatch<MarketplaceAction>;
} | null>(null);

function marketplaceReducer(
  state: MarketplaceState,
  action: MarketplaceAction
): MarketplaceState {
  switch (action.type) {
    case "SET_CATEGORY":
      return {
        ...state,
        filters: { ...state.filters, category: action.payload },
      };
    case "SET_SEARCH":
      return {
        ...state,
        filters: { ...state.filters, search: action.payload },
      };
    case "SET_SORT":
      return {
        ...state,
        filters: { ...state.filters, sort: action.payload },
      };
    case "UPDATE_COMMISSION_SETTINGS":
      return {
        ...state,
        commissionSettings: {
          ...state.commissionSettings,
          ...action.payload,
        },
      };
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

  return (
    <MarketplaceContext.Provider value={{ state, dispatch }}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplace must be used within a MarketplaceProvider");
  }
  return context;
}
