import { TemplateSection } from '@/types/templates';

export const hero: TemplateSection = {
  name: 'Hero',
  description: 'Hero section empresarial premium',
  thumbnail: '/sections/hero-enterprise.jpg',
  content: {
    heading: 'Soluciones Empresariales de Próxima Generación',
    subheading: 'Transforme su empresa con tecnología de vanguardia',
    backgroundVideo: '/videos/enterprise-hero.mp4',
    animation: {
      type: 'parallax',
      duration: 1000,
      elements: [
        {
          type: 'text',
          delay: 200
        },
        {
          type: 'image',
          delay: 400
        }
      ]
    },
    cta: {
      primary: {
        text: 'Solicitar Demo',
        url: '#demo',
        style: 'gradient'
      },
      secondary: {
        text: 'Contactar Ventas',
        url: '#contact',
        style: 'outline'
      }
    },
    stats: [
      {
        value: '500+',
        label: 'Empresas Fortune 500',
        icon: 'building'
      },
      {
        value: '99.9%',
        label: 'Uptime Garantizado',
        icon: 'chart'
      },
      {
        value: '24/7',
        label: 'Soporte Enterprise',
        icon: 'support'
      }
    ],
    trusted: {
      text: 'Confían en nosotros:',
      logos: [
        {
          name: 'Microsoft',
          image: '/logos/microsoft.svg'
        },
        {
          name: 'IBM',
          image: '/logos/ibm.svg'
        },
        {
          name: 'Oracle',
          image: '/logos/oracle.svg'
        },
        {
          name: 'SAP',
          image: '/logos/sap.svg'
        }
      ]
    }
  }
};
