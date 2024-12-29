// Tipos básicos para componentes
export type ComponentType = 'hero' | 'features' | 'benefits' | 'cta';

// Business Context Types
export interface Brand {
  tone: string;
  values: string[];
}

export interface BusinessContext {
  businessName: string;
  industry: string;
  description: string;
  goals: string[];
  audience: string;
  brand: Brand;
}

// AI Recommendation Types
export interface AIRecommendation {
  templateId: string;
  name: string;
  description: string;
  confidence: number;
  reasoning: string;
}

// Estilos
export interface ButtonStyle {
  background: string;
  color: string;
  hoverEffect: string;
}

export interface SectionStyle {
  background: string;
  textColor: string;
  animation?: string;
}

// Contenido específico para cada tipo de componente
export interface ImageStyle {
  url: string;
  borderRadius?: string;
  boxShadow?: string;
}

export interface ComponentStyle {
  background?: string;
  textColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  color?: string;
  image?: ImageStyle;
  cardBackground?: string;
  iconColor?: string;
  iconBackground?: string;
}

export interface HeroContent {
  title: string;
  description: string;
  cta: string;
  style: SectionStyle & {
    ctaStyle: ButtonStyle;
  };
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface FeaturesContent {
  title: string;
  features: Feature[];
  style: {
    background: string;
    cardBackground: string;
    iconColor: string;
    spacing: string;
  };
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface BenefitsContent {
  title: string;
  benefits: Benefit[];
  style: {
    background: string;
    textColor: string;
    iconBackground: string;
    iconColor: string;
  };
}

export interface CTAContent {
  title: string;
  description?: string;
  cta: string;
  style: SectionStyle & {
    ctaStyle: ButtonStyle;
  };
}

export interface ComponentContent {
  title: string;
  description?: string;
  cta?: string;
  imageUrl?: string;
  style?: ComponentStyle;
  features?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  benefits?: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

// Estilos globales
export interface GlobalStyles {
  fontFamily: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  spacing: {
    section: string;
    element: string;
  };
}

// Tipo de unión para el contenido
export type ComponentContentType = 
  | { type: 'hero'; content: HeroContent }
  | { type: 'features'; content: FeaturesContent }
  | { type: 'benefits'; content: BenefitsContent }
  | { type: 'cta'; content: CTAContent }
  | { type: 'component'; content: ComponentContent };

// AI Component Types
export interface AIComponent {
  id: string;
  type: ComponentType;
  content: HeroContent | FeaturesContent | BenefitsContent | CTAContent | ComponentContent;
}

// Landing Page Types
export interface LandingPage {
  id: string;
  name: string;
  components: AIComponent[];
  businessContext: BusinessContext;
  status: 'draft' | 'published';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  globalStyles?: GlobalStyles;
  settings?: {
    seo?: {
      title?: string;
      description?: string;
      keywords?: string[];
    };
    analytics?: {
      enabled: boolean;
      trackingId?: string;
    };
  };
}
