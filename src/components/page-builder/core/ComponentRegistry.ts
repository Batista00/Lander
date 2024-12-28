import React from 'react';
import { ComponentType, ComponentRegistry, ComponentEditorProps } from '@/types/components';
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Contact } from "../components/Contact";
import { Text } from "../components/Text";
import { Button } from "../components/Button";
import { Image } from "../components/Image";
import { Video } from "../components/Video";
import { Form } from "../components/Form";
import { Pricing } from "../components/Pricing";
import { Gallery } from "../components/Gallery";
import { Map } from "../components/Map";
import { Social } from "../components/Social";
import { Stats } from "../components/Stats";
import { Testimonios } from "../components/Testimonios";

// Premium components
import PremiumTeam from "../components/premium/PremiumTeam";
import PremiumBlog from "../components/premium/PremiumBlog";
import FAQ from "../components/premium/FAQ";
import Newsletter from "../components/premium/Newsletter";
import AdvancedBooking from "../components/premium/AdvancedBooking";
import HeroCTA from "../components/premium/HeroCTA";
import ModernHero from "../components/premium/ModernHero";
import ModernContact from "../components/premium/ModernContact";
import ModernProjects from "../components/premium/ModernProjects";
import ModernServices from "../components/premium/ModernServices";
import ModernStats from "../components/premium/ModernStats";
import ModernTestimonials from "../components/premium/ModernTestimonials";

// Registro de componentes básicos
export const BASIC_COMPONENTS: ComponentRegistry = {
  [ComponentType.Hero]: {
    component: Hero as React.ComponentType<ComponentEditorProps>,
    name: 'Hero',
    description: 'Sección principal de la página',
    defaultContent: {
      title: 'Tu Título Principal',
      subtitle: 'Un subtítulo convincente que explique tu propuesta de valor',
      cta: { text: 'Empezar Ahora', link: '#' }
    },
    tags: ['hero', 'header']
  },
  [ComponentType.Features]: {
    component: Features as React.ComponentType<ComponentEditorProps>,
    name: 'Características',
    description: 'Muestra las características principales',
    defaultContent: {
      title: 'Nuestras Características',
      features: []
    },
    tags: ['features', 'services']
  },
  [ComponentType.Contact]: {
    component: Contact as React.ComponentType<ComponentEditorProps>,
    name: 'Contacto',
    description: 'Formulario de contacto',
    defaultContent: {
      title: 'Contáctanos',
      subtitle: 'Estamos aquí para ayudarte'
    },
    tags: ['contact', 'form']
  },
  [ComponentType.Text]: {
    component: Text as React.ComponentType<ComponentEditorProps>,
    name: 'Texto',
    description: 'Bloque de texto con formato',
    defaultContent: {
      text: 'Tu texto aquí',
      variant: 'p'
    },
    tags: ['text', 'content']
  },
  [ComponentType.Button]: {
    component: Button as React.ComponentType<ComponentEditorProps>,
    name: 'Botón',
    description: 'Botón personalizable',
    defaultContent: {
      text: 'Click aquí',
      link: '#',
      variant: 'primary'
    },
    tags: ['button', 'cta']
  },
  [ComponentType.Image]: {
    component: Image as React.ComponentType<ComponentEditorProps>,
    name: 'Imagen',
    description: 'Añade una imagen con título y descripción opcional',
    defaultContent: {
      src: 'https://via.placeholder.com/800x400',
      alt: 'Descripción de la imagen',
      caption: 'Título de la imagen'
    },
    tags: ['media', 'image']
  },
  [ComponentType.Video]: {
    component: Video as React.ComponentType<ComponentEditorProps>,
    name: 'Video',
    description: 'Añade un video de YouTube o Vimeo',
    defaultContent: {
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      title: 'Título del video'
    },
    tags: ['media', 'video']
  },
  [ComponentType.Gallery]: {
    component: Gallery as React.ComponentType<ComponentEditorProps>,
    name: 'Galería',
    description: 'Muestra una colección de imágenes',
    defaultContent: {
      images: [
        { src: 'https://via.placeholder.com/400x300', alt: 'Imagen 1', caption: 'Título 1' },
        { src: 'https://via.placeholder.com/400x300', alt: 'Imagen 2', caption: 'Título 2' }
      ]
    },
    tags: ['media', 'gallery']
  },
  [ComponentType.Form]: {
    component: Form as React.ComponentType<ComponentEditorProps>,
    name: 'Formulario',
    description: 'Formulario personalizable',
    defaultContent: {
      title: 'Formulario',
      fields: []
    },
    tags: ['form', 'input']
  },
  [ComponentType.Map]: {
    component: Map as React.ComponentType<ComponentEditorProps>,
    name: 'Mapa',
    description: 'Mapa interactivo',
    defaultContent: {
      latitude: 0,
      longitude: 0,
      zoom: 13
    },
    tags: ['map', 'location']
  },
  [ComponentType.Social]: {
    component: Social as React.ComponentType<ComponentEditorProps>,
    name: 'Redes Sociales',
    description: 'Enlaces a redes sociales',
    defaultContent: {
      networks: []
    },
    tags: ['social', 'links']
  },
  [ComponentType.Stats]: {
    component: Stats as React.ComponentType<ComponentEditorProps>,
    name: 'Estadísticas',
    description: 'Muestra estadísticas importantes',
    defaultContent: {
      stats: []
    },
    tags: ['stats', 'numbers']
  },
  [ComponentType.Testimonios]: {
    component: Testimonios as React.ComponentType<ComponentEditorProps>,
    name: 'Testimonios',
    description: 'Testimonios de clientes',
    defaultContent: {
      testimonials: []
    },
    tags: ['testimonials', 'reviews']
  }
};

