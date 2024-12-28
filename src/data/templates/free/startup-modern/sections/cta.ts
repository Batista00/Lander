import { TemplateSection } from '@/types/templates';

export const cta: TemplateSection = {
  name: 'CTA',
  description: 'Llamada a la acción',
  thumbnail: '/sections/cta-startup.jpg',
  content: {
    heading: '¿Listo para empezar?',
    subheading: 'Únete a miles de empresas que ya confían en nosotros',
    backgroundImage: '/sections/cta-bg.jpg',
    buttonText: 'Comenzar ahora',
    buttonUrl: '#signup',
    features: [
      'Prueba gratuita de 14 días',
      'Sin tarjeta de crédito',
      'Cancela cuando quieras'
    ],
    animation: {
      type: 'fade-up',
      duration: 800
    },
    newsletter: {
      enabled: true,
      placeholder: 'Tu email',
      buttonText: 'Suscribirse',
      disclaimer: 'No spam, solo actualizaciones importantes.'
    },
    social: {
      twitter: 'https://twitter.com/startup',
      facebook: 'https://facebook.com/startup',
      linkedin: 'https://linkedin.com/company/startup'
    }
  }
};
