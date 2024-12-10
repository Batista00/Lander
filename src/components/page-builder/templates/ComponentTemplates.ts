export const componentTemplates = {
  hero: {
    basic: [
      {
        id: 'hero-1',
        name: 'Hero Clásico',
        template: {
          title: 'Título Principal',
          subtitle: 'Subtítulo convincente',
          cta: 'Llamada a la acción',
          layout: 'centered'
        }
      },
      // ... más plantillas básicas
    ],
    premium: [
      {
        id: 'hero-premium-1',
        name: 'Hero Animado 3D',
        premium: true,
        features: ['Animaciones 3D', 'Parallax', 'Interactivo'],
        template: {
          title: 'Título Dinámico',
          animation: 'fade-up',
          background: '3d-gradient'
        }
      },
      // ... más plantillas premium
    ]
  },
  features: {
    basic: [
      {
        id: 'features-1',
        name: 'Grid de Características',
        template: {
          columns: 3,
          items: []
        }
      }
    ],
    premium: [
      {
        id: 'features-premium-1',
        name: 'Características Animadas',
        premium: true,
        features: ['Animaciones por scroll', 'Hover effects', 'Micro-interacciones'],
        template: {
          animation: 'stagger',
          hoverEffect: 'float'
        }
      }
    ]
  }
  // ... más componentes
};

export const premiumFeatures = {
  components: [
    {
      name: 'Animaciones Avanzadas',
      description: 'Animaciones fluidas y profesionales',
      features: [
        'Parallax scrolling',
        'Animaciones 3D',
        'Micro-interacciones',
        'Transiciones suaves'
      ]
    },
    {
      name: 'Componentes Exclusivos',
      description: 'Componentes únicos y avanzados',
      features: [
        'Galerías 3D',
        'Carruseles premium',
        'Secciones interactivas',
        'Formularios avanzados'
      ]
    }
    // ... más características premium
  ],
  styles: [
    {
      name: 'Efectos Visuales',
      features: [
        'Glassmorphism',
        'Neumorphism',
        'Gradientes premium',
        'Sombras avanzadas'
      ]
    }
    // ... más estilos premium
  ]
};

// 50 Diseños Profesionales
export const professionalDesigns = [
  {
    id: 'startup-modern',
    name: 'Startup Moderna',
    category: 'Technology',
    components: ['hero-premium-1', 'features-premium-1'],
    style: {
      colorScheme: 'modern',
      typography: 'sans-premium',
      spacing: 'airy'
    }
  },
  // ... 49 diseños más
];

// 20 Sugerencias de Mejora
export const componentSuggestions = [
  {
    title: 'Optimización de Rendimiento',
    description: 'Mejora la velocidad de carga con lazy loading y optimización de imágenes',
    implementation: 'code example...'
  },
  {
    title: 'Accesibilidad Mejorada',
    description: 'Implementa ARIA labels y mejora el contraste de colores',
    implementation: 'code example...'
  }
  // ... 18 sugerencias más
];

// 50 Mejoras Premium
export const premiumEnhancements = [
  {
    title: 'Analytics Avanzados',
    description: 'Seguimiento detallado de interacciones de usuarios',
    features: ['Mapas de calor', 'Grabación de sesiones', 'Embudos de conversión']
  },
  // ... 49 mejoras más
];
