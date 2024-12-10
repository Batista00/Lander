import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { HeroProps } from '../interfaces/ComponentInterfaces';

export const Hero: React.FC<HeroProps> = ({
  data = {
    title: 'Título Principal',
    subtitle: 'Subtítulo',
    description: 'Descripción de tu hero section',
    buttonText: 'Empezar',
    buttonLink: '#',
    backgroundImage: '/images/default-hero.jpg',
    buttonStyle: 'primary',
    overlayColor: 'rgba(0, 0, 0, 0.5)',
    overlayOpacity: 0.5,
    height: 'h-screen',
    layout: 'center',
    backgroundColor: 'bg-gray-900',
    textColor: 'text-white'
  },
  isEditing = false,
  onEdit
}) => {
  // Manejar las actualizaciones de manera más robusta
  const handleEdit = React.useCallback((field: string, value: any) => {
    if (onEdit) {
      console.log('Hero - Actualizando campo:', field, 'con valor:', value);
      // Actualizar el componente con los nuevos datos
      onEdit(field, {
        ...data,
        [field]: value
      });
    }
  }, [onEdit, data]);

  // Asegurarnos de que siempre tenemos valores válidos
  const content = React.useMemo(() => ({
    title: data?.title || 'Título Principal',
    subtitle: data?.subtitle || 'Subtítulo',
    description: data?.description || 'Descripción de tu hero section',
    buttonText: data?.buttonText || 'Empezar',
    buttonLink: data?.buttonLink || '#',
    backgroundImage: data?.backgroundImage || '/images/default-hero.jpg',
    buttonStyle: data?.buttonStyle || 'primary',
    overlayColor: data?.overlayColor || 'rgba(0, 0, 0, 0.5)',
    overlayOpacity: data?.overlayOpacity ?? 0.5,
    height: data?.height || 'h-screen',
    layout: data?.layout || 'center',
    backgroundColor: data?.backgroundColor || 'bg-gray-900',
    textColor: data?.textColor || 'text-white'
  }), [data]);

  const {
    title,
    subtitle,
    description,
    buttonText,
    buttonLink,
    backgroundImage,
    buttonStyle,
    overlayColor,
    overlayOpacity,
    height,
    layout,
    backgroundColor,
    textColor
  } = content;

  const containerStyles = cn(
    'relative w-full flex items-center justify-center',
    height,
    backgroundColor,
    {
      'text-left': layout === 'left',
      'text-center': layout === 'center',
      'text-right': layout === 'right'
    }
  );

  const contentStyles = cn(
    'relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
    {
      'text-left': layout === 'left',
      'text-center': layout === 'center',
      'text-right': layout === 'right'
    }
  );

  const titleStyles = cn(
    'font-bold tracking-tight',
    textColor,
    {
      'text-4xl md:text-5xl lg:text-6xl': true,
      'max-w-3xl mx-auto': layout === 'center'
    }
  );

  const descriptionStyles = cn(
    'mt-6 text-lg md:text-xl',
    {
      'text-gray-300': textColor === 'text-white',
      'text-gray-600': textColor !== 'text-white',
      'max-w-2xl mx-auto': layout === 'center'
    }
  );

  const buttonStyles = cn(
    'mt-8 px-8 py-3 rounded-full text-lg font-medium transition-all duration-200',
    {
      'bg-blue-600 text-white hover:bg-blue-700': buttonStyle === 'primary',
      'bg-white text-blue-600 hover:bg-gray-100': buttonStyle === 'secondary',
      'border-2 border-current hover:bg-white/10': buttonStyle === 'outline'
    }
  );

  return (
    <section className={containerStyles}>
      {/* Fondo con imagen y overlay */}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: overlayColor,
              opacity: overlayOpacity
            }}
          />
        </>
      )}

      {/* Contenido */}
      <div className={contentStyles}>
        <div className="relative">
          {isEditing ? (
            <input
              type="text"
              value={content.title}
              onChange={(e) => handleEdit('title', e.target.value)}
              className="w-full bg-transparent border-none focus:ring-2 focus:ring-blue-500"
              onBlur={() => console.log('Hero - Campo actualizado:', 'title')}
            />
          ) : (
            <h1 className={titleStyles}>{content.title}</h1>
          )}

          {subtitle && (
            <div className="mt-4">
              {isEditing ? (
                <input
                  type="text"
                  value={content.subtitle}
                  onChange={(e) => handleEdit('subtitle', e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <p className="text-xl md:text-2xl font-medium text-gray-300">
                  {content.subtitle}
                </p>
              )}
            </div>
          )}

          {description && (
            <div className={descriptionStyles}>
              {isEditing ? (
                <textarea
                  value={content.description}
                  onChange={(e) => handleEdit('description', e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              ) : (
                <p>{content.description}</p>
              )}
            </div>
          )}

          {buttonText && (
            <div className="mt-8">
              {isEditing ? (
                <div className="flex gap-4 items-center">
                  <input
                    type="text"
                    value={content.buttonText}
                    onChange={(e) => handleEdit('buttonText', e.target.value)}
                    className="bg-transparent border-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={content.buttonLink}
                    onChange={(e) => handleEdit('buttonLink', e.target.value)}
                    className="bg-transparent border-none focus:ring-2 focus:ring-blue-500"
                    placeholder="URL del botón"
                  />
                </div>
              ) : (
                <a href={content.buttonLink}>
                  <Button className={buttonStyles}>
                    {content.buttonText}
                  </Button>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
