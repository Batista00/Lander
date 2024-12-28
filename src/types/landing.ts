export enum ComponentType {
  // Componentes Base
  Hero = 'hero',
  Features = 'features',
  About = 'about',
  Contact = 'contact',
  Services = 'services',
  Programs = 'programs',
  Gallery = 'gallery',
  Video = 'video',
  Map = 'map',
  Social = 'social',
  Analytics = 'analytics',
  Clients = 'clients',
  Text = 'text',
  Image = 'image',
  Button = 'button',
  Team = 'team',
  Blog = 'blog',
  FAQ = 'faq',
  Newsletter = 'newsletter',
  Form = 'form',
  Pricing = 'pricing',
  Stats = 'stats',
  Testimonios = 'testimonios',

  // Componentes Premium
  PremiumBlog = 'premiumBlog',
  PremiumTeam = 'premiumTeam',
  PremiumTestimonials = 'premiumTestimonials',
  PremiumPricing = 'premiumPricing',
  ModernHero = 'modernHero',
  ModernContact = 'modernContact',
  ModernProjects = 'modernProjects',
  ModernServices = 'modernServices',
  ModernStats = 'modernStats',
  ModernTestimonials = 'modernTestimonials',
  
  // Componentes Avanzados
  AdvancedBooking = 'advancedBooking',
  Carousel = 'carousel',
  FAQSimple = 'faqSimple',
  Comparison = 'comparison',
  Timeline = 'timeline',
  VideoPlayer = 'videoPlayer',
  AudioPlayer = 'audioPlayer',
  ThreeDViewer = 'threeDViewer',
  Maps = 'maps',
  SocialFeed = 'socialFeed',
  Chat = 'chat',
  HeroCTA = 'heroCta',
  PremiumFAQ = 'premiumFaq',
}

