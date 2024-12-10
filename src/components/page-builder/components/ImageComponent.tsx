import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface ImageComponentProps {
  content: {
    imageUrl: string;
    altText: string;
    caption?: string;
    width: string;
    height: string;
    alignment: string;
    padding: string;
    rounded: boolean;
    shadow: boolean;
  };
  isPreview?: boolean;
  onUpdate?: (content: any) => void;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({
  content,
  isPreview = false,
  onUpdate,
}) => {
  const imageClasses = `
    ${content.rounded ? 'rounded-lg' : ''}
    ${content.shadow ? 'shadow-lg' : ''}
    ${content.width}
    ${content.height}
    object-cover
  `;

  if (isPreview) {
    return (
      <div className={`${content.padding} text-center`}>
        <div className={`flex justify-${content.alignment}`}>
          <img
            src={content.imageUrl}
            alt={content.altText}
            className={imageClasses}
          />
        </div>
        {content.caption && (
          <p className="mt-2 text-sm text-gray-600">{content.caption}</p>
        )}
      </div>
    );
  }

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <span className="text-sm font-medium">URL de la Imagen</span>
          <Input
            value={content.imageUrl}
            onChange={(e) =>
              onUpdate?.({ ...content, imageUrl: e.target.value })
            }
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        <div>
          <span className="text-sm font-medium">Texto Alternativo</span>
          <Input
            value={content.altText}
            onChange={(e) =>
              onUpdate?.({ ...content, altText: e.target.value })
            }
            placeholder="Descripción de la imagen"
          />
        </div>

        <div>
          <span className="text-sm font-medium">Pie de Foto (opcional)</span>
          <Input
            value={content.caption}
            onChange={(e) =>
              onUpdate?.({ ...content, caption: e.target.value })
            }
            placeholder="Descripción debajo de la imagen"
          />
        </div>

        <div>
          <span className="text-sm font-medium">Ancho</span>
          <select
            className="w-full p-2 border rounded-md"
            value={content.width}
            onChange={(e) =>
              onUpdate?.({ ...content, width: e.target.value })
            }
          >
            <option value="w-1/4">25%</option>
            <option value="w-1/3">33%</option>
            <option value="w-1/2">50%</option>
            <option value="w-2/3">66%</option>
            <option value="w-3/4">75%</option>
            <option value="w-full">100%</option>
          </select>
        </div>

        <div>
          <span className="text-sm font-medium">Alto</span>
          <select
            className="w-full p-2 border rounded-md"
            value={content.height}
            onChange={(e) =>
              onUpdate?.({ ...content, height: e.target.value })
            }
          >
            <option value="h-32">Pequeño</option>
            <option value="h-48">Mediano</option>
            <option value="h-64">Grande</option>
            <option value="h-96">Extra Grande</option>
          </select>
        </div>

        <div>
          <span className="text-sm font-medium">Alineación</span>
          <select
            className="w-full p-2 border rounded-md"
            value={content.alignment}
            onChange={(e) =>
              onUpdate?.({ ...content, alignment: e.target.value })
            }
          >
            <option value="start">Izquierda</option>
            <option value="center">Centro</option>
            <option value="end">Derecha</option>
          </select>
        </div>

        <div>
          <span className="text-sm font-medium">Padding</span>
          <select
            className="w-full p-2 border rounded-md"
            value={content.padding}
            onChange={(e) =>
              onUpdate?.({ ...content, padding: e.target.value })
            }
          >
            <option value="p-2">Pequeño</option>
            <option value="p-4">Medio</option>
            <option value="p-8">Grande</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={content.rounded}
            onChange={(e) =>
              onUpdate?.({ ...content, rounded: e.target.checked })
            }
            className="rounded border-gray-300"
          />
          <span className="text-sm font-medium">Bordes Redondeados</span>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={content.shadow}
            onChange={(e) =>
              onUpdate?.({ ...content, shadow: e.target.checked })
            }
            className="rounded border-gray-300"
          />
          <span className="text-sm font-medium">Sombra</span>
        </div>
      </div>
    </Card>
  );
};
