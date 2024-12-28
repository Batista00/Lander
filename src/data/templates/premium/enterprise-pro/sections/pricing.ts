import { TemplateSection } from '@/types/templates';

export const pricing: TemplateSection = {
  name: 'Pricing',
  description: 'Planes enterprise y precios',
  thumbnail: '/sections/pricing-enterprise.jpg',
  content: {
    heading: 'Planes Enterprise',
    subheading: 'Soluciones adaptadas a grandes empresas',
    plans: [
      {
        name: 'Enterprise',
        price: '$10,000',
        billing: 'mensual',
        description: 'Para grandes empresas',
        features: [
          'Usuarios ilimitados',
          'Soporte 24/7 dedicado',
          'SLA garantizado',
          'Seguridad avanzada',
          'API personalizada',
          'Onboarding premium',
          'Training empresarial',
          'Custom development'
        ],
        highlight: true,
        cta: {
          text: 'Contactar ventas',
          url: '#contact-sales'
        }
      },
      {
        name: 'Enterprise Plus',
        price: 'Personalizado',
        billing: 'anual',
        description: 'Para corporaciones globales',
        features: [
          'Todo de Enterprise',
          'Multi-region deployment',
          'Compliance personalizado',
          'Auditoría avanzada',
          'Integración white-label',
          'Arquitectura dedicada',
          'Account manager dedicado',
          'Roadmap prioritario'
        ],
        highlight: false,
        cta: {
          text: 'Agendar consulta',
          url: '#schedule-consultation'
        }
      }
    ],
    addons: [
      {
        name: 'Premium Support',
        price: '+$2,000/mo',
        features: [
          'Soporte telefónico 24/7',
          'Tiempo respuesta 15min',
          'Soporte en sitio'
        ]
      },
      {
        name: 'Custom Development',
        price: 'Consultar',
        features: [
          'Desarrollo a medida',
          'Integraciones custom',
          'Features personalizadas'
        ]
      }
    ],
    comparison: {
      heading: 'Enterprise vs Enterprise Plus',
      features: [
        {
          name: 'Usuarios',
          enterprise: 'Ilimitados',
          enterprisePlus: 'Ilimitados + IAM'
        },
        {
          name: 'SLA',
          enterprise: '99.99%',
          enterprisePlus: '99.999%'
        },
        {
          name: 'Soporte',
          enterprise: '24/7 Dedicado',
          enterprisePlus: '24/7 Premium'
        },
        {
          name: 'Seguridad',
          enterprise: 'Avanzada',
          enterprisePlus: 'Military-grade'
        }
      ]
    },
    faq: [
      {
        question: '¿Qué incluye el soporte enterprise?',
        answer: 'Soporte 24/7, tiempo de respuesta garantizado y account manager dedicado'
      },
      {
        question: '¿Cómo funciona el custom development?',
        answer: 'Trabajamos con su equipo para desarrollar features específicas para su negocio'
      }
    ]
  }
};
