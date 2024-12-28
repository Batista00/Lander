import { TemplateSection } from '@/types/templates';

export const testimonials: TemplateSection = {
  name: 'Testimonials',
  description: 'Testimonios de clientes',
  thumbnail: '/sections/testimonials-startup.jpg',
  content: {
    heading: 'Lo que dicen nuestros clientes',
    testimonials: [
      {
        name: 'Juan Pérez',
        position: 'CEO',
        company: 'Tech Corp',
        image: '/testimonials/juan.jpg',
        text: 'Excelente producto, ha transformado nuestro negocio',
        rating: 5,
        social: {
          twitter: '@juanperez',
          linkedin: '/in/juanperez'
        }
      },
      {
        name: 'María García',
        position: 'CTO',
        company: 'Innovation Labs',
        image: '/testimonials/maria.jpg',
        text: 'La mejor decisión que hemos tomado',
        rating: 5,
        social: {
          twitter: '@mariagarcia',
          linkedin: '/in/mariagarcia'
        }
      },
      {
        name: 'Carlos Ruiz',
        position: 'Founder',
        company: 'Startup X',
        image: '/testimonials/carlos.jpg',
        text: 'Increíble soporte y producto de calidad',
        rating: 4,
        social: {
          twitter: '@carlosruiz',
          linkedin: '/in/carlosruiz'
        }
      }
    ],
    stats: {
      totalCustomers: '1,000+',
      averageRating: '4.8/5',
      customerSatisfaction: '98%'
    },
    logos: [
      {
        name: 'Company 1',
        logo: '/logos/company1.svg'
      },
      {
        name: 'Company 2',
        logo: '/logos/company2.svg'
      },
      {
        name: 'Company 3',
        logo: '/logos/company3.svg'
      }
    ]
  }
};
