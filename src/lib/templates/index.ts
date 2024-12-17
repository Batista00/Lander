import { v4 as uuidv4 } from 'uuid';

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: 'startup' | 'portfolio' | 'ecommerce' | 'blog' | 'startup';
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
      }
    ]
  }
];
