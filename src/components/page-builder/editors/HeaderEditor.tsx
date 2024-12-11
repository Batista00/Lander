import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ColorPicker } from '@/components/ui/color-picker';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { bgColors, textColors } from '@/lib/colors';
import { clsx } from 'clsx';

interface HeaderEditorProps {
  data?: {
    logo?: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
    navigation?: Array<{
      label: string;
      href: string;
      target: string;
    }>;
    social?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
    };
    showSocial?: boolean;
    sticky?: boolean;
    style?: {
      backgroundColor?: string;
      textColor?: string;
      shadow?: boolean;
      isFullWidth?: boolean;
    };
  };
  onChange?: (newData: any) => void;
  onDataChange?: (key: string, value: any) => void;
  onStyleChange?: (key: string, value: any) => void;
}

const defaultData = {
  navigation: [],
  social: {
    facebook: '',
    twitter: '',
    instagram: ''
  },
  showSocial: false,
  sticky: false,
  style: {
    backgroundColor: 'bg-white',
    textColor: 'text-gray-900',
    shadow: false,
    isFullWidth: false
  }
};

export function HeaderEditor({ 
  data, 
  onChange,
  onDataChange,
  onStyleChange
}: HeaderEditorProps) {
  // Ensure data is properly initialized with defaultData
  const mergedData = {
    ...defaultData,
    ...data,
    navigation: Array.isArray(data?.navigation) ? data.navigation : defaultData.navigation,
    social: { ...defaultData.social, ...data?.social },
    style: { ...defaultData.style, ...data?.style },
    sticky: data?.sticky ?? defaultData.sticky,
    showSocial: data?.showSocial ?? defaultData.showSocial
  };

  const handleChange = (field: string, value: any) => {
    if (onChange) {
      onChange({
        ...mergedData,
        [field]: value
      });
    } else if (onDataChange) {
      onDataChange(field, value);
    }
  };

  const handleStyleChange = (field: string, value: any) => {
    if (onChange) {
      onChange({
        ...mergedData,
        style: {
          ...mergedData.style,
          [field]: value
        }
      });
    } else if (onStyleChange) {
      onStyleChange(field, value);
    }
  };

  const handleNavItemChange = (index: number, field: string, value: string) => {
    const newNavigation = [...(mergedData.navigation || [])];
    newNavigation[index] = {
      ...newNavigation[index],
      [field]: value
    };
    handleChange('navigation', newNavigation);
  };

  const handleAddNavItem = () => {
    const newNavigation = [
      ...(mergedData.navigation || []),
      { label: 'Nuevo Enlace', href: '/', target: '_self' }
    ];
    handleChange('navigation', newNavigation);
  };

  const handleRemoveNavItem = (index: number) => {
    const newNavigation = [...(mergedData.navigation || [])];
    newNavigation.splice(index, 1);
    handleChange('navigation', newNavigation);
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newNavigation = [...(mergedData.navigation || [])];
    const [removed] = newNavigation.splice(result.source.index, 1);
    newNavigation.splice(result.destination.index, 0, removed);
    handleChange('navigation', newNavigation);
  };

  return (
    <div className="space-y-6">
      <Card className="p-4 space-y-4">
        <h2 className="text-lg font-medium">Configuración del Encabezado</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="sticky">Fijar en la parte superior</Label>
            <Switch
              id="sticky"
              checked={mergedData.sticky === true}
              onCheckedChange={(checked) => handleChange('sticky', checked)}
              className="data-[state=checked]:bg-black data-[state=unchecked]:bg-gray-200 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="shadow">Mostrar sombra</Label>
            <Switch
              id="shadow"
              checked={mergedData.style?.shadow === true}
              onCheckedChange={(checked) => handleStyleChange('shadow', checked)}
              className="data-[state=checked]:bg-black data-[state=unchecked]:bg-gray-200 transition-colors"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isFullWidth">Ancho completo</Label>
            <Switch
              id="isFullWidth"
              checked={mergedData.style?.isFullWidth === true}
              onCheckedChange={(checked) => handleStyleChange('isFullWidth', checked)}
              className="data-[state=checked]:bg-black data-[state=unchecked]:bg-gray-200 transition-colors"
            />
          </div>

          <div className="space-y-4">
            {/* Logo Upload */}
            <div className="w-full">
              <ImageUpload
                currentImageUrl={mergedData.logo?.url}
                onImageUpload={async (file) => {
                  // Aquí deberías implementar la lógica para subir la imagen
                  // Por ahora usaremos una URL temporal
                  const imageUrl = URL.createObjectURL(file);
                  handleChange('logo', {
                    ...mergedData.logo,
                    url: imageUrl,
                    alt: mergedData.logo?.alt || 'Logo'
                  });
                  return imageUrl;
                }}
                onRemove={() => {
                  handleChange('logo', {
                    ...mergedData.logo,
                    url: '',
                    alt: ''
                  });
                }}
                className="w-full"
              />
            </div>

            {mergedData.logo?.url && (
              <div className="space-y-2">
                <Label htmlFor="logoAlt">Texto Alternativo del Logo</Label>
                <Input
                  id="logoAlt"
                  value={mergedData.logo?.alt || ''}
                  onChange={(e) => handleChange('logo', { 
                    ...mergedData.logo,
                    alt: e.target.value 
                  })}
                  placeholder="Texto alternativo para el logo"
                />
              </div>
            )}
          </div>

          <ColorPicker
            label="Color de Fondo"
            colors={bgColors}
            value={mergedData.style?.backgroundColor || 'bg-white'}
            onChange={(value) => handleStyleChange('backgroundColor', value)}
          />

          <ColorPicker
            label="Color de Texto"
            colors={textColors}
            value={mergedData.style?.textColor || 'text-gray-900'}
            onChange={(value) => handleStyleChange('textColor', value)}
          />
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-medium mb-4">Navegación</h3>
        <div className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button
              onClick={handleAddNavItem}
              className="bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Agregar enlace
            </Button>
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="navigation">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {(mergedData.navigation || []).map((item, index) => (
                    <Draggable key={index} draggableId={index.toString()} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm"
                        >
                          <div 
                            {...provided.dragHandleProps}
                            className="cursor-move"
                          >
                            <GripVertical className="h-5 w-5 text-gray-500" />
                          </div>
                          <div className="flex-1 space-y-2">
                            <Input
                              placeholder="Texto del enlace"
                              value={item.label}
                              onChange={(e) => handleNavItemChange(index, 'label', e.target.value)}
                            />
                            <Input
                              placeholder="URL del enlace"
                              value={item.href}
                              onChange={(e) => handleNavItemChange(index, 'href', e.target.value)}
                            />
                            <div className="flex items-center space-x-2">
                              <Label htmlFor={`target-${index}`}>Abrir en nueva pestaña</Label>
                              <Switch
                                id={`target-${index}`}
                                checked={item.target === '_blank'}
                                onCheckedChange={(checked) => 
                                  handleNavItemChange(index, 'target', checked ? '_blank' : '_self')
                                }
                              />
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleRemoveNavItem(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Redes Sociales</h3>
          <Switch
            id="showSocial"
            checked={mergedData.showSocial === true}
            onCheckedChange={(checked) => handleChange('showSocial', checked)}
            className="data-[state=checked]:bg-black data-[state=unchecked]:bg-gray-200 transition-colors"
          />
        </div>

        {mergedData.showSocial && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="social.facebook">Facebook</Label>
              <Input
                id="social.facebook"
                value={mergedData.social?.facebook || ''}
                onChange={(e) => handleChange('social.facebook', e.target.value)}
                placeholder="URL de Facebook"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="social.twitter">Twitter</Label>
              <Input
                id="social.twitter"
                value={mergedData.social?.twitter || ''}
                onChange={(e) => handleChange('social.twitter', e.target.value)}
                placeholder="URL de Twitter"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="social.instagram">Instagram</Label>
              <Input
                id="social.instagram"
                value={mergedData.social?.instagram || ''}
                onChange={(e) => handleChange('social.instagram', e.target.value)}
                placeholder="URL de Instagram"
              />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
