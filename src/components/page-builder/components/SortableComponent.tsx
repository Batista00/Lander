import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Component } from '@/types/landing';
import { ComponentRenderer } from './ComponentRenderer';

interface SortableComponentProps {
  component: Component;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onEdit: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function SortableComponent({
  component,
  onDelete,
  onMoveUp,
  onMoveDown,
  onEdit,
  isFirst,
  isLast,
}: SortableComponentProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: component.id,
    disabled: false
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative touch-none"
      data-no-dnd={true}
    >
      <ComponentRenderer
        component={component}
        isEditing={true}
        onDelete={onDelete}
        onMoveUp={!isFirst ? onMoveUp : undefined}
        onMoveDown={!isLast ? onMoveDown : undefined}
        onEdit={onEdit}
      />
    </div>
  );
}
