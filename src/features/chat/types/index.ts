export enum ChatbotType {
  BASIC = 'basic',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise'
}

export enum ChatbotStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  MAINTENANCE = 'maintenance'
}

export interface ChatbotConfig {
  id: string;
  name: string;
  type: ChatbotType;
  status: ChatbotStatus;
  workingHours: {
    start: string;
    end: string;
    timezone: string;
    days: number[];
  };
  languages: string[];
  personality?: {
    tone: string;
    style: string;
    context: string;
  };
  features: {
    multilingual: boolean;
    humanHandoff: boolean;
    analytics: boolean;
    crm: boolean;
    customization: boolean;
  };
  prompts: {
    greeting: string;
    farewell: string;
    fallback: string;
    handoff: string;
  };
  integration: {
    channels: string[];
    apis: string[];
    webhooks: string[];
  };
  analytics: {
    enabled: boolean;
    metrics: string[];
    events: string[];
  };
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: {
    sentiment?: string;
    intent?: string;
    confidence?: number;
    language?: string;
  };
}

export interface Conversation {
  id: string;
  userId?: string;
  chatbotId: string;
  messages: Message[];
  status: 'active' | 'closed' | 'transferred';
  startedAt: Date;
  endedAt?: Date;
  metadata?: {
    userAgent?: string;
    location?: string;
    referrer?: string;
    sessionDuration?: number;
  };
}
