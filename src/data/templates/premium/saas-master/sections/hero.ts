import { TemplateSection } from '@/types/templates';

export const hero: TemplateSection = {
  name: 'Hero',
  description: 'Hero section para SaaS',
  thumbnail: '/sections/hero-saas.jpg',
  content: {
    heading: 'La Mejor Solución SaaS para tu Negocio',
    subheading: 'Potencia tu productividad con nuestra plataforma todo en uno',
    backgroundVideo: '/videos/saas-hero.mp4',
    animation: {
      type: 'gradient-flow',
      duration: 1200,
      colors: ['#8b5cf6', '#7c3aed', '#6d28d9']
    },
    cta: {
      primary: {
        text: 'Comenzar prueba gratis',
        url: '#signup',
        style: 'gradient'
      },
      secondary: {
        text: 'Ver demo en vivo',
        url: '#live-demo',
        style: 'outline'
      }
    },
    features: [
      {
        icon: 'lightning',
        text: '10x más rápido'
      },
      {
        icon: 'shield',
        text: 'Seguridad de nivel bancario'
      },
      {
        icon: 'users',
        text: '50k+ usuarios activos'
      }
    ],
    demo: {
      type: 'interactive',
      preview: '/videos/product-preview.mp4',
      features: [
        'Drag & Drop',
        'Tiempo real',
        'Colaboración'
      ]
    },
    stats: [
      {
        value: '99.9%',
        label: 'Uptime',
        icon: 'server'
      },
      {
        value: '2M+',
        label: 'Usuarios',
        icon: 'users'
      },
      {
        value: '500ms',
        label: 'Latencia',
        icon: 'bolt'
      }
    ],
    socialProof: {
      heading: 'Usado por equipos innovadores',
      logos: [
        {
          name: 'Startup Inc',
          image: '/logos/startup.svg'
        },
        {
          name: 'Tech Co',
          image: '/logos/techco.svg'
        },
        {
          name: 'Innovation Labs',
          image: '/logos/innovation.svg'
        }
      ],
      rating: {
        value: 4.9,
        count: '1,000+',
        source: 'G2 Crowd'
      }
    }
  }
};
