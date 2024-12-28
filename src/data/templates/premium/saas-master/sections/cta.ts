import { TemplateSection } from '@/types/templates';

export const cta: TemplateSection = {
  name: 'CTA',
  description: 'Llamada a la acción final',
  thumbnail: '/sections/cta-saas.jpg',
  content: {
    heading: 'Comienza a Crecer con Nosotros',
    subheading: 'Únete a miles de equipos que ya mejoraron su productividad',
    backgroundImage: '/sections/cta-bg.jpg',
    animation: {
      type: 'particles',
      config: {
        particles: 50,
        color: '#8b5cf6',
        speed: 1.5
      }
    },
    cta: {
      primary: {
        text: 'Comenzar prueba gratis',
        url: '#signup',
        style: 'gradient'
      },
      secondary: {
        text: 'Ver demo',
        url: '#demo',
        style: 'outline'
      }
    },
    features: [
      'Prueba gratuita de 14 días',
      'Sin tarjeta de crédito',
      'Cancela cuando quieras'
    ],
    testimonial: {
      quote: 'La mejor decisión que tomamos para nuestro equipo',
      author: 'Maria González',
      position: 'CEO',
      company: 'Tech Innovators',
      image: '/testimonials/maria.jpg'
    },
    stats: [
      {
        value: '50,000+',
        label: 'Usuarios activos'
      },
      {
        value: '98%',
        label: 'Satisfacción'
      },
      {
        value: '24/7',
        label: 'Soporte'
      }
    ],
    newsletter: {
      enabled: true,
      title: 'Mantente actualizado',
      description: 'Recibe noticias y actualizaciones',
      placeholder: 'Tu email',
      buttonText: 'Suscribirse',
      disclaimer: 'No spam, solo contenido relevante'
    },
    social: {
      heading: 'Síguenos',
      platforms: [
        {
          name: 'Twitter',
          url: '#twitter',
          icon: 'twitter'
        },
        {
          name: 'LinkedIn',
          url: '#linkedin',
          icon: 'linkedin'
        },
        {
          name: 'GitHub',
          url: '#github',
          icon: 'github'
        }
      ]
    }
  }
};
