import { TemplateSection } from '@/types/templates';

export const product: TemplateSection = {
  name: 'Product',
  description: 'Showcase del producto',
  thumbnail: '/sections/product-startup.jpg',
  content: {
    heading: 'Nuestro Producto',
    subheading: 'Diseñado para el futuro',
    features: [
      {
        title: 'Inteligencia Artificial',
        description: 'Potenciado por los últimos avances en IA',
        icon: 'rocket'
      },
      {
        title: 'Escalabilidad',
        description: 'Crece sin límites con tu negocio',
        icon: 'lightning'
      }
    ],
    demoVideo: '/videos/product-demo.mp4',
    screenshots: [
      {
        image: '/screenshots/dashboard.jpg',
        caption: 'Dashboard principal'
      },
      {
        image: '/screenshots/analytics.jpg',
        caption: 'Analytics en tiempo real'
      }
    ],
    integrations: [
      {
        name: 'Slack',
        icon: '/icons/slack.svg'
      },
      {
        name: 'GitHub',
        icon: '/icons/github.svg'
      },
      {
        name: 'Jira',
        icon: '/icons/jira.svg'
      }
    ]
  }
};
