import { ComponentVariant } from '@/types/components';

export const heroVariants: Record<string, ComponentVariant> = {
  modern: {
    name: 'Modern',
    description: 'Diseño moderno con imagen de fondo y texto centrado',
    styles: {
      colors: {
        background: 'rgba(0, 0, 0, 0.7)',
        text: '#ffffff',
        accent: '#3b82f6'
      },
      typography: {
        titleSize: 'text-5xl',
        subtitleSize: 'text-3xl',
        descriptionSize: 'text-xl',
        textAlign: 'center'
      },
      spacing: {
        padding: 'py-24',
        gap: '1.5rem'
      },
      layout: {
        alignment: 'center'
      }
    },
    defaultContent: {
      title: 'Construye tu Presencia Digital',
      subtitle: 'Landing Pages Profesionales en Minutos',
      description: 'Crea landing pages impactantes sin necesidad de código. Personaliza, publica y comienza a convertir visitantes en clientes.',
      buttonText: 'Comenzar Ahora',
      buttonStyle: 'primary',
      backgroundImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg'
    }
  },
  minimal: {
    name: 'Minimal',
    description: 'Diseño limpio y minimalista con foco en el contenido',
    styles: {
      colors: {
        background: '#ffffff',
        text: '#1f2937',
        accent: '#4b5563'
      },
      typography: {
        titleSize: 'text-4xl',
        subtitleSize: 'text-2xl',
        descriptionSize: 'text-lg',
        textAlign: 'left'
      },
      spacing: {
        padding: 'py-16',
        gap: '1.5rem'
      },
      layout: {
        alignment: 'left'
      }
    },
    defaultContent: {
      title: 'Simplicidad es Belleza',
      subtitle: 'Menos es Más',
      description: 'Un enfoque minimalista para presentar tu mensaje de forma clara y efectiva.',
      buttonText: 'Explorar',
      buttonStyle: 'outline'
    }
  },
  startup: {
    name: 'Startup',
    description: 'Diseño dinámico ideal para startups y productos tech',
    styles: {
      colors: {
        background: '#0f172a',
        text: '#f8fafc',
        accent: '#6366f1'
      },
      typography: {
        titleSize: 'text-6xl',
        subtitleSize: 'text-3xl',
        descriptionSize: 'text-xl',
        textAlign: 'left'
      },
      spacing: {
        padding: 'py-20',
        gap: '1.5rem'
      },
      layout: {
        alignment: 'split'
      }
    },
    defaultContent: {
      title: 'Innovación que Transforma',
      subtitle: 'El Futuro es Ahora',
      description: 'Tecnología de punta para impulsar tu negocio al siguiente nivel.',
      buttonText: 'Descubrir',
      buttonStyle: 'gradient',
      backgroundImage: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg'
    }
  }
};
