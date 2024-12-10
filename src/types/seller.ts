export type SellerTier = 'NUEVO' | 'VERIFICADO' | 'EXPERTO' | 'ELITE';

export interface SellerRating {
  overall: number;          // Calificación general (1-5)
  productQuality: number;   // Calidad de productos
  communication: number;    // Comunicación con clientes
  delivery: number;         // Tiempo de entrega/respuesta
  support: number;         // Soporte post-venta
  totalReviews: number;    // Número total de reseñas
}

export interface SellerAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface SellerMetrics {
  totalSales: number;
  totalRevenue: number;
  averageRating: number;
  responseRate: number;
  responseTime: number;  // en minutos
  completionRate: number;
  refundRate: number;
}

export interface SellerTierRequirements {
  tier: SellerTier;
  minSales: number;
  minRating: number;
  maxRefundRate: number;
  minResponseRate: number;
  maxResponseTime: number;
  commission: number;  // Comisión aplicada a este nivel
  benefits: string[];
  icon: string;
}

export interface Seller {
  id: string;
  name: string;
  email: string;
  tier: SellerTier;
  rating: SellerRating;
  metrics: SellerMetrics;
  achievements: SellerAchievement[];
  joinedAt: Date;
  lastActive: Date;
  verified: boolean;
  featured: boolean;
}
