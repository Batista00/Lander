import { TemplateSection } from '@/types/templates';

export const solutions: TemplateSection = {
  name: 'Solutions',
  description: 'Soluciones empresariales',
  thumbnail: '/sections/solutions-enterprise.jpg',
  content: {
    heading: 'Soluciones Enterprise',
    subheading: 'Diseñadas para escalar con su negocio',
    solutions: [
      {
        title: 'Digital Transformation',
        description: 'Transforme su negocio con tecnologías digitales avanzadas',
        icon: 'transformation',
        image: '/solutions/digital-transform.jpg',
        features: [
          'Automatización de procesos',
          'Integración de sistemas',
          'Análisis predictivo'
        ],
        caseStudy: {
          title: 'Caso de éxito',
          company: 'Global Corp',
          result: '200% ROI en 6 meses'
        }
      },
      {
        title: 'Cloud Solutions',
        description: 'Infraestructura cloud empresarial segura y escalable',
        icon: 'cloud',
        image: '/solutions/cloud.jpg',
        features: [
          'Multi-cloud support',
          'Auto-scaling',
          'Disaster recovery'
        ],
        caseStudy: {
          title: 'Caso de éxito',
          company: 'Tech Industries',
          result: '40% reducción en costos'
        }
      },
      {
        title: 'Data Analytics',
        description: 'Analytics avanzado y Business Intelligence',
        icon: 'analytics',
        image: '/solutions/analytics.jpg',
        features: [
          'Machine Learning',
          'Real-time analytics',
          'Custom dashboards'
        ],
        caseStudy: {
          title: 'Caso de éxito',
          company: 'Data Corp',
          result: '85% mejor toma de decisiones'
        }
      }
    ],
    cta: {
      text: 'Explorar todas las soluciones',
      url: '#all-solutions'
    }
  }
};
