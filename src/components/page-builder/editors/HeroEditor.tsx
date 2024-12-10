import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ColorPicker } from '@/components/ui/color-picker';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { toast } from 'sonner';
import { storageService } from '@/services/storageService';
import { bgColors, textColors } from '@/lib/colors';

interface HeroEditorProps {
  data: any;
  onChange: (data: any) => void;
}

const defaultData = {
  title: '',
  description: '',
  image: {
    url: '',
    alt: ''
  },
  style: {
    backgroundColor: 'bg-white',
    textColor: 'text-gray-900',
    fullWidth: false,
    centered: false
  }
};

export function HeroEditor({ data, onChange }: HeroEditorProps) {
  const mergedData = {
    ...defaultData,
    ...data,
    style: { ...defaultData.style, ...data?.style }
  };

  const handleChange = (field: string, value: any) => {
    onChange({
      ...mergedData,
      [field]: value
    });
  };

  const handleStyleChange = (field: string, value: any) => {
    onChange({
      ...mergedData,
      style: {
        ...mergedData.style,
        [field]: value
      }
    });
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      // Subir la imagen usando el servicio de almacenamiento
      const imageUrl = await storageService.uploadImage(file);
      
      // Actualizar el estado del componente con la nueva URL
      handleChange('image', {
        ...mergedData.image,
        url: imageUrl,
        alt: mergedData.image?.alt || 'Imagen de fondo'
      });

      return imageUrl;
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      toast.error('Error al subir la imagen');
      throw error;
    }
  };

  const handleImageRemove = () => {
    handleChange('image', { ...mergedData.image, url: '', alt: '' });
  };

  return (
    <div className="space-y-6">
      {/* Contenido Principal */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Título</Label>
          <Input
            value={mergedData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Ingresa el título principal"
          />
        </div>

        <div className="space-y-2">
          <Label>Descripción</Label>
          <Textarea
            value={mergedData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Ingresa la descripción"
          />
        </div>
      </div>

      <Separator />

      {/* Imagen */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Imagen de Fondo</h3>
        
        <div className="w-full">
          <ImageUpload
            currentImageUrl={mergedData.image?.url}
            onImageUpload={async (file) => {
              // Aquí deberías implementar la lógica para subir la imagen
              // Por ahora usaremos una URL temporal
              const imageUrl = URL.createObjectURL(file);
              handleChange('image', {
                ...mergedData.image,
                url: imageUrl,
                alt: mergedData.image?.alt || 'Imagen de fondo'
              });
              return imageUrl;
            }}
            onRemove={() => {
              handleChange('image', {
                ...mergedData.image,
                url: '',
                alt: ''
              });
            }}
            className="w-full"
          />
        </div>

        {mergedData.image?.url && (
          <div className="space-y-2">
            <Label htmlFor="imageAlt">Texto Alternativo de la Imagen</Label>
            <Input
              id="imageAlt"
              value={mergedData.image?.alt || ''}
              onChange={(e) => handleChange('image', { 
                ...mergedData.image,
                alt: e.target.value 
              })}
              placeholder="Texto alternativo para la imagen"
            />
          </div>
        )}
      </div>

      <Separator />

      {/* Estilos */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Estilos</h3>

        <ColorPicker
          label="Color de Fondo"
          colors={[
            { value: 'bg-white', label: 'Blanco', color: '#ffffff' },
            { value: 'bg-gray-50', label: 'Gris Claro', color: '#F9FAFB' },
            { value: 'bg-gray-100', label: 'Gris', color: '#F3F4F6' },
            { value: 'bg-blue-50', label: 'Azul Claro', color: '#EFF6FF' },
            { value: 'bg-blue-100', label: 'Azul', color: '#DBEAFE' },
            { value: 'bg-black', label: 'Negro', color: '#000000' }
          ]}
          value={mergedData.style?.backgroundColor || 'bg-white'}
          onChange={(value) => handleStyleChange('backgroundColor', value)}
        />

        <ColorPicker
          label="Color de Texto"
          colors={[
            { value: 'text-gray-900', label: 'Negro', color: '#111827' },
            { value: 'text-gray-600', label: 'Gris Oscuro', color: '#4B5563' },
            { value: 'text-blue-900', label: 'Azul Oscuro', color: '#1E3A8A' },
            { value: 'text-blue-600', label: 'Azul', color: '#2563EB' },
            { value: 'text-white', label: 'Blanco', color: '#ffffff' }
          ]}
          value={mergedData.style?.textColor || 'text-gray-900'}
          onChange={(value) => handleStyleChange('textColor', value)}
        />

        <div className="flex items-center space-x-2">
          <Switch
            checked={mergedData.style?.centered}
            onCheckedChange={(checked) => handleStyleChange('centered', checked)}
          />
          <Label>Centrar Contenido</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            checked={mergedData.style?.fullWidth}
            onCheckedChange={(checked) => handleStyleChange('fullWidth', checked)}
          />
          <Label>Ancho Completo</Label>
        </div>
      </div>
    </div>
  );
}
