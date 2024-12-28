import { Template, TemplateStyle } from '../types/template';
import { ComponentType } from '../types/landing';

// Estilos predefinidos por industria
const styles: Record<string, TemplateStyle> = {
  // Estilo Tecnología/SaaS
  techSaas: {
    id: 'tech-saas',
    name: 'Tech & SaaS',
    colors: {
      primary: '#2563eb',
      secondary: '#7c3aed',
      accent: '#f59e0b',
      background: '#f8fafc',
      text: '#1e293b'
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
      headings: {
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        weight: 700,
        letterSpacing: '-0.025em'
      },
      body: {
        weight: 400,
        letterSpacing: '0'
      }
    },
    spacing: {
      sectionPadding: '6rem',
      elementSpacing: '2rem',
      containerWidth: '1280px'
    },
    borders: {
      radius: '0.75rem',
      width: '1px',
      style: 'solid'
    },
    effects: {
      buttonHover: 'transform: translateY(-2px)',
      cardHover: 'transform: translateY(-4px)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },

  // Estilo Creativo/Agencia
  creative: {
    id: 'creative',
    name: 'Creative Agency',
    colors: {
      primary: '#ec4899',
      secondary: '#8b5cf6',
      accent: '#f43f5e',
      background: '#ffffff',
      text: '#18181b'
    },
    typography: {
      fontFamily: 'Outfit, sans-serif',
      headings: {
        fontFamily: 'Clash Display, sans-serif',
        weight: 600,
        letterSpacing: '-0.02em'
      },
      body: {
        weight: 400,
        letterSpacing: '0.01em'
      }
    },
    spacing: {
      sectionPadding: '8rem',
      elementSpacing: '2.5rem',
      containerWidth: '1440px'
    },
    borders: {
      radius: '1rem',
      width: '2px',
      style: 'solid'
    },
    effects: {
      buttonHover: 'transform: translateY(-2px) scale(1.05)',
      cardHover: 'transform: translateY(-8px) rotate(-1deg)',
      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }
  },

  // Estilo E-commerce/Retail
  ecommerce: {
    id: 'ecommerce',
    name: 'E-commerce',
    colors: {
      primary: '#16a34a',
      secondary: '#0891b2',
      accent: '#eab308',
      background: '#f8fafc',
      text: '#334155'
    },
    typography: {
      fontFamily: 'DM Sans, sans-serif',
      headings: {
        weight: 700,
        letterSpacing: '-0.01em'
      },
      body: {
        weight: 400,
        letterSpacing: '0'
      }
    },
    spacing: {
      sectionPadding: '5rem',
      elementSpacing: '1.5rem',
      containerWidth: '1360px'
    },
    borders: {
      radius: '0.5rem',
      width: '1px',
      style: 'solid'
    },
    effects: {
      buttonHover: 'transform: translateY(-1px)',
      cardHover: 'transform: translateY(-4px)',
      transition: 'all 0.2s ease-out'
    }
  },

  // Estilo Educación/Cursos
  education: {
    id: 'education',
    name: 'Education',
    colors: {
      primary: '#3b82f6',
      secondary: '#6366f1',
      accent: '#f97316',
      background: '#ffffff',
      text: '#1e293b'
    },
    typography: {
      fontFamily: 'Lexend, sans-serif',
      headings: {
        weight: 600,
        letterSpacing: '-0.015em'
      },
      body: {
        weight: 400,
        letterSpacing: '0.01em'
      }
    },
    spacing: {
      sectionPadding: '5rem',
      elementSpacing: '2rem',
      containerWidth: '1200px'
    },
    borders: {
      radius: '0.625rem',
      width: '1px',
      style: 'solid'
    },
    effects: {
      buttonHover: 'transform: translateY(-2px)',
      cardHover: 'transform: translateY(-4px)',
      transition: 'all 0.25s ease-in-out'
    }
  },

  // Estilo Restaurante/Gastronomía
  restaurant: {
    id: 'restaurant',
    name: 'Restaurant',
    colors: {
      primary: '#b91c1c',
      secondary: '#c2410c',
      accent: '#a16207',
      background: '#fffbeb',
      text: '#292524'
    },
    typography: {
      fontFamily: 'Playfair Display, serif',
      headings: {
        fontFamily: 'Cormorant Garamond, serif',
        weight: 700,
        letterSpacing: '0.02em'
      },
      body: {
        fontFamily: 'Lora, serif',
        weight: 400,
        letterSpacing: '0.01em'
      }
    },
    spacing: {
      sectionPadding: '7rem',
      elementSpacing: '2.5rem',
      containerWidth: '1320px'
    },
    borders: {
      radius: '0.25rem',
      width: '1px',
      style: 'solid'
    },
    effects: {
      buttonHover: 'transform: translateY(-2px)',
      cardHover: 'transform: scale(1.02)',
      transition: 'all 0.3s ease'
    }
  },

  // Estilo Salud/Bienestar
  health: {
    id: 'health',
    name: 'Health & Wellness',
    colors: {
      primary: '#0891b2',
      secondary: '#0d9488',
      accent: '#4d7c0f',
      background: '#f0fdfa',
      text: '#134e4a'
    },
    typography: {
      fontFamily: 'Red Hat Display, sans-serif',
      headings: {
        weight: 600,
        letterSpacing: '-0.01em'
      },
      body: {
        weight: 400,
        letterSpacing: '0.005em'
      }
    },
    spacing: {
      sectionPadding: '6rem',
      elementSpacing: '2rem',
      containerWidth: '1240px'
    },
    borders: {
      radius: '1rem',
      width: '1px',
      style: 'solid'
    },
    effects: {
      buttonHover: 'transform: translateY(-2px)',
      cardHover: 'transform: translateY(-4px)',
      transition: 'all 0.3s ease-in-out'
    }
  }
};

// Templates predefinidos
export const templates: Template[] = [
  {
    id: 'startup-saas',
    name: 'Startup SaaS',
    description: 'Template moderno para startups y empresas SaaS',
    industry: 'technology',
    style: styles.techSaas,
    configuration: {
      allowedComponents: [
        ComponentType.Hero,
        ComponentType.Features,
        ComponentType.About,
        ComponentType.Pricing,
        ComponentType.FAQ,
        ComponentType.Contact,
        ComponentType.Newsletter
      ]
    }
  },
  {
    id: 'creative-agency',
    name: 'Creative Agency',
    description: 'Template dinámico para agencias creativas y estudios de diseño',
    industry: 'creative',
    style: styles.creative,
    configuration: {
      allowedComponents: [
        ComponentType.Hero,
        ComponentType.Gallery,
        ComponentType.Services,
        ComponentType.Team,
        ComponentType.Testimonios,
        ComponentType.Contact
      ]
    }
  },
  {
    id: 'ecommerce-modern',
    name: 'Modern E-commerce',
    description: 'Template optimizado para tiendas online',
    industry: 'ecommerce',
    style: styles.ecommerce,
    configuration: {
      allowedComponents: [
        ComponentType.Hero,
        ComponentType.Features,
        ComponentType.Gallery,
        ComponentType.Pricing,
        ComponentType.Newsletter,
        ComponentType.Contact
      ]
    }
  },
  {
    id: 'education-platform',
    name: 'Education Platform',
    description: 'Template para instituciones educativas y cursos online',
    industry: 'education',
    style: styles.education,
    configuration: {
      allowedComponents: [
        ComponentType.Hero,
        ComponentType.Features,
        ComponentType.Programs,
        ComponentType.Team,
        ComponentType.Testimonios,
        ComponentType.FAQ,
        ComponentType.Contact
      ]
    }
  },
  {
    id: 'restaurant-bistro',
    name: 'Restaurant & Bistro',
    description: 'Template elegante para restaurantes y servicios de comida',
    industry: 'restaurant',
    style: styles.restaurant,
    configuration: {
      allowedComponents: [
        ComponentType.Hero,
        ComponentType.Gallery,
        ComponentType.About,
        ComponentType.Services,
        ComponentType.Map,
        ComponentType.Contact
      ]
    }
  },
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    description: 'Template para centros de salud y bienestar',
    industry: 'health',
    style: styles.health,
    configuration: {
      allowedComponents: [
        ComponentType.Hero,
        ComponentType.Services,
        ComponentType.Team,
        ComponentType.Testimonios,
        ComponentType.Newsletter,
        ComponentType.Contact
      ]
    }
  }
];
