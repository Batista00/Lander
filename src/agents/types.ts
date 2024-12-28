export interface AIAgent {
  id: string;
  name: string;
  type: AgentType;
  config: AgentConfig;
  status: AgentStatus;
}

export enum AgentType {
  CHAT = 'chat',
  BUILDER = 'builder',
  CONTENT = 'content',
  OPTIMIZATION = 'optimization',
  DESIGN = 'design'
}

export enum AgentStatus {
  IDLE = 'idle',
  WORKING = 'working',
  ERROR = 'error'
}

export interface AgentConfig {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  customInstructions?: string;
  apiKey?: string;
}

export interface ChatAgentConfig extends AgentConfig {
  welcomeMessage?: string;
  personality?: string;
  knowledgeBase?: string[];
  responseTime?: number;
}

export interface BuilderAgentConfig extends AgentConfig {
  templates?: string[];
  stylePreferences?: string[];
  industryContext?: string;
}

export interface ContentAgentConfig extends AgentConfig {
  tone?: string;
  industry?: string;
  targetAudience?: string;
  contentTypes?: string[];
}

export interface OptimizationAgentConfig extends AgentConfig {
  metrics?: string[];
  goals?: string[];
  constraints?: string[];
}

export interface DesignAgentConfig extends AgentConfig {
  styleGuide?: string;
  colorPalette?: string[];
  typography?: string[];
  spacing?: string[];
}

export interface AgentResponse {
  success: boolean;
  data?: any;
  error?: string;
  metadata?: {
    processingTime?: number;
    modelUsed?: string;
    tokensUsed?: number;
  };
}
