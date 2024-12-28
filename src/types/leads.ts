import { Timestamp } from 'firebase/firestore';

export enum LeadStatus {
  New = 'new',
  Contacted = 'contacted',
  Qualified = 'qualified',
  Opportunity = 'opportunity',
  Customer = 'customer',
  Lost = 'lost',
  Nurturing = 'nurturing'
}

export interface LeadSource {
  url: string;
  campaign?: string;
  medium?: string;
  source?: string;
  utmParams: Record<string, string>;
}

export interface LeadMetadata {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  source: LeadSource;
  tags?: string[];
  score?: number;
  lastActivity?: Timestamp;
}

export interface LeadAutomation {
  workflowId?: string;
  stage?: string;
  nextAction?: {
    type: 'email' | 'notification' | 'task';
    scheduledFor: Timestamp;
    completed: boolean;
  };
}

export interface Lead {
  id?: string;
  landingPageId: string;
  data: Record<string, string>;
  status: LeadStatus;
  createdAt: any;
  updatedAt: any;
  tags?: string[];
  assignedTo?: string;
  notes?: string[];
}

export interface LeadFormConfig {
  title: string;
  description?: string;
  fields: LeadFormField[];
  submitText: string;
  successMessage: string;
  errorMessage?: string;
  layout: 'vertical' | 'horizontal';
  redirectUrl?: string;
  tags?: string[];
  workflow?: string;
  notifications?: {
    email?: string[];
    slack?: string;
    webhook?: string;
  };
  tracking?: {
    enableGoogleAnalytics?: boolean;
    enableFacebookPixel?: boolean;
    customScripts?: string[];
  };
}

export interface LeadFormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio';
  required: boolean;
  placeholder?: string;
  options?: string[]; // Para select, checkbox y radio
  validation?: {
    pattern?: string;
    message?: string;
    minLength?: number;
    maxLength?: number;
  };
}
