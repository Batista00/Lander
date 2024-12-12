import React from 'react';
import { EditorSection } from '../editor/EditorSection';
import { FormField, Input } from '../editor/FormField';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface ServicesEditorProps {
  data: {
    title: string;
    subtitle: string;
    services: Service[];
    style?: {
      backgroundColor?: string;
      textColor?: string;
      isFullWidth?: boolean;
    };
  };
  onChange: (field: string, value: any) => void;
}

const bgColors = [
  { value: 'bg-white', label: 'Blanco' },
  { value: 'bg-gray-50', label: 'Gris Claro' },
  { value: 'bg-gray-100', label: 'Gris' },
  { value: 'bg-blue-50', label: 'Azul Claro' },
  { value: 'bg-blue-100', label: 'Azul' },
];

const textColors = [
  { value: 'text-gray-900', label: 'Negro' },
  { value: 'text-gray-600', label: 'Gris Oscuro' },
  { value: 'text-blue-900', label: 'Azul Oscuro' },
  { value: 'text-blue-600', label: 'Azul' },
];

export function ServicesEditor({ data, onChange }: ServicesEditorProps) {
  const handleServiceChange = (index: number, field: string, value: string) => {
    const updatedServices = [...data.services];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value
    };
    onChange('services', updatedServices);
  };

  const addService = () => {
    const newService = {
      id: crypto.randomUUID(),
      title: 'Nuevo Servicio',
      description: 'Descripción del servicio',
      icon: '🚀'
    };
    onChange('services', [...data.services, newService]);
  };

  const removeService = (index: number) => {
    const updatedServices = data.services.filter((_, i) => i !== index);
    onChange('services', updatedServices);
  };

  const handleStyleChange = (field: string, value: any) => {
    onChange('style', {
      ...data.style,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <EditorSection title="Información General">
        <FormField label="Título" htmlFor="title">
          <Input
            id="title"
            value={data.title}
            onChange={(e) => onChange('title', e.target.value)}
            placeholder="Nuestros Servicios"
          />
        </FormField>

        <FormField label="Subtítulo" htmlFor="subtitle">
          <Input
            id="subtitle"
            value={data.subtitle}
            onChange={(e) => onChange('subtitle', e.target.value)}
            placeholder="Lo que ofrecemos"
          />
        </FormField>
      </EditorSection>

      <EditorSection title="Estilo">
        <FormField label="Color de Fondo" htmlFor="backgroundColor">
          <Select
            value={data.style?.backgroundColor || 'bg-white'}
            onValueChange={(value) => handleStyleChange('backgroundColor', value)}
          >
            <SelectTrigger id="backgroundColor" className="w-full">
              <SelectValue placeholder="Selecciona un color" />
            </SelectTrigger>
            <SelectContent>
              {bgColors.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  {color.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Color de Texto" htmlFor="textColor">
          <Select
            value={data.style?.textColor || 'text-gray-900'}
            onValueChange={(value) => handleStyleChange('textColor', value)}
          >
            <SelectTrigger id="textColor" className="w-full">
              <SelectValue placeholder="Selecciona un color" />
            </SelectTrigger>
            <SelectContent>
              {textColors.map((color) => (
                <SelectItem key={color.value} value={color.value}>
                  {color.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>

        <FormField label="Ancho Completo" htmlFor="isFullWidth">
          <div className="flex items-center">
            <Switch
              id="isFullWidth"
              checked={data.style?.isFullWidth}
              onCheckedChange={(checked) => handleStyleChange('isFullWidth', checked)}
              className="data-[state=checked]:bg-blue-600"
            />
            <span className="ml-2 text-sm text-gray-600">
              {data.style?.isFullWidth ? 'Ancho completo' : 'Compacto'}
            </span>
          </div>
        </FormField>
      </EditorSection>

      <EditorSection title="Servicios">
        <div className="space-y-6">
          {data.services.map((service, index) => (
            <div key={service.id} className="p-4 border rounded-lg space-y-4 relative bg-white">
              <button
                onClick={() => removeService(index)}
                className="absolute top-2 right-2 p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700 transition-colors"
                title="Eliminar servicio"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <FormField label="Ícono" htmlFor={`service-icon-${index}`}>
                <Input
                  id={`service-icon-${index}`}
                  value={service.icon || ''}
                  onChange={(e) => handleServiceChange(index, 'icon', e.target.value)}
                  placeholder="Emoji o ícono (ej: 🚀)"
                />
              </FormField>

              <FormField label="Título del Servicio" htmlFor={`service-title-${index}`}>
                <Input
                  id={`service-title-${index}`}
                  value={service.title}
                  onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                  placeholder="Título del servicio"
                />
              </FormField>

              <FormField label="Descripción" htmlFor={`service-description-${index}`}>
                <Input
                  id={`service-description-${index}`}
                  value={service.description}
                  onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                  placeholder="Descripción del servicio"
                />
              </FormField>
            </div>
          ))}

          <Button
            onClick={addService}
            className="w-full flex items-center justify-center gap-2 mt-4 bg-blue-500 hover:bg-blue-600 text-white transition-colors"
            type="button"
          >
            <Plus className="w-4 h-4" />
            Agregar Servicio
          </Button>
        </div>
      </EditorSection>
    </div>
  );
}
