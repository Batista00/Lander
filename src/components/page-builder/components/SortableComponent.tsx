import { Component } from '@/types/landing';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ComponentRenderer } from './ComponentRenderer';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, Trash2, Edit } from 'lucide-react';

export interface SortableComponentProps {
  component: Component;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  isFirst: boolean;
  isLast: boolean;
  deviceType: 'desktop' | 'tablet' | 'mobile';
}

export const SortableComponent = ({
  component,
  onDelete,
  onMoveUp,
  onMoveDown,
  onEdit,
  isFirst,
  isLast,
  deviceType
}: SortableComponentProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: component.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isDragging ? 'opacity-50' : ''}`}
      {...attributes}
      {...listeners}
    >
      <ComponentRenderer
        component={component}
        mode="edit"
      />
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <div className="flex gap-2 bg-background/80 backdrop-blur p-2 rounded shadow-lg border border-border">
          {!isFirst && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          )}
          {!isLast && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
