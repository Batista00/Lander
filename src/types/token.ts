export interface TokenTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'purchase' | 'usage' | 'refund' | 'bonus' | 'referral';
  description: string;
  timestamp: Date;
  relatedEntityId?: string; // ID de la landing page o componente
  paymentId?: string; // ID de pago de Mercado Pago
}

export interface TokenBalance {
  available: number;
  lifetime: number;
  lastUpdated: Date;
}

export interface TokenPurchase {
  id: string;
  userId: string;
  amount: number;
  cost: number;
  status: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  createdAt: Date;
  completedAt?: Date;
}

export const TOKEN_COSTS = {
  ANALYZE_PAGE: 2,
  GENERATE_COMPONENT: 3,
  IMPROVE_COMPONENT: 1,
  SEO_OPTIMIZE: 2,
  STYLE_SUGGESTIONS: 1,
  CONTENT_SUGGESTIONS: 2
} as const;

export const TOKEN_PACKAGES = {
  STARTER: { amount: 20, price: 999 },    // $9.99 USD
  POPULAR: { amount: 100, price: 2999 },  // $29.99 USD
  PRO: { amount: 500, price: 9999 }       // $99.99 USD
} as const;

// Tokens gratuitos al registrarse
export const FREE_TOKENS = 5;
