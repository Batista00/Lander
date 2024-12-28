import { TemplateSection } from '@/types/templates';

export const gallery: TemplateSection = {
  name: 'Gallery',
  description: 'Galería de imágenes',
  thumbnail: '/sections/gallery-local.jpg',
  content: {
    heading: 'Nuestra Galería',
    subheading: 'Conoce nuestro trabajo',
    images: [
      {
        src: '/gallery/image1.jpg',
        alt: 'Descripción imagen 1',
        category: 'Trabajos',
        caption: 'Proyecto completado en 2023'
      },
      {
        src: '/gallery/image2.jpg',
        alt: 'Descripción imagen 2',
        category: 'Instalaciones',
        caption: 'Nuestras instalaciones modernas'
      },
      {
        src: '/gallery/image3.jpg',
        alt: 'Descripción imagen 3',
        category: 'Equipo',
        caption: 'Nuestro equipo profesional'
      },
      {
        src: '/gallery/image4.jpg',
        alt: 'Descripción imagen 4',
        category: 'Trabajos',
        caption: 'Proyecto destacado'
      },
      {
        src: '/gallery/image5.jpg',
        alt: 'Descripción imagen 5',
        category: 'Eventos',
        caption: 'Evento comunitario 2023'
      },
      {
        src: '/gallery/image6.jpg',
        alt: 'Descripción imagen 6',
        category: 'Trabajos',
        caption: 'Trabajo reciente'
      }
    ],
    filters: [
      'Todos',
      'Trabajos',
      'Instalaciones',
      'Equipo',
      'Eventos'
    ],
    layout: {
      type: 'masonry',
      columns: {
        desktop: 3,
        tablet: 2,
        mobile: 1
      }
    },
    lightbox: {
      enabled: true,
      showCaptions: true
    }
  }
};
