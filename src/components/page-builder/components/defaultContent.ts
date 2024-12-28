import { ComponentType } from "@/types/landing";

export const defaultComponents = {
  [ComponentType.Hero]: {
    title: 'Título Principal',
    description: 'Descripción atractiva de tu producto o servicio',
    buttonText: 'Empezar Ahora',
    buttonLink: '#',
    image: '/placeholder.jpg'
  },
  [ComponentType.Features]: {
    title: 'Nuestras Características',
    description: 'Descubre lo que nos hace únicos',
    features: [
      {
        title: 'Característica 1',
        description: 'Descripción de la característica 1',
        icon: 'star'
      },
      {
        title: 'Característica 2',
        description: 'Descripción de la característica 2',
        icon: 'shield'
      },
      {
        title: 'Característica 3',
        description: 'Descripción de la característica 3',
        icon: 'zap'
      }
    ]
  },
  [ComponentType.Text]: {
    title: 'Título de la Sección',
    content: 'Contenido de texto...',
    alignment: 'left'
  },
  [ComponentType.Image]: {
    src: '/placeholder.jpg',
    alt: 'Imagen descriptiva',
    caption: 'Descripción de la imagen'
  },
  [ComponentType.Video]: {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    title: 'Título del Video',
    description: 'Descripción del video'
  },
  [ComponentType.Button]: {
    text: 'Click Aquí',
    link: '#',
    variant: 'primary',
    size: 'medium'
  },
  [ComponentType.Team]: {
    title: 'Nuestro Equipo',
    description: 'Conoce a los profesionales detrás de nuestro éxito',
    members: [
      {
        name: 'Juan Pérez',
        position: 'CEO',
        image: '/team/member1.jpg',
        bio: 'Breve biografía...'
      }
    ]
  },
  [ComponentType.Blog]: {
    title: 'Últimas Noticias',
    description: 'Mantente al día con nuestras actualizaciones',
    posts: [
      {
        title: 'Título del Post',
        excerpt: 'Resumen del post...',
        image: '/blog/post1.jpg',
        date: '2023-12-20'
      }
    ]
  },
  [ComponentType.FAQ]: {
    title: 'Preguntas Frecuentes',
    description: 'Resolvemos tus dudas',
    questions: [
      {
        question: '¿Pregunta 1?',
        answer: 'Respuesta 1...'
      }
    ]
  },
  [ComponentType.Newsletter]: {
    title: 'Suscríbete',
    description: 'Recibe nuestras actualizaciones',
    buttonText: 'Suscribirse',
    placeholder: 'Tu email'
  },
  [ComponentType.Form]: {
    title: 'Contáctanos',
    description: 'Envíanos tu mensaje',
    fields: [
      {
        name: 'name',
        label: 'Nombre',
        type: 'text',
        required: true
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true
      },
      {
        name: 'message',
        label: 'Mensaje',
        type: 'textarea',
        required: true
      }
    ],
    submitText: 'Enviar'
  },
  [ComponentType.Carousel]: {
    items: [
      {
        image: '/placeholder-image-1.jpg',
        title: 'Slide 1',
        description: 'Descripción del slide 1'
      }
    ]
  },
  [ComponentType.Gallery]: {
    images: [
      {
        src: '/placeholder-image-1.jpg',
        alt: 'Imagen 1'
      }
    ]
  },
  [ComponentType.Pricing]: {
    plans: [
      {
        name: 'Básico',
        price: '$9.99',
        features: ['Feature 1', 'Feature 2'],
        cta: {
          text: 'Empezar',
          link: '#'
        }
      }
    ]
  },
  [ComponentType.FAQSimple]: {
    items: [
      {
        question: '¿Pregunta frecuente?',
        answer: 'Respuesta a la pregunta frecuente'
      }
    ]
  },
  [ComponentType.Comparison]: {
    items: [
      {
        feature: 'Característica',
        values: [
          {
            value: 'Valor 1',
            highlight: true
          }
        ]
      }
    ]
  },
  [ComponentType.Timeline]: {
    events: [
      {
        date: '2024',
        title: 'Evento importante',
        description: 'Descripción del evento'
      }
    ]
  },
  [ComponentType.Stats]: {
    items: [
      {
        value: '100+',
        label: 'Clientes'
      }
    ]
  },
  [ComponentType.VideoPlayer]: {
    url: 'https://example.com/video.mp4',
    title: 'Video Title',
    autoplay: false,
    controls: true,
    loop: false,
    muted: false,
    aspectRatio: '16:9',
    description: 'Descripción del video',
    layout: 'default'
  },
  [ComponentType.AudioPlayer]: {
    url: 'https://example.com/audio.mp3',
    title: 'Audio Title',
    autoplay: false,
    controls: true,
    loop: false,
    muted: false
  },
  [ComponentType.ThreeDViewer]: {
    modelUrl: 'https://example.com/model.glb',
    backgroundColor: '#000000',
    autoRotate: true,
    cameraPosition: [0, 0, 5],
    controls: {
      zoom: true,
      rotate: true,
      pan: true
    },
    lighting: {
      ambient: true,
      directional: true,
      intensity: 1
    }
  },
  [ComponentType.Maps]: {
    location: 'New York, NY',
    zoom: 12,
    markers: [],
    apiKey: '',
    style: 'default',
    height: '400px',
    controls: {
      zoom: true,
      streetView: true,
      fullscreen: true,
      search: true
    }
  },
  [ComponentType.SocialFeed]: {
    feed: [
      {
        platform: 'twitter',
        url: 'https://twitter.com/user/status/123'
      }
    ],
    layout: 'grid',
    theme: 'modern',
    interactions: true
  },
  [ComponentType.Chat]: {
    config: {
      welcomeMessage: '¡Hola! ¿En qué puedo ayudarte?',
      position: 'right',
      autoOpen: false,
      showTimestamp: true
    }
  },
  [ComponentType.Testimonios]: {
    items: [
      {
        name: 'Juan Pérez',
        role: 'CEO',
        company: 'Empresa S.A.',
        content: 'Excelente servicio',
        rating: 5,
        verified: true
      }
    ],
    showRating: true,
    showDate: true,
    showVerified: true,
    itemsPerPage: 3
  },
  [ComponentType.AdvancedBooking]: {
    title: 'Reserva tu cita',
    description: 'Selecciona el día y hora que prefieras',
    services: [
      {
        id: '1',
        name: 'Servicio Básico',
        duration: 60,
        price: 100
      }
    ],
    schedule: {
      days: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie'],
      hours: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
    }
  }
} as const;
