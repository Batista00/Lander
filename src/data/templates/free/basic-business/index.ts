import { Template } from '@/types/templates';
import { TEMPLATE_CATEGORIES } from '../../index';
import { ComponentType } from '@/types/landing';
import { features } from './sections/features';
import { hero } from './sections/hero';
import { about } from './sections/about';
import { contact } from './sections/contact';
import { services } from './sections/services';
import { clients } from './sections/clients';

export const basic: Template = {
  id: 'basic-business',
  title: 'Landing Empresarial Básica',
  description: 'Perfecta para presentar tu empresa de manera profesional',
  category: TEMPLATE_CATEGORIES.BUSINESS,
  image: '/templates/basic-business.jpg',
  rating: 4.5,
  downloads: 1200,
  premium: false,
  objective: 'branding',
  industry: 'technology',
  implementationTime: 'quick',
  customizationLevel: 'basic',
  sections: {
    hero,
    features,
    about,
    services,
    contact,
    clients
  },
  allowedComponents: [
    ComponentType.Hero,
    ComponentType.Features,
    ComponentType.About,
    ComponentType.Services,
    ComponentType.Contact,
    ComponentType.Clients
  ],
  features: [
    { id: 'form', name: 'Formulario de Contacto', type: 'form' },
    { id: 'gallery', name: 'Galería de Imágenes', type: 'gallery' },
    { id: 'video', name: 'Reproductor de Video', type: 'video' }
  ],
  tags: ['empresa', 'profesional', 'simple'],
  analytics: {
    views: 5000,
    favorites: 120,
    implementations: 800,
    averageRating: 4.5,
    seoScore: 85
  },
  seoDetails: {
    score: 85,
    performance: 90,
    accessibility: 85,
    bestPractices: 80,
    seo: 85
  },
  deviceCompatibility: ['desktop', 'tablet', 'mobile'],
  customization: {
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
      background: '#ffffff',
      text: '#1f2937'
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter'
    },
    spacing: {
      section: '4rem',
      element: '1.5rem'
    },
    borderRadius: '0.5rem'
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
