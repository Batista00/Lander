import { TemplateSection } from '@/types/templates';

export const integration: TemplateSection = {
  name: 'Integration',
  description: 'Integraciones disponibles',
  thumbnail: '/sections/integration-saas.jpg',
  content: {
    heading: 'Se Integra con tus Herramientas Favoritas',
    subheading: 'Conecta con más de 100 aplicaciones',
    categories: [
      {
        name: 'Productividad',
        integrations: [
          {
            name: 'Slack',
            logo: '/integrations/slack.svg',
            description: 'Chat y notificaciones',
            features: [
              'Notificaciones en tiempo real',
              'Comandos personalizados',
              'Compartir actualizaciones'
            ]
          },
          {
            name: 'Google Workspace',
            logo: '/integrations/google.svg',
            description: 'Suite completa de Google',
            features: [
              'Google Calendar',
              'Google Drive',
              'Google Docs'
            ]
          }
        ]
      },
      {
        name: 'Desarrollo',
        integrations: [
          {
            name: 'GitHub',
            logo: '/integrations/github.svg',
            description: 'Control de versiones',
            features: [
              'Pull requests',
              'Issues tracking',
              'CI/CD'
            ]
          },
          {
            name: 'Jira',
            logo: '/integrations/jira.svg',
            description: 'Gestión de proyectos',
            features: [
              'Tickets sync',
              'Workflows',
              'Reportes'
            ]
          }
        ]
      }
    ],
    api: {
      heading: 'API Robusta',
      description: 'API RESTful completa y documentada',
      features: [
        'Autenticación OAuth 2.0',
        'Rate limiting configurable',
        'Webhooks personalizados'
      ],
      documentation: {
        url: '#api-docs',
        preview: '/api/documentation-preview.jpg'
      }
    },
    webhooks: {
      heading: 'Webhooks',
      description: 'Mantén tus sistemas sincronizados',
      events: [
        'user.created',
        'payment.success',
        'task.completed'
      ]
    },
    security: {
      heading: 'Seguridad Primero',
      features: [
        'API Keys',
        'IP Whitelist',
        'Audit logs'
      ]
    },
    showcase: {
      heading: 'Casos de Uso',
      examples: [
        {
          title: 'Automatización de Marketing',
          description: 'Integra con herramientas de marketing',
          image: '/showcase/marketing.jpg'
        },
        {
          title: 'Gestión de Ventas',
          description: 'Conecta con tu CRM',
          image: '/showcase/sales.jpg'
        }
      ]
    }
  }
};
