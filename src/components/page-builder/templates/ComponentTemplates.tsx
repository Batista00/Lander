import { Component } from '../../../store/landingStore';

export const componentTemplates: Record<string, Component[]> = {
  section: [
    {
      id: 'template-hero-1',
      type: 'section',
      content: {
        backgroundColor: 'bg-gradient-to-r from-purple-600 to-blue-600',
        padding: 'py-20',
        title: 'Bienvenido a Nuestra Plataforma',
        subtitle: 'La mejor solución para tu negocio',
        description: 'Descubre todas las posibilidades que tenemos para ti',
        buttonText: 'Comenzar Ahora',
        buttonColor: 'bg-white text-purple-600',
        alignment: 'center',
      },
      style: {
        padding: '4rem',
        textAlign: 'center',
      },
    },
    {
      id: 'template-hero-2',
      type: 'section',
      content: {
        backgroundColor: 'bg-gradient-to-r from-green-400 to-blue-500',
        padding: 'py-16',
        title: 'Impulsa tu Negocio',
        subtitle: 'Soluciones innovadoras para el crecimiento',
        description: 'Herramientas poderosas para alcanzar tus objetivos',
        buttonText: 'Descubre Más',
        buttonColor: 'bg-white text-green-500',
        alignment: 'left',
      },
    },
  ],
  features: [
    {
      id: 'template-features-1',
      type: 'features',
      content: {
        title: 'Nuestras Características',
        items: [
          {
            icon: 'rocket',
            title: 'Rápido y Eficiente',
            description: 'Optimizado para el mejor rendimiento',
          },
          {
            icon: 'shield',
            title: 'Seguro y Confiable',
            description: 'Protección de datos garantizada',
          },
          {
            icon: 'users',
            title: 'Colaborativo',
            description: 'Trabajo en equipo sin límites',
          },
        ],
        columns: 3,
        backgroundColor: 'bg-white',
        textColor: 'text-gray-800',
      },
    },
  ],
  pricing: [
    {
      id: 'template-pricing-1',
      type: 'pricing',
      content: {
        title: 'Planes y Precios',
        plans: [
          {
            name: 'Básico',
            price: '9.99',
            period: 'mes',
            features: [
              'Característica 1',
              'Característica 2',
              'Característica 3',
            ],
            buttonText: 'Elegir Plan',
            highlighted: false,
          },
          {
            name: 'Pro',
            price: '19.99',
            period: 'mes',
            features: [
              'Todo del plan Básico',
              'Característica Pro 1',
              'Característica Pro 2',
              'Característica Pro 3',
            ],
            buttonText: 'Elegir Plan Pro',
            highlighted: true,
          },
        ],
        backgroundColor: 'bg-gray-50',
      },
    },
  ],
  testimonials: [
    {
      id: 'template-testimonials-1',
      type: 'testimonials',
      content: {
        title: 'Lo que dicen nuestros clientes',
        items: [
          {
            quote: 'Excelente servicio, superó todas mis expectativas',
            author: 'María González',
            role: 'CEO, Empresa ABC',
            image: '/testimonials/1.jpg',
          },
          {
            quote: 'La mejor decisión que tomamos para nuestro negocio',
            author: 'Juan Pérez',
            role: 'Director de Marketing, XYZ Corp',
            image: '/testimonials/2.jpg',
          },
        ],
        backgroundColor: 'bg-blue-50',
      },
    },
  ],
  contact: [
    {
      id: 'template-contact-1',
      type: 'contact',
      content: {
        title: 'Contáctanos',
        subtitle: 'Estamos aquí para ayudarte',
        fields: [
          {
            type: 'text',
            name: 'name',
            label: 'Nombre',
            required: true,
          },
          {
            type: 'email',
            name: 'email',
            label: 'Correo electrónico',
            required: true,
          },
          {
            type: 'textarea',
            name: 'message',
            label: 'Mensaje',
            required: true,
          },
        ],
        buttonText: 'Enviar Mensaje',
        backgroundColor: 'bg-white',
      },
    },
  ],
};

export const getTemplatesForType = (type: string): Component[] => {
  return componentTemplates[type] || [];
};
