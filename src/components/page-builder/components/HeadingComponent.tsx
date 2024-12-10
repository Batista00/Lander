import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface HeadingComponentProps {
  content: {
    title: string;
    subtitle?: string;
    description?: string;
    backgroundColor: string;
    textColor: string;
    alignment: string;
    padding: string;
  };
  isPreview?: boolean;
  onUpdate?: (content: any) => void;
}

export const HeadingComponent: React.FC<HeadingComponentProps> = ({
  content,
  isPreview = false,
  onUpdate,
}) => {
  if (isPreview) {
    return (
      <div
        className={`${content.backgroundColor} ${content.padding} ${content.textColor}`}
        style={{ textAlign: content.alignment as any }}
      >
        <h1 className="text-4xl font-bold mb-4">{content.title}</h1>
        {content.subtitle && (
          <h2 className="text-2xl mb-2">{content.subtitle}</h2>
        )}
        {content.description && (
          <p className="text-lg">{content.description}</p>
        )}
      </div>
    );
  }

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <span className="text-sm font-medium">Título</span>
          <Input
            value={content.title}
            onChange={(e) =>
              onUpdate?.({ ...content, title: e.target.value })
            }
          />
        </div>

        <div>
          <span className="text-sm font-medium">Subtítulo</span>
          <Input
            value={content.subtitle}
            onChange={(e) =>
              onUpdate?.({ ...content, subtitle: e.target.value })
            }
          />
        </div>

        <div>
          <span className="text-sm font-medium">Descripción</span>
          <Textarea
            value={content.description}
            onChange={(e) =>
              onUpdate?.({ ...content, description: e.target.value })
            }
          />
        </div>

        <div>
          <span className="text-sm font-medium">Color de Fondo</span>
          <select
            className="w-full p-2 border rounded-md"
            value={content.backgroundColor}
            onChange={(e) =>
              onUpdate?.({ ...content, backgroundColor: e.target.value })
            }
          >
            <option value="bg-white">Blanco</option>
            <option value="bg-gray-100">Gris Claro</option>
            <option value="bg-gray-900">Negro</option>
            <option value="bg-blue-500">Azul</option>
            <option value="bg-red-500">Rojo</option>
          </select>
        </div>

        <div>
          <span className="text-sm font-medium">Color de Texto</span>
          <select
            className="w-full p-2 border rounded-md"
            value={content.textColor}
            onChange={(e) =>
              onUpdate?.({ ...content, textColor: e.target.value })
            }
          >
            <option value="text-black">Negro</option>
            <option value="text-white">Blanco</option>
            <option value="text-gray-600">Gris</option>
            <option value="text-blue-600">Azul</option>
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
            <option value="left">Izquierda</option>
            <option value="center">Centro</option>
            <option value="right">Derecha</option>
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
            <option value="p-12">Extra Grande</option>
          </select>
        </div>
      </div>
    </Card>
  );
};
