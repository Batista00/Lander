import { LayoutGrid, Type, Image, Mail, Users, Star, Box, Zap } from 'lucide-react';

export interface ComponentType {
  id: string;
  name: string;
  description: string;
  icon: any;
  tags: string[];
  isPremium: boolean;
}

export const COMPONENT_TYPES: ComponentType[] = [
  {
    id: 'hero',
    name: 'Hero',
    description: 'Sección principal con título, subtítulo y llamada a la acción',
    icon: LayoutGrid,
    tags: ['header', 'principal', 'inicio'],
    isPremium: false
  },
  {
    id: 'services',
    name: 'Servicios',
    description: 'Muestra tus servicios o características principales',
    icon: Box,
    tags: ['servicios', 'características', 'ofertas'],
    isPremium: false
  },
  {
    id: 'features',
    name: 'Características',
    description: 'Destaca las características principales de tu producto o servicio',
    icon: Star,
    tags: ['características', 'beneficios', 'ventajas'],
    isPremium: false
  },
  {
    id: 'text',
    name: 'Texto',
    description: 'Bloque de texto para contenido general',
    icon: Type,
    tags: ['texto', 'contenido', 'párrafo'],
    isPremium: false
  },
  {
    id: 'image',
    name: 'Imagen',
    description: 'Añade imágenes a tu landing page',
    icon: Image,
    tags: ['imagen', 'foto', 'visual'],
    isPremium: false
  },
  {
    id: 'contact',
    name: 'Contacto',
    description: 'Formulario de contacto para captar leads',
    icon: Mail,
    tags: ['contacto', 'formulario', 'leads'],
    isPremium: false
  },
  {
    id: 'testimonials',
    name: 'Testimonios',
    description: 'Muestra testimonios de tus clientes',
    icon: Users,
    tags: ['testimonios', 'clientes', 'opiniones'],
    isPremium: true
  },
  {
    id: 'pricing',
    name: 'Precios',
    description: 'Muestra tus planes y precios',
    icon: Zap,
    tags: ['precios', 'planes', 'tarifas'],
    isPremium: true
  }
];
