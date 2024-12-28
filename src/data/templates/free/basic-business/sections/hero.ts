import { TemplateSection } from '@/types/templates';

export const hero: TemplateSection = {
  name: 'Hero',
  description: 'Sección principal con mensaje clave',
  thumbnail: '/sections/hero-basic.jpg',
  content: {
    heading: 'Tu Empresa, Tu Éxito',
    subheading: 'Soluciones profesionales para tu negocio',
    backgroundImage: '/sections/hero-bg.jpg',
    buttonText: 'Comenzar ahora',
    buttonUrl: '#contact'
  }
};
