import { TemplateSection } from '@/types/templates';

export const testimonials: TemplateSection = {
  name: 'Testimonials',
  description: 'Testimonios de clientes enterprise',
  thumbnail: '/sections/testimonials-enterprise.jpg',
  content: {
    heading: 'Casos de Éxito Enterprise',
    subheading: 'Empresas líderes confían en nosotros',
    testimonials: [
      {
        name: 'John Smith',
        position: 'CTO',
        company: 'Global Tech Corp',
        image: '/testimonials/john.jpg',
        logo: '/companies/globaltech.svg',
        text: 'La implementación enterprise superó todas nuestras expectativas. El ROI fue evidente en los primeros 3 meses.',
        metrics: {
          roi: '300%',
          timeframe: '3 meses',
          savings: '$2M anuales'
        },
        caseStudy: {
          url: '#case-study-1',
          text: 'Ver caso completo'
        }
      },
      {
        name: 'Sarah Johnson',
        position: 'CEO',
        company: 'Innovation Labs',
        image: '/testimonials/sarah.jpg',
        logo: '/companies/innovation.svg',
        text: 'La escalabilidad y seguridad de la solución nos permitió expandir operaciones globalmente sin preocupaciones.',
        metrics: {
          growth: '200%',
          expansion: '5 nuevos mercados',
          efficiency: '40% mejora'
        },
        caseStudy: {
          url: '#case-study-2',
          text: 'Ver caso completo'
        }
      },
      {
        name: 'Michael Chen',
        position: 'CIO',
        company: 'Tech Solutions Inc',
        image: '/testimonials/michael.jpg',
        logo: '/companies/techsolutions.svg',
        text: 'El soporte enterprise y la capacidad de personalización nos permitieron adaptar la solución perfectamente a nuestras necesidades.',
        metrics: {
          customization: '100%',
          support: '24/7',
          satisfaction: '98%'
        },
        caseStudy: {
          url: '#case-study-3',
          text: 'Ver caso completo'
        }
      }
    ],
    stats: {
      clients: '500+ Enterprise Clients',
      satisfaction: '98% Satisfaction Rate',
      retention: '95% Retention Rate'
    },
    industries: [
      {
        name: 'Technology',
        companies: 150,
        icon: 'tech'
      },
      {
        name: 'Finance',
        companies: 120,
        icon: 'finance'
      },
      {
        name: 'Healthcare',
        companies: 80,
        icon: 'health'
      },
      {
        name: 'Manufacturing',
        companies: 100,
        icon: 'manufacturing'
      }
    ],
    awards: [
      {
        name: 'Enterprise Solution of the Year',
        organization: 'Tech Awards 2023',
        image: '/awards/tech2023.svg'
      },
      {
        name: 'Best Enterprise Security',
        organization: 'Security Excellence',
        image: '/awards/security2023.svg'
      }
    ]
  }
};
