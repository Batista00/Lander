import { TemplateSection } from '@/types/templates';

export const faq: TemplateSection = {
  name: 'FAQ',
  description: 'Preguntas frecuentes',
  thumbnail: '/sections/faq-saas.jpg',
  content: {
    heading: 'Preguntas Frecuentes',
    subheading: 'Todo lo que necesitas saber',
    categories: [
      {
        name: 'General',
        questions: [
          {
            question: '¿Qué es [Producto]?',
            answer: 'Una plataforma SaaS todo en uno para mejorar la productividad de tu equipo.',
            video: '/faq/product-overview.mp4'
          },
          {
            question: '¿Cómo empiezo?',
            answer: 'Regístrate para una prueba gratuita de 14 días, sin tarjeta de crédito.',
            video: '/faq/getting-started.mp4'
          }
        ]
      },
      {
        name: 'Precios',
        questions: [
          {
            question: '¿Cuánto cuesta?',
            answer: 'Ofrecemos planes flexibles desde $29/mes. Ver planes detallados en la sección de precios.',
            link: '#pricing'
          },
          {
            question: '¿Hay período de prueba?',
            answer: 'Sí, 14 días gratis sin compromiso.',
            link: '#trial'
          }
        ]
      },
      {
        name: 'Características',
        questions: [
          {
            question: '¿Qué integraciones ofrecen?',
            answer: 'Nos integramos con más de 100 herramientas populares como Slack, Google Workspace, y más.',
            link: '#integrations'
          },
          {
            question: '¿Tienen API?',
            answer: 'Sí, ofrecemos una API RESTful completa con documentación detallada.',
            link: '#api'
          }
        ]
      },
      {
        name: 'Soporte',
        questions: [
          {
            question: '¿Qué tipo de soporte ofrecen?',
            answer: 'Soporte 24/7 vía chat, email y documentación detallada.',
            link: '#support'
          },
          {
            question: '¿Ofrecen onboarding?',
            answer: 'Sí, todos los planes incluyen sesiones de onboarding personalizadas.',
            link: '#onboarding'
          }
        ]
      }
    ],
    support: {
      heading: '¿No encuentras lo que buscas?',
      options: [
        {
          type: 'chat',
          text: 'Chat en vivo',
          available: true
        },
        {
          type: 'email',
          text: 'Enviar email',
          address: 'support@producto.com'
        },
        {
          type: 'docs',
          text: 'Documentación',
          url: '#docs'
        }
      ]
    }
  }
};
