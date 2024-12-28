import React from 'react';
import { Icon } from 'lucide-react';

interface Feature {
  icon?: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  content: {
    title?: string;
    subtitle?: string;
    features?: Feature[];
    layout?: 'grid' | 'list';
    columns?: 2 | 3 | 4;
    backgroundColor?: string;
    textColor?: string;
    iconColor?: string;
    spacing?: 'normal' | 'compact' | 'wide';
  };
}

export const Features: React.FC<FeaturesProps> = ({ content }) => {
  const {
    title = 'Nuestras Características',
    subtitle = 'Descubre lo que nos hace únicos',
    features = [
      {
        icon: 'Zap',
        title: 'Rápido y Eficiente',
        description: 'Optimizado para un rendimiento excepcional'
      },
      {
        icon: 'Shield',
        title: 'Seguro',
        description: 'Protección de datos de primer nivel'
      },
      {
        icon: 'Smartphone',
        title: 'Responsive',
        description: 'Se adapta a cualquier dispositivo'
      }
    ],
    layout = 'grid',
    columns = 3,
    backgroundColor = 'bg-white',
    textColor = 'text-gray-900',
    iconColor = 'text-blue-600',
    spacing = 'normal'
  } = content || {};

  const getSpacingClass = () => {
    switch (spacing) {
      case 'compact':
        return 'py-8 gap-4';
      case 'wide':
        return 'py-24 gap-12';
      default:
        return 'py-16 gap-8';
    }
  };

  const getGridClass = () => {
    switch (columns) {
      case 2:
        return 'md:grid-cols-2';
      case 4:
        return 'md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'md:grid-cols-3';
    }
  };

  return (
    <section className={`${backgroundColor} ${textColor} ${getSpacingClass()}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        <div className={`${layout === 'grid' ? 'grid' : 'space-y-8'} ${getGridClass()}`}>
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`${
                layout === 'grid' 
                  ? 'p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow' 
                  : 'flex items-start gap-4'
              }`}
            >
              {feature.icon && (
                <div className={`${iconColor} ${layout === 'grid' ? 'mb-4' : 'flex-shrink-0'}`}>
                  <Icon name={feature.icon} size={24} />
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="opacity-80">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
