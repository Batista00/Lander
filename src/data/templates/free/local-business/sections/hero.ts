import { TemplateSection } from '@/types/templates';

export const hero: TemplateSection = {
  name: 'Hero',
  description: 'Sección principal con información clave',
  thumbnail: '/sections/hero-local.jpg',
  content: {
    heading: 'Tu Negocio Local de Confianza',
    subheading: 'Sirviendo a la comunidad desde 2010',
    backgroundImage: '/sections/hero-local-bg.jpg',
    cta: {
      primary: {
        text: 'Reservar ahora',
        url: '#contact'
      },
      secondary: {
        text: 'Ver servicios',
        url: '#services'
      }
    },
    quickInfo: {
      phone: '+1 234 567 890',
      address: 'Calle Principal 123',
      hours: 'Lun-Sáb: 9:00-18:00'
    },
    badges: [
      {
        image: '/badges/google-reviews.png',
        text: '4.8 en Google'
      },
      {
        image: '/badges/yelp.png',
        text: '4.7 en Yelp'
      }
    ]
  }
};
