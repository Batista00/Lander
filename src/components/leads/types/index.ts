export interface Lead {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  source: string;
  stage: LeadStage;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  customFields?: Record<string, any>;
}

export enum LeadStage {
  NEW = 'new',
  QUALIFIED = 'qualified',
  NURTURING = 'nurturing',
  OPPORTUNITY = 'opportunity',
  CUSTOMER = 'customer',
  LOST = 'lost'
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // Para campos select
  validation?: {
    pattern?: string;
    message?: string;
  };
}

export interface LeadForm {
  id: string;
  name: string;
  fields: FormField[];
  submitButtonText: string;
  successRedirect?: string;
  integrations?: {
    crm?: string;
    webhook?: string;
  };
}

export interface LeadMetrics {
  totalLeads: number;
  conversionRate: number;
  stageDistribution: Record<LeadStage, number>;
  sourceDistribution: Record<string, number>;
}
