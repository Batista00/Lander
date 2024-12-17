// Interfaces base para el Marketplace
export interface Template {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  features: string[];
  requirements: string[];
  includes: string[];
  compatibleWith: string[];
  version: string;
  previewUrl: string;
  templateUrl: string;
  sellerId: string;
  status: 'active' | 'draft' | 'review' | 'archived';
  rating?: number;
  totalSales?: number;
  createdAt: string;
  updatedAt: string;
}

export interface DeveloperProfile {
  id: string;
  userId: string;
  name: string;
  title: string;
  avatar: string;
  location: string;
  bio: string;
  rating: number;
  reviews: number;
  completedProjects: number;
  languages: Array<{ name: string; level: number }>;
  technologies: string[];
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    period: string;
    description: string;
  }>;
  portfolio: Array<{
    id: string;
    title: string;
    description: string;
    technologies: string[];
    link: string;
  }>;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    website?: string;
  };
  status: 'active' | 'inactive' | 'banned';
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  templateId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  paymentMethod: string;
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  templateId: string;
  userId: string;
  orderId: string;
  rating: number;
  comment: string;
  reply?: string;
  status: 'published' | 'pending' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface MarketplaceAnalytics {
  totalSales: number;
  salesTrend: number;
  totalOrders: number;
  ordersTrend: number;
  averageRating: number;
  ratingTrend: number;
  totalUsers: number;
  usersTrend: number;
  salesData: Array<{
    date: string;
    amount: number;
  }>;
  ordersData: Array<{
    date: string;
    count: number;
  }>;
  topTemplates: Array<{
    id: string;
    title: string;
    sales: number;
  }>;
  recentOrders: Array<{
    id: string;
    date: string;
    amount: number;
    templateId: string;
    templateTitle: string;
  }>;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  type: 'discount' | 'bundle' | 'flash_sale';
  discount: number;
  startDate: string;
  endDate: string;
  templateIds: string[];
  status: 'active' | 'scheduled' | 'ended' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface MarketplaceSettings {
  commissionRate: number;
  minimumPrice: number;
  maximumPrice: number;
  allowedCategories: string[];
  allowedTags: string[];
  allowedPaymentMethods: string[];
  reviewModeration: boolean;
  automaticPayouts: boolean;
  payoutThreshold: number;
  payoutSchedule: 'daily' | 'weekly' | 'monthly';
}

// Tipos de respuesta para las APIs
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

// Tipos para los filtros y búsqueda
export interface MarketplaceFilters {
  category?: string;
  tags?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  sortBy?: 'price' | 'rating' | 'sales' | 'newest';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
  search?: string;
}

// Tipos para los permisos
export type MarketplacePermission = 
  | 'view_templates'
  | 'create_template'
  | 'edit_template'
  | 'delete_template'
  | 'manage_orders'
  | 'manage_reviews'
  | 'manage_promotions'
  | 'view_analytics'
  | 'manage_settings';

export interface MarketplaceRole {
  id: string;
  name: string;
  permissions: MarketplacePermission[];
}

// Tipos para las notificaciones
export interface MarketplaceNotification {
  id: string;
  userId: string;
  type: 'order' | 'review' | 'promotion' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}
