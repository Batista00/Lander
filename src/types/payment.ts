import { PlanId, BillingPeriod } from './plans';

export type PaymentStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card';
  last4: string;
  brand: string;
  expMonth: number;
  expYear: number;
}

export interface PaymentPreference {
  items: {
    title: string;
    quantity: number;
    unitPrice: number;
    description?: string;
  }[];
  metadata?: {
    userId: string;
    planId: PlanId;
    billingPeriod: BillingPeriod;
  };
  backUrls?: {
    success: string;
    failure: string;
    pending: string;
  };
}

export interface Payment {
  id: string;
  status: PaymentStatus;
  amount: number;
  userId: string;
  planId: PlanId;
  billingPeriod: BillingPeriod;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: PlanId;
  billingPeriod: BillingPeriod;
  status: 'active' | 'cancelled' | 'expired';
  amount: number;
  startDate: string;
  endDate: string;
  lastPaymentDate: string;
  nextPaymentDate: string;
}

export interface PaymentHistory {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'approved' | 'rejected';
  date: Date;
  description: string;
  paymentMethod: {
    type: string;
    last4: string;
  };
}

export interface CheckoutSession {
  id: string;
  planId: PlanId;
  billing: BillingPeriod;
  trialDays: number;
  successUrl: string;
  cancelUrl: string;
  preferenceId?: string; // MercadoPago preference ID
}
