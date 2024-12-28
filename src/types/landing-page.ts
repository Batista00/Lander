import { Timestamp } from 'firebase/firestore';

export type ComponentCategory = 'free' | 'premium' | 'cta';

export type ComponentType = 
  // Free Components
  | 'text' 
  | 'image' 
  | 'button' 
  | 'form' 
  | 'container'
  | 'hero'
  | 'header'
  | 'section'
  // Premium Components
  | 'features'
  | 'testimonials'
  | 'gallery'
  | 'pricing'
  | 'team'
  | 'faq'
  // CTA Components
  | 'newsletter'
  | 'contact'
  | 'booking'
  | 'products';

export interface LandingPage {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: 'draft' | 'published' | 'archived';
  components: LandingPageComponent[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;
  publishConfig?: {
    isPrivate: boolean;
    hasPassword: boolean;
    passwordHash?: string;
    customDomain?: string;
    expirationDate?: string;
    lastPublishedAt?: Timestamp;
    seo?: {
      title: string;
      description: string;
    };
  };
}

export interface LandingPageComponent {
  id: string;
  type: ComponentType;
  category: ComponentCategory;
  content?: string;
  src?: string;
  alt?: string;
  action?: {
    type: 'link' | 'submit';
    url?: string;
  };
  fields?: FormField[];
  children?: LandingPageComponent[];
  styles?: {
    className?: string;
    style?: React.CSSProperties;
  };
  // New fields for enhanced components
  title?: string;
  subtitle?: string;
  items?: Array<{
    id: string;
    title?: string;
    description?: string;
    image?: string;
    link?: string;
  }>;
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'tel';
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}
