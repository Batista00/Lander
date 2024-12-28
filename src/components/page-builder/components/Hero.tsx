import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Component } from '@/types/landing';
import { ComponentEditorProps } from '@/types/components';
import { useTheme } from '@/themes/ThemeContext';
import { PexelsImagePicker } from '@/components/shared/PexelsImagePicker';
import { heroVariants } from './variants/hero-variants';
import { motion } from 'framer-motion';

interface HeroProps extends ComponentEditorProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
  onChange?: (component: Component) => void;
  isPremium?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  component,
  onChange,
  mode = 'preview',
  isPremium = false
}) => {
  const { currentTheme } = useTheme();
  const variant = component.content?.variant || 'modern';
  const variantConfig = heroVariants[variant];

  const {
    title = variantConfig?.defaultContent?.title || '',
    subtitle = variantConfig?.defaultContent?.subtitle || '',
    description = variantConfig?.defaultContent?.description || '',
    buttonText = variantConfig?.defaultContent?.buttonText || '',
    buttonStyle = variantConfig?.defaultContent?.buttonStyle || 'primary',
    backgroundImage = variantConfig?.defaultContent?.backgroundImage || ''
  } = component.content || {};

  const styles = variantConfig?.styles || {};
  const colors = styles.colors || {};
  const typography = styles.typography || {};
  const spacing = styles.spacing || {};
  const layout = styles.layout || {};

  const containerClasses = cn(
    'relative min-h-[500px] flex items-center',
    spacing.padding || 'py-24',
    spacing.gap || 'space-y-6'
  );

  const contentClasses = cn(
    'container mx-auto px-4 relative z-10',
    layout.alignment === 'center' ? 'text-center' : '',
    layout.alignment === 'left' ? 'text-left' : '',
    layout.alignment === 'right' ? 'text-right' : ''
  );

  const titleClasses = cn(
    typography.titleSize || 'text-5xl',
    'font-bold tracking-tight',
    colors.text || 'text-white'
  );

  const subtitleClasses = cn(
    typography.subtitleSize || 'text-3xl',
    'font-semibold',
    colors.text || 'text-white'
  );

  const descriptionClasses = cn(
    typography.descriptionSize || 'text-xl',
    'max-w-3xl mx-auto',
    colors.text || 'text-white'
  );

  const buttonClasses = cn(
    'px-6 py-3 rounded-lg font-medium transition-colors duration-200',
    buttonStyle === 'primary' ? `bg-${colors.accent || 'blue-600'} text-white hover:bg-opacity-90` : '',
    buttonStyle === 'secondary' ? `bg-${colors.text || 'white'} text-${colors.accent || 'blue-600'} hover:bg-opacity-90` : '',
    buttonStyle === 'outline' ? `border-2 border-${colors.text || 'white'} text-${colors.text || 'white'} hover:bg-white hover:bg-opacity-10` : ''
  );

  const overlayClasses = cn(
    'absolute inset-0',
    colors.background || 'bg-black bg-opacity-50'
  );

  const handleImageSelect = (imageUrl: string) => {
    if (onChange) {
      onChange({
        ...component,
        content: {
          ...component.content,
          backgroundImage: imageUrl
        }
      });
    }
  };

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

  const isEditing = mode === 'edit';

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            staggerChildren: 0.2
          }
        }
      }}
      className={containerClasses}
      style={{
        backgroundColor: styles.colors.background || currentTheme.colors.background,
        color: styles.colors.text || currentTheme.colors.text
      }}
    >
      {isEditing && (
        <div className="absolute inset-x-0 -top-12 flex justify-center">
          <PexelsImagePicker
            onSelect={handleImageSelect}
            buttonText="Cambiar imagen de fondo"
            currentImage={backgroundImage}
            category={component.category}
          />
        </div>
      )}

      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0 transition-opacity duration-500"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}

      <div className={contentClasses}>
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="max-w-3xl"
        >
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={cn(
                'w-full bg-transparent border-none mb-4 focus:ring-2 focus:ring-blue-500',
                titleClasses
              )}
              placeholder="Título Principal"
            />
          ) : (
            <motion.h1 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className={titleClasses}
            >
              {title}
            </motion.h1>
          )}

          {isEditing ? (
            <input
              type="text"
              value={subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className={cn(
                'w-full bg-transparent border-none mb-4 focus:ring-2 focus:ring-blue-500',
                subtitleClasses
              )}
              placeholder="Subtítulo"
            />
          ) : (
            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className={subtitleClasses}
            >
              {subtitle}
            </motion.h2>
          )}

          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => handleChange('description', e.target.value)}
              className={cn(
                'w-full bg-transparent border-none mb-8 focus:ring-2 focus:ring-blue-500',
                descriptionClasses
              )}
              rows={3}
              placeholder="Descripción"
            />
          ) : (
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className={descriptionClasses}
            >
              {description}
            </motion.p>
          )}

          {buttonText && (
            <motion.div variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}>
              <Button
                variant={buttonStyle}
                onClick={() => buttonLink && window.open(buttonLink, '_blank')}
                className={cn(
                  'transition-all duration-300 hover:scale-105',
                  isPremium && 'premium-button',
                  buttonClasses
                )}
                style={{
                  backgroundColor: styles.colors.accent || currentTheme.colors.primary
                }}
              >
                {buttonText}
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
