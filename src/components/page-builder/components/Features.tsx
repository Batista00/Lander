import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';

interface Item {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesProps {
  id: string;
  data: {
    title: string;
    subtitle: string;
    items: Item[];
    columns?: number;
    style?: {
      backgroundColor?: string;
      textColor?: string;
    };
  };
  onEdit?: () => void;
}

const defaultContent = {
  title: 'Características',
  subtitle: 'Todo lo que necesitas',
  items: [],
  columns: 3,
  style: {
    backgroundColor: 'bg-white',
    textColor: 'text-gray-900'
  }
};

export function Features({ id, data = defaultContent, onEdit }: FeaturesProps) {
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

  // Asegurarse de que data.style exista
  const contentStyle = data.style || defaultContent.style;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "relative py-24 sm:py-32 cursor-move",
        contentStyle.backgroundColor || "bg-white",
        contentStyle.textColor || "text-gray-900"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">
            {data.title || defaultContent.title}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {data.subtitle || defaultContent.subtitle}
          </p>
        </div>
        <div 
          className={cn(
            "mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none grid gap-8",
            {
              'grid-cols-1': data.columns === 1,
              'grid-cols-2': data.columns === 2,
              'grid-cols-3': data.columns === 3 || !data.columns,
              'grid-cols-4': data.columns === 4,
            }
          )}
        >
          {(data.items || []).map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              {item.icon && (
                <div className="mb-4 text-4xl text-blue-600">
                  {item.icon}
                </div>
              )}
              {item.title && (
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              )}
              {item.description && (
                <p className="text-sm text-gray-500">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="absolute top-4 right-4 rounded-md bg-white p-2 text-gray-400 hover:text-gray-500"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      )}
    </div>
  );
}
