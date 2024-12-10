import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';

interface Column {
  title: string;
  content: string;
  image?: string;
}

interface ColumnsProps {
  id: string;
  content: {
    title?: string;
    subtitle?: string;
    items: Column[];
    columns?: number;
    backgroundColor?: string;
    textColor?: string;
    imagePosition?: 'left' | 'right' | 'top' | 'bottom';
  };
  onEdit?: () => void;
}

export function Columns({ id, content, onEdit }: ColumnsProps) {
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

  const getImagePosition = (position?: string) => {
    switch (position) {
      case 'left':
        return 'flex-row';
      case 'right':
        return 'flex-row-reverse';
      case 'bottom':
        return 'flex-col-reverse';
      default:
        return 'flex-col';
    }
  };

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[content.columns || 3];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "relative py-16 sm:py-24 cursor-move",
        content.backgroundColor || "bg-white"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {(content.title || content.subtitle) && (
          <div className="mx-auto max-w-2xl text-center mb-16">
            {content.title && (
              <h2 className={cn(
                "text-3xl font-bold tracking-tight sm:text-4xl mb-4",
                content.textColor || "text-gray-900"
              )}>
                {content.title}
              </h2>
            )}
            {content.subtitle && (
              <p className={cn(
                "text-lg leading-8",
                content.textColor ? content.textColor.replace('text-', 'text-opacity-70 text-') : "text-gray-600"
              )}>
                {content.subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className={cn(
          "grid gap-8 lg:gap-12",
          gridCols
        )}>
          {content.items?.map((column, idx) => (
            <div 
              key={idx} 
              className={cn(
                "flex gap-6",
                getImagePosition(content.imagePosition)
              )}
            >
              {column.image && (
                <div className={cn(
                  "relative overflow-hidden rounded-lg bg-gray-100",
                  {
                    'w-full aspect-[4/3]': !content.imagePosition || content.imagePosition === 'top' || content.imagePosition === 'bottom',
                    'w-1/2': content.imagePosition === 'left' || content.imagePosition === 'right'
                  }
                )}>
                  <img
                    src={column.image}
                    alt={column.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className={cn(
                "flex flex-col",
                {
                  'flex-1': content.imagePosition === 'left' || content.imagePosition === 'right'
                }
              )}>
                {column.title && (
                  <h3 className={cn(
                    "text-xl font-semibold mb-2",
                    content.textColor || "text-gray-900"
                  )}>
                    {column.title}
                  </h3>
                )}
                {column.content && (
                  <p className={cn(
                    "text-base",
                    content.textColor ? content.textColor.replace('text-', 'text-opacity-70 text-') : "text-gray-600"
                  )}>
                    {column.content}
                  </p>
                )}
              </div>
            </div>
          ))}
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
