import { Component, ComponentType } from '@/types/landing';
import { 
  TopBar, 
  Hero, 
  Services, 
  Products, 
  Contact, 
  Footer 
} from './predefined';
import { ComponentEditor } from './ComponentEditor';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Wand2 } from 'lucide-react';

interface ComponentRendererProps {
  component: Component;
  onImprove?: () => void;
  isPremiumUser?: boolean;
  onEdit?: (field: string, value: any) => void;
}

type DefaultContentType = {
  [key in Exclude<ComponentType, ComponentType.CUSTOM | ComponentType.FEATURES | ComponentType.TESTIMONIALS | ComponentType.PRICING | ComponentType.TEAM | ComponentType.BLOG | ComponentType.CTA>]: {
    [key: string]: any;
  }
}

const defaultContent: DefaultContentType = {
  [ComponentType.TOPBAR]: {
    title: 'Mi Empresa',
    links: [
      { text: 'Inicio', url: '#' },
      { text: 'Servicios', url: '#services' },
      { text: 'Contacto', url: '#contact' }
    ]
  },
  [ComponentType.HERO]: {
    title: '¡Bienvenido a tu Landing Page!',
    subtitle: 'Crea una página web impresionante',
    description: 'Describe tu producto o servicio de manera atractiva. Este es el lugar perfecto para captar la atención de tus visitantes.',
    primaryButtonText: 'Empezar Ahora',
    secondaryButtonText: 'Saber Más'
  },
  [ComponentType.SERVICES]: {
    title: 'Nuestros Servicios',
    description: 'Ofrecemos soluciones integrales para tu negocio',
    services: [
      {
        title: 'Servicio 1',
        description: 'Descripción del servicio 1',
        icon: '✨'
      },
      {
        title: 'Servicio 2',
        description: 'Descripción del servicio 2',
        icon: '🚀'
      },
      {
        title: 'Servicio 3',
        description: 'Descripción del servicio 3',
        icon: '💡'
      }
    ]
  },
  [ComponentType.PRODUCTS]: {
    title: 'Nuestros Productos',
    description: 'Descubre nuestra gama de productos',
    products: []
  },
  [ComponentType.CONTACT]: {
    title: 'Contáctanos',
    description: 'Estamos aquí para ayudarte',
    email: 'contacto@ejemplo.com',
    phone: '+1234567890',
    address: 'Calle Principal #123'
  },
  [ComponentType.FOOTER]: {
    companyName: 'Mi Empresa',
    description: 'Creando el futuro digital',
    links: {
      company: [
        { text: 'Sobre Nosotros', url: '#' },
        { text: 'Contacto', url: '#' },
        { text: 'Blog', url: '#' }
      ],
      services: [
        { text: 'Servicios', url: '#' },
        { text: 'Productos', url: '#' },
        { text: 'Precios', url: '#' }
      ],
      legal: [
        { text: 'Términos', url: '#' },
        { text: 'Privacidad', url: '#' },
        { text: 'Cookies', url: '#' }
      ],
      social: [
        { text: 'Facebook', url: '#' },
        { text: 'Twitter', url: '#' },
        { text: 'Instagram', url: '#' }
      ]
    }
  }
};

export function ComponentRenderer({ 
  component,
  onImprove,
  isPremiumUser = false,
  onEdit
}: ComponentRendererProps) {
  const [isEditing, setIsEditing] = useState(false);

  const canEdit = (field: string): boolean => {
    if (isPremiumUser) return true;
    return component.editableFields?.includes(field) || false;
  };

  const handleEdit = (field: string, value: any) => {
    if (!onEdit || !canEdit(field)) return;
    onEdit(field, value);
  };

  const getComponentContent = () => {
    if (!component.content || !defaultContent[component.type as keyof DefaultContentType]) {
      return {};
    }
    return { 
      ...defaultContent[component.type as keyof DefaultContentType], 
      ...component.content 
    };
  };

  const renderComponent = () => {
    const commonProps = {
      component: {
        ...component,
        content: getComponentContent()
      },
      onEdit: handleEdit,
      isPremiumUser
    };

    switch (component.type) {
      case ComponentType.TOPBAR:
        return <TopBar {...commonProps} />;
      case ComponentType.HERO:
        return <Hero {...commonProps} />;
      case ComponentType.SERVICES:
        return <Services {...commonProps} />;
      case ComponentType.PRODUCTS:
        return <Products {...commonProps} />;
      case ComponentType.CONTACT:
        return <Contact {...commonProps} />;
      case ComponentType.FOOTER:
        return <Footer {...commonProps} />;
      default:
        return (
          <div className="p-4 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">Componente {component.type} en desarrollo</p>
          </div>
        );
    }
  };

  return (
    <div className="relative group">
      {renderComponent()}
      
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsEditing(true)}
        >
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </Button>

        {isPremiumUser && onImprove && (
          <Button
            size="sm"
            variant="default"
            onClick={onImprove}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Mejorar con IA
          </Button>
        )}
      </div>

      <ComponentEditor
        component={component}
        isPremiumUser={isPremiumUser}
        open={isEditing}
        onClose={() => setIsEditing(false)}
        onChange={handleEdit}
      />
    </div>
  );
}
