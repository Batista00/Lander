export type PlanType = 'free' | 'premium' | 'enterprise';

export interface Plan {
  id: PlanType;
  name: string;
  price: number;
  features: string[];
}

export interface UserPlan {
  planId: PlanType;
  startDate: Date;
  endDate?: Date | null;
  status: 'active' | 'cancelled' | 'expired';
}
