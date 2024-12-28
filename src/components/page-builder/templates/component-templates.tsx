import { ComponentTemplate } from '../types';

export const componentTemplates: Record<string, ComponentTemplate> = {
  // Componentes Básicos
  hero: {
    defaultProps: {
      title: 'Título Principal',
      subtitle: 'Subtítulo descriptivo que captura la atención',
      image: '/placeholder.jpg',
      ctaText: 'Comenzar',
      alignment: 'center'
    },
    template: (props) => ({
      type: 'div',
      className: 'relative h-[500px] flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-800 text-white',
      children: [
        {
          type: 'div',
          className: 'absolute inset-0',
          style: { backgroundImage: `url(${props.image})`, opacity: 0.5, backgroundSize: 'cover', backgroundPosition: 'center' }
        },
        {
          type: 'div',
          className: 'relative z-10 text-center max-w-4xl mx-auto px-4',
          children: [
            {
              type: 'h1',
              className: 'text-5xl font-bold mb-4',
              children: props.title
            },
            {
              type: 'p',
              className: 'text-xl mb-8',
              children: props.subtitle
            },
            {
              type: 'button',
              className: 'px-8 py-3 bg-gradient-to-r from-[#1ce480] to-[#12c4a0] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity',
              children: props.ctaText
            }
          ]
        }
      ]
    })
  },

  // Componentes Premium
  'cta-hero': {
    defaultProps: {
      title: 'Oferta Especial',
      subtitle: '¡No te pierdas esta oportunidad única!',
      image: '/offer-bg.jpg',
      ctaText: 'Obtener Ahora',
      price: '99',
      countdown: '2024-01-01'
    },
    template: (props) => ({
      type: 'div',
      className: 'relative h-[400px] flex items-center justify-center bg-gradient-to-r from-yellow-100 to-yellow-50',
      children: [
        {
          type: 'div',
          className: 'absolute inset-0',
          style: { backgroundImage: `url(${props.image})`, opacity: 0.1, backgroundSize: 'cover', backgroundPosition: 'center' }
        },
        {
          type: 'div',
          className: 'relative z-10 text-center',
          children: [
            {
              type: 'h2',
              className: 'text-4xl font-bold text-gray-900 mb-4',
              children: props.title
            },
            {
              type: 'p',
              className: 'text-xl text-gray-700 mb-6',
              children: props.subtitle
            },
            {
              type: 'div',
              className: 'text-3xl font-bold text-[#1ce480] mb-6',
              children: `$${props.price}`
            },
            {
              type: 'button',
              className: 'px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors',
              children: props.ctaText
            }
          ]
        }
      ]
    })
  },

  carousel: {
    defaultProps: {
      items: [
        { image: '/slide1.jpg', title: 'Slide 1', description: 'Descripción 1' },
        { image: '/slide2.jpg', title: 'Slide 2', description: 'Descripción 2' },
        { image: '/slide3.jpg', title: 'Slide 3', description: 'Descripción 3' }
      ],
      autoplay: true,
      interval: 5000
    },
    template: (props) => ({
      type: 'div',
      className: 'relative h-[400px] overflow-hidden rounded-lg',
      children: [
        {
          type: 'div',
          className: 'flex transition-transform duration-500',
          children: props.items.map((item, index) => ({
            type: 'div',
            className: 'w-full flex-shrink-0',
            style: { backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' },
            children: [
              {
                type: 'div',
                className: 'absolute inset-0 bg-black bg-opacity-40',
              },
              {
                type: 'div',
                className: 'relative z-10 p-8 text-white',
                children: [
                  {
                    type: 'h3',
                    className: 'text-2xl font-bold mb-2',
                    children: item.title
                  },
                  {
                    type: 'p',
                    className: 'text-lg',
                    children: item.description
                  }
                ]
              }
            ]
          }))
        },
        {
          type: 'div',
          className: 'absolute bottom-4 left-0 right-0 flex justify-center gap-2',
          children: props.items.map((_, index) => ({
            type: 'button',
            className: 'w-2 h-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-100 transition-opacity',
            'data-active': index === 0 ? 'true' : 'false'
          }))
        }
      ]
    })
  },

  testimonials: {
    defaultProps: {
      items: [
        {
          name: 'Juan Pérez',
          role: 'CEO',
          company: 'Empresa Inc.',
          image: '/avatar1.jpg',
          quote: 'Excelente servicio, superó todas nuestras expectativas.'
        },
        {
          name: 'María García',
          role: 'Directora',
          company: 'Startup Ltd.',
          image: '/avatar2.jpg',
          quote: 'La mejor decisión que tomamos para nuestro negocio.'
        }
      ]
    },
    template: (props) => ({
      type: 'div',
      className: 'py-12 bg-gray-50',
      children: [
        {
          type: 'div',
          className: 'max-w-6xl mx-auto px-4',
          children: [
            {
              type: 'div',
              className: 'grid grid-cols-1 md:grid-cols-2 gap-8',
              children: props.items.map(item => ({
                type: 'div',
                className: 'bg-white p-6 rounded-lg shadow-lg',
                children: [
                  {
                    type: 'div',
                    className: 'flex items-center gap-4 mb-4',
                    children: [
                      {
                        type: 'img',
                        className: 'w-12 h-12 rounded-full',
                        src: item.image,
                        alt: item.name
                      },
                      {
                        type: 'div',
                        children: [
                          {
                            type: 'h4',
                            className: 'font-bold text-gray-900',
                            children: item.name
                          },
                          {
                            type: 'p',
                            className: 'text-sm text-gray-600',
                            children: `${item.role} en ${item.company}`
                          }
                        ]
                      }
                    ]
                  },
                  {
                    type: 'p',
                    className: 'text-gray-700 italic',
                    children: `"${item.quote}"`
                  }
                ]
              }))
            }
          ]
        }
      ]
    })
  }
};
