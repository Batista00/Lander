import { TemplateSection } from '@/types/templates';

export const features: TemplateSection = {
  name: 'Features',
  description: 'Características premium',
  thumbnail: '/sections/features-enterprise.jpg',
  content: {
    heading: 'Características Enterprise',
    subheading: 'Funcionalidades avanzadas para grandes empresas',
    features: [
      {
        title: 'Seguridad Empresarial',
        description: 'Protección de datos de nivel militar',
        icon: 'shield',
        details: {
          certifications: ['ISO 27001', 'SOC 2', 'GDPR'],
          features: [
            'Encriptación end-to-end',
            'Multi-factor authentication',
            'Access control'
          ]
        }
      },
      {
        title: 'Escalabilidad Global',
        description: 'Infraestructura diseñada para escalar',
        icon: 'scale',
        details: {
          capacity: 'Millones de usuarios',
          features: [
            'Load balancing',
            'Auto-scaling',
            'Global CDN'
          ]
        }
      },
      {
        title: 'Integración Avanzada',
        description: 'Conecte con cualquier sistema',
        icon: 'connect',
        details: {
          integrations: ['SAP', 'Oracle', 'Salesforce'],
          features: [
            'API empresarial',
            'Webhooks personalizados',
            'SSO'
          ]
        }
      },
      {
        title: 'Analytics Pro',
        description: 'Insights profundos de negocio',
        icon: 'chart',
        details: {
          reports: ['Custom', 'Real-time', 'Predictive'],
          features: [
            'Business Intelligence',
            'Machine Learning',
            'Custom dashboards'
          ]
        }
      }
    ],
    comparison: {
      heading: 'Enterprise vs Standard',
      features: [
        {
          name: 'Seguridad',
          enterprise: 'Nivel militar',
          standard: 'Básica'
        },
        {
          name: 'Soporte',
          enterprise: '24/7 Dedicado',
          standard: 'Horario comercial'
        },
        {
          name: 'SLA',
          enterprise: '99.99%',
          standard: '99.9%'
        },
        {
          name: 'Personalización',
          enterprise: 'Total',
          standard: 'Limitada'
        }
      ]
    }
  }
};
