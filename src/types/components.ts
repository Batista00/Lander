import { HeroProps, FeaturesProps, BenefitsProps, CTAProps } from '@/components/page-builder/components/base';

// Interfaces específicas para cada tipo de componente
export interface HeroContent {
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonStyle?: 'primary' | 'secondary' | 'outline';
  layout?: 'center' | 'left' | 'right';
  backgroundImage?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

export interface FeaturesContent {
  title: string;
  description?: string;
  features: Feature[];
  layout?: 'grid' | 'list';
  columns?: 2 | 3 | 4;
}

export interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
}

export interface PricingContent {
  title: string;
  description?: string;
  plans: Plan[];
  layout?: 'horizontal' | 'vertical';
}

export interface Author {
  name: string;
  title?: string;
  avatar?: string;
}

export interface Testimonio {
  id: string;
  author: Author;
  content: string;
  rating?: number;
  date?: string;
  verified?: boolean;
}

export interface TestimoniosContent {
  title: string;
  description?: string;
  testimonios: Testimonio[];
  layout?: 'grid' | 'list' | 'carousel';
  theme?: 'light' | 'dark' | 'modern';
  showRating?: boolean;
  showDate?: boolean;
  showVerified?: boolean;
  itemsPerPage?: number;
}

export interface FormField {
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'radio';
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: string }[];
}

export interface FormContent {
  title: string;
  description?: string;
  fields: FormField[];
  submitButton?: {
    text: string;
    style?: 'primary' | 'secondary' | 'outline';
  };
  successMessage?: string;
  errorMessage?: string;
}

export interface AboutContent {
  heading: string;
  text: string;
  features: {
    title: string;
    description: string;
  }[];
}

export interface ContactContent {
  heading: string;
  text: string;
  email: string;
  phone: string;
  address: string;
}

export interface ComponentBase {
  id: string;
  type: 'hero' | 'features' | 'benefits' | 'cta';
}

export interface HeroComponent extends ComponentBase {
  type: 'hero';
  props: HeroProps;
}

export interface FeaturesComponent extends ComponentBase {
  type: 'features';
  props: FeaturesProps;
}

export interface BenefitsComponent extends ComponentBase {
  type: 'benefits';
  props: BenefitsProps;
}

export interface CTAComponent extends ComponentBase {
  type: 'cta';
  props: CTAProps;
}

export type BaseComponent = 
  | HeroComponent 
  | FeaturesComponent 
  | BenefitsComponent 
  | CTAComponent;

export interface ComponentVariant {
  name: string;
  description: string;
  styles?: {
    colors?: {
      background?: string;
      text?: string;
      accent?: string;
      iconBackground?: string;
      cardBackground?: string;
    };
    typography?: {
      titleSize?: string;
      subtitleSize?: string;
      descriptionSize?: string;
      featureTitleSize?: string;
      featureDescriptionSize?: string;
      textAlign?: 'center' | 'left' | 'right';
    };
    spacing?: {
      padding?: string;
      gap?: string;
    };
    layout?: {
      columns?: number;
      rows?: number;
      alignment?: 'center' | 'left' | 'right';
    };
    effects?: {
      cardShadow?: string;
      cardRadius?: string;
      transition?: string;
    };
  };
  defaultContent?: Record<string, any>;
}

// Interfaz para las propiedades de los componentes en el editor
export interface ComponentEditorProps {
  component: BaseComponent;
  mode?: 'preview' | 'published' | 'edit';
  onChange?: (component: BaseComponent) => void;
  themeStyles?: string;
  isPremium?: boolean;
}

// Interfaz para el registro de componentes
export interface ComponentRegistryItem {
  component: React.ComponentType<ComponentEditorProps>;
  name: string;
  description: string;
  defaultContent: any;
  category?: 'basic' | 'premium';
  tags?: string[];
}

export interface ComponentRegistry {
  [key: string]: ComponentRegistryItem;
}
