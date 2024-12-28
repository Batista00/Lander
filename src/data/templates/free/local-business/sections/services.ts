import { TemplateSection } from '@/types/templates';

export const services: TemplateSection = {
  name: 'Services',
  description: 'Servicios ofrecidos',
  thumbnail: '/sections/services-local.jpg',
  content: {
    heading: 'Nuestros Servicios',
    subheading: 'Calidad y profesionalismo garantizado',
    services: [
      {
        title: 'Servicio Principal',
        description: 'Descripción detallada del servicio principal',
        icon: 'star',
        image: '/services/service1.jpg',
        price: 'Desde $99',
        duration: '1 hora',
        features: [
          'Característica 1',
          'Característica 2',
          'Característica 3'
        ]
      },
      {
        title: 'Servicio Premium',
        description: 'Descripción del servicio premium',
        icon: 'crown',
        image: '/services/service2.jpg',
        price: 'Desde $199',
        duration: '2 horas',
        features: [
          'Característica Premium 1',
          'Característica Premium 2',
          'Característica Premium 3'
        ]
      },
      {
        title: 'Servicio Básico',
        description: 'Descripción del servicio básico',
        icon: 'check',
        image: '/services/service3.jpg',
        price: 'Desde $49',
        duration: '30 minutos',
        features: [
          'Característica Básica 1',
          'Característica Básica 2',
          'Característica Básica 3'
        ]
      }
    ],
    cta: {
      text: 'Ver todos los servicios',
      url: '#all-services'
    }
  }
};
