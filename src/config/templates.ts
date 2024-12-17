import { v4 as uuidv4 } from 'uuid';

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: 'business' | 'portfolio' | 'ecommerce' | 'blog' | 'startup';
  isPremium: boolean;
  components: any[];
}

export const templates: Template[] = [
  {
    id: 'startup-modern',
    name: 'Startup Moderna',
    description: 'Template moderno y minimalista perfecto para startups y SaaS',
    thumbnail: '/templates/startup-modern.jpg',
    category: 'startup',
    isPremium: false,
    components: [
      {
        id: uuidv4(),
        type: 'header',
        data: {
          logo: {
            url: '/logo.png',
            alt: 'Logo',
            width: 120,
            height: 40
          },
          navigation: [
            { label: 'Inicio', href: '#' },
            { label: 'Características', href: '#features' },
            { label: 'Precios', href: '#pricing' },
            { label: 'Contacto', href: '#contact' }
          ],
          cta: {
            label: 'Empezar',
            href: '#',
            variant: 'primary'
          }
        }
      },
      {
        id: uuidv4(),
        type: 'hero',
        data: {
          title: 'Construye el futuro con nosotros',
          subtitle: 'La plataforma todo en uno para hacer crecer tu negocio',
          description: 'Herramientas poderosas y fáciles de usar para ayudarte a alcanzar tus objetivos.',
          image: {
            url: '/hero-image.png',
            alt: 'Hero Image'
          },
          cta: {
            primary: {
              label: 'Comenzar gratis',
              href: '#'
            },
            secondary: {
              label: 'Saber más',
              href: '#'
            }
          }
        }
      },
      {
        id: uuidv4(),
        type: 'features',
        data: {
          title: 'Características',
          subtitle: 'Todo lo que necesitas para triunfar',
          features: [
            {
              icon: 'Rocket',
              title: 'Rápido y eficiente',
              description: 'Optimizado para velocidad y rendimiento'
            },
            {
              icon: 'Shield',
              title: 'Seguro y confiable',
              description: 'Protección de datos de nivel empresarial'
            },
            {
              icon: 'Zap',
              title: 'Fácil de usar',
              description: 'Interfaz intuitiva y amigable'
            }
          ]
        }
      }
    ]
  },
  {
    id: 'portfolio-minimal',
    name: 'Portfolio Minimalista',
    description: 'Template elegante para mostrar tu trabajo y proyectos',
    thumbnail: '/templates/portfolio-minimal.jpg',
    category: 'portfolio',
    isPremium: true,
    components: [
      {
        id: uuidv4(),
        type: 'header',
        data: {
          logo: {
            url: '/logo.png',
            alt: 'Logo',
            width: 100,
            height: 40
          },
          navigation: [
            { label: 'Proyectos', href: '#projects' },
            { label: 'Sobre mí', href: '#about' },
            { label: 'Contacto', href: '#contact' }
          ]
        }
      },
      {
        id: uuidv4(),
        type: 'hero',
        data: {
          title: 'Diseñador & Desarrollador',
          subtitle: 'Creando experiencias digitales únicas',
          description: 'Especializado en diseño UI/UX y desarrollo web frontend.',
          image: {
            url: '/profile.jpg',
            alt: 'Profile'
          }
        }
      }
    ]
  }
];

export const getTemplateById = (id: string): Template | undefined => {
  return templates.find(template => template.id === id);
};

export const getTemplatesByCategory = (category: Template['category']): Template[] => {
  return templates.filter(template => template.category === category);
};
