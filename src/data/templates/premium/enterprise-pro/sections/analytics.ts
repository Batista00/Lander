import { TemplateSection } from '@/types/templates';

export const analytics: TemplateSection = {
  name: 'Analytics',
  description: 'Analytics empresarial avanzado',
  thumbnail: '/sections/analytics-enterprise.jpg',
  content: {
    heading: 'Analytics Enterprise',
    subheading: 'Insights profundos para decisiones informadas',
    features: [
      {
        title: 'Real-time Analytics',
        description: 'Monitoreo en tiempo real de KPIs',
        icon: 'chart-line',
        metrics: [
          'Usuarios activos',
          'Conversiones',
          'Engagement',
          'Revenue'
        ]
      },
      {
        title: 'Predictive Analytics',
        description: 'Predicciones basadas en ML',
        icon: 'brain',
        features: [
          'Forecast de ventas',
          'Análisis de tendencias',
          'Detección de anomalías'
        ]
      },
      {
        title: 'Custom Reports',
        description: 'Reportes personalizados',
        icon: 'file-chart',
        types: [
          'Executive dashboards',
          'Sales reports',
          'Marketing analytics',
          'Custom metrics'
        ]
      }
    ],
    dashboards: [
      {
        name: 'Executive Dashboard',
        image: '/analytics/executive.jpg',
        metrics: [
          'Revenue Overview',
          'Growth Metrics',
          'Key Performance Indicators'
        ]
      },
      {
        name: 'Sales Analytics',
        image: '/analytics/sales.jpg',
        metrics: [
          'Pipeline Analysis',
          'Conversion Rates',
          'Revenue Forecast'
        ]
      },
      {
        name: 'Marketing Dashboard',
        image: '/analytics/marketing.jpg',
        metrics: [
          'Campaign Performance',
          'ROI Analysis',
          'Channel Attribution'
        ]
      }
    ],
    export: {
      formats: ['PDF', 'Excel', 'CSV', 'API'],
      scheduling: {
        frequency: ['Daily', 'Weekly', 'Monthly'],
        automation: true
      }
    },
    security: {
      dataProtection: 'GDPR Compliant',
      access: 'Role-based access control',
      encryption: 'End-to-end encryption'
    },
    integration: {
      platforms: [
        'Google Analytics',
        'Mixpanel',
        'Salesforce',
        'Custom Sources'
      ],
      api: {
        documentation: '#api-docs',
        support: '24/7 API support'
      }
    }
  }
};
