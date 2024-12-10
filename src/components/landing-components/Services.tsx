import React from 'react';
import { cn } from '@/lib/utils';

interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface ServicesProps {
  content: {
    title?: string;
    subtitle?: string;
    services?: Service[];
    layout?: 'grid' | 'list';
    columns?: 2 | 3 | 4;
    style?: {
      backgroundColor?: string;
      textColor?: string;
      cardBackgroundColor?: string;
      cardTextColor?: string;
    };
  };
  isEditing?: boolean;
  onEdit?: (field: string, value: any) => void;
}

export const Services: React.FC<ServicesProps> = ({ content, isEditing, onEdit }) => {
  const {
    title = 'Nuestros Servicios',
    subtitle = 'Descubre todo lo que podemos hacer por ti',
    services = [],
    layout = 'grid',
    columns = 3,
    style = {
      backgroundColor: 'bg-white',
      textColor: 'text-gray-900',
      cardBackgroundColor: 'bg-gray-50',
      cardTextColor: 'text-gray-700'
    }
  } = content || {};

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  };

  return (
    <section className={cn('py-24', style.backgroundColor)}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => onEdit?.('title', e.target.value)}
              className={cn(
                'text-4xl font-bold mb-6 w-full text-center bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded',
                style.textColor
              )}
            />
          ) : (
            <h2 className={cn('text-4xl font-bold mb-6', style.textColor)}>
              {title}
            </h2>
          )}

          {isEditing ? (
            <textarea
              value={subtitle}
              onChange={(e) => onEdit?.('subtitle', e.target.value)}
              className={cn(
                'text-xl w-full text-center bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded',
                style.textColor
              )}
            />
          ) : (
            <p className={cn('text-xl', style.textColor)}>{subtitle}</p>
          )}
        </div>

        <div className={cn(
          'grid gap-8',
          layout === 'grid' ? gridCols[columns] : 'grid-cols-1'
        )}>
          {services.map((service) => (
            <div
              key={service.id}
              className={cn(
                'p-6 rounded-xl transition-all duration-200',
                style.cardBackgroundColor,
                'hover:shadow-lg'
              )}
            >
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) =>
                      onEdit?.('services', services.map(s =>
                        s.id === service.id ? { ...s, title: e.target.value } : s
                      ))
                    }
                    className={cn(
                      'text-xl font-semibold mb-4 w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded',
                      style.cardTextColor
                    )}
                  />
                  <textarea
                    value={service.description}
                    onChange={(e) =>
                      onEdit?.('services', services.map(s =>
                        s.id === service.id ? { ...s, description: e.target.value } : s
                      ))
                    }
                    className={cn(
                      'w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded',
                      style.cardTextColor
                    )}
                  />
                </>
              ) : (
                <>
                  <h3 className={cn('text-xl font-semibold mb-4', style.cardTextColor)}>
                    {service.title}
                  </h3>
                  <p className={cn('', style.cardTextColor)}>
                    {service.description}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
