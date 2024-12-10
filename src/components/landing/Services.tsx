import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';
import { Pencil, Trash2 } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface ServicesProps {
  id: string;
  data: {
    title: string;
    description: string;
    services: Service[];
    style?: {
      backgroundColor?: string;
      textColor?: string;
      isFullWidth?: boolean;
    };
  };
  onEdit?: () => void;
  onDelete?: () => void;
  isEditing?: boolean;
}

const defaultData = {
  title: 'Nuestros Servicios',
  description: 'Ofrecemos una amplia gama de servicios para satisfacer tus necesidades',
  services: [
    {
      id: '1',
      title: 'Servicio 1',
      description: 'Descripción del servicio 1',
      icon: '🚀'
    },
    {
      id: '2',
      title: 'Servicio 2',
      description: 'Descripción del servicio 2',
      icon: '💡'
    },
    {
      id: '3',
      title: 'Servicio 3',
      description: 'Descripción del servicio 3',
      icon: '⚡'
    }
  ],
  style: {
    backgroundColor: 'bg-white',
    textColor: 'text-gray-900',
    isFullWidth: true
  }
};

export function Services({ id, data = defaultData, onEdit, onDelete, isEditing }: ServicesProps) {
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

  const safeData = {
    ...defaultData,
    ...data,
    services: Array.isArray(data?.services) ? data.services : defaultData.services,
    style: { ...defaultData.style, ...data?.style }
  };

  const containerClass = cn(
    safeData.style.isFullWidth ? 'container mx-auto px-4' : 'max-w-5xl mx-auto px-4'
  );

  return (
    <section
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'relative py-16',
        safeData.style.backgroundColor,
        safeData.style.textColor
      )}
    >
      {isEditing && (
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          {onEdit && (
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center gap-2 bg-white shadow-sm hover:bg-gray-50"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <Pencil className="h-4 w-4" />
              Editar
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="h-4 w-4" />
              Eliminar
            </Button>
          )}
        </div>
      )}

      <div className={containerClass}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {safeData.title}
          </h2>
          <p className="text-lg leading-8 text-gray-600">
            {safeData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {safeData.services.map((service) => (
            <div
              key={service.id}
              className="relative flex flex-col items-center p-8 h-full bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow"
            >
              {service.icon && (
                <div className="text-4xl mb-4">
                  {service.icon}
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
