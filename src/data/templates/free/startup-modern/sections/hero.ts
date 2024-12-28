import { TemplateSection } from '@/types/templates';

export const hero: TemplateSection = {
  name: 'Hero',
  description: 'Hero section con animaciones',
  thumbnail: '/sections/hero-startup.jpg',
  content: {
    heading: 'Innovación que Transforma',
    subheading: 'Lleva tu startup al siguiente nivel',
    backgroundImage: '/sections/hero-startup-bg.jpg',
    animation: {
      type: 'fade-up',
      duration: 800,
      delay: 200
    },
    cta: {
      primary: {
        text: 'Comenzar prueba gratis',
        url: '#signup'
      },
      secondary: {
        text: 'Ver demo',
        url: '#demo'
      }
    },
    stats: [
      {
        value: '10k+',
        label: 'Usuarios activos'
      },
      {
        value: '99.9%',
        label: 'Uptime'
      },
      {
        value: '24/7',
        label: 'Soporte'
      }
    ]
  }
};
