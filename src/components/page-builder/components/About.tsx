import React from 'react';
import { cn } from '@/lib/utils';
import { AboutProps } from '../interfaces/ComponentInterfaces';

export const About: React.FC<AboutProps> = ({
  content,
  isEditable = false,
  onEdit
}) => {
  const {
    title = 'Sobre Nosotros',
    description,
    image,
    imagePosition = 'right',
    statistics = [],
    features = [],
    backgroundColor = 'bg-white',
    textColor = 'text-gray-900'
  } = content;

  const containerStyles = cn(
    'py-24',
    backgroundColor
  );

  const contentStyles = cn(
    'flex flex-col lg:flex-row items-center gap-12',
    {
      'lg:flex-row-reverse': imagePosition === 'left'
    }
  );

  return (
    <section className={containerStyles}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={contentStyles}>
          {/* Contenido de texto */}
          <div className="flex-1 lg:max-w-xl">
            {isEditable ? (
              <input
                type="text"
                value={title}
                onChange={(e) => onEdit?.('title', e.target.value)}
                className={cn(
                  'w-full bg-transparent border-none focus:ring-2 focus:ring-blue-500 text-4xl font-bold mb-6',
                  textColor
                )}
              />
            ) : (
              <h2 className={cn('text-4xl font-bold mb-6', textColor)}>
                {title}
              </h2>
            )}

            {isEditable ? (
              <textarea
                value={description}
                onChange={(e) => onEdit?.('description', e.target.value)}
                className="w-full bg-transparent border-none focus:ring-2 focus:ring-blue-500 text-lg text-gray-600"
                rows={5}
              />
            ) : (
              <p className="text-lg text-gray-600 mb-8">{description}</p>
            )}

            {/* Características */}
            {features.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    {feature.icon && (
                      <div className="flex-shrink-0 w-6 h-6 text-blue-600">
                        {isEditable ? (
                          <input
                            type="text"
                            value={feature.icon}
                            onChange={(e) => {
                              const updatedFeatures = [...features];
                              updatedFeatures[index] = {
                                ...feature,
                                icon: e.target.value
                              };
                              onEdit?.('features', updatedFeatures);
                            }}
                            className="w-full bg-transparent border-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <img
                            src={feature.icon}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                    )}
                    {isEditable ? (
                      <input
                        type="text"
                        value={feature.text}
                        onChange={(e) => {
                          const updatedFeatures = [...features];
                          updatedFeatures[index] = {
                            ...feature,
                            text: e.target.value
                          };
                          onEdit?.('features', updatedFeatures);
                        }}
                        className="flex-1 bg-transparent border-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                      />
                    ) : (
                      <p className="text-gray-600">{feature.text}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Estadísticas */}
            {statistics.length > 0 && (
              <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8">
                {statistics.map((stat, index) => (
                  <div key={index} className="text-center">
                    {isEditable ? (
                      <>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const updatedStats = [...statistics];
                            updatedStats[index] = {
                              ...stat,
                              value: e.target.value
                            };
                            onEdit?.('statistics', updatedStats);
                          }}
                          className={cn(
                            'w-full bg-transparent border-none focus:ring-2 focus:ring-blue-500 text-3xl font-bold text-center',
                            textColor
                          )}
                        />
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const updatedStats = [...statistics];
                            updatedStats[index] = {
                              ...stat,
                              label: e.target.value
                            };
                            onEdit?.('statistics', updatedStats);
                          }}
                          className="w-full bg-transparent border-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-600 text-center mt-1"
                        />
                      </>
                    ) : (
                      <>
                        <div className={cn('text-3xl font-bold', textColor)}>
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {stat.label}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Imagen */}
          {image && (
            <div className="flex-1 w-full lg:max-w-xl">
              {isEditable ? (
                <input
                  type="text"
                  value={image}
                  onChange={(e) => onEdit?.('image', e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-2 focus:ring-blue-500"
                  placeholder="URL de la imagen"
                />
              ) : (
                <img
                  src={image}
                  alt="About Us"
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
