import { TemplateSection } from '@/types/templates';

export const features: TemplateSection = {
  name: 'Features',
  description: 'Características principales',
  thumbnail: '/sections/features-basic.jpg',
  content: {
    heading: 'Nuestros Servicios',
    features: [
      {
        title: 'Servicio 1',
        description: 'Descripción del servicio 1',
        icon: 'chart'
      },
      {
        title: 'Servicio 2',
        description: 'Descripción del servicio 2',
        icon: 'shield'
      },
      {
        title: 'Servicio 3',
        description: 'Descripción del servicio 3',
        icon: 'star'
      }
    ]
  }
};
