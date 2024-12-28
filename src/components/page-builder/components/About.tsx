import React from 'react';
import { Component } from '@/types/landing';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AboutProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
  onChange?: (component: Component) => void;
}

export const About: React.FC<AboutProps> = ({
  component,
  mode = 'preview',
  onChange,
}) => {
  const {
    title = 'Sobre Nosotros',
    subtitle = 'Nuestra Historia',
    description = 'Descubre nuestra historia y valores',
    image = '',
    values = [],
    buttonText = 'Conoce más',
    buttonLink = '#',
    layout = 'left'
  } = component.content;

  const isEditing = mode === 'edit';

  const handleChange = (field: string, value: string) => {
    if (!onChange) return;
    
    onChange({
      ...component,
      content: {
        ...component.content,
        [field]: value
      }
    });
  };

  return (
    <div className="relative group py-16">
      <div className="container mx-auto px-4">
        <div className={cn(
          'grid gap-12',
          layout === 'left' ? 'md:grid-cols-[1fr_1.5fr]' : 'md:grid-cols-[1.5fr_1fr]',
          layout === 'left' ? '' : 'md:grid-flow-dense'
        )}>
          <div className={cn(
            'flex flex-col justify-center',
            layout === 'left' ? 'md:pr-12' : 'md:pl-12'
          )}>
            {isEditing ? (
              <input
                type="text"
                value={subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg font-semibold text-primary mb-2 bg-transparent border-none focus:ring-2 focus:ring-primary"
              />
            ) : (
              <h3 className="text-lg font-semibold text-primary mb-2">
                {subtitle}
              </h3>
            )}

            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-3xl font-bold mb-6 bg-transparent border-none focus:ring-2 focus:ring-primary"
              />
            ) : (
              <h2 className="text-3xl font-bold mb-6">
                {title}
              </h2>
            )}

            {isEditing ? (
              <textarea
                value={description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="text-lg mb-8 bg-transparent border-none focus:ring-2 focus:ring-primary"
                rows={4}
              />
            ) : (
              <p className="text-lg mb-8">
                {description}
              </p>
            )}

            {values.length > 0 && (
              <div className="grid grid-cols-2 gap-6 mb-8">
                {values.map((value: { title: string; description: string }, index: number) => (
                  <div key={index} className="flex items-start">
                    {value.icon && (
                      <div className="text-primary text-2xl mr-4">
                        {value.icon}
                      </div>
                    )}
                    <div>
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            value={value.title}
                            onChange={(e) => {
                              const newValues = [...values];
                              newValues[index] = { ...value, title: e.target.value };
                              handleChange('values', JSON.stringify(newValues));
                            }}
                            className="font-semibold mb-1 bg-transparent border-none focus:ring-2 focus:ring-primary"
                          />
                          <textarea
                            value={value.description}
                            onChange={(e) => {
                              const newValues = [...values];
                              newValues[index] = { ...value, description: e.target.value };
                              handleChange('values', JSON.stringify(newValues));
                            }}
                            className="text-sm bg-transparent border-none focus:ring-2 focus:ring-primary"
                            rows={2}
                          />
                        </>
                      ) : (
                        <>
                          <h4 className="font-semibold mb-1">{value.title}</h4>
                          <p className="text-sm">{value.description}</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {buttonText && (
              <Button
                variant="default"
                onClick={() => buttonLink && window.open(buttonLink, '_blank')}
              >
                {buttonText}
              </Button>
            )}
          </div>

          <div className="relative">
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            ) : (
              <div className="w-full h-full min-h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Imagen no disponible</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
