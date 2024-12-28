import { LandingTemplate } from '@/types/landing';

export const landingTemplates: LandingTemplate[] = [
  // Templates Gratuitos
  {
    id: 'simple-business',
    name: 'Negocio Simple',
    description: 'Perfecta para pequeños negocios y profesionales independientes',
    thumbnail: '/assets/templates/simple-business.jpg',
    category: 'business',
    isPremium: false,
    components: [
      // Aquí irían los componentes predefinidos
    ]
  },
  {
    id: 'portfolio-basic',
    name: 'Portfolio Básico',
    description: 'Ideal para mostrar tu trabajo y proyectos personales',
    thumbnail: '/assets/templates/portfolio-basic.jpg',
    category: 'portfolio',
    isPremium: false,
    components: []
  },
  {
    id: 'event-basic',
    name: 'Evento Simple',
    description: 'Para promocionar eventos y conferencias',
    thumbnail: '/assets/templates/event-basic.jpg',
    category: 'events',
    isPremium: false,
    components: []
  },

  // Templates Premium
  {
    id: 'business-pro',
    name: 'Negocio Pro',
    description: 'Template premium con características avanzadas para empresas',
    thumbnail: '/assets/templates/business-pro.jpg',
    category: 'business',
    isPremium: true,
    price: 29.99,
    components: []
  },
  {
    id: 'saas-landing',
    name: 'SaaS Landing',
    description: 'Diseñada específicamente para productos SaaS',
    thumbnail: '/assets/templates/saas-landing.jpg',
    category: 'technology',
    isPremium: true,
    price: 39.99,
    components: []
  },
  {
    id: 'ecommerce-pro',
    name: 'E-commerce Pro',
    description: 'Template premium para tiendas online',
    thumbnail: '/assets/templates/ecommerce-pro.jpg',
    category: 'ecommerce',
    isPremium: true,
    price: 49.99,
    components: []
  }
];

export const templateCategories = [
  { id: 'all', name: 'Todas' },
  { id: 'business', name: 'Negocios' },
  { id: 'portfolio', name: 'Portfolio' },
  { id: 'events', name: 'Eventos' },
  { id: 'technology', name: 'Tecnología' },
  { id: 'ecommerce', name: 'E-commerce' }
];

export const getTemplatesByCategory = (category: string) => {
  if (category === 'all') return landingTemplates;
  return landingTemplates.filter(template => template.category === category);
};

export const getTemplatesByType = (isPremium: boolean) => {
  return landingTemplates.filter(template => template.isPremium === isPremium);
};
