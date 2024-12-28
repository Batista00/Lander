import React from 'react';
import { cn } from '@/lib/utils';
import { Component } from '@/types/landing';
import { ComponentEditorProps } from '@/types/components';
import { featuresVariants } from './variants/features-variants';
import { motion } from 'framer-motion';
import * as Icons from '@/components/ui/icons';

interface Feature {
  icon?: string;
  title: string;
  description: string;
}

interface FeaturesProps extends ComponentEditorProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
  onChange?: (component: Component) => void;
}

export const Features: React.FC<FeaturesProps> = ({
  component,
  onChange,
  mode = 'preview'
}) => {
  const variant = component.content?.variant || 'grid';
  const variantConfig = featuresVariants[variant];

  const {
    title = variantConfig?.defaultContent?.title || '',
    subtitle = variantConfig?.defaultContent?.subtitle || '',
    features = variantConfig?.defaultContent?.features || []
  } = component.content || {};

  const styles = variantConfig?.styles || {};
  const colors = styles.colors || {};
  const typography = styles.typography || {};
  const spacing = styles.spacing || {};
  const layout = styles.layout || {};
  const effects = styles.effects || {};

  const containerClasses = cn(
    'relative w-full',
    spacing.padding || 'py-16',
    colors.background || 'bg-white'
  );

  const contentClasses = cn(
    'container mx-auto px-4',
    layout.alignment === 'center' ? 'text-center' : '',
    layout.alignment === 'left' ? 'text-left' : '',
    layout.alignment === 'right' ? 'text-right' : ''
  );

  const titleClasses = cn(
    typography.titleSize || 'text-4xl',
    'font-bold tracking-tight',
    colors.text || 'text-gray-900'
  );

  const subtitleClasses = cn(
    typography.subtitleSize || 'text-xl',
    'mt-4',
    colors.text || 'text-gray-600'
  );

  const featureContainerClasses = cn(
    'grid gap-8',
    layout.columns === 2 ? 'grid-cols-1 md:grid-cols-2' : '',
    layout.columns === 3 ? 'grid-cols-1 md:grid-cols-3' : '',
    layout.columns === 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : '',
    spacing.gap || 'gap-8'
  );

  const featureTitleClasses = cn(
    typography.featureTitleSize || 'text-xl',
    'font-semibold',
    colors.text || 'text-gray-900'
  );

  const featureDescriptionClasses = cn(
    typography.featureDescriptionSize || 'text-base',
    colors.text || 'text-gray-600'
  );

  const featureIconClasses = cn(
    'w-12 h-12 p-3 rounded-lg mb-4',
    colors.iconBackground || 'bg-gray-100',
    effects.cardRadius || 'rounded-lg',
    effects.transition || 'transition-all duration-300'
  );

  const isEditing = mode === 'edit';

  const handleChange = (field: string, value: any) => {
    if (!onChange) return;
    
    onChange({
      ...component,
      content: {
        ...component.content,
        [field]: value
      }
    });
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = Icons[iconName as keyof typeof Icons];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
  };

  const renderFeature = (feature: Feature, index: number) => {
    const FeatureWrapper = motion.div;
    
    switch (variant) {
      case 'cards':
        return (
          <FeatureWrapper
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              'p-6',
              effects.cardShadow || 'shadow-sm',
              effects.cardRadius || 'rounded-lg',
              effects.transition || 'transition-all duration-300',
              'hover:shadow-md'
            )}
          >
            {feature.icon && (
              <div className={featureIconClasses}>
                {React.createElement(
                  Icons[feature.icon as keyof typeof Icons] || Icons.Star,
                  {
                    className: cn('w-6 h-6', colors.accent || 'text-blue-600')
                  }
                )}
              </div>
            )}
            <h3 className={featureTitleClasses}>{feature.title}</h3>
            <p className={featureDescriptionClasses}>{feature.description}</p>
          </FeatureWrapper>
        );

      case 'list':
        return (
          <FeatureWrapper
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              'flex items-start',
              spacing.gap || 'gap-8'
            )}
          >
            {feature.icon && (
              <div className={featureIconClasses}>
                {React.createElement(
                  Icons[feature.icon as keyof typeof Icons] || Icons.Star,
                  {
                    className: cn('w-6 h-6', colors.accent || 'text-blue-600')
                  }
                )}
              </div>
            )}
            <div>
              <h3 className={featureTitleClasses}>{feature.title}</h3>
              <p className={featureDescriptionClasses}>{feature.description}</p>
            </div>
          </FeatureWrapper>
        );

      default: // grid
        return (
          <FeatureWrapper
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
              'text-center',
              spacing.gap || 'gap-8'
            )}
          >
            {feature.icon && (
              <div className={featureIconClasses}>
                {React.createElement(
                  Icons[feature.icon as keyof typeof Icons] || Icons.Star,
                  {
                    className: cn('w-6 h-6', colors.accent || 'text-blue-600')
                  }
                )}
              </div>
            )}
            <h3 className={featureTitleClasses}>{feature.title}</h3>
            <p className={featureDescriptionClasses}>{feature.description}</p>
          </FeatureWrapper>
        );
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={containerClasses}
    >
      <div className={contentClasses}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={cn(
                'w-full text-center bg-transparent border-none mb-4 focus:ring-2 focus:ring-blue-500',
                titleClasses
              )}
              placeholder="Título de características"
            />
          ) : (
            <h2 className={titleClasses}>{title}</h2>
          )}
          {isEditing ? (
            <input
              type="text"
              value={subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className={cn(
                'w-full text-center bg-transparent border-none mb-8 focus:ring-2 focus:ring-blue-500',
                subtitleClasses
              )}
              placeholder="Subtítulo de características"
            />
          ) : (
            <p className={subtitleClasses}>{subtitle}</p>
          )}

          <div className={featureContainerClasses}>
            {features.map((feature, index) => renderFeature(feature, index))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
