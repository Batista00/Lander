import { TemplateSection } from '@/types/templates';

export const testimonials: TemplateSection = {
  name: 'Testimonials',
  description: 'Testimonios de clientes',
  thumbnail: '/sections/testimonials-saas.jpg',
  content: {
    heading: 'Lo que Dicen Nuestros Clientes',
    subheading: 'Miles de equipos confían en nosotros',
    testimonials: [
      {
        name: 'Alex Thompson',
        position: 'CEO',
        company: 'Tech Startup',
        image: '/testimonials/alex.jpg',
        text: 'Incrementamos nuestra productividad en un 200% desde que empezamos a usar la plataforma.',
        metrics: {
          productivity: '+200%',
          timeframe: '3 meses'
        },
        video: '/testimonials/alex-video.mp4'
      },
      {
        name: 'Sarah Chen',
        position: 'CTO',
        company: 'Digital Solutions',
        image: '/testimonials/sarah.jpg',
        text: 'La mejor inversión que hemos hecho. El ROI fue evidente en el primer mes.',
        metrics: {
          roi: '400%',
          savings: '$50k/mes'
        },
        video: '/testimonials/sarah-video.mp4'
      },
      {
        name: 'David Miller',
        position: 'Product Manager',
        company: 'Innovation Co',
        image: '/testimonials/david.jpg',
        text: 'La facilidad de uso y el soporte son excepcionales. Totalmente recomendado.',
        metrics: {
          adoption: '98%',
          satisfaction: '4.9/5'
        },
        video: '/testimonials/david-video.mp4'
      }
    ],
    stats: {
      customers: '10,000+',
      satisfaction: '98%',
      uptime: '99.99%'
    },
    reviews: {
      platforms: [
        {
          name: 'G2',
          rating: 4.8,
          reviews: 500,
          logo: '/reviews/g2.svg'
        },
        {
          name: 'Capterra',
          rating: 4.9,
          reviews: 350,
          logo: '/reviews/capterra.svg'
        }
      ]
    },
    featured: {
      heading: 'Featured In',
      logos: [
        {
          name: 'TechCrunch',
          logo: '/featured/techcrunch.svg'
        },
        {
          name: 'Forbes',
          logo: '/featured/forbes.svg'
        },
        {
          name: 'Wired',
          logo: '/featured/wired.svg'
        }
      ]
    },
    caseStudies: {
      heading: 'Historias de Éxito',
      studies: [
        {
          company: 'StartupX',
          result: '300% crecimiento',
          link: '#case-study-1'
        },
        {
          company: 'TechCorp',
          result: '$1M ahorrado',
          link: '#case-study-2'
        }
      ]
    }
  }
};
