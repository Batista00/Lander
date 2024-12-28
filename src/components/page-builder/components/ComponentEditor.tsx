import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { Component, ComponentType } from '@/types/landing';

interface ComponentEditorProps {
  component: Component;
  onChange: (changes: Partial<Component>) => void;
}

export function ComponentEditor({ 
  component, 
  onChange 
}: ComponentEditorProps) {
  const handleContentChange = (changes: Partial<typeof component.content>) => {
    onChange({
      content: {
        ...component.content,
        ...changes
      }
    });
  };

  const renderFields = () => {
    switch (component.type) {
      case ComponentType.Hero:
        return (
          <div className="space-y-4">
            <div>
              <Label>Título</Label>
              <Input
                value={component.content.title}
                onChange={(e) => handleContentChange({ title: e.target.value })}
              />
            </div>
            <div>
              <Label>Subtítulo</Label>
              <Input
                value={component.content.subtitle}
                onChange={(e) => handleContentChange({ subtitle: e.target.value })}
              />
            </div>
            <div>
              <Label>Descripción</Label>
              <Textarea
                value={component.content.description}
                onChange={(e) => handleContentChange({ description: e.target.value })}
              />
            </div>
            <div>
              <Label>Texto del CTA</Label>
              <Input
                value={component.content.cta?.text}
                onChange={(e) => handleContentChange({ 
                  cta: { 
                    ...component.content.cta,
                    text: e.target.value 
                  }
                })}
              />
            </div>
            <div>
              <Label>URL del CTA</Label>
              <Input
                value={component.content.cta?.url}
                onChange={(e) => handleContentChange({ 
                  cta: { 
                    ...component.content.cta,
                    url: e.target.value 
                  }
                })}
              />
            </div>
          </div>
        );

      case ComponentType.Features:
        return (
          <div className="space-y-4">
            <div>
              <Label>Título de la Sección</Label>
              <Input
                value={component.content.title}
                onChange={(e) => handleContentChange({ title: e.target.value })}
              />
            </div>
            <div>
              <Label>Características</Label>
              {component.content.features?.map((feature: any, index: number) => (
                <div key={index} className="mt-4 p-4 border rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Característica {index + 1}</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const newFeatures = component.content.features.filter((_, i) => i !== index);
                        handleContentChange({ features: newFeatures });
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    value={feature.title}
                    onChange={(e) => {
                      const newFeatures = [...component.content.features];
                      newFeatures[index] = {
                        ...feature,
                        title: e.target.value
                      };
                      handleContentChange({ features: newFeatures });
                    }}
                    placeholder="Título de la característica"
                    className="mt-2"
                  />
                  <Textarea
                    value={feature.description}
                    onChange={(e) => {
                      const newFeatures = [...component.content.features];
                      newFeatures[index] = {
                        ...feature,
                        description: e.target.value
                      };
                      handleContentChange({ features: newFeatures });
                    }}
                    placeholder="Descripción de la característica"
                    className="mt-2"
                  />
                </div>
              ))}
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => {
                  const newFeatures = [
                    ...(component.content.features || []),
                    { title: '', description: '' }
                  ];
                  handleContentChange({ features: newFeatures });
                }}
              >
                Agregar Característica
              </Button>
            </div>
          </div>
        );

      case ComponentType.Text:
        return (
          <div className="space-y-4">
            <div>
              <Label>Contenido</Label>
              <Textarea
                value={component.content.text}
                onChange={(e) => handleContentChange({ text: e.target.value })}
                rows={6}
              />
            </div>
          </div>
        );

      case ComponentType.Image:
        return (
          <div className="space-y-4">
            <div>
              <Label>URL de la Imagen</Label>
              <Input
                value={component.content.url}
                onChange={(e) => handleContentChange({ url: e.target.value })}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
            <div>
              <Label>Texto Alternativo</Label>
              <Input
                value={component.content.alt}
                onChange={(e) => handleContentChange({ alt: e.target.value })}
                placeholder="Descripción de la imagen"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 bg-yellow-50 text-yellow-800 rounded">
            Editor no disponible para el tipo: {component.type}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h4 className="font-medium text-lg">
          {component.type.charAt(0).toUpperCase() + component.type.slice(1)}
        </h4>
        <p className="text-sm text-gray-500">
          Edita las propiedades del componente
        </p>
      </div>
      {renderFields()}
    </div>
  );
}
