import { TemplateSection } from '@/types/templates';

export const features: TemplateSection = {
  name: 'Features',
  description: 'Características principales del SaaS',
  thumbnail: '/sections/features-saas.jpg',
  content: {
    heading: 'Todo lo que necesitas en una plataforma',
    subheading: 'Características diseñadas para impulsar tu productividad',
    features: [
      {
        title: 'Automatización Inteligente',
        description: 'Automatiza tareas repetitivas con IA',
        icon: 'robot',
        animation: 'fade-right',
        demo: {
          video: '/features/automation.mp4',
          interactive: true
        },
        benefits: [
          'Ahorra 20+ horas/semana',
          'Reduce errores en 99%',
          'Escalable automáticamente'
        ]
      },
      {
        title: 'Colaboración en Tiempo Real',
        description: 'Trabaja con tu equipo en tiempo real',
        icon: 'users',
        animation: 'fade-up',
        demo: {
          video: '/features/collaboration.mp4',
          interactive: true
        },
        benefits: [
          'Edición simultánea',
          'Chat integrado',
          'Control de versiones'
        ]
      },
      {
        title: 'Analytics Avanzado',
        description: 'Insights detallados de tu negocio',
        icon: 'chart',
        animation: 'fade-left',
        demo: {
          video: '/features/analytics.mp4',
          interactive: true
        },
        benefits: [
          'Dashboards personalizados',
          'Reportes automatizados',
          'Predicciones con IA'
        ]
      }
    ],
    advanced: [
      {
        category: 'Seguridad',
        features: [
          'SSO Integration',
          '2FA',
          'Encriptación E2E'
        ]
      },
      {
        category: 'Integración',
        features: [
          'API REST',
          'Webhooks',
          'SDK'
        ]
      },
      {
        category: 'Soporte',
        features: [
          'Chat 24/7',
          'Documentación',
          'Webinars'
        ]
      }
    ],
    comparison: {
      heading: 'Por qué elegirnos',
      competitors: [
        {
          name: 'Nuestra solución',
          features: [
            'Todo incluido',
            'Soporte premium',
            'Updates mensuales'
          ]
        },
        {
          name: 'Otros',
          features: [
            'Características limitadas',
            'Soporte básico',
            'Updates ocasionales'
          ]
        }
      ]
    },
    showcase: {
      type: 'interactive',
      heading: 'Ve las características en acción',
      demo: {
        url: '#live-demo',
        preview: '/showcase/features-preview.jpg'
      }
    }
  }
};
