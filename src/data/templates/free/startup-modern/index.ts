import { Template } from '@/types/templates';
import { TEMPLATE_CATEGORIES } from '../../index';
import { hero } from './sections/hero';
import { product } from './sections/product';
import { features } from './sections/features';
import { pricing } from './sections/pricing';
import { testimonials } from './sections/testimonials';
import { cta } from './sections/cta';

export const startup: Template = {
  id: 'startup-modern',
  title: 'Startup Modern',
  description: 'Template moderna y dinámica para startups tecnológicas',
  category: TEMPLATE_CATEGORIES.TECH_STARTUPS,
  image: '/templates/startup-modern.jpg',
  rating: 4.8,
  downloads: 850,
  premium: false,
  objective: 'conversion',
  industry: 'technology',
  implementationTime: 'medium',
  customizationLevel: 'advanced',
  features: [
    { id: 'animations', name: 'Animaciones Modernas', type: 'animation' },
    { id: 'interactive-demo', name: 'Demo Interactiva', type: 'interactive' },
    { id: 'pricing-tables', name: 'Tablas de Precios', type: 'pricing' },
    { id: 'testimonials', name: 'Testimonios', type: 'testimonials' }
  ],
  tags: ['startup', 'tech', 'moderno', 'saas'],
  analytics: {
    views: 3500,
    favorites: 250,
    implementations: 600,
    averageRating: 4.8,
    seoScore: 90
  },
  seoDetails: {
    score: 90,
    performance: 95,
    accessibility: 90,
    bestPractices: 85,
    seo: 90
  },
  deviceCompatibility: ['desktop', 'tablet', 'mobile'],
  customization: {
    colors: {
      primary: '#6366f1',
      secondary: '#4f46e5',
      accent: '#818cf8',
      background: '#ffffff',
      text: '#111827'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Inter'
    },
    spacing: {
      unit: 4,
      scale: 1.5
    }
  },
  sections: [hero, product, features, pricing, testimonials, cta],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
