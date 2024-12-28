import { Template } from '@/types/templates';
import { TEMPLATE_CATEGORIES } from '../../index';
import { hero } from './sections/hero';
import { solutions } from './sections/solutions';
import { features } from './sections/features';
import { showcase } from './sections/showcase';
import { integrations } from './sections/integrations';
import { analytics } from './sections/analytics';
import { testimonials } from './sections/testimonials';
import { pricing } from './sections/pricing';
import { contact } from './sections/contact';

export const enterprise: Template = {
  id: 'enterprise-pro',
  title: 'Enterprise Pro',
  description: 'Template premium para empresas de gran escala',
  category: TEMPLATE_CATEGORIES.BUSINESS,
  image: '/templates/enterprise-pro.jpg',
  rating: 4.9,
  downloads: 450,
  premium: true,
  price: 49.99,
  objective: 'enterprise',
  industry: 'enterprise',
  implementationTime: 'medium',
  customizationLevel: 'advanced',
  features: [
    { id: 'analytics', name: 'Analytics Avanzado', type: 'analytics' },
    { id: 'crm', name: 'Integración CRM', type: 'integration' },
    { id: 'ab-testing', name: 'A/B Testing', type: 'testing' },
    { id: 'custom-code', name: 'Código Personalizado', type: 'code' },
    { id: 'seo-pro', name: 'SEO Profesional', type: 'seo' }
  ],
  tags: ['empresa', 'corporativo', 'premium', 'enterprise'],
  analytics: {
    views: 8000,
    favorites: 350,
    implementations: 400,
    averageRating: 4.9,
    seoScore: 95
  },
  seoDetails: {
    score: 95,
    performance: 98,
    accessibility: 95,
    bestPractices: 92,
    seo: 95
  },
  deviceCompatibility: ['desktop', 'tablet', 'mobile'],
  customization: {
    colors: {
      primary: '#0f172a',
      secondary: '#1e293b',
      accent: '#3b82f6',
      background: '#ffffff',
      text: '#334155'
    },
    fonts: {
      heading: 'SF Pro Display',
      body: 'SF Pro Text'
    },
    spacing: {
      unit: 4,
      scale: 1.5
    }
  },
  premiumFeatures: {
    support: {
      type: 'premium',
      responseTime: '24h',
      channels: ['email', 'chat', 'phone'],
      duration: '6 months'
    },
    updates: {
      frequency: 'monthly',
      duration: '12 months'
    },
    resources: {
      documentation: true,
      videoTutorials: true,
      designFiles: ['figma', 'sketch'],
      sourceCode: true
    },
    integrations: {
      crm: ['salesforce', 'hubspot'],
      analytics: ['google', 'mixpanel'],
      marketing: ['mailchimp', 'sendgrid']
    },
    customization: {
      codeAccess: true,
      whiteLabel: true,
      customDomain: true
    }
  },
  sections: [
    hero,
    solutions,
    features,
    showcase,
    integrations,
    analytics,
    testimonials,
    pricing,
    contact
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
