import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Component } from '@/types/landing';
import { HeadingComponent } from './components/HeadingComponent';
import { TextComponent } from './components/TextComponent';
import { ImageComponent } from './components/ImageComponent';
import { Button } from '@/components/ui/Button';
import { Edit, Copy, Trash2 } from 'lucide-react';

interface SortableComponentProps {
  component: Component;
  isPreview?: boolean;
  onUpdate?: (id: string, content: any) => void;
  onEdit?: (component: Component) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const SortableComponent: React.FC<SortableComponentProps> = ({
  component,
  isPreview = false,
  onUpdate,
  onEdit,
  onDuplicate,
  onDelete,
}) => {
  const [showActions, setShowActions] = React.useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleUpdate = (newContent: any) => {
    onUpdate?.(component.id, newContent);
  };

  const renderComponent = () => {
    switch (component.type) {
      case 'heading':
        return (
          <HeadingComponent
            content={component.content}
            isPreview={isPreview}
            onUpdate={handleUpdate}
          />
        );
      case 'text':
        return (
          <TextComponent
            content={component.content}
            isPreview={isPreview}
            onUpdate={handleUpdate}
          />
        );
      case 'image':
        return (
          <ImageComponent
            content={component.content}
            isPreview={isPreview}
            onUpdate={handleUpdate}
          />
        );
      default:
        return <div>Componente no soportado</div>;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative mb-4 cursor-move group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {!isPreview && (
        <div className={`absolute right-2 top-2 flex gap-2 transition-opacity duration-200 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(component);
            }}
            title="Editar componente"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate?.(component.id);
            }}
            title="Duplicar componente"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm('¿Estás seguro de que quieres eliminar este componente?')) {
                onDelete?.(component.id);
              }
            }}
            title="Eliminar componente"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
      {renderComponent()}
    </div>
  );
};
