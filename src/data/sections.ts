import { Section } from '../types/templates';

// Secciones comunes para todos los templates
export const commonSections: Section[] = [
  {
    id: 'hero',
    name: 'Hero',
    description: 'Sección principal con imagen destacada',
    type: 'hero',
    content: {
      heading: 'Título Principal',
      subheading: 'Subtítulo descriptivo'
    }
  },
  {
    id: 'features',
    name: 'Características',
    description: 'Muestra las características principales',
    type: 'features',
    content: {
      heading: 'Nuestros Servicios',
      items: []
    }
  },
  {
    id: 'about',
    name: 'Sobre Nosotros',
    description: 'Información sobre la empresa',
    type: 'about',
    content: {
      heading: 'Sobre Nosotros',
      text: 'Conoce más sobre nuestra empresa y nuestros valores',
      features: [
        {
          title: 'Nuestra Misión',
          description: 'Proporcionar soluciones innovadoras y de calidad'
        },
        {
          title: 'Nuestros Valores',
          description: 'Compromiso, excelencia y satisfacción del cliente'
        }
      ]
    }
  },
  {
    id: 'contact',
    name: 'Contacto',
    description: 'Formulario de contacto',
    type: 'contact',
    content: {
      heading: 'Contáctanos',
      text: 'Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.',
      email: 'contacto@empresa.com',
      phone: '+1 234 567 890',
      address: 'Calle Principal 123, Ciudad'
    }
  }
];

