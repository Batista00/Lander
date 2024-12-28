import { TemplateSection } from '@/types/templates';

export const showcase: TemplateSection = {
  name: 'Showcase',
  description: 'Showcase de producto enterprise',
  thumbnail: '/sections/showcase-enterprise.jpg',
  content: {
    heading: 'Plataforma Enterprise',
    subheading: 'Explore nuestra suite completa de soluciones',
    showcase: [
      {
        title: 'Dashboard Enterprise',
        description: 'Control total de su negocio',
        image: '/showcase/dashboard.jpg',
        video: '/showcase/dashboard.mp4',
        features: [
          'Analytics en tiempo real',
          'Reportes personalizados',
          'KPIs configurables'
        ],
        demo: {
          url: '#dashboard-demo',
          text: 'Ver demo interactiva'
        }
      },
      {
        title: 'Security Center',
        description: 'Seguridad de nivel militar',
        image: '/showcase/security.jpg',
        video: '/showcase/security.mp4',
        features: [
          'Monitoreo 24/7',
          'Detección de amenazas',
          'Compliance automático'
        ],
        demo: {
          url: '#security-demo',
          text: 'Ver demo de seguridad'
        }
      },
      {
        title: 'Integration Hub',
        description: 'Conecte todos sus sistemas',
        image: '/showcase/integration.jpg',
        video: '/showcase/integration.mp4',
        features: [
          'APIs empresariales',
          'Conectores pre-construidos',
          'Workflow automation'
        ],
        demo: {
          url: '#integration-demo',
          text: 'Ver demo de integración'
        }
      }
    ],
    interactiveDemo: {
      enabled: true,
      features: [
        {
          name: 'Live Preview',
          description: 'Pruebe las funciones en tiempo real'
        },
        {
          name: 'Customization',
          description: 'Personalice según sus necesidades'
        },
        {
          name: 'Data Simulation',
          description: 'Simule datos empresariales reales'
        }
      ]
    },
    cta: {
      text: 'Solicitar demo personalizada',
      url: '#request-demo'
    }
  }
};
