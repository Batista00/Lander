import { Template, TemplateFeature } from '../types/templates';
import { commonSections, industrySections } from './sections';

// Categorías de templates
export const TEMPLATE_CATEGORIES = {
  BUSINESS: 'Negocios',
  ECOMMERCE: 'E-commerce',
  LOCAL_SERVICES: 'Servicios Locales',
  TECH_STARTUPS: 'Tecnología y Startups',
  EDUCATION: 'Educación',
  EVENTS: 'Eventos y Promociones',
  LEAD_CAPTURE: 'Captura de Leads',
  CREATIVE: 'Creativos y Marca'
} as const;

const commonFeatures: TemplateFeature[] = [
  { id: 'form', name: 'Formulario de Contacto', type: 'form' },
  { id: 'gallery', name: 'Galería de Imágenes', type: 'gallery' },
  { id: 'video', name: 'Reproductor de Video', type: 'video' },
  { id: 'map', name: 'Mapa Interactivo', type: 'map' },
  { id: 'social', name: 'Integración Social', type: 'social' },
  { id: 'analytics', name: 'Analytics Básico', type: 'analytics' }
];

const premiumFeatures: TemplateFeature[] = [
  ...commonFeatures,
  { id: 'advanced-analytics', name: 'Analytics Avanzado', type: 'analytics' },
  { id: 'crm', name: 'Integración CRM', type: 'form' },
  { id: 'ab-testing', name: 'A/B Testing', type: 'analytics' },
  { id: 'custom-code', name: 'Código Personalizado', type: 'form' }
];

