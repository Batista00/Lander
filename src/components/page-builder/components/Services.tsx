import React from 'react';
import { Component } from '@/types/landing';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ServicesProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
  onChange?: (component: Component) => void;
}

export const Services: React.FC<ServicesProps> = ({
  component,
  mode = 'preview',
  onChange,
}) => {
  const {
    title = 'Nuestros Servicios',
    subtitle = 'Lo que ofrecemos',
    description = 'Descubre nuestra gama completa de servicios profesionales',
    services = [],
    layout = 'grid',
    columns = 3
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

  const handleServiceChange = (index: number, field: string, value: string) => {
    if (!onChange || !services) return;

    const updatedServices = [...services];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value
    };

    onChange({
      ...component,
      content: {
        ...component.content,
        services: updatedServices
      }
    });
  };

  return (
    <div className="relative group py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {isEditing ? (
            <input
              type="text"
              value={subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="text-lg font-semibold text-primary mb-2 bg-transparent border-none focus:ring-2 focus:ring-primary text-center w-full"
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
              className="text-3xl font-bold mb-4 bg-transparent border-none focus:ring-2 focus:ring-primary text-center w-full"
            />
          ) : (
            <h2 className="text-3xl font-bold mb-4">
              {title}
            </h2>
          )}

          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="text-lg mb-8 bg-transparent border-none focus:ring-2 focus:ring-primary text-center w-full"
              rows={2}
            />
          ) : (
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className={cn(
          'grid gap-8',
          layout === 'grid' && columns === 3 && 'md:grid-cols-3',
          layout === 'grid' && columns === 2 && 'md:grid-cols-2',
          layout === 'grid' && columns === 4 && 'md:grid-cols-4'
        )}>
          {services.map((service, index) => (
            <div 
              key={index}
              className={cn(
                'p-6 rounded-lg shadow-lg bg-white transition-all duration-300 hover:shadow-xl',
                layout === 'list' && 'flex items-start gap-6'
              )}
            >
              {service.icon && (
                <div className={cn(
                  'text-primary mb-4',
                  layout === 'grid' && 'text-4xl text-center',
                  layout === 'list' && 'text-3xl flex-shrink-0'
                )}>
                  {service.icon}
                </div>
              )}

              <div className={layout === 'grid' ? 'text-center' : ''}>
                {isEditing ? (
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                    className="text-xl font-semibold mb-2 bg-transparent border-none focus:ring-2 focus:ring-primary w-full"
                  />
                ) : (
                  <h3 className="text-xl font-semibold mb-2">
                    {service.title}
                  </h3>
                )}

                {isEditing ? (
                  <textarea
                    value={service.description}
                    onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                    className="text-gray-600 mb-4 bg-transparent border-none focus:ring-2 focus:ring-primary w-full"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                )}

                {service.buttonText && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => service.buttonLink && window.open(service.buttonLink, '_blank')}
                  >
                    {service.buttonText}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
