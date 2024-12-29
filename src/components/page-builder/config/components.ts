import { IconType } from 'react-icons';
import { 
  FiLayout, 
  FiGrid, 
  FiAward, 
  FiArrowRight, 
  FiMessageSquare, 
  FiImage,
  FiType,
  FiBox,
  FiDollarSign,
  FiStar
} from 'react-icons/fi';

export interface ComponentDefinition {
  type: string;
  name: string;
  icon: IconType;
  description: string;
  defaultContent: any;
  aiPrompt: string;
  category: 'layout' | 'content' | 'media' | 'interactive';
  maxWidth?: string;
}

export const AVAILABLE_COMPONENTS: ComponentDefinition[] = [
  {
    type: 'hero',
    name: 'Hero',
    icon: FiLayout,
    description: 'Sección principal con título, subtítulo y llamada a la acción',
    category: 'layout',
    maxWidth: 'max-w-7xl',
    defaultContent: {
      title: 'Título Principal',
      subtitle: 'Subtítulo impactante',
      description: 'Descripción detallada de tu producto o servicio',
      buttonText: 'Comenzar',
      buttonLink: '#',
      buttonStyle: 'default'
    },
    aiPrompt: 'Genera un hero section que capture la esencia del negocio, con un título persuasivo, subtítulo claro y llamada a la acción efectiva.'
  },
  {
    type: 'features',
    name: 'Características',
    icon: FiGrid,
    description: 'Muestra las características principales de tu producto',
    category: 'content',
    maxWidth: 'max-w-6xl',
    defaultContent: {
      title: 'Características',
      description: 'Descubre lo que nos hace únicos',
      features: []
    },
    aiPrompt: 'Crea una lista de características clave del producto o servicio, cada una con un título conciso, descripción clara y un ícono relevante.'
  },
  {
    type: 'benefits',
    name: 'Beneficios',
    icon: FiAward,
    description: 'Destaca los beneficios principales para tus clientes',
    category: 'content',
    maxWidth: 'max-w-6xl',
    defaultContent: {
      title: 'Beneficios',
      description: 'Por qué elegirnos',
      benefits: []
    },
    aiPrompt: 'Lista los beneficios más importantes que los clientes obtienen, enfocándote en el valor y las soluciones que ofreces.'
  },
  {
    type: 'cta',
    name: 'Llamada a la Acción',
    icon: FiArrowRight,
    description: 'Sección de llamada a la acción',
    category: 'interactive',
    maxWidth: 'max-w-4xl',
    defaultContent: {
      title: '¡Comienza Hoy!',
      description: 'No esperes más para transformar tu negocio',
      buttonText: 'Contactar',
      buttonLink: '#contact',
      buttonStyle: 'default'
    },
    aiPrompt: 'Diseña una llamada a la acción persuasiva que motive a los visitantes a dar el siguiente paso.'
  },
  {
    type: 'testimonials',
    name: 'Testimonios',
    icon: FiMessageSquare,
    description: 'Muestra testimonios de clientes satisfechos',
    category: 'content',
    maxWidth: 'max-w-6xl',
    defaultContent: {
      title: 'Lo que dicen nuestros clientes',
      description: 'Testimonios de clientes satisfechos',
      testimonials: []
    },
    aiPrompt: 'Genera testimonios realistas y convincentes que destaquen diferentes aspectos positivos del producto o servicio.'
  },
  {
    type: 'gallery',
    name: 'Galería',
    icon: FiImage,
    description: 'Galería de imágenes',
    category: 'media',
    maxWidth: 'max-w-7xl',
    defaultContent: {
      title: 'Nuestra Galería',
      description: 'Explora nuestro trabajo',
      images: []
    },
    aiPrompt: 'Sugiere categorías y descripciones para una galería de imágenes que muestre lo mejor del negocio.'
  },
  {
    type: 'text',
    name: 'Texto',
    icon: FiType,
    description: 'Bloque de texto con formato',
    category: 'content',
    maxWidth: 'max-w-4xl',
    defaultContent: {
      title: '',
      content: '',
      alignment: 'left'
    },
    aiPrompt: 'Genera contenido textual persuasivo y bien estructurado que comunique el mensaje principal.'
  },
  {
    type: 'pricing',
    name: 'Precios',
    icon: FiDollarSign,
    description: 'Tabla de precios y planes',
    category: 'interactive',
    maxWidth: 'max-w-6xl',
    defaultContent: {
      title: 'Nuestros Planes',
      description: 'Elige el plan perfecto para ti',
      plans: []
    },
    aiPrompt: 'Crea una estructura de precios clara y competitiva, con diferentes niveles de servicio y características destacadas.'
  },
  {
    type: 'faq',
    name: 'Preguntas Frecuentes',
    icon: FiMessageSquare,
    description: 'Sección de preguntas frecuentes',
    category: 'content',
    maxWidth: 'max-w-4xl',
    defaultContent: {
      title: 'Preguntas Frecuentes',
      description: 'Respuestas a tus dudas',
      questions: []
    },
    aiPrompt: 'Genera una lista de preguntas y respuestas comunes que aborden las principales inquietudes de los clientes potenciales.'
  },
  {
    type: 'stats',
    name: 'Estadísticas',
    icon: FiStar,
    description: 'Muestra estadísticas y números importantes',
    category: 'content',
    maxWidth: 'max-w-5xl',
    defaultContent: {
      title: 'Nuestros Números',
      description: 'Resultados que hablan por sí solos',
      stats: []
    },
    aiPrompt: 'Sugiere estadísticas relevantes y métricas impactantes que demuestren el éxito y la confiabilidad del negocio.'
  }
];
