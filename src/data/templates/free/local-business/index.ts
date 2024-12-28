import { Template } from '@/types/templates';
import { TEMPLATE_CATEGORIES } from '../../index';
import { hero } from './sections/hero';
import { services } from './sections/services';
import { gallery } from './sections/gallery';
import { location } from './sections/location';
import { reviews } from './sections/reviews';
import { contact } from './sections/contact';

export const local: Template = {
  id: 'local-business',
  title: 'Negocio Local',
  description: 'Template perfecta para negocios locales y servicios de proximidad',
  category: TEMPLATE_CATEGORIES.LOCAL_SERVICES,
  image: '/templates/local-business.jpg',
  rating: 4.7,
  downloads: 950,
  premium: false,
  objective: 'local-presence',
  industry: 'local-services',
  implementationTime: 'quick',
  customizationLevel: 'intermediate',
  features: [
    { id: 'map', name: 'Mapa Interactivo', type: 'map' },
    { id: 'gallery', name: 'Galería de Imágenes', type: 'gallery' },
    { id: 'reviews', name: 'Reseñas de Clientes', type: 'reviews' },
    { id: 'hours', name: 'Horario de Atención', type: 'schedule' }
  ],
  tags: ['local', 'servicios', 'negocio', 'mapa'],
  analytics: {
    views: 4200,
    favorites: 180,
    implementations: 700,
    averageRating: 4.7,
    seoScore: 88
  },
  seoDetails: {
    score: 88,
    performance: 92,
    accessibility: 90,
    bestPractices: 85,
    seo: 85
  },
  deviceCompatibility: ['desktop', 'tablet', 'mobile'],
  customization: {
    colors: {
      primary: '#10b981',
      secondary: '#059669',
      accent: '#34d399',
      background: '#ffffff',
      text: '#1f2937'
    },
    fonts: {
      heading: 'Montserrat',
      body: 'Source Sans Pro'
    },
    spacing: {
      unit: 4,
      scale: 1.5
    }
  },
  sections: [hero, services, gallery, location, reviews, contact],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
