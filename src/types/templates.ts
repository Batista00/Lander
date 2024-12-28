export type DeviceCompatibility = 'desktop' | 'tablet' | 'mobile';
export type TemplateObjective = 'sales' | 'leads' | 'branding' | 'education' | 'events' | 'appointments';
export type TemplateIndustry = 'technology' | 'healthcare' | 'education' | 'ecommerce' | 'services' | 'creative' | 'beauty' | 'construction' | 'startup' | 'food';
export type ImplementationTime = 'quick' | 'medium' | 'extensive';
export type CustomizationLevel = 'basic' | 'intermediate' | 'advanced';

export interface TemplateFeature {
  id: string;
  name: string;
  type: 'form' | 'gallery' | 'video' | 'map' | 'social' | 'analytics';
}

export interface TemplateAnalytics {
  views: number;
  favorites: number;
  implementations: number;
  averageRating: number;
  seoScore: number;
  conversionRate?: number;
}

export interface TemplateSEO {
  score: number;
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export interface TemplateCustomization {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  spacing: {
    unit: number;
    scale: number;
  };
}

export interface TemplateSection {
  name: string;
  description: string;
  thumbnail: string;
  preview: string;
  features: TemplateFeature[];
  seoScore?: number;
  content?: Record<string, any>;
}

export interface TemplateAssets {
  images: {
    url: string;
    type: 'hero' | 'background' | 'content';
    tags: string[];
  }[];
  colorPalettes: {
    name: string;
    colors: string[];
  }[];
  icons: {
    url: string;
    category: string;
  }[];
}

export interface TemplateIntegrations {
  cms: {
    name: string;
    compatibility: string;
  }[];
  apis: {
    name: string;
    documentation: string;
  }[];
  plugins: {
    name: string;
    description: string;
    url: string;
  }[];
}

export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  rating: number;
  uses: number;
  premium: boolean;
  price?: number | { regular: number; sale?: number };
  objective: TemplateObjective;
  industry: TemplateIndustry;
  implementationTime: ImplementationTime;
  customizationLevel: CustomizationLevel;
  features: TemplateFeature[];
  tags: string[];
  analytics: TemplateAnalytics;
  seoDetails: TemplateSEO;
  deviceCompatibility: DeviceCompatibility[];
  customization: TemplateCustomization;
  sections: TemplateSection[];
  assets?: TemplateAssets;
  integrations?: TemplateIntegrations;
  createdAt: string;
  updatedAt: string;
  trending?: boolean;
  featured?: boolean;
  weeklyHighlight?: boolean;
  discountedPrice?: number;
}

export interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon?: string;
  featured?: boolean;
  templates?: number; // Cantidad de templates en esta categoría
}

export interface UserTemplatePreferences {
  favorites: string[];
  viewHistory: {
    templateId: string;
    lastViewed: string;
    timeSpent: number;
  }[];
  customizations: {
    templateId: string;
    colors: TemplateCustomization['colors'];
    fonts: TemplateCustomization['fonts'];
    logo?: string;
  }[];
  tags: {
    name: string;
    count: number;
  }[];
  industries: {
    name: TemplateIndustry;
    count: number;
  }[];
  objectives: {
    type: TemplateObjective;
    count: number;
  }[];
}
