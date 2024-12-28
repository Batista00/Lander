import { TemplateSection } from '@/types/templates';

export const demo: TemplateSection = {
  name: 'Demo',
  description: 'Demo interactiva del producto',
  thumbnail: '/sections/demo-saas.jpg',
  content: {
    heading: 'Prueba Nuestra Demo Interactiva',
    subheading: 'Explora todas las características en tiempo real',
    demo: {
      type: 'interactive',
      url: '#interactive-demo',
      features: [
        {
          name: 'Dashboard',
          preview: '/demo/dashboard.jpg',
          description: 'Panel de control principal',
          interactions: [
            'Personalizar widgets',
            'Filtrar datos',
            'Exportar reportes'
          ]
        },
        {
          name: 'Automatización',
          preview: '/demo/automation.jpg',
          description: 'Flujos de trabajo automatizados',
          interactions: [
            'Crear workflows',
            'Configurar triggers',
            'Monitorear resultados'
          ]
        },
        {
          name: 'Colaboración',
          preview: '/demo/collaboration.jpg',
          description: 'Herramientas colaborativas',
          interactions: [
            'Chat en tiempo real',
            'Compartir archivos',
            'Asignar tareas'
          ]
        }
      ]
    },
    tutorials: [
      {
        title: 'Primeros pasos',
        duration: '5 min',
        video: '/tutorials/getting-started.mp4'
      },
      {
        title: 'Configuración avanzada',
        duration: '10 min',
        video: '/tutorials/advanced-setup.mp4'
      },
      {
        title: 'Mejores prácticas',
        duration: '8 min',
        video: '/tutorials/best-practices.mp4'
      }
    ],
    customization: {
      heading: 'Personaliza tu experiencia',
      options: [
        {
          name: 'Tema',
          choices: ['Light', 'Dark', 'System']
        },
        {
          name: 'Datos',
          choices: ['Sample', 'Custom']
        },
        {
          name: 'Idioma',
          choices: ['ES', 'EN', 'PT']
        }
      ]
    },
    sandbox: {
      heading: 'Ambiente de pruebas',
      features: [
        'Datos de ejemplo',
        'Reset instantáneo',
        'Sin límites'
      ],
      security: {
        type: 'isolated',
        data: 'anonymous'
      }
    },
    support: {
      available: true,
      channels: [
        {
          type: 'chat',
          response: 'instantáneo'
        },
        {
          type: 'email',
          response: '< 2h'
        }
      ]
    }
  }
};
