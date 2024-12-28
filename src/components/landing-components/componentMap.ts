import { Hero } from './Hero';
import { Features } from './Features';
import { Services } from './Services';
import { Testimonials } from './Testimonials';

export const componentMap = {
  hero: {
    component: Hero,
    label: 'Hero',
    defaultContent: {
      title: 'Título Principal',
      subtitle: 'Subtítulo atractivo para captar la atención',
      description: 'Una descripción más detallada de tu producto o servicio.',
      buttonText: 'Comenzar',
      buttonLink: '#',
      buttonStyle: 'primary',
      layout: 'center',
      backgroundColor: 'bg-gray-900',
      textColor: 'text-white'
    }
  },
  features: {
    component: Features,
    label: 'Características',
    defaultContent: {
      title: 'Nuestras Características',
      subtitle: 'Descubre lo que nos hace únicos',
      features: [
        {
          icon: 'Zap',
          title: 'Rápido y Eficiente',
          description: 'Optimizado para un rendimiento excepcional'
        },
        {
          icon: 'Shield',
          title: 'Seguro',
          description: 'Protección de datos de primer nivel'
        },
        {
          icon: 'Smartphone',
          title: 'Responsive',
          description: 'Se adapta a cualquier dispositivo'
        }
      ],
      layout: 'grid',
      columns: 3,
      backgroundColor: 'bg-white',
      textColor: 'text-gray-900',
      iconColor: 'text-blue-600'
    }
  },
  services: {
    component: Services,
    label: 'Servicios',
    defaultContent: {
      title: 'Nuestros Servicios',
      subtitle: 'Soluciones diseñadas para tu éxito',
      services: [
        {
          title: 'Diseño Web',
          description: 'Creamos sitios web modernos y responsivos que cautivan a tus visitantes.',
          icon: 'Palette',
          price: '$999',
          features: ['Diseño personalizado', 'Responsive', 'SEO optimizado'],
          image: '/images/services/web-design.jpg'
        },
        {
          title: 'Marketing Digital',
          description: 'Estrategias efectivas para aumentar tu presencia online.',
          icon: 'TrendingUp',
          price: '$799',
          features: ['Redes sociales', 'Email marketing', 'Analytics'],
          image: '/images/services/marketing.jpg'
        },
        {
          title: 'Desarrollo de Apps',
          description: 'Aplicaciones nativas y multiplataforma de alto rendimiento.',
          icon: 'Smartphone',
          price: '$1,499',
          features: ['iOS y Android', 'UI/UX personalizado', 'Soporte continuo'],
          image: '/images/services/app-dev.jpg'
        }
      ],
      layout: 'grid',
      backgroundColor: 'bg-white',
      textColor: 'text-gray-900',
      accentColor: 'text-blue-600',
      showPricing: true,
      showImages: true
    }
  },
  testimonials: {
    component: Testimonials,
    label: 'Testimonios',
    defaultContent: {
      title: 'Lo que dicen nuestros clientes',
      subtitle: 'Testimonios de personas que confían en nosotros',
      testimonials: [
        {
          name: 'Juan Pérez',
          role: 'CEO',
          company: 'Tech Corp',
          content: 'Una experiencia increíble. El producto superó todas nuestras expectativas.',
          rating: 5,
          image: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        {
          name: 'María García',
          role: 'Directora de Marketing',
          company: 'Digital Solutions',
          content: 'La mejor decisión que tomamos para nuestro negocio. El soporte es excepcional.',
          rating: 5,
          image: 'https://randomuser.me/api/portraits/women/1.jpg'
        },
        {
          name: 'Carlos Rodríguez',
          role: 'Emprendedor',
          content: 'Simplemente funciona. Fácil de usar y resultados inmediatos.',
          rating: 4,
          image: 'https://randomuser.me/api/portraits/men/2.jpg'
        }
      ],
      layout: 'grid',
      backgroundColor: 'bg-gray-50',
      textColor: 'text-gray-900',
      accentColor: 'text-blue-600',
      showRatings: true,
      showImages: true,
      style: 'modern'
    }
  }
};

export type ComponentType = keyof typeof componentMap;