export interface ComponentStyles {
  colors?: {
    background?: string;
    text?: string;
    accent?: string;
  };
  spacing?: {
    padding?: string | {
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
    };
    margin?: string | {
      top?: string;
      bottom?: string;
      left?: string;
      right?: string;
    };
  };
  typography?: {
    fontSize?: string;
    fontWeight?: string;
    textAlign?: 'left' | 'center' | 'right';
  };
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

export interface ComponentContentTypes {
  [ComponentType.Hero]: {
    title: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    buttonStyle?: 'primary' | 'secondary' | 'outline';
    layout?: 'center' | 'left' | 'right';
    backgroundImage?: string;
  };
  [ComponentType.About]: {
    heading: string;
    text: string;
    features: {
      title: string;
      description: string;
    }[];
  };
  [ComponentType.Contact]: {
    heading: string;
    text: string;
    email: string;
    phone: string;
    address: string;
  };
  [ComponentType.Features]: {
    title: string;
    description?: string;
    features: Array<{
      title: string;
      description: string;
      icon?: string;
      image?: string;
    }>;
    layout?: 'grid' | 'list';
    columns?: 2 | 3 | 4;
  };
  [ComponentType.Text]: {
    text: string;
  };
  [ComponentType.Button]: {
    text: string;
    link: string;
    variant: 'primary' | 'secondary' | 'outline';
    size: 'sm' | 'md' | 'lg';
  };
  [ComponentType.Image]: {
    src: string;
    alt: string;
    caption?: string;
  };
  [ComponentType.Video]: {
    url: string;
    type?: 'youtube' | 'vimeo' | 'custom';
    title?: string;
    autoplay?: boolean;
    controls?: boolean;
    muted?: boolean;
    loop?: boolean;
    aspectRatio?: 'square' | 'video' | 'wide';
    width?: 'small' | 'medium' | 'large' | 'full';
    alignment?: 'left' | 'center' | 'right';
    rounded?: boolean;
    shadow?: 'none' | 'small' | 'medium' | 'large';
    overlay?: boolean;
    overlayColor?: string;
    description?: string;
  };
  [ComponentType.Team]: {
    title: string;
    subtitle?: string;
    description?: string;
    members: Array<{
      name: string;
      role: string;
      image: string;
      bio: string;
      social?: {
        linkedin?: string;
        twitter?: string;
        github?: string;
      };
    }>;
  };
  [ComponentType.Blog]: {
    title: string;
    subtitle?: string;
    description?: string;
    posts: Array<{
      title: string;
      excerpt: string;
      image: string;
      author: {
        name: string;
        avatar: string;
      };
      date: string;
      readTime: string;
      category: string;
      link: string;
    }>;
    cta?: {
      text: string;
      link: string;
    };
  };
  [ComponentType.FAQ]: {
    title: string;
    subtitle?: string;
    description?: string;
    categories: Array<{
      name: string;
      questions: Array<{
        question: string;
        answer: string;
      }>;
    }>;
    cta?: {
      text: string;
      link: string;
    };
  };
  [ComponentType.Newsletter]: {
    title: string;
    subtitle?: string;
    description?: string;
    image?: string;
    features?: string[];
    placeholder: string;
    buttonText: string;
    successMessage: string;
    style: 'simple' | 'withImage' | 'withFeatures';
    backgroundColor?: string;
  };
  [ComponentType.AdvancedBooking]: {
    title: string;
    subtitle?: string;
    description?: string;
    services: Array<{
      id: string;
      name: string;
      duration: string;
      price: string;
      description: string;
      image?: string;
    }>;
    timeSlots: string[];
    maxPersons: number;
    successMessage: string;
  };
  [ComponentType.Carousel]: {
    items: Array<{
      image: string;
      title?: string;
      description?: string;
      link?: string;
    }>;
  };
  [ComponentType.Form]: {
    title: string;
    description?: string;
    fields: Array<{
      type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'radio';
      name: string;
      label: string;
      required?: boolean;
      placeholder?: string;
      options?: Array<{
        label: string;
        value: string;
      }>;
    }>;
    submitButton?: {
      text: string;
      style?: 'primary' | 'secondary' | 'outline';
    };
    successMessage?: string;
    errorMessage?: string;
  };
  [ComponentType.Pricing]: {
    title: string;
    description?: string;
    plans: Array<{
      name: string;
      price: string;
      period: string;
      features: string[];
      buttonText: string;
      highlighted?: boolean;
    }>;
    layout?: 'horizontal' | 'vertical';
  };
  [ComponentType.FAQSimple]: {
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
  [ComponentType.Comparison]: {
    items: Array<{
      feature: string;
      values: Array<{
        value: string;
        highlight?: boolean;
      }>;
    }>;
  };
  [ComponentType.Timeline]: {
    events: Array<{
      date: string;
      title: string;
      description: string;
      icon?: string;
    }>;
  };
  [ComponentType.Stats]: {
    items: Array<{
      value: string;
      label: string;
      icon?: string;
    }>;
  };
  [ComponentType.VideoPlayer]: {
    url: string;
    title?: string;
    autoplay?: boolean;
  };
  [ComponentType.AudioPlayer]: {
    url: string;
    title?: string;
    autoplay?: boolean;
  };
  [ComponentType.ThreeDViewer]: {
    modelUrl: string;
    backgroundColor?: string;
  };
  [ComponentType.Maps]: {
    location: string;
    zoom?: number;
  };
  [ComponentType.SocialFeed]: {
    feed: Array<{
      platform: string;
      url: string;
    }>;
  };
  [ComponentType.Chat]: {
    config: {
      welcomeMessage?: string;
      botName?: string;
    };
  };
  [ComponentType.Testimonios]: TestimoniosContent;
  [ComponentType.Services]: any;
  [ComponentType.Programs]: any;
  [ComponentType.Map]: any;
  [ComponentType.Social]: any;
  [ComponentType.Analytics]: any;
  [ComponentType.Clients]: any;
  [ComponentType.PremiumBlog]: any;
  [ComponentType.PremiumTeam]: any;
  [ComponentType.PremiumTestimonials]: any;
  [ComponentType.PremiumPricing]: any;
  [ComponentType.ModernHero]: any;
  [ComponentType.ModernContact]: any;
  [ComponentType.ModernProjects]: any;
  [ComponentType.ModernServices]: any;
  [ComponentType.ModernStats]: any;
  [ComponentType.ModernTestimonials]: any;
  [ComponentType.HeroCTA]: any;
  [ComponentType.PremiumFAQ]: any;
}

export interface Component {
  id: string;
  type: ComponentType;
  content: ComponentContentTypes[keyof ComponentContentTypes];
  styles?: ComponentStyles;
}

export interface LandingPage {
  id: string;
  name: string;
  description?: string;
  components: Component[];
  status: 'draft' | 'published';
  userId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  publishConfig?: {
    url?: string;
    lastPublishedAt?: string;
    isPrivate?: boolean;
    customDomain?: string;
    hasPassword?: boolean;
    passwordHash?: string;
    expirationDate?: string;
    seo?: {
      title: string;
      description: string;
    };
  };
  templateId?: string;
}

// Tipos para optimización y análisis
export interface OptimizationResult {
  seoScore: number;
  conversionScore: number;
  suggestions: string[];
  seoImprovements: string[];
  conversionImprovements: string[];
}

export interface Analytics {
  views: number;
  conversions: number;
  bounceRate: number;
  averageTimeOnPage: number;
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  sources: {
    [key: string]: number;
  };
  goals: {
    [key: string]: {
      completions: number;
      rate: number;
    };
  };
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'startup' | 'restaurant' | 'professional' | 'ecommerce' | 'personal';
  thumbnail: string;
  isPremium: boolean;
  components: string[];
}

export interface LandingContent {
  components: Component[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  styles: {
    theme: string;
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    typography: {
      headings: string;
      body: string;
    };
  };
}

export interface AIWorkflowContext {
  industry: string;
  goals: string[];
  targetAudience: string;
  brand: {
    name: string;
    colors: string[];
    tone: string;
  };
  style: {
    modern: boolean;
    minimal: boolean;
    colorful: boolean;
  };
}
