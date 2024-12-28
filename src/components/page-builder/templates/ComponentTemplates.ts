import { ComponentType, Component, HeroContent, FeaturesContent, PricingContent, TestimoniosContent, FormContent } from '@/types/components';

export const componentTemplates: Record<ComponentType, Component[]> = {
  [ComponentType.Hero]: [
    {
      id: 'hero-1',
      type: ComponentType.Hero,
      content: {
        title: 'Título Principal',
        subtitle: 'Subtítulo convincente',
        description: 'Una descripción detallada de tu producto o servicio',
        buttonText: 'Comenzar Ahora',
        buttonLink: '#',
        buttonStyle: 'primary',
        layout: 'center',
        backgroundImage: '/placeholder.jpg'
      },
      styles: {
        colors: {
          background: 'bg-gradient-to-r from-purple-600 to-blue-600',
          text: 'text-white'
        },
        spacing: {
          padding: '4rem'
        }
      }
    },
    {
      id: 'hero-2',
      type: ComponentType.Hero,
      content: {
        title: 'Impulsa tu Negocio',
        subtitle: 'Soluciones innovadoras para el crecimiento',
        description: 'Herramientas poderosas para alcanzar tus objetivos',
        buttonText: 'Descubre Más',
        buttonLink: '#',
        buttonStyle: 'outline',
        layout: 'left',
        backgroundImage: '/placeholder-2.jpg'
      },
      styles: {
        colors: {
          background: 'bg-gradient-to-r from-green-400 to-blue-500',
          text: 'text-white'
        },
        spacing: {
          padding: '4rem'
        }
      }
    }
  ],

  [ComponentType.Features]: [
    {
      id: 'features-1',
      type: ComponentType.Features,
      content: {
        title: 'Nuestras Características',
        description: 'Descubre lo que nos hace únicos',
        features: [
          {
            title: 'Rápido y Eficiente',
            description: 'Optimizado para el mejor rendimiento',
            icon: 'rocket'
          },
          {
            title: 'Seguro y Confiable',
            description: 'Protección de datos garantizada',
            icon: 'shield'
          },
          {
            title: 'Colaborativo',
            description: 'Trabajo en equipo sin límites',
            icon: 'users'
          }
        ]
      },
      styles: {
        colors: {
          background: 'bg-white',
          text: 'text-gray-800'
        },
        spacing: {
          padding: '4rem'
        }
      }
    }
  ],

  [ComponentType.Pricing]: [
    {
      id: 'pricing-1',
      type: ComponentType.Pricing,
      content: {
        title: 'Planes y Precios',
        description: 'Elige el plan perfecto para ti',
        plans: [
          {
            name: 'Básico',
            price: '9.99',
            period: 'mes',
            features: [
              'Característica 1',
              'Característica 2',
              'Característica 3'
            ],
            buttonText: 'Elegir Plan',
            highlighted: false
          },
          {
            name: 'Pro',
            price: '19.99',
            period: 'mes',
            features: [
              'Todo del plan Básico',
              'Característica Pro 1',
              'Característica Pro 2',
              'Característica Pro 3'
            ],
            buttonText: 'Elegir Plan Pro',
            highlighted: true
          }
        ]
      },
      styles: {
        colors: {
          background: 'bg-gray-50',
          text: 'text-gray-900'
        },
        spacing: {
          padding: '4rem'
        }
      }
    }
  ],

  [ComponentType.Testimonios]: [
    {
      id: 'testimonios-1',
      type: ComponentType.Testimonios,
      content: {
        title: 'Lo que dicen nuestros clientes',
        description: 'Testimonios de clientes satisfechos',
        testimonios: [
          {
            id: '1',
            author: {
              name: 'María García',
              title: 'CEO, Innovatech',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria'
            },
            content: 'Increíble servicio y atención al cliente. Superó todas nuestras expectativas.',
            rating: 5,
            date: '2023-12-15',
            verified: true
          },
          {
            id: '2',
            author: {
              name: 'Juan Pérez',
              title: 'Director de Marketing, TechCorp',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan'
            },
            content: 'La mejor decisión que tomamos fue trabajar con ellos. Resultados excepcionales.',
            rating: 5,
            date: '2023-12-10',
            verified: true
          }
        ],
        layout: 'grid',
        theme: 'modern',
        showRating: true,
        showDate: true,
        showVerified: true,
        itemsPerPage: 2
      },
      styles: {
        colors: {
          background: 'bg-white',
          text: 'text-gray-900'
        },
        spacing: {
          padding: '4rem'
        }
      }
    }
  ],

  [ComponentType.Form]: [
    {
      id: 'form-1',
      type: ComponentType.Form,
      content: {
        title: 'Contáctanos',
        description: 'Estamos aquí para ayudarte',
        fields: [
          {
            type: 'text',
            name: 'name',
            label: 'Nombre',
            required: true
          },
          {
            type: 'email',
            name: 'email',
            label: 'Correo electrónico',
            required: true
          },
          {
            type: 'textarea',
            name: 'message',
            label: 'Mensaje',
            required: true
          }
        ],
        submitButton: {
          text: 'Enviar Mensaje',
          style: 'primary'
        }
      },
      styles: {
        colors: {
          background: 'bg-white',
          text: 'text-gray-900'
        },
        spacing: {
          padding: '4rem'
        }
      }
    }
  ],

  // Inicializar los demás tipos de componentes con arrays vacíos
  [ComponentType.Text]: [],
  [ComponentType.Button]: [],
  [ComponentType.Image]: [],
  [ComponentType.Video]: [],
  [ComponentType.Team]: [],
  [ComponentType.Blog]: [],
  [ComponentType.FAQ]: [],
  [ComponentType.Newsletter]: [],
  [ComponentType.AdvancedBooking]: [],
  [ComponentType.Carousel]: [],
  [ComponentType.Gallery]: [],
  [ComponentType.FAQSimple]: [],
  [ComponentType.Comparison]: [],
  [ComponentType.Timeline]: [],
  [ComponentType.Stats]: [],
  [ComponentType.VideoPlayer]: [],
  [ComponentType.AudioPlayer]: [],
  [ComponentType.ThreeDViewer]: [],
  [ComponentType.Maps]: [],
  [ComponentType.SocialFeed]: [],
  [ComponentType.Chat]: []
};

export const getTemplatesForType = (type: ComponentType): Component[] => {
  return componentTemplates[type] || [];
};
