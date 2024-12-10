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
  status: 'active' | 'draft' | 'review';
  createdAt: any;
  updatedAt: any;
}

export interface Seller {
  id: string;
  name: string;
  bio?: string;
  portfolio?: string;
  rating?: number;
  verified?: boolean;
}

export interface Order {
  id: string;
  templateId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: any;
  updatedAt: any;
}

export interface Review {
  id: string;
  templateId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: any;
}

export interface Analytics {
  totalSales: number;
  totalTemplates: number;
  totalOrders: number;
}
