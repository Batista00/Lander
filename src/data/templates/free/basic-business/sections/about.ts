import { TemplateSection } from '@/types/templates';

export const about: TemplateSection = {
  name: 'About',
  description: 'Sección sobre nosotros',
  thumbnail: '/sections/about-basic.jpg',
  content: {
    heading: 'Sobre Nosotros',
    description: 'Descripción detallada de la empresa',
    image: '/sections/about-image.jpg',
    stats: [
      {
        label: 'Clientes',
        value: '100+'
      },
      {
        label: 'Proyectos',
        value: '500+'
      },
      {
        label: 'Años',
        value: '10+'
      }
    ]
  }
};