// Templates gratuitos
export const FREE_TEMPLATES: Template[] = [
  {
    id: 'basic-business',
    title: 'Landing Empresarial Básica',
    description: 'Perfecta para presentar tu empresa de manera profesional',
    category: TEMPLATE_CATEGORIES.BUSINESS,
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    uses: 1200,
    premium: false,
    objective: 'branding',
    industry: 'technology',
    implementationTime: 'quick',
    customizationLevel: 'basic',
    features: commonFeatures.slice(0, 3),
    tags: ['empresa', 'profesional', 'simple'],
    sections: [
      {
        type: 'hero',
        content: {
          title: 'Tu Empresa en el Mundo Digital',
          subtitle: 'Soluciones innovadoras para tu negocio',
          description: 'Ayudamos a las empresas a crecer y prosperar en la era digital',
          buttonText: 'Comienza Ahora',
          buttonStyle: 'primary'
        }
      },
      {
        type: 'features',
        content: {
          title: 'Nuestros Servicios',
          subtitle: 'Lo que ofrecemos',
          features: [
            {
              title: 'Desarrollo Web',
              description: 'Sitios web modernos y responsivos',
              icon: 'Code'
            },
            {
              title: 'Marketing Digital',
              description: 'Estrategias efectivas de marketing',
              icon: 'TrendingUp'
            },
            {
              title: 'Soporte 24/7',
              description: 'Estamos aquí para ayudarte',
              icon: 'Support'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'startup-landing',
    title: 'Startup Moderna',
    description: 'Template perfecto para startups y empresas tecnológicas',
    category: TEMPLATE_CATEGORIES.TECH_STARTUPS,
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.7,
    uses: 800,
    premium: false,
    objective: 'product-launch',
    industry: 'technology',
    implementationTime: 'quick',
    customizationLevel: 'intermediate',
    features: commonFeatures,
    tags: ['startup', 'tecnología', 'moderno'],
    sections: [
      {
        type: 'hero',
        content: {
          title: 'Innovación para el Futuro',
          subtitle: 'Tu producto, nuestro compromiso',
          description: 'Transformando ideas en soluciones digitales',
          buttonText: 'Descubre Más',
          buttonStyle: 'primary'
        }
      },
      {
        type: 'features',
        content: {
          title: 'Características',
          subtitle: '¿Por qué elegirnos?',
          features: [
            {
              title: 'Innovación Constante',
              description: 'Siempre a la vanguardia',
              icon: 'Lightbulb'
            },
            {
              title: 'Escalabilidad',
              description: 'Crece con tu negocio',
              icon: 'TrendingUp'
            },
            {
              title: 'Seguridad',
              description: 'Protección de datos avanzada',
              icon: 'Shield'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'restaurant-basic',
    title: 'Restaurante Básico',
    description: 'Template ideal para restaurantes y cafeterías',
    category: TEMPLATE_CATEGORIES.LOCAL_SERVICES,
    image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.3,
    uses: 600,
    premium: false,
    objective: 'local-business',
    industry: 'food',
    implementationTime: 'quick',
    customizationLevel: 'basic',
    features: commonFeatures.slice(0, 4),
    tags: ['restaurante', 'comida', 'local'],
    sections: [
      {
        type: 'hero',
        content: {
          title: 'Sabores Únicos',
          subtitle: 'Una experiencia gastronómica inolvidable',
          description: 'Descubre nuestra cocina artesanal',
          buttonText: 'Ver Menú',
          buttonStyle: 'primary'
        }
      },
      {
        type: 'features',
        content: {
          title: 'Nuestra Cocina',
          subtitle: 'Lo que nos hace especiales',
          features: [
            {
              title: 'Ingredientes Frescos',
              description: 'Calidad garantizada',
              icon: 'Restaurant'
            },
            {
              title: 'Chef Experto',
              description: 'Cocina de autor',
              icon: 'Star'
            },
            {
              title: 'Ambiente Acogedor',
              description: 'Perfecto para cada ocasión',
              icon: 'Home'
            }
          ]
        }
      }
    ]
  }
];

// Templates premium
export const PREMIUM_TEMPLATES: Template[] = [
  {
    id: 'premium-business',
    title: 'Enterprise Pro',
    description: 'Template premium con características avanzadas para empresas',
    category: TEMPLATE_CATEGORIES.BUSINESS,
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.9,
    uses: 500,
    premium: true,
    price: 49.99,
    objective: 'sales',
    industry: 'technology',
    implementationTime: 'medium',
    customizationLevel: 'advanced',
    features: premiumFeatures,
    tags: ['premium', 'empresa', 'profesional', 'avanzado'],
    analytics: {
      views: 2500,
      favorites: 180,
      implementations: 400,
      averageRating: 4.9,
      seoScore: 95,
      conversionRate: 4.2
    },
    seoDetails: {
      score: 95,
      performance: 95,
      accessibility: 95,
      bestPractices: 90,
      seo: 95
    },
    deviceCompatibility: ['desktop', 'tablet', 'mobile'],
    customization: {
      colors: {
        primary: '#0f172a',
        secondary: '#1e293b',
        accent: '#3b82f6',
        background: '#ffffff',
        text: '#1f2937'
      },
      fonts: {
        heading: 'Inter',
        body: 'Inter'
      },
      spacing: {
        unit: 4,
        scale: 1.5
      }
    },
    sections: [
      {
        name: 'Hero',
        description: 'Hero section premium con animaciones avanzadas',
        thumbnail: '/sections/hero-premium.jpg',
        preview: '/sections/hero-premium-preview.jpg',
        features: [],
        content: {
          heading: 'Eleva tu Presencia Empresarial',
          subheading: 'Soluciones empresariales de clase mundial'
        }
      }
    ],
    assets: {
      images: [
        {
          url: '/assets/premium/hero-bg.jpg',
          type: 'hero',
          tags: ['fondo', 'empresarial']
        }
      ],
      colorPalettes: [
        {
          name: 'Corporate',
          colors: ['#0f172a', '#1e293b', '#3b82f6', '#ffffff']
        }
      ],
      icons: [
        {
          url: '/assets/premium/icons/business.svg',
          category: 'business'
        }
      ]
    },
    integrations: {
      cms: [
        {
          name: 'WordPress',
          compatibility: 'full'
        }
      ],
      apis: [
        {
          name: 'Google Analytics',
          documentation: '/docs/integrations/ga'
        }
      ],
      plugins: [
        {
          name: 'SEO Pro',
          description: 'Optimización SEO avanzada',
          url: '/plugins/seo-pro'
        }
      ]
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    trending: true,
    featured: true
  },
  {
    id: 'saas-premium',
    title: 'SaaS Master',
    description: 'Template premium para productos SaaS y aplicaciones web',
    category: TEMPLATE_CATEGORIES.TECH_STARTUPS,
    image: 'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    uses: 450,
    premium: true,
    price: 79.99,
    discountedPrice: 59.99,
    objective: 'sales',
    industry: 'technology',
    implementationTime: 'extensive',
    customizationLevel: 'advanced',
    features: premiumFeatures,
    tags: ['saas', 'aplicación', 'premium', 'tecnología'],
    analytics: {
      views: 2000,
      favorites: 160,
      implementations: 350,
      averageRating: 4.8,
      seoScore: 93,
      conversionRate: 3.8
    },
    seoDetails: {
      score: 93,
      performance: 95,
      accessibility: 90,
      bestPractices: 95,
      seo: 92
    },
    deviceCompatibility: ['desktop', 'tablet', 'mobile'],
    customization: {
      colors: {
        primary: '#7c3aed',
        secondary: '#6d28d9',
        accent: '#8b5cf6',
        background: '#ffffff',
        text: '#1f2937'
      },
      fonts: {
        heading: 'Inter',
        body: 'Inter'
      },
      spacing: {
        unit: 4,
        scale: 1.5
      }
    },
    sections: [
      {
        name: 'Hero',
        description: 'Hero section con demo interactiva',
        thumbnail: '/sections/hero-saas.jpg',
        preview: '/sections/hero-saas-preview.jpg',
        features: [],
        content: {
          heading: 'Tu Solución SaaS',
          subheading: 'Transforma la manera de hacer negocios'
        }
      }
    ],
    assets: {
      images: [
        {
          url: '/assets/premium/saas-hero.jpg',
          type: 'hero',
          tags: ['saas', 'tecnología']
        }
      ],
      colorPalettes: [
        {
          name: 'Tech Purple',
          colors: ['#7c3aed', '#6d28d9', '#8b5cf6', '#ffffff']
        }
      ],
      icons: [
        {
          url: '/assets/premium/icons/saas.svg',
          category: 'technology'
        }
      ]
    },
    integrations: {
      cms: [
        {
          name: 'Strapi',
          compatibility: 'full'
        }
      ],
      apis: [
        {
          name: 'Stripe',
          documentation: '/docs/integrations/stripe'
        }
      ],
      plugins: [
        {
          name: 'Analytics Pro',
          description: 'Analytics avanzado con seguimiento de usuarios',
          url: '/plugins/analytics-pro'
        }
      ]
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    trending: true,
    weeklyHighlight: true
  },
  {
    id: 'ecommerce-premium',
    title: 'E-commerce Premium',
    description: 'Template premium para tiendas online',
    category: TEMPLATE_CATEGORIES.ECOMMERCE,
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.7,
    uses: 400,
    premium: true,
    price: 69.99,
    objective: 'sales',
    industry: 'ecommerce',
    implementationTime: 'extensive',
    customizationLevel: 'advanced',
    features: premiumFeatures,
    tags: ['ecommerce', 'tienda', 'online', 'premium'],
    analytics: {
      views: 1800,
      favorites: 140,
      implementations: 300,
      averageRating: 4.7,
      seoScore: 92,
      conversionRate: 3.5
    },
    seoDetails: {
      score: 92,
      performance: 95,
      accessibility: 90,
      bestPractices: 95,
      seo: 91
    },
    deviceCompatibility: ['desktop', 'tablet', 'mobile'],
    customization: {
      colors: {
        primary: '#8b5cf6',
        secondary: '#7c3aed',
        accent: '#6d28d9',
        background: '#ffffff',
        text: '#1f2937'
      },
      fonts: {
        heading: 'Inter',
        body: 'Inter'
      },
      spacing: {
        unit: 4,
        scale: 1.5
      }
    },
    sections: [
      {
        name: 'Hero',
        description: 'Hero section con demo interactiva',
        thumbnail: '/sections/hero-ecommerce.jpg',
        preview: '/sections/hero-ecommerce-preview.jpg',
        features: [],
        content: {
          heading: 'Tu Tienda Online',
          subheading: 'Vende más con nuestra solución de ecommerce'
        }
      }
    ],
    assets: {
      images: [
        {
          url: '/assets/premium/ecommerce-hero.jpg',
          type: 'hero',
          tags: ['ecommerce', 'tienda']
        }
      ],
      colorPalettes: [
        {
          name: 'Ecommerce Purple',
          colors: ['#8b5cf6', '#7c3aed', '#6d28d9', '#ffffff']
        }
      ],
      icons: [
        {
          url: '/assets/premium/icons/ecommerce.svg',
          category: 'ecommerce'
        }
      ]
    },
    integrations: {
      cms: [
        {
          name: 'Shopify',
          compatibility: 'full'
        }
      ],
      apis: [
        {
          name: 'PayPal',
          documentation: '/docs/integrations/paypal'
        }
      ],
      plugins: [
        {
          name: 'Abandoned Cart',
          description: 'Recupera carritos abandonados',
          url: '/plugins/abandoned-cart'
        }
      ]
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    trending: true,
    weeklyHighlight: true
  },
  {
    id: 'education-premium',
    title: 'Education Pro',
    description: 'Template premium para instituciones educativas',
    category: TEMPLATE_CATEGORIES.EDUCATION,
    image: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    uses: 350,
    premium: true,
    price: 59.99,
    objective: 'leads',
    industry: 'education',
    implementationTime: 'medium',
    customizationLevel: 'advanced',
    features: premiumFeatures,
    tags: ['educación', 'institución', 'premium'],
    analytics: {
      views: 1500,
      favorites: 120,
      implementations: 250,
      averageRating: 4.8,
      seoScore: 91,
      conversionRate: 3.2
    },
    seoDetails: {
      score: 91,
      performance: 95,
      accessibility: 90,
      bestPractices: 95,
      seo: 90
    },
    deviceCompatibility: ['desktop', 'tablet', 'mobile'],
    customization: {
      colors: {
        primary: '#3b82f6',
        secondary: '#2563eb',
        accent: '#1e40af',
        background: '#ffffff',
        text: '#1f2937'
      },
      fonts: {
        heading: 'Inter',
        body: 'Inter'
      },
      spacing: {
        unit: 4,
        scale: 1.5
      }
    },
    sections: [
      {
        name: 'Hero',
        description: 'Hero section con demo interactiva',
        thumbnail: '/sections/hero-education.jpg',
        preview: '/sections/hero-education-preview.jpg',
        features: [],
        content: {
          heading: 'Tu Institución Educativa',
          subheading: 'Mejora la educación con nuestra solución'
        }
      }
    ],
    assets: {
      images: [
        {
          url: '/assets/premium/education-hero.jpg',
          type: 'hero',
          tags: ['educación', 'institución']
        }
      ],
      colorPalettes: [
        {
          name: 'Education Blue',
          colors: ['#3b82f6', '#2563eb', '#1e40af', '#ffffff']
        }
      ],
      icons: [
        {
          url: '/assets/premium/icons/education.svg',
          category: 'education'
        }
      ]
    },
    integrations: {
      cms: [
        {
          name: 'Moodle',
          compatibility: 'full'
        }
      ],
      apis: [
        {
          name: 'Google Classroom',
          documentation: '/docs/integrations/google-classroom'
        }
      ],
      plugins: [
        {
          name: 'Gradebook',
          description: 'Libreta de calificaciones avanzada',
          url: '/plugins/gradebook'
        }
      ]
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    trending: true,
    weeklyHighlight: true
  }
];
