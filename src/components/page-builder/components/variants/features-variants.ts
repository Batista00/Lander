import { ComponentVariant } from '@/types/components';

export const featuresVariants: Record<string, ComponentVariant> = {
  grid: {
    name: 'Grid',
    description: 'Cuadrícula moderna de características con íconos',
    styles: {
      colors: {
        background: '#ffffff',
        text: '#1f2937',
        accent: '#3b82f6',
        iconBackground: '#f3f4f6'
      },
      typography: {
        titleSize: 'text-4xl',
        subtitleSize: 'text-2xl',
        featureTitleSize: 'text-xl',
        featureDescriptionSize: 'text-base',
        textAlign: 'center'
      },
      spacing: {
        padding: 'py-16',
        gap: '2rem'
      },
      layout: {
        columns: 2,
        rows: 2,
        alignment: 'center'
      }
    },
    defaultContent: {
      title: 'Características Principales',
      subtitle: 'Todo lo que necesitas para tener éxito',
      features: [
        {
          icon: 'Rocket',
          title: 'Rápido y Fácil',
          description: 'Crea landing pages profesionales en minutos sin necesidad de código'
        },
        {
          icon: 'Brush',
          title: 'Personalizable',
          description: 'Adapta cada elemento a tu marca con nuestro editor intuitivo'
        },
        {
          icon: 'Mobile',
          title: 'Responsive',
          description: 'Diseño adaptable que se ve perfecto en todos los dispositivos'
        },
        {
          icon: 'Chart',
          title: 'Analíticas',
          description: 'Mide y optimiza el rendimiento de tus páginas'
        }
      ]
    }
  },
  list: {
    name: 'Lista',
    description: 'Lista vertical de características con íconos a la izquierda',
    styles: {
      colors: {
        background: '#f8fafc',
        text: '#334155',
        accent: '#6366f1',
        iconBackground: '#ffffff'
      },
      typography: {
        titleSize: 'text-3xl',
        subtitleSize: 'text-lg',
        featureTitleSize: 'text-xl',
        featureDescriptionSize: 'text-base',
        textAlign: 'left'
      },
      spacing: {
        padding: 'py-16',
        gap: '2rem'
      },
      layout: {
        columns: 1,
        rows: 1,
        alignment: 'left'
      }
    },
    defaultContent: {
      title: 'Por qué Elegirnos',
      subtitle: 'Beneficios que nos distinguen',
      features: [
        {
          icon: 'Shield',
          title: 'Seguridad Garantizada',
          description: 'Protección de datos y SSL incluido en todos los planes'
        },
        {
          icon: 'Support',
          title: 'Soporte 24/7',
          description: 'Equipo de soporte disponible para ayudarte en cualquier momento'
        },
        {
          icon: 'Update',
          title: 'Actualizaciones Regulares',
          description: 'Nuevas características y mejoras constantes'
        }
      ]
    }
  },
  cards: {
    name: 'Tarjetas',
    description: 'Características presentadas en tarjetas con sombras',
    styles: {
      colors: {
        background: '#ffffff',
        text: '#1f2937',
        accent: '#8b5cf6',
        cardBackground: '#ffffff',
        iconBackground: '#f3f4f6'
      },
      typography: {
        titleSize: 'text-4xl',
        subtitleSize: 'text-2xl',
        featureTitleSize: 'text-xl',
        featureDescriptionSize: 'text-base',
        textAlign: 'center'
      },
      spacing: {
        padding: 'py-16',
        gap: '2rem'
      },
      layout: {
        columns: 3,
        rows: 1,
        alignment: 'center'
      },
      effects: {
        cardShadow: 'shadow-lg hover:shadow-xl',
        cardRadius: 'rounded-lg',
        transition: 'transition-all duration-300'
      }
    },
    defaultContent: {
      title: 'Soluciones Completas',
      subtitle: 'Todo lo que necesitas en un solo lugar',
      features: [
        {
          icon: 'Palette',
          title: 'Diseño Profesional',
          description: 'Templates creados por diseñadores expertos'
        },
        {
          icon: 'Code',
          title: 'Sin Código',
          description: 'Interfaz drag & drop intuitiva'
        },
        {
          icon: 'Globe',
          title: 'SEO Optimizado',
          description: 'Mejores prácticas de SEO implementadas'
        }
      ]
    }
  }
};