// Registro de componentes premium
export const PREMIUM_COMPONENTS: ComponentRegistry = {
  [ComponentType.Team]: {
    component: PremiumTeam as React.ComponentType<ComponentEditorProps>,
    name: 'Equipo',
    description: 'Muestra los miembros del equipo',
    defaultContent: {
      title: 'Nuestro Equipo',
      members: [
        {
          name: 'John Doe',
          role: 'CEO',
          image: '/team1.jpg'
        }
      ]
    },
    category: 'premium',
    tags: ['team', 'about']
  },
  [ComponentType.Blog]: {
    component: PremiumBlog as React.ComponentType<ComponentEditorProps>,
    name: 'Blog',
    description: 'Sección de blog con posts',
    defaultContent: {
      posts: [
        {
          title: 'Primer Post',
          excerpt: 'Descripción corta del post',
          image: '/blog1.jpg'
        }
      ]
    },
    category: 'premium',
    tags: ['blog', 'news']
  },
  [ComponentType.FAQ]: {
    component: FAQ as React.ComponentType<ComponentEditorProps>,
    name: 'FAQ Avanzado',
    description: 'FAQ con categorías y búsqueda',
    defaultContent: {
      categories: [
        {
          name: 'General',
          items: [
            { question: '¿Pregunta 1?', answer: 'Respuesta 1' }
          ]
        }
      ]
    },
    category: 'premium',
    tags: ['faq', 'help']
  },
  [ComponentType.Newsletter]: {
    component: Newsletter as React.ComponentType<ComponentEditorProps>,
    name: 'Newsletter',
    description: 'Suscripción a newsletter con características avanzadas',
    defaultContent: {
      title: 'Suscríbete',
      description: 'Recibe nuestras actualizaciones'
    },
    category: 'premium',
    tags: ['newsletter', 'subscription']
  },
  [ComponentType.AdvancedBooking]: {
    component: AdvancedBooking as React.ComponentType<ComponentEditorProps>,
    name: 'Reservas Avanzadas',
    description: 'Sistema de reservas con calendario',
    defaultContent: {
      title: 'Reserva Ahora',
      services: [
        { name: 'Servicio 1', duration: 60, price: 99.99 }
      ]
    },
    category: 'premium',
    tags: ['booking', 'calendar']
  }
};

// Función para obtener un componente por tipo
export function getComponentByType(type: ComponentType) {
  return BASIC_COMPONENTS[type] || PREMIUM_COMPONENTS[type];
}

// Función para crear contenido por defecto de un componente
export function createDefaultContent(type: ComponentType) {
  const component = getComponentByType(type);
  if (!component) {
    throw new Error(`Componente no encontrado: ${type}`);
  }
  return {
    ...component.defaultContent,
    id: crypto.randomUUID(),
    type
  };
}

// Función para validar el contenido de un componente
export function validateComponentContent(type: ComponentType, content: any): boolean {
  const component = BASIC_COMPONENTS[type] || PREMIUM_COMPONENTS[type];
  
  if (!component) {
    return false;
  }

  // Si el componente existe, consideramos que es válido
  return true;
}

// Función auxiliar para obtener propiedades requeridas por tipo
export function getRequiredPropsForType(type: ComponentType): string[] {
  switch (type) {
    case ComponentType.Hero:
      return ['title'];
    case ComponentType.Contact:
      return ['title', 'subtitle'];
    case ComponentType.Features:
      return ['title', 'features'];
    case ComponentType.Text:
      return ['text'];
    case ComponentType.Button:
      return ['text', 'link'];
    case ComponentType.Image:
      return ['src', 'alt'];
    case ComponentType.Video:
      return ['url'];
    case ComponentType.Form:
      return ['title', 'fields'];
    case ComponentType.Map:
      return ['latitude', 'longitude', 'zoom'];
    case ComponentType.Social:
      return ['networks'];
    case ComponentType.Stats:
      return ['stats'];
    case ComponentType.Testimonios:
      return ['testimonials'];
    default:
      return [];
  }
}
