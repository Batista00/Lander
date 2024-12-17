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
} from '../../types/marketplace';

class MarketplaceService {
  private baseUrl = '/api/marketplace';

  // Template Operations
  async getTemplates(filters?: MarketplaceFilters): Promise<ApiResponse<Template[]>> {
    const queryParams = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, JSON.stringify(value));
      });
    }
    const response = await fetch(`${this.baseUrl}/templates?${queryParams}`);
    return response.json();
  }

  async getTemplateById(id: string): Promise<ApiResponse<Template>> {
    const response = await fetch(`${this.baseUrl}/templates/${id}`);
    return response.json();
  }

  async createTemplate(template: Partial<Template>): Promise<ApiResponse<Template>> {
    const response = await fetch(`${this.baseUrl}/templates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(template)
    });
    return response.json();
  }

  async updateTemplate(id: string, template: Partial<Template>): Promise<ApiResponse<Template>> {
    const response = await fetch(`${this.baseUrl}/templates/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(template)
    });
    return response.json();
  }

  async deleteTemplate(id: string): Promise<ApiResponse<void>> {
    const response = await fetch(`${this.baseUrl}/templates/${id}`, {
      method: 'DELETE'
    });
    return response.json();
  }

  // Developer Profile Operations
  async getDeveloperProfile(id: string): Promise<ApiResponse<DeveloperProfile>> {
    const response = await fetch(`${this.baseUrl}/developers/${id}`);
    return response.json();
  }

  async updateDeveloperProfile(id: string, profile: Partial<DeveloperProfile>): Promise<ApiResponse<DeveloperProfile>> {
    const response = await fetch(`${this.baseUrl}/developers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    return response.json();
  }

  // Order Operations
  async createOrder(order: Partial<Order>): Promise<ApiResponse<Order>> {
    const response = await fetch(`${this.baseUrl}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    return response.json();
  }

  async getOrders(userId: string): Promise<ApiResponse<Order[]>> {
    const response = await fetch(`${this.baseUrl}/orders?userId=${userId}`);
    return response.json();
  }

  async getOrderById(id: string): Promise<ApiResponse<Order>> {
    const response = await fetch(`${this.baseUrl}/orders/${id}`);
    return response.json();
  }

  async updateOrderStatus(id: string, status: Order['status']): Promise<ApiResponse<Order>> {
    const response = await fetch(`${this.baseUrl}/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return response.json();
  }

  // Review Operations
  async createReview(review: Partial<Review>): Promise<ApiResponse<Review>> {
    const response = await fetch(`${this.baseUrl}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    return response.json();
  }

  async getReviews(templateId: string): Promise<ApiResponse<Review[]>> {
    const response = await fetch(`${this.baseUrl}/reviews?templateId=${templateId}`);
    return response.json();
  }

  async replyToReview(reviewId: string, reply: string): Promise<ApiResponse<Review>> {
    const response = await fetch(`${this.baseUrl}/reviews/${reviewId}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply })
    });
    return response.json();
  }

  // Analytics Operations
  async getAnalytics(userId: string, period?: string): Promise<ApiResponse<MarketplaceAnalytics>> {
    const response = await fetch(`${this.baseUrl}/analytics/${userId}${period ? `?period=${period}` : ''}`);
    return response.json();
  }

  // Promotion Operations
  async createPromotion(promotion: Partial<Promotion>): Promise<ApiResponse<Promotion>> {
    const response = await fetch(`${this.baseUrl}/promotions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(promotion)
    });
    return response.json();
  }

  async getPromotions(): Promise<ApiResponse<Promotion[]>> {
    const response = await fetch(`${this.baseUrl}/promotions`);
    return response.json();
  }

  async updatePromotion(id: string, promotion: Partial<Promotion>): Promise<ApiResponse<Promotion>> {
    const response = await fetch(`${this.baseUrl}/promotions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(promotion)
    });
    return response.json();
  }

  // Settings Operations
  async getSettings(): Promise<ApiResponse<MarketplaceSettings>> {
    const response = await fetch(`${this.baseUrl}/settings`);
    return response.json();
  }

  async updateSettings(settings: Partial<MarketplaceSettings>): Promise<ApiResponse<MarketplaceSettings>> {
    const response = await fetch(`${this.baseUrl}/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    return response.json();
  }
}

export const marketplaceService = new MarketplaceService();
