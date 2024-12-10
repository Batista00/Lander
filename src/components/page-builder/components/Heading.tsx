import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';

interface HeadingProps {
  id: string;
  content: {
    title?: string;
    subtitle?: string;
    alignment?: 'left' | 'center' | 'right';
    size?: 'small' | 'medium' | 'large';
    backgroundColor?: string;
    textColor?: string;
  };
  onEdit?: () => void;
}

export function Heading({ id, content, onEdit }: HeadingProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getHeadingSize = (size?: string) => {
    switch (size) {
      case 'small':
        return 'text-2xl sm:text-3xl';
      case 'large':
        return 'text-4xl sm:text-5xl';
      default: // medium
        return 'text-3xl sm:text-4xl';
    }
  };

  const getSubtitleSize = (size?: string) => {
    switch (size) {
      case 'small':
        return 'text-base sm:text-lg';
      case 'large':
        return 'text-xl sm:text-2xl';
      default: // medium
        return 'text-lg sm:text-xl';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "relative py-12 sm:py-16 cursor-move",
        content.backgroundColor || "bg-white",
        {
          'text-left': content.alignment === 'left',
          'text-center': !content.alignment || content.alignment === 'center',
          'text-right': content.alignment === 'right',
        }
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={cn(
          "mx-auto max-w-3xl",
          {
            'ml-0': content.alignment === 'left',
            'mr-0': content.alignment === 'right',
          }
        )}>
          {content.title && (
            <h2 className={cn(
              "font-bold tracking-tight mb-4",
              getHeadingSize(content.size),
              content.textColor || "text-gray-900"
            )}>
              {content.title}
            </h2>
          )}
          {content.subtitle && (
            <p className={cn(
              "leading-relaxed",
              getSubtitleSize(content.size),
              content.textColor ? content.textColor.replace('text-', 'text-opacity-70 text-') : "text-gray-600"
            )}>
              {content.subtitle}
            </p>
          )}
        </div>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Editar
        </button>
      )}
    </div>
  );
}
