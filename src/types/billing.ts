import { Plan } from './plans';
import { PaymentStatus } from './payment';
import { PlanId, BillingPeriod } from './plans';

export interface BillingDetails {
  name: string;
  taxId?: string;  // RUT/CUIT/NIT según el país
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  email: string;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface Invoice {
  id: string;
  number: string;
  date: Date;
  dueDate: Date;
  amount: number;
  status: PaymentStatus;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  billingDetails: BillingDetails;
  downloadUrl?: string;
}

export interface BillingSettings {
  autoRenew: boolean;
  defaultPaymentMethod?: string;
  billingDetails: BillingDetails;
  notificationPreferences: {
    paymentReminders: boolean;
    receiveInvoices: boolean;
    trialEndReminders: boolean;
  };
}

export interface BillingInfo {
  planId: PlanId;
  billingPeriod: BillingPeriod;
  nextBillingDate: string;
  lastPaymentStatus: PaymentStatus;
  lastPaymentDate: string;
  amount: number;
}

export interface BillingHistory {
  payments: {
    id: string;
    date: string;
    amount: number;
    status: PaymentStatus;
    description: string;
  }[];
}
