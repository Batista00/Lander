export type PlanId = 'free' | 'pro' | 'enterprise';

export type BillingPeriod = 'monthly' | 'yearly';

export interface Plan {
  id: PlanId;
  name: string;
  description: string;
  price: number;
  features: string[];
  billingPeriod: BillingPeriod;
}

export interface UserPlan {
  planId: PlanId;
  billingPeriod: BillingPeriod;
  startDate: string;
  endDate: string;
  status: 'active' | 'cancelled' | 'expired';
}

export interface UserPlanUpdate {
  planId?: PlanId;
  billingPeriod?: BillingPeriod;
  startDate?: string;
  endDate?: string;
  status?: 'active' | 'cancelled' | 'expired';
}
