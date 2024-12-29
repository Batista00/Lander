// Tipos para el contexto de negocio
export interface BusinessContext {
  industry: string;
  goals: string[];
  audience: string;
  brand: {
    tone: string;
    values: string[];
  };
}

// Tipos para análisis de IA
export interface AIAnalysis {
  industry: {
    match: number;
    reasons: string[];
  };
  conversion: {
    potential: number;
    strengths: string[];
    weaknesses: string[];
  };
  seo: {
    score: number;
    suggestions: string[];
  };
}

// Tipos para recomendaciones de IA
export interface AIRecommendation {
  templateId: string;
  score: number;
  reasons: string[];
  suggestedCustomizations: {
    layout: string[];
    content: string[];
    style: string[];
  };
}

// Tipos para optimizaciones de IA
export interface AIOptimization {
  type: 'content' | 'design' | 'conversion' | 'seo';
  priority: 'high' | 'medium' | 'low';
  suggestion: string;
  impact: string;
  implementation: string;
}

// Tipos para sugerencias de contenido
export interface AIContentSuggestion {
  type: 'headline' | 'description' | 'cta' | 'feature' | 'benefit';
  content: string;
  confidence: number;
  alternatives: string[];
}

// Tipos para análisis de componentes
export interface AIComponentAnalysis {
  type: string;
  effectiveness: number;
  suggestions: string[];
  alternatives: {
    type: string;
    reason: string;
  }[];
}

// Tipos para A/B Testing
export interface AITestSuggestion {
  element: string;
  currentVersion: string;
  proposedVersion: string;
  hypothesis: string;
  expectedImprovement: number;
  confidence: number;
}

// Tipos para analytics mejorados
export interface AIEnhancedAnalytics {
  metrics: {
    views: number;
    conversions: number;
    bounceRate: number;
    avgTimeOnPage: number;
  };
  insights: {
    type: 'positive' | 'negative' | 'neutral';
    metric: string;
    description: string;
    suggestion?: string;
  }[];
  predictions: {
    metric: string;
    current: number;
    predicted: number;
    confidence: number;
  }[];
  segments: {
    name: string;
    size: number;
    conversionRate: number;
    characteristics: string[];
  }[];
}

// Tipos para el asistente de IA
export interface AIAssistant {
  mode: 'active' | 'passive';
  context: BusinessContext;
  suggestions: {
    id: string;
    type: 'content' | 'design' | 'optimization';
    content: string;
    timestamp: Date;
    applied: boolean;
  }[];
  history: {
    action: string;
    timestamp: Date;
    result: string;
  }[];
}

// Tipos para la personalización de IA
export interface AIPersonalization {
  rules: {
    condition: string;
    action: string;
    priority: number;
  }[];
  segments: {
    id: string;
    name: string;
    criteria: string[];
  }[];
  variants: {
    id: string;
    componentId: string;
    content: any;
    targetSegment: string;
  }[];
}

// Tipos para el editor con IA
export interface AIEditorState {
  activeComponent: string | null;
  suggestions: AIContentSuggestion[];
  analysis: AIComponentAnalysis | null;
  history: {
    action: string;
    timestamp: Date;
    componentId: string;
  }[];
  autoSave: boolean;
  undoStack: any[];
  redoStack: any[];
}

// Tipos para la configuración de IA
export interface AIConfig {
  features: {
    contentGeneration: boolean;
    designSuggestions: boolean;
    analytics: boolean;
    abTesting: boolean;
    personalization: boolean;
  };
  preferences: {
    suggestionFrequency: 'high' | 'medium' | 'low';
    autoApply: boolean;
    notifyOnInsights: boolean;
  };
  limits: {
    maxSuggestionsPerSession: number;
    maxGenerationsPerDay: number;
    maxOptimizationsPerPage: number;
  };
}

// Estado global de la IA
export interface AIState {
  businessContext: string | null;
  activeComponent: any | null;
  suggestions: any[];
  analysis: any | null;
  loading: boolean;
  error: string | null;
  config: {
    mode: 'active' | 'passive';
    autoSuggest: boolean;
    language: string;
  };
  assistant: {
    active: boolean;
    messages: any[];
  };
}

// Acciones de la IA
export interface AIAction {
  type: 
    | 'SET_BUSINESS_CONTEXT' 
    | 'SET_ACTIVE_COMPONENT' 
    | 'SET_SUGGESTIONS' 
    | 'SET_ANALYSIS' 
    | 'SET_LOADING' 
    | 'SET_ERROR' 
    | 'UPDATE_CONFIG'
    | 'UPDATE_ASSISTANT';
  payload: any;
}
