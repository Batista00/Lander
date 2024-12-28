import { Hero } from './Hero';
import { Features } from './Features';
import { Section } from './Section';
import { Testimonials } from './Testimonials';
import { Text } from './Text';
import { Image } from './Image';
import { Button } from './Button';
import { Form } from './Form';
import { FAQ } from './FAQ';
import { Pricing } from './Pricing';
import { ComponentType, ComponentContent } from '@/types/landing';

export const ComponentMap: { [key in ComponentType]: React.ComponentType<any> } = {
  hero: Hero,
  features: Features,
  text: Text,
  image: Image,
  button: Button,
  testimonios: Testimonials,
  form: Form,
  pricing: Pricing,
  faq: FAQ,
  section: Section,
};

export const defaultComponents: { [key in ComponentType]: ComponentContent } = {
  hero: {
    title: 'Título Principal',
    subtitle: 'Subtítulo descriptivo',
    description: 'Una descripción convincente de tu producto o servicio',
    buttonText: 'Empezar',
    buttonLink: '#',
    layout: 'center'
  },
  features: {
    title: 'Características',
    subtitle: 'Lo que nos hace únicos',
    items: [
      {
        title: 'Característica 1',
        description: 'Descripción de la característica 1',
        icon: 'star'
      },
      {
        title: 'Característica 2',
        description: 'Descripción de la característica 2',
        icon: 'shield'
      }
    ],
    layout: 'grid',
    columns: 3
  },
  text: {
    text: 'Ingrese su texto aquí'
  },
  image: {
    src: '/placeholder.jpg',
    alt: 'Descripción de la imagen',
    caption: 'Pie de foto'
  },
  button: {
    text: 'Click aquí',
    link: '#',
    variant: 'primary',
    size: 'md'
  },
  testimonios: {
    items: [
      {
        name: 'Cliente Satisfecho',
        role: 'CEO',
        company: 'Empresa',
        content: 'Un testimonio muy positivo sobre el producto o servicio.',
        rating: 5,
        image: '/placeholder.jpg'
      }
    ]
  },
  form: {
    fields: [
      { type: 'text', label: 'Nombre', required: true },
      { type: 'email', label: 'Email', required: true },
      { type: 'textarea', label: 'Mensaje', required: true }
    ]
  },
  pricing: {
    plans: [
      {
        name: 'Básico',
        price: '9.99',
        features: ['Feature 1', 'Feature 2'],
        cta: { text: 'Empezar', link: '#' }
      },
      {
        name: 'Pro',
        price: '19.99',
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
        cta: { text: 'Empezar', link: '#' }
      }
    ]
  },
  faq: {
    title: 'Preguntas Frecuentes',
    subtitle: 'Resolvemos tus dudas',
    description: 'Encuentra respuestas a las preguntas más comunes',
    categories: [
      {
        name: 'General',
        questions: [
          {
            question: '¿Cómo funciona?',
            answer: 'Explicación detallada del funcionamiento'
          }
        ]
      }
    ]
  },
  section: {
    title: 'Nueva Sección',
    description: 'Descripción de la sección',
    components: []
  }
};
