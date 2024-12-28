import { TemplateSection } from '@/types/templates';

export const pricing: TemplateSection = {
  name: 'Pricing',
  description: 'Planes y precios',
  thumbnail: '/sections/pricing-startup.jpg',
  content: {
    heading: 'Planes',
    subheading: 'Elige el plan perfecto para ti',
    plans: [
      {
        name: 'Básico',
        price: '9.99',
        billing: 'mensual',
        features: [
          'Hasta 5 usuarios',
          '5GB almacenamiento',
          'Soporte por email',
          'API básica'
        ],
        cta: {
          text: 'Comenzar gratis',
          url: '#signup-basic'
        },
        popular: false
      },
      {
        name: 'Pro',
        price: '29.99',
        billing: 'mensual',
        features: [
          'Hasta 20 usuarios',
          '20GB almacenamiento',
          'Soporte prioritario',
          'API completa',
          'Analytics avanzado'
        ],
        cta: {
          text: 'Comenzar prueba Pro',
          url: '#signup-pro'
        },
        popular: true
      },
      {
        name: 'Enterprise',
        price: 'Contactar',
        features: [
          'Usuarios ilimitados',
          'Almacenamiento ilimitado',
          'Soporte 24/7',
          'API personalizada',
          'Analytics en tiempo real',
          'SLA garantizado'
        ],
        cta: {
          text: 'Contactar ventas',
          url: '#contact-sales'
        },
        popular: false
      }
    ],
    faq: [
      {
        question: '¿Puedo cambiar de plan en cualquier momento?',
        answer: 'Sí, puedes actualizar o cambiar tu plan en cualquier momento.'
      },
      {
        question: '¿Hay un período de prueba?',
        answer: 'Sí, ofrecemos 14 días de prueba gratuita en todos los planes.'
      }
    ]
  }
};