// Secciones específicas por industria
export const industrySections: Record<string, Section[]> = {
  business: [
    {
      id: 'services',
      name: 'Servicios',
      description: 'Lista de servicios empresariales',
      type: 'services',
      content: {
        heading: 'Nuestros Servicios',
        items: [
          { name: 'Consultoría Empresarial', description: 'Asesoramiento estratégico para tu negocio' },
          { name: 'Desarrollo de Negocios', description: 'Estrategias de crecimiento y expansión' },
          { name: 'Gestión de Proyectos', description: 'Administración eficiente de proyectos' }
        ]
      }
    },
    {
      id: 'clients',
      name: 'Clientes',
      description: 'Logos y testimonios de clientes',
      type: 'clients',
      content: {
        heading: 'Empresas que confían en nosotros',
        items: []
      }
    }
  ],
  tech: [
    {
      id: 'features',
      name: 'Características',
      description: 'Características del producto',
      type: 'features',
      content: {
        heading: 'Características Principales',
        items: [
          { name: 'Innovación', description: 'Tecnología de última generación' },
          { name: 'Escalabilidad', description: 'Crece con tu negocio' },
          { name: 'Seguridad', description: 'Máxima protección de datos' }
        ]
      }
    },
    {
      id: 'pricing',
      name: 'Precios',
      description: 'Planes y precios',
      type: 'pricing',
      content: {
        heading: 'Planes disponibles',
        plans: [
          { name: 'Básico', price: '$9.99' },
          { name: 'Pro', price: '$29.99' },
          { name: 'Enterprise', price: 'Contactar' }
        ]
      }
    }
  ],
  local: [
    {
      id: 'services',
      name: 'Servicios',
      description: 'Lista de servicios ofrecidos',
      type: 'services',
      content: {
        heading: 'Nuestros Servicios',
        items: [
          { name: 'Servicio 1', description: 'Descripción del servicio 1' },
          { name: 'Servicio 2', description: 'Descripción del servicio 2' },
          { name: 'Servicio 3', description: 'Descripción del servicio 3' }
        ]
      }
    },
    {
      id: 'testimonials',
      name: 'Testimonios',
      description: 'Testimonios de clientes',
      type: 'testimonials',
      content: {
        heading: 'Lo que dicen nuestros clientes',
        items: []
      }
    }
  ],
  barber: [
    {
      id: 'services',
      name: 'Servicios',
      description: 'Lista de servicios de barbería',
      type: 'services',
      content: {
        heading: 'Nuestros Servicios',
        items: [
          { name: 'Corte de Cabello', price: '$15' },
          { name: 'Afeitado', price: '$12' },
          { name: 'Corte de Barba', price: '$10' },
          { name: 'Tratamiento Capilar', price: '$25' }
        ]
      }
    },
    {
      id: 'gallery',
      name: 'Galería',
      description: 'Galería de cortes y estilos',
      type: 'gallery',
      content: {
        heading: 'Nuestros Trabajos',
        images: []
      }
    },
    {
      id: 'booking',
      name: 'Reservas',
      description: 'Sistema de reservas online',
      type: 'booking',
      content: {
        heading: 'Reserva tu Hora',
        text: 'Agenda tu cita con nuestros profesionales'
      }
    }
  ],
  nails: [
    {
      id: 'services',
      name: 'Servicios',
      description: 'Lista de servicios de manicura',
      type: 'services',
      content: {
        heading: 'Nuestros Servicios',
        items: [
          { name: 'Manicura Básica', price: '$20' },
          { name: 'Manicura Gel', price: '$35' },
          { name: 'Nail Art', price: '$15' },
          { name: 'Pedicura', price: '$30' }
        ]
      }
    },
    {
      id: 'designs',
      name: 'Diseños',
      description: 'Galería de diseños de uñas',
      type: 'gallery',
      content: {
        heading: 'Nuestros Diseños',
        images: []
      }
    }
  ],
  construction: [
    {
      id: 'projects',
      name: 'Proyectos',
      description: 'Portafolio de proyectos',
      type: 'portfolio',
      content: {
        heading: 'Proyectos Realizados',
        items: []
      }
    },
    {
      id: 'services',
      name: 'Servicios',
      description: 'Servicios de construcción',
      type: 'services',
      content: {
        heading: 'Nuestros Servicios',
        items: [
          { name: 'Construcción Residencial' },
          { name: 'Remodelaciones' },
          { name: 'Diseño Arquitectónico' },
          { name: 'Mantenimiento' }
        ]
      }
    }
  ],
  kindergarten: [
    {
      id: 'programs',
      name: 'Programas',
      description: 'Programas educativos',
      type: 'programs',
      content: {
        heading: 'Nuestros Programas',
        items: [
          { name: 'Sala Cuna', age: '0-2 años' },
          { name: 'Nivel Medio', age: '2-4 años' },
          { name: 'Transición', age: '4-6 años' }
        ]
      }
    },
    {
      id: 'activities',
      name: 'Actividades',
      description: 'Actividades diarias',
      type: 'activities',
      content: {
        heading: 'Actividades',
        items: [
          'Juegos Educativos',
          'Arte y Manualidades',
          'Música y Movimiento',
          'Desarrollo Social'
        ]
      }
    }
  ],
  bakery: [
    {
      id: 'products',
      name: 'Productos',
      description: 'Catálogo de productos',
      type: 'products',
      content: {
        heading: 'Nuestros Productos',
        categories: [
          {
            name: 'Tortas',
            items: [
              { name: 'Torta de Chocolate', price: '$25' },
              { name: 'Cheesecake', price: '$28' }
            ]
          },
          {
            name: 'Pasteles',
            items: [
              { name: 'Croissant', price: '$3' },
              { name: 'Muffins', price: '$2' }
            ]
          }
        ]
      }
    },
    {
      id: 'custom-orders',
      name: 'Pedidos Especiales',
      description: 'Formulario de pedidos personalizados',
      type: 'orders',
      content: {
        heading: 'Pedidos Especiales',
        text: 'Personaliza tu pedido con nuestros expertos'
      }
    }
  ],
  entrepreneur: [
    {
      id: 'services',
      name: 'Servicios',
      description: 'Servicios ofrecidos',
      type: 'services',
      content: {
        heading: 'Mis Servicios',
        items: [
          { name: 'Consultoría Digital' },
          { name: 'Marketing Online' },
          { name: 'Desarrollo Web' },
          { name: 'Branding' }
        ]
      }
    },
    {
      id: 'portfolio',
      name: 'Portafolio',
      description: 'Proyectos y casos de éxito',
      type: 'portfolio',
      content: {
        heading: 'Proyectos Destacados',
        items: []
      }
    }
  ]
};
