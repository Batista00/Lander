import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { Mail, MapPin, Phone, Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface ContactProps {
  id: string;
  data: {
    title?: string;
    subtitle?: string;
    email?: string;
    phone?: string;
    address?: string;
    formFields?: Array<{
      type: string;
      name: string;
      label: string;
      required?: boolean;
    }>;
    buttonText?: string;
    showMap?: boolean;
    mapLocation?: {
      lat: number;
      lng: number;
    };
    style?: {
      backgroundColor?: string;
      textColor?: string;
    };
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

const defaultData = {
  title: 'Contacto',
  subtitle: 'Estamos aquí para ayudarte',
  formFields: [],
  buttonText: 'Enviar mensaje',
  showMap: false,
  style: {
    backgroundColor: 'bg-gray-50',
    textColor: 'text-gray-900'
  }
};

export function Contact({ id, data = defaultData, onEdit, onDelete }: ContactProps) {
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

  const backgroundColor = data.style?.backgroundColor || defaultData.style.backgroundColor;
  const textColor = data.style?.textColor || defaultData.style.textColor;
  const formFields = Array.isArray(data.formFields) ? data.formFields : defaultData.formFields;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'relative w-full py-24 sm:py-32 cursor-move group',
        backgroundColor,
        textColor
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {data.title || defaultData.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {data.subtitle || defaultData.subtitle}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            {data.email && (
              <div className="flex items-center gap-x-4">
                <Mail className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a href={`mailto:${data.email}`} className="text-gray-600 hover:text-blue-600">
                    {data.email}
                  </a>
                </div>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center gap-x-4">
                <Phone className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Teléfono</h3>
                  <a href={`tel:${data.phone}`} className="text-gray-600 hover:text-blue-600">
                    {data.phone}
                  </a>
                </div>
              </div>
            )}
            {data.address && (
              <div className="flex items-center gap-x-4">
                <MapPin className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold">Dirección</h3>
                  <p className="text-gray-600">{data.address}</p>
                </div>
              </div>
            )}
            {data.showMap && data.mapLocation && (
              <div className="aspect-video w-full rounded-lg bg-gray-200">
                <div className="h-full w-full flex items-center justify-center text-gray-500">
                  Mapa
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <form className="space-y-6">
            {formFields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    name={field.name}
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required={field.required}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required={field.required}
                  />
                )}
              </div>
            ))}
            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {data.buttonText || defaultData.buttonText}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Edit and Delete Buttons */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
        {onEdit && (
          <Button
            onClick={onEdit}
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
        {onDelete && (
          <Button
            onClick={onDelete}
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-red-100 text-red-600 rounded-md"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
