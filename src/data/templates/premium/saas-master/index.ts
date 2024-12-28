import { Template } from '@/types/templates';
import { TEMPLATE_CATEGORIES } from '../../index';
import { hero } from './sections/hero';
import { features } from './sections/features';
import { demo } from './sections/demo';
import { pricing } from './sections/pricing';
import { integration } from './sections/integration';
import { testimonials } from './sections/testimonials';
import { faq } from './sections/faq';
import { cta } from './sections/cta';

export const saas: Template = {
  id: 'saas-master',
  title: 'SaaS Master',
  description: 'Template premium para productos SaaS modernos',
  category: TEMPLATE_CATEGORIES.TECH_STARTUPS,
  image: '/templates/saas-master.jpg',
  rating: 4.9,
  downloads: 380,
  premium: true,
  price: {
    regular: 79.99,
    sale: 59.99,
    saleEndDate: '2024-01-31'
  },
  objective: 'saas-conversion',
  industry: 'technology',
  implementationTime: 'medium',
  customizationLevel: 'advanced',
  features: [
    { id: 'interactive-demo', name: 'Demo Interactiva', type: 'demo' },
    { id: 'stripe', name: 'Integración Stripe', type: 'payment' },
    { id: 'analytics', name: 'Analytics en tiempo real', type: 'analytics' },
    { id: 'ab-testing', name: 'A/B Testing', type: 'testing' },
    { id: 'customization', name: 'Personalización Extensa', type: 'customization' }
  ],
  tags: ['saas', 'startup', 'premium', 'modern'],
  analytics: {
    views: 7500,
    favorites: 420,
    implementations: 350,
    averageRating: 4.9,
    seoScore: 98
  },
  seoDetails: {
    score: 98,
    performance: 95,
    accessibility: 100,
    bestPractices: 98,
    seo: 98
  },
  deviceCompatibility: ['desktop', 'tablet', 'mobile'],
  customization: {
    colors: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      accent: '#a78bfa',
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
  premiumFeatures: {
    demo: {
      type: 'interactive',
      features: ['Live preview', 'Custom data', 'Feature toggling']
    },
    payment: {
      provider: 'Stripe',
      features: ['Subscriptions', 'Usage-based', 'Multi-currency']
    },
    analytics: {
      type: 'real-time',
      features: ['User tracking', 'Conversion', 'Revenue']
    },
    support: {
      channels: ['email', 'chat', 'video'],
      responseTime: '24h',
      duration: '6 months'
    },
    resources: {
      documentation: true,
      tutorials: true,
      designFiles: ['figma', 'sketch', 'adobe-xd'],
      sourceCode: true
    }
  },
  sections: [
    hero,
    features,
    demo,
    pricing,
    integration,
    testimonials,
    faq,
    cta
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
