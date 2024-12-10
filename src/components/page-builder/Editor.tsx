import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { useFeatures } from '../../store/features';
import { PremiumFeature } from './PremiumFeature';

interface EditorProps {
  component: any;
  onSave: (updatedContent: any) => void;
  onClose: () => void;
}

interface Field {
  name: string;
  type: 'text' | 'textarea' | 'number' | 'image' | 'array' | 'object' | 'boolean' | 'select';
  label: string;
  value: any;
  options?: { value: any; label: string }[];
}

export function Editor({ component, onSave, onClose }: EditorProps) {
  const { isFeatureAvailable, upgradeNeeded } = useFeatures();
  const [activeTab, setActiveTab] = useState<'content' | 'style' | 'settings'>('content');
  const [showStyleEditor, setShowStyleEditor] = useState(false);
  const [customStyles, setCustomStyles] = useState({
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF',
      text: '#111827',
      background: '#FFFFFF',
    },
    typography: {
      fontFamily: 'Inter',
      fontSize: '16px',
      headingSize: '48px',
    },
    spacing: {
      padding: '1rem',
      gap: '1rem',
    },
    effects: {
      animation: 'none',
      shadow: 'none',
      radius: '0.5rem',
    },
  });

  const [fields, setFields] = useState<Field[]>([]);
  const [values, setValues] = useState<any>({});

  useEffect(() => {
    // Generar campos basados en el tipo de componente
    const componentFields = generateFields(component);
    setFields(componentFields);
    
    // Inicializar valores con el contenido actual
    const initialValues = componentFields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {} as any);
    setValues(initialValues);
  }, [component]);

  function generateFields(component: any): Field[] {
    switch (component.type) {
      case 'hero':
        return [
          { name: 'title', type: 'text', label: 'Título', value: component.content.title },
          { name: 'subtitle', type: 'textarea', label: 'Subtítulo', value: component.content.subtitle },
          { name: 'buttonText', type: 'text', label: 'Texto del Botón', value: component.content.buttonText },
          { name: 'buttonUrl', type: 'text', label: 'URL del Botón', value: component.content.buttonUrl },
          { name: 'imageUrl', type: 'text', label: 'URL de la Imagen', value: component.content.imageUrl },
          {
            name: 'imagePosition',
            type: 'select',
            label: 'Posición de la Imagen',
            value: component.content.imagePosition || 'background',
            options: [
              { value: 'left', label: 'Izquierda' },
              { value: 'right', label: 'Derecha' },
              { value: 'background', label: 'Fondo' },
            ],
          },
          {
            name: 'alignment',
            type: 'select',
            label: 'Alineación',
            value: component.content.alignment || 'center',
            options: [
              { value: 'left', label: 'Izquierda' },
              { value: 'center', label: 'Centro' },
              { value: 'right', label: 'Derecha' },
            ],
          },
          {
            name: 'height',
            type: 'select',
            label: 'Altura',
            value: component.content.height || 'medium',
            options: [
              { value: 'small', label: 'Pequeña' },
              { value: 'medium', label: 'Mediana' },
              { value: 'large', label: 'Grande' },
            ],
          },
          {
            name: 'backgroundColor',
            type: 'select',
            label: 'Color de Fondo',
            value: component.content.backgroundColor || 'bg-white',
            options: [
              { value: 'bg-white', label: 'Blanco' },
              { value: 'bg-gray-50', label: 'Gris Claro' },
              { value: 'bg-gray-100', label: 'Gris' },
              { value: 'bg-blue-50', label: 'Azul Claro' },
            ],
          },
          {
            name: 'textColor',
            type: 'select',
            label: 'Color de Texto',
            value: component.content.textColor || 'text-gray-900',
            options: [
              { value: 'text-gray-900', label: 'Negro' },
              { value: 'text-gray-600', label: 'Gris' },
              { value: 'text-blue-600', label: 'Azul' },
              { value: 'text-white', label: 'Blanco' },
            ],
          },
        ];
      case 'features':
        return [
          { name: 'title', type: 'text', label: 'Título', value: component.content.title },
          { name: 'subtitle', type: 'textarea', label: 'Subtítulo', value: component.content.subtitle },
          {
            name: 'items',
            type: 'array',
            label: 'Características',
            value: component.content.items || [],
          },
          {
            name: 'columns',
            type: 'select',
            label: 'Número de Columnas',
            value: component.content.columns || 3,
            options: [
              { value: 1, label: '1 Columna' },
              { value: 2, label: '2 Columnas' },
              { value: 3, label: '3 Columnas' },
              { value: 4, label: '4 Columnas' },
            ],
          },
          {
            name: 'backgroundColor',
            type: 'select',
            label: 'Color de Fondo',
            value: component.content.backgroundColor || 'bg-white',
            options: [
              { value: 'bg-white', label: 'Blanco' },
              { value: 'bg-gray-50', label: 'Gris Claro' },
              { value: 'bg-gray-100', label: 'Gris' },
              { value: 'bg-blue-50', label: 'Azul Claro' },
            ],
          },
          {
            name: 'textColor',
            type: 'select',
            label: 'Color de Texto',
            value: component.content.textColor || 'text-gray-900',
            options: [
              { value: 'text-gray-900', label: 'Negro' },
              { value: 'text-gray-600', label: 'Gris' },
              { value: 'text-blue-600', label: 'Azul' },
              { value: 'text-white', label: 'Blanco' },
            ],
          },
        ];
      case 'columns':
        return [
          { name: 'title', type: 'text', label: 'Título', value: component.content.title },
          { name: 'subtitle', type: 'textarea', label: 'Subtítulo', value: component.content.subtitle },
          {
            name: 'items',
            type: 'array',
            label: 'Columnas',
            value: component.content.items || [],
          },
          {
            name: 'columns',
            type: 'select',
            label: 'Número de Columnas',
            value: component.content.columns || 3,
            options: [
              { value: 1, label: '1 Columna' },
              { value: 2, label: '2 Columnas' },
              { value: 3, label: '3 Columnas' },
              { value: 4, label: '4 Columnas' },
            ],
          },
          {
            name: 'imagePosition',
            type: 'select',
            label: 'Posición de la Imagen',
            value: component.content.imagePosition || 'top',
            options: [
              { value: 'top', label: 'Arriba' },
              { value: 'bottom', label: 'Abajo' },
              { value: 'left', label: 'Izquierda' },
              { value: 'right', label: 'Derecha' },
            ],
          },
          {
            name: 'backgroundColor',
            type: 'select',
            label: 'Color de Fondo',
            value: component.content.backgroundColor || 'bg-white',
            options: [
              { value: 'bg-white', label: 'Blanco' },
              { value: 'bg-gray-50', label: 'Gris Claro' },
              { value: 'bg-gray-100', label: 'Gris' },
              { value: 'bg-blue-50', label: 'Azul Claro' },
            ],
          },
          {
            name: 'textColor',
            type: 'select',
            label: 'Color de Texto',
            value: component.content.textColor || 'text-gray-900',
            options: [
              { value: 'text-gray-900', label: 'Negro' },
              { value: 'text-gray-600', label: 'Gris' },
              { value: 'text-blue-600', label: 'Azul' },
              { value: 'text-white', label: 'Blanco' },
            ],
          },
        ];
      case 'products':
        return [
          { name: 'title', type: 'text', label: 'Título', value: component.content.title },
          { name: 'subtitle', type: 'textarea', label: 'Subtítulo', value: component.content.subtitle },
          {
            name: 'columns',
            type: 'select',
            label: 'Número de Columnas',
            value: component.content.columns || 3,
            options: [
              { value: 1, label: '1 Columna' },
              { value: 2, label: '2 Columnas' },
              { value: 3, label: '3 Columnas' },
              { value: 4, label: '4 Columnas' },
            ],
          },
          {
            name: 'imageAspect',
            type: 'select',
            label: 'Aspecto de las Imágenes',
            value: component.content.imageAspect || 'square',
            options: [
              { value: 'square', label: 'Cuadrado' },
              { value: 'landscape', label: 'Horizontal' },
              { value: 'portrait', label: 'Vertical' },
            ],
          },
          {
            name: 'showPrices',
            type: 'boolean',
            label: 'Mostrar Precios',
            value: component.content.showPrices ?? true,
          },
          {
            name: 'showButtons',
            type: 'boolean',
            label: 'Mostrar Botones',
            value: component.content.showButtons ?? true,
          },
          {
            name: 'backgroundColor',
            type: 'select',
            label: 'Color de Fondo',
            value: component.content.backgroundColor || 'bg-white',
            options: [
              { value: 'bg-white', label: 'Blanco' },
              { value: 'bg-gray-50', label: 'Gris Claro' },
              { value: 'bg-gray-100', label: 'Gris' },
              { value: 'bg-blue-50', label: 'Azul Claro' },
            ],
          },
          {
            name: 'textColor',
            type: 'select',
            label: 'Color de Texto',
            value: component.content.textColor || 'text-gray-900',
            options: [
              { value: 'text-gray-900', label: 'Negro' },
              { value: 'text-gray-600', label: 'Gris' },
              { value: 'text-blue-600', label: 'Azul' },
              { value: 'text-white', label: 'Blanco' },
            ],
          },
          {
            name: 'products',
            type: 'array',
            label: 'Productos',
            value: component.content.products.map((product: any) => ({
              id: product.id,
              name: product.name,
              description: product.description,
              price: product.price,
              imageUrl: product.imageUrl,
              buttonText: product.buttonText,
              buttonUrl: product.buttonUrl,
            })),
          },
        ];
      case 'contact':
        return [
          { name: 'title', type: 'text', label: 'Título', value: component.content.title },
          { name: 'subtitle', type: 'textarea', label: 'Subtítulo', value: component.content.subtitle },
          { name: 'submitButtonText', type: 'text', label: 'Texto del Botón', value: component.content.submitButtonText },
          {
            name: 'fields',
            type: 'object',
            label: 'Campos del Formulario',
            value: component.content.fields,
          },
        ];
      case 'booking':
        return [
          { name: 'title', type: 'text', label: 'Título', value: component.content.title },
          { name: 'subtitle', type: 'textarea', label: 'Subtítulo', value: component.content.subtitle },
          { name: 'submitButtonText', type: 'text', label: 'Texto del Botón', value: component.content.submitButtonText },
          {
            name: 'timeSlots',
            type: 'array',
            label: 'Horarios Disponibles',
            value: component.content.timeSlots.map((slot: any) => ({
              time: slot.time,
              available: slot.available,
            })),
          },
        ];
      case 'heading':
        return [
          { name: 'title', type: 'text', label: 'Título', value: component.content.title },
          { name: 'subtitle', type: 'textarea', label: 'Subtítulo', value: component.content.subtitle },
          {
            name: 'alignment',
            type: 'select',
            label: 'Alineación',
            value: component.content.alignment || 'center',
            options: [
              { value: 'left', label: 'Izquierda' },
              { value: 'center', label: 'Centro' },
              { value: 'right', label: 'Derecha' },
            ],
          },
          {
            name: 'size',
            type: 'select',
            label: 'Tamaño',
            value: component.content.size || 'medium',
            options: [
              { value: 'small', label: 'Pequeño' },
              { value: 'medium', label: 'Mediano' },
              { value: 'large', label: 'Grande' },
            ],
          },
          {
            name: 'backgroundColor',
            type: 'select',
            label: 'Color de Fondo',
            value: component.content.backgroundColor || 'bg-white',
            options: [
              { value: 'bg-white', label: 'Blanco' },
              { value: 'bg-gray-50', label: 'Gris Claro' },
              { value: 'bg-gray-100', label: 'Gris' },
              { value: 'bg-blue-50', label: 'Azul Claro' },
            ],
          },
          {
            name: 'textColor',
            type: 'select',
            label: 'Color de Texto',
            value: component.content.textColor || 'text-gray-900',
            options: [
              { value: 'text-gray-900', label: 'Negro' },
              { value: 'text-gray-600', label: 'Gris' },
              { value: 'text-blue-600', label: 'Azul' },
              { value: 'text-white', label: 'Blanco' },
            ],
          },
        ];
      case 'text':
        return [
          { name: 'text', type: 'text', label: 'Texto', value: component.content.text },
          {
            name: 'alignment',
            type: 'select',
            label: 'Alineación',
            value: component.content.alignment || 'left',
            options: [
              { value: 'left', label: 'Izquierda' },
              { value: 'center', label: 'Centro' },
              { value: 'right', label: 'Derecha' },
            ],
          },
          {
            name: 'size',
            type: 'select',
            label: 'Tamaño',
            value: component.content.size || 'medium',
            options: [
              { value: 'small', label: 'Pequeño' },
              { value: 'medium', label: 'Mediano' },
              { value: 'large', label: 'Grande' },
            ],
          },
          {
            name: 'fontWeight',
            type: 'select',
            label: 'Grosor de Fuente',
            value: component.content.fontWeight || 'normal',
            options: [
              { value: 'normal', label: 'Normal' },
              { value: 'medium', label: 'Medio' },
              { value: 'bold', label: 'Negrita' },
            ],
          },
          {
            name: 'color',
            type: 'select',
            label: 'Color de Texto',
            value: component.content.color || 'text-gray-700',
            options: [
              { value: 'text-gray-700', label: 'Gris' },
              { value: 'text-black', label: 'Negro' },
              { value: 'text-white', label: 'Blanco' },
              { value: 'text-blue-600', label: 'Azul' },
              { value: 'text-red-600', label: 'Rojo' },
              { value: 'text-green-600', label: 'Verde' },
            ],
          },
          {
            name: 'backgroundColor',
            type: 'select',
            label: 'Color de Fondo',
            value: component.content.backgroundColor || 'bg-transparent',
            options: [
              { value: 'bg-transparent', label: 'Transparente' },
              { value: 'bg-white', label: 'Blanco' },
              { value: 'bg-gray-100', label: 'Gris Claro' },
              { value: 'bg-gray-200', label: 'Gris' },
              { value: 'bg-blue-100', label: 'Azul Claro' },
              { value: 'bg-red-100', label: 'Rojo Claro' },
              { value: 'bg-green-100', label: 'Verde Claro' },
            ],
          },
          {
            name: 'padding',
            type: 'select',
            label: 'Padding',
            value: component.content.padding || 'medium',
            options: [
              { value: 'small', label: 'Pequeño' },
              { value: 'medium', label: 'Mediano' },
              { value: 'large', label: 'Grande' },
            ],
          },
        ];
      default:
        return [];
    }
  }

  function handleInputChange(fieldName: string, value: any) {
    setValues((prev: any) => ({
      ...prev,
      [fieldName]: value,
    }));
  }

  function handleArrayChange(fieldName: string, index: number, key: string, value: any) {
    setValues((prev: any) => {
      const newArray = [...prev[fieldName]];
      newArray[index] = {
        ...newArray[index],
        [key]: value,
      };
      return {
        ...prev,
        [fieldName]: newArray,
      };
    });
  }

  function handleSave() {
    const updatedContent = {
      ...component.content,
      ...values,
    };
    onSave(updatedContent);
  }

  function renderField(field: Field) {
    switch (field.type) {
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Texto</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={values[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Alineación</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={values[field.name + 'Alignment'] || 'left'}
                onChange={(e) => handleInputChange(field.name + 'Alignment', e.target.value)}
              >
                <option value="left">Izquierda</option>
                <option value="center">Centro</option>
                <option value="right">Derecha</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Tamaño</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={values[field.name + 'Size'] || 'medium'}
                onChange={(e) => handleInputChange(field.name + 'Size', e.target.value)}
              >
                <option value="small">Pequeño</option>
                <option value="medium">Mediano</option>
                <option value="large">Grande</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Grosor de Fuente</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={values[field.name + 'FontWeight'] || 'normal'}
                onChange={(e) => handleInputChange(field.name + 'FontWeight', e.target.value)}
              >
                <option value="normal">Normal</option>
                <option value="medium">Medio</option>
                <option value="bold">Negrita</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Color de Texto</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={values[field.name + 'Color'] || 'text-gray-700'}
                onChange={(e) => handleInputChange(field.name + 'Color', e.target.value)}
              >
                <option value="text-gray-700">Gris</option>
                <option value="text-black">Negro</option>
                <option value="text-white">Blanco</option>
                <option value="text-blue-600">Azul</option>
                <option value="text-red-600">Rojo</option>
                <option value="text-green-600">Verde</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Color de Fondo</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={values[field.name + 'BackgroundColor'] || 'bg-transparent'}
                onChange={(e) => handleInputChange(field.name + 'BackgroundColor', e.target.value)}
              >
                <option value="bg-transparent">Transparente</option>
                <option value="bg-white">Blanco</option>
                <option value="bg-gray-100">Gris Claro</option>
                <option value="bg-gray-200">Gris</option>
                <option value="bg-blue-100">Azul Claro</option>
                <option value="bg-red-100">Rojo Claro</option>
                <option value="bg-green-100">Verde Claro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Padding</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={values[field.name + 'Padding'] || 'medium'}
                onChange={(e) => handleInputChange(field.name + 'Padding', e.target.value)}
              >
                <option value="small">Pequeño</option>
                <option value="medium">Mediano</option>
                <option value="large">Grande</option>
              </select>
            </div>
          </div>
        );
      case 'textarea':
        return (
          <textarea
            value={values[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            rows={3}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          />
        );
      case 'array':
        return (
          <div className="space-y-4">
            {values[field.name]?.map((item: any, index: number) => (
              <div key={index} className="border rounded-md p-4">
                {Object.entries(item).map(([key, value]: [string, any]) => (
                  <div key={key} className="mt-2">
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {key}
                    </label>
                    {key === 'imageUrl' ? (
                      <div className="mt-1">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleArrayChange(field.name, index, key, e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                        />
                        {value && (
                          <img
                            src={value}
                            alt="Preview"
                            className="mt-2 h-20 w-20 object-cover rounded-md"
                          />
                        )}
                      </div>
                    ) : (
                      <input
                        type={typeof value === 'boolean' ? 'checkbox' : 'text'}
                        checked={typeof value === 'boolean' ? value : undefined}
                        value={typeof value === 'boolean' ? undefined : value}
                        onChange={(e) => handleArrayChange(
                          field.name,
                          index,
                          key,
                          typeof value === 'boolean' ? e.target.checked : e.target.value
                        )}
                        className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      case 'object':
        return (
          <div className="space-y-4">
            {Object.entries(values[field.name] || {}).map(([key, value]: [string, any]) => (
              <div key={key} className="flex items-center gap-2">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key}
                </label>
                <input
                  type="checkbox"
                  checked={value as boolean}
                  onChange={(e) =>
                    handleInputChange(field.name, {
                      ...values[field.name],
                      [key]: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                />
              </div>
            ))}
          </div>
        );
      case 'select':
        return (
          <select
            value={values[field.name]}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  }

  function renderStyleEditor() {
    if (!isFeatureAvailable('customColors')) {
      return (
        <PremiumFeature
          title="Editor de Estilos"
          description="Personaliza colores, tipografía, espaciado y efectos visuales de tus componentes."
          onUpgrade={() => {/* Implementar lógica de upgrade */}}
        />
      );
    }

    return (
      <div className="space-y-6">
        {/* Color Editor */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Colores</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(customStyles.colors).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm text-gray-500 mb-1 capitalize">
                  {key}
                </label>
                <input
                  type="color"
                  value={value}
                  onChange={(e) =>
                    setCustomStyles((prev) => ({
                      ...prev,
                      colors: {
                        ...prev.colors,
                        [key]: e.target.value,
                      },
                    }))
                  }
                  className="w-full h-8 rounded-md cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Typography Editor */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Tipografía</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Fuente
              </label>
              <select
                value={customStyles.typography.fontFamily}
                onChange={(e) =>
                  setCustomStyles((prev) => ({
                    ...prev,
                    typography: {
                      ...prev.typography,
                      fontFamily: e.target.value,
                    },
                  }))
                }
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Poppins">Poppins</option>
                <option value="Montserrat">Montserrat</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Tamaño de Texto
                </label>
                <input
                  type="text"
                  value={customStyles.typography.fontSize}
                  onChange={(e) =>
                    setCustomStyles((prev) => ({
                      ...prev,
                      typography: {
                        ...prev.typography,
                        fontSize: e.target.value,
                      },
                    }))
                  }
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Tamaño de Títulos
                </label>
                <input
                  type="text"
                  value={customStyles.typography.headingSize}
                  onChange={(e) =>
                    setCustomStyles((prev) => ({
                      ...prev,
                      typography: {
                        ...prev.typography,
                        headingSize: e.target.value,
                      },
                    }))
                  }
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Effects Editor */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Efectos</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Animación
              </label>
              <select
                value={customStyles.effects.animation}
                onChange={(e) =>
                  setCustomStyles((prev) => ({
                    ...prev,
                    effects: {
                      ...prev.effects,
                      animation: e.target.value,
                    },
                  }))
                }
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              >
                <option value="none">Ninguna</option>
                <option value="fade">Fade</option>
                <option value="slide">Slide</option>
                <option value="bounce">Bounce</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Sombra
              </label>
              <select
                value={customStyles.effects.shadow}
                onChange={(e) =>
                  setCustomStyles((prev) => ({
                    ...prev,
                    effects: {
                      ...prev.effects,
                      shadow: e.target.value,
                    },
                  }))
                }
                className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              >
                <option value="none">Ninguna</option>
                <option value="sm">Pequeña</option>
                <option value="md">Mediana</option>
                <option value="lg">Grande</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">
                Radio de Bordes
              </label>
              <input
                type="text"
                value={customStyles.effects.radius}
                onChange={(e) =>
                  setCustomStyles((prev) => ({
                    ...prev,
                    effects: {
                      ...prev.effects,
                      radius: e.target.value,
                    },
                  }))
                }
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-4 py-3 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Editar {component.type.charAt(0).toUpperCase() + component.type.slice(1)}
          </h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={activeTab === 'content' ? 'default' : 'outline'}
              onClick={() => setActiveTab('content')}
            >
              Contenido
            </Button>
            <Button
              variant={activeTab === 'style' ? 'default' : 'outline'}
              onClick={() => setActiveTab('style')}
            >
              Estilos
            </Button>
            <Button
              variant={activeTab === 'settings' ? 'default' : 'outline'}
              onClick={() => setActiveTab('settings')}
            >
              Ajustes
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'content' && (
            <div className="space-y-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'style' && renderStyleEditor()}

          {activeTab === 'settings' && (
            <div className="space-y-4">
              {/* Configuraciones adicionales según el tipo de componente */}
              {upgradeNeeded('advancedSettings') ? (
                <PremiumFeature
                  title="Configuraciones Avanzadas"
                  description="Accede a configuraciones avanzadas como animaciones, interacciones y comportamientos personalizados."
                  onUpgrade={() => {/* Implementar lógica de upgrade */}}
                />
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ID del Componente
                    </label>
                    <input
                      type="text"
                      value={component.id}
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Visibilidad
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="always">Siempre visible</option>
                      <option value="desktop">Solo escritorio</option>
                      <option value="mobile">Solo móvil</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-t flex justify-between">
          <div className="flex items-center space-x-2">
            {isFeatureAvailable('versionHistory') && (
              <Button variant="outline" onClick={() => {/* Implementar historial */}}>
                Historial
              </Button>
            )}
            {isFeatureAvailable('exportCode') && (
              <Button variant="outline" onClick={() => {/* Implementar exportación */}}>
                Exportar
              </Button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}