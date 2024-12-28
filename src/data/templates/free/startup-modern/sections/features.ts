import { TemplateSection } from '@/types/templates';

export const features: TemplateSection = {
  name: 'Features',
  description: 'Características principales',
  thumbnail: '/sections/features-startup.jpg',
  content: {
    heading: 'Características',
    features: [
      {
        title: 'Innovador',
        description: 'Tecnología de última generación',
        icon: 'sparkles',
        animation: {
          type: 'fade-right',
          delay: 200
        }
      },
      {
        title: 'Escalable',
        description: 'Crece con tu negocio',
        icon: 'chart-up',
        animation: {
          type: 'fade-up',
          delay: 400
        }
      },
      {
        title: 'Seguro',
        description: 'Máxima protección',
        icon: 'shield',
        animation: {
          type: 'fade-left',
          delay: 600
        }
      }
    ],
    additionalFeatures: [
      {
        category: 'Seguridad',
        items: ['2FA', 'Encriptación', 'Backups']
      },
      {
        category: 'Rendimiento',
        items: ['CDN Global', 'Auto-scaling', 'Caché']
      },
      {
        category: 'Soporte',
        items: ['24/7', 'Chat en vivo', 'Documentación']
      }
    ]
  }
};
