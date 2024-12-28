import { TemplateSection } from '@/types/templates';

export const pricing: TemplateSection = {
  name: 'Pricing',
  description: 'Planes y precios',
  thumbnail: '/sections/pricing-saas.jpg',
  content: {
    heading: 'Planes Flexibles para Cada Necesidad',
    subheading: 'Escala según tus necesidades',
    plans: [
      {
        name: 'Starter',
        price: '29',
        billing: 'mensual',
        description: 'Perfecto para empezar',
        features: [
          'Hasta 5 usuarios',
          'Características básicas',
          'Soporte por email',
          '5GB almacenamiento'
        ],
        popular: false,
        cta: {
          text: 'Comenzar gratis',
          url: '#signup-starter'
        }
      },
      {
        name: 'Pro',
        price: '79',
        billing: 'mensual',
        description: 'Para equipos en crecimiento',
        features: [
          'Hasta 20 usuarios',
          'Todas las características',
          'Soporte prioritario',
          '50GB almacenamiento',
          'API access',
          'Analytics avanzado'
        ],
        popular: true,
        cta: {
          text: 'Comenzar prueba Pro',
          url: '#signup-pro'
        }
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Solución personalizada',
        features: [
          'Usuarios ilimitados',
          'Características premium',
          'Soporte 24/7',
          'Almacenamiento ilimitado',
          'API personalizada',
          'SLA garantizado'
        ],
        popular: false,
        cta: {
          text: 'Contactar ventas',
          url: '#contact-sales'
        }
      }
    ],
    addons: [
      {
        name: 'API Premium',
        price: '+$49/mo',
        features: [
          'Rate limit aumentado',
          'Endpoints dedicados',
          'Soporte técnico'
        ]
      },
      {
        name: 'White Label',
        price: '+$99/mo',
        features: [
          'Marca personalizada',
          'Dominio custom',
          'Diseño personalizado'
        ]
      }
    ],
    billing: {
      cycles: [
        {
          period: 'Mensual',
          discount: 0
        },
        {
          period: 'Anual',
          discount: 20
        }
      ],
      methods: [
        'credit-card',
        'paypal',
        'wire-transfer'
      ]
    },
    guarantee: {
      days: 30,
      description: 'Garantía de devolución sin preguntas'
    },
    faq: [
      {
        question: '¿Puedo cambiar de plan?',
        answer: 'Sí, puedes actualizar o cambiar tu plan en cualquier momento'
      },
      {
        question: '¿Hay costos ocultos?',
        answer: 'No, todos los costos están claramente detallados'
      }
    ]
  }
};
