import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  premium: boolean;
  components: any[];
}

interface TemplateState {
  templates: Template[];
  savedTemplates: Template[];
  addTemplate: (template: Template) => void;
  saveTemplate: (template: Template) => void;
  deleteTemplate: (templateId: string) => void;
  getTemplatesByCategory: (category: string) => Template[];
}

const defaultTemplates: Template[] = [
  // Plantillas Gratuitas
  {
    id: 'startup-basic',
    name: 'Startup Basic',
    description: 'Plantilla básica para startups',
    thumbnail: '/templates/startup-basic.jpg',
    category: 'startup',
    premium: false,
    components: [
      {
        id: '1',
        type: 'hero',
        content: {
          title: 'Tu Startup Innovadora',
          subtitle: 'Revolucionando la industria con soluciones inteligentes',
          buttonText: 'Empezar Ahora',
        },
      },
      {
        id: '2',
        type: 'features',
        content: {
          title: 'Características',
          subtitle: 'Lo que nos hace diferentes',
          features: [
            {
              title: 'Innovación',
              description: 'Tecnología de última generación',
              icon: 'lightbulb',
            },
            {
              title: 'Escalabilidad',
              description: 'Crece con tu negocio',
              icon: 'chart',
            },
            {
              title: 'Soporte 24/7',
              description: 'Siempre estamos aquí para ayudarte',
              icon: 'support',
            },
          ],
        },
      },
      {
        id: '3',
        type: 'contact',
        content: {
          title: 'Contáctanos',
          subtitle: 'Estamos aquí para ayudarte',
          submitButtonText: 'Enviar Mensaje',
        },
      },
    ],
  },
  
  // Plantillas Premium
  {
    id: 'restaurant-premium',
    name: 'Restaurant Premium',
    description: 'Plantilla premium para restaurantes',
    thumbnail: '/templates/restaurant-premium.jpg',
    category: 'restaurant',
    premium: true,
    components: [
      {
        id: '1',
        type: 'hero',
        content: {
          title: 'Sabores Únicos',
          subtitle: 'Una experiencia culinaria inolvidable',
          buttonText: 'Ver Menú',
        },
      },
      {
        id: '2',
        type: 'gallery',
        content: {
          title: 'Nuestra Cocina',
          subtitle: 'Platos preparados con pasión',
          images: [
            {
              url: '/gallery/dish1.jpg',
              title: 'Plato Signature',
              description: 'Nuestro plato más popular',
            },
            // ... más imágenes
          ],
        },
      },
      {
        id: '3',
        type: 'booking',
        content: {
          title: 'Reserva una Mesa',
          subtitle: 'Asegura tu lugar en nuestra experiencia gastronómica',
          submitButtonText: 'Reservar Ahora',
        },
      },
    ],
  },
  {
    id: 'professional-premium',
    name: 'Professional Services Premium',
    description: 'Plantilla premium para servicios profesionales',
    thumbnail: '/templates/professional-premium.jpg',
    category: 'professional',
    premium: true,
    components: [
      {
        id: '1',
        type: 'hero',
        content: {
          title: 'Servicios Profesionales de Elite',
          subtitle: 'Soluciones empresariales a medida',
          buttonText: 'Consulta Gratuita',
        },
      },
      {
        id: '2',
        type: 'testimonials',
        content: {
          title: 'Lo que dicen nuestros clientes',
          subtitle: 'Historias de éxito',
          testimonials: [
            {
              name: 'Juan Pérez',
              position: 'CEO, Tech Corp',
              text: 'El mejor servicio que hemos contratado',
              image: '/testimonials/juan.jpg',
            },
            // ... más testimonios
          ],
        },
      },
      {
        id: '3',
        type: 'pricing',
        content: {
          title: 'Planes y Precios',
          subtitle: 'Soluciones para cada necesidad',
          plans: [
            {
              name: 'Básico',
              price: '$99/mes',
              features: ['Feature 1', 'Feature 2', 'Feature 3'],
            },
            // ... más planes
          ],
        },
      },
    ],
  },
];

export const useTemplates = create<TemplateState>()(
  persist(
    (set, get) => ({
      templates: defaultTemplates,
      savedTemplates: [],

      addTemplate: (template) =>
        set((state) => ({
          templates: [...state.templates, template],
        })),

      saveTemplate: (template) =>
        set((state) => ({
          savedTemplates: [...state.savedTemplates, template],
        })),

      deleteTemplate: (templateId) =>
        set((state) => ({
          savedTemplates: state.savedTemplates.filter((t) => t.id !== templateId),
        })),

      getTemplatesByCategory: (category) => {
        const state = get();
        return state.templates.filter((t) => t.category === category);
      },
    }),
    {
      name: 'templates-storage',
    }
  )
);
