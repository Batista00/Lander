import React from 'react';
import { cn } from '@/lib/utils';

interface Feature {
  id: string;
  icon?: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  data: {
    title: string;
    subtitle: string;
    features: Feature[];
    columns?: 2 | 3 | 4;
    style?: 'minimal' | 'cards' | 'modern';
    backgroundColor?: string;
  };
  isEditing?: boolean;
  onEdit?: (field: string, value: any) => void;
}

export const Features: React.FC<FeaturesProps> = ({ data, isEditing, onEdit }) => {
  const {
    title = 'Características Principales',
    subtitle = 'Descubre todo lo que podemos hacer por ti',
    features = [],
    columns = 3,
    style = 'modern',
    backgroundColor = 'bg-white'
  } = data;

  const containerStyles = cn(
    'py-24',
    backgroundColor,
    {
      'bg-gray-50': style === 'minimal',
      'bg-white': style === 'cards',
      'bg-gradient-to-b from-gray-50 to-white': style === 'modern'
    }
  );

  const featureStyles = cn(
    'p-6 rounded-xl',
    {
      'bg-white shadow-lg hover:shadow-xl transition-shadow': style === 'cards',
      'bg-transparent': style === 'minimal',
      'bg-white/50 backdrop-blur-sm border border-gray-200 hover:border-blue-500 transition-colors':
        style === 'modern'
    }
  );

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  };

  const handleEdit = (field: string, value: any) => {
    if (isEditing && onEdit) {
      onEdit(field, value);
    }
  };

  const handleFeatureEdit = (featureId: string, field: string, value: string) => {
    if (isEditing && onEdit) {
      const updatedFeatures = features.map(feature =>
        feature.id === featureId ? { ...feature, [field]: value } : feature
      );
      handleEdit('features', updatedFeatures);
    }
  };

  return (
    <section className={containerStyles}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => handleEdit('title', e.target.value)}
              className="text-4xl font-bold mb-6 w-full text-center bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            />
          ) : (
            <h2 className="text-4xl font-bold mb-6">{title}</h2>
          )}

          {isEditing ? (
            <textarea
              value={subtitle}
              onChange={(e) => handleEdit('subtitle', e.target.value)}
              className="text-xl text-gray-600 w-full text-center bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            />
          ) : (
            <p className="text-xl text-gray-600">{subtitle}</p>
          )}
        </div>

        <div className={cn('grid gap-8', gridCols[columns])}>
          {features.map((feature) => (
            <div key={feature.id} className={featureStyles}>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) =>
                      handleFeatureEdit(feature.id, 'title', e.target.value)
                    }
                    className="text-xl font-semibold mb-4 w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  />
                  <textarea
                    value={feature.description}
                    onChange={(e) =>
                      handleFeatureEdit(feature.id, 'description', e.target.value)
                    }
                    className="text-gray-600 w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  />
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
