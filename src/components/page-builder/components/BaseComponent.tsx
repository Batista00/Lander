import React from 'react';
import { Component, ComponentStyles } from '@/types/landing';
import { cn } from '@/lib/utils';

interface BaseComponentProps {
  component: Component;
  mode?: 'edit' | 'preview' | 'published';
  className?: string;
  children?: React.ReactNode;
}

const applyStyles = (styles?: ComponentStyles) => {
  if (!styles) return '';

  const classes = [];

  // Layout
  if (styles.layout) {
    classes.push({
      'flex flex-col items-start': styles.layout === 'left',
      'flex flex-col items-end': styles.layout === 'right',
      'flex flex-col items-center text-center': styles.layout === 'center',
    });
  }

  // Colors
  if (styles.colors) {
    if (styles.colors.text) classes.push(`text-[${styles.colors.text}]`);
    if (styles.colors.background) classes.push(`bg-[${styles.colors.background}]`);
  }

  // Spacing
  if (styles.spacing) {
    if (styles.spacing.padding) classes.push(`p-[${styles.spacing.padding}]`);
    if (styles.spacing.margin) classes.push(`m-[${styles.spacing.margin}]`);
  }

  // Typography
  if (styles.typography) {
    if (styles.typography.titleSize) classes.push(`text-[${styles.typography.titleSize}]`);
  }

  return cn(...classes);
};

export const BaseComponent: React.FC<BaseComponentProps> = ({
  component,
  mode = 'preview',
  className,
  children
}) => {
  const { content, styles, settings } = component;

  if (settings?.isVisible === false) return null;

  return (
    <div
      className={cn(
        'w-full relative',
        applyStyles(styles),
        settings?.animation,
        settings?.customClass,
        className
      )}
    >
      <div className="container mx-auto px-4 py-12">
        {content.title && (
          <h2 className={cn(
            'text-4xl font-bold mb-4',
            styles?.typography?.titleSize && `text-[${styles.typography.titleSize}]`
          )}>
            {content.title}
          </h2>
        )}
        
        {content.subtitle && (
          <h3 className={cn(
            'text-xl text-muted-foreground mb-6',
            styles?.typography?.subtitleSize && `text-[${styles.typography.subtitleSize}]`
          )}>
            {content.subtitle}
          </h3>
        )}
        
        {content.description && (
          <p className={cn(
            'text-muted-foreground mb-8',
            styles?.typography?.textSize && `text-[${styles.typography.textSize}]`
          )}>
            {content.description}
          </p>
        )}

        {children}

        {content.buttons && content.buttons.length > 0 && (
          <div className="flex gap-4 mt-8">
            {content.buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => {
                  if (button.url) window.open(button.url, '_blank');
                  // Aquí puedes manejar otras acciones personalizadas
                }}
                className={cn(
                  'px-6 py-2 rounded-md',
                  button.variant === 'outline' ? 'border border-primary text-primary hover:bg-primary/10' :
                  button.variant === 'ghost' ? 'text-primary hover:bg-primary/10' :
                  'bg-primary text-primary-foreground hover:bg-primary/90'
                )}
              >
                {button.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
