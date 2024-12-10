import React from 'react';
import { ComponentData } from '@/types/components';
import { HeroSection } from './sections/HeroSection';
import { TextSection } from './sections/TextSection';
import { ImageSection } from './sections/ImageSection';
import { ContactSection } from './sections/ContactSection';
import { ServicesSection } from './sections/ServicesSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { PricingSection } from './sections/PricingSection';

interface ComponentRendererProps {
  component: ComponentData;
  isEditing?: boolean;
  onEdit?: (componentId: string) => void;
  onDelete?: (componentId: string) => void;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  isEditing = false,
  onEdit,
  onDelete,
}) => {
  const renderComponent = () => {
    switch (component.type) {
      case 'hero':
        return <HeroSection data={component.data} isEditing={isEditing} />;
      case 'text':
        return <TextSection data={component.data} isEditing={isEditing} />;
      case 'image':
        return <ImageSection data={component.data} isEditing={isEditing} />;
      case 'contact':
        return <ContactSection data={component.data} isEditing={isEditing} />;
      case 'services':
        return <ServicesSection data={component.data} isEditing={isEditing} />;
      case 'features':
        return <FeaturesSection data={component.data} isEditing={isEditing} />;
      case 'testimonials':
        return <TestimonialsSection data={component.data} isEditing={isEditing} />;
      case 'pricing':
        return <PricingSection data={component.data} isEditing={isEditing} />;
      default:
        return <div>Componente no soportado: {component.type}</div>;
    }
  };

  return (
    <div className="relative group">
      {renderComponent()}
      {isEditing && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-2">
            {onEdit && (
              <button
                onClick={() => onEdit(component.id)}
                className="p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Editar
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(component.id)}
                className="p-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90"
              >
                Eliminar
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
