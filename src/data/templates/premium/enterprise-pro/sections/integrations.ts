import { TemplateSection } from '@/types/templates';

export const integrations: TemplateSection = {
  name: 'Integrations',
  description: 'Integraciones empresariales',
  thumbnail: '/sections/integrations-enterprise.jpg',
  content: {
    heading: 'Integraciones Enterprise',
    subheading: 'Conecte con todas sus herramientas empresariales',
    categories: [
      {
        name: 'CRM & Sales',
        integrations: [
          {
            name: 'Salesforce',
            logo: '/integrations/salesforce.svg',
            description: 'Integración completa con Salesforce',
            features: [
              'Sincronización bidireccional',
              'Custom objects',
              'Automation workflows'
            ]
          },
          {
            name: 'HubSpot Enterprise',
            logo: '/integrations/hubspot.svg',
            description: 'Conexión seamless con HubSpot',
            features: [
              'Contact sync',
              'Deal tracking',
              'Marketing automation'
            ]
          }
        ]
      },
      {
        name: 'ERP Systems',
        integrations: [
          {
            name: 'SAP',
            logo: '/integrations/sap.svg',
            description: 'Integración certificada con SAP',
            features: [
              'Real-time sync',
              'Custom workflows',
              'Data mapping'
            ]
          },
          {
            name: 'Oracle',
            logo: '/integrations/oracle.svg',
            description: 'Conexión enterprise con Oracle',
            features: [
              'Database integration',
              'Process automation',
              'Custom APIs'
            ]
          }
        ]
      },
      {
        name: 'Collaboration',
        integrations: [
          {
            name: 'Microsoft Teams',
            logo: '/integrations/teams.svg',
            description: 'Integración profunda con Teams',
            features: [
              'Chat notifications',
              'Video meetings',
              'Document sharing'
            ]
          },
          {
            name: 'Slack Enterprise',
            logo: '/integrations/slack.svg',
            description: 'Conexión avanzada con Slack',
            features: [
              'Channel integration',
              'Custom commands',
              'Workflow automation'
            ]
          }
        ]
      }
    ],
    api: {
      heading: 'API Enterprise',
      description: 'API robusta y personalizable',
      features: [
        'REST & GraphQL',
        'Custom endpoints',
        'Rate limiting configurable',
        'Webhooks avanzados'
      ],
      documentation: {
        url: '#api-docs',
        text: 'Ver documentación API'
      }
    },
    security: {
      heading: 'Seguridad de Integraciones',
      features: [
        'OAuth 2.0',
        'API Keys management',
        'IP whitelisting',
        'Audit logs'
      ]
    }
  }
};
