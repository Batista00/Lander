import React from 'react';
import { cn } from '@/lib/utils';

export interface CTAProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonLink?: string;
  variant?: 'default' | 'centered' | 'split';
  background?: 'light' | 'dark' | 'primary';
  className?: string;
  onEdit?: (field: string, value: string) => void;
}

export function CTA({
  title,
  description,
  buttonText,
  buttonLink = '#',
  variant = 'default',
  background = 'light',
  className,
  onEdit
}: CTAProps) {
  const bgClasses = {
    light: 'bg-background',
    dark: 'bg-secondary text-secondary-foreground',
    primary: 'bg-primary text-primary-foreground'
  };

  return (
    <div className={cn(
      'py-16',
      bgClasses[background],
      className
    )}>
      <div className={cn(
        'container mx-auto px-4',
        variant === 'centered' && 'text-center',
        variant === 'split' && 'md:flex md:items-center md:justify-between md:gap-8'
      )}>
        <div className={cn(
          variant === 'split' ? 'md:w-2/3' : 'max-w-2xl mx-auto'
        )}>
          <h2 
            className={cn(
              'text-3xl md:text-4xl font-bold mb-4',
              variant === 'centered' && 'mx-auto'
            )}
            contentEditable={!!onEdit}
            onBlur={(e) => onEdit?.('title', e.currentTarget.textContent || '')}
            suppressContentEditableWarning
          >
            {title}
          </h2>
          
          {description && (
            <p 
              className={cn(
                'text-lg mb-8',
                background === 'light' && 'text-muted-foreground'
              )}
              contentEditable={!!onEdit}
              onBlur={(e) => onEdit?.('description', e.currentTarget.textContent || '')}
              suppressContentEditableWarning
            >
              {description}
            </p>
          )}
        </div>
        
        <div className={cn(
          variant === 'split' ? 'md:w-1/3 md:text-right' : 
          variant === 'centered' ? 'text-center' : ''
        )}>
          <a
            href={buttonLink}
            className={cn(
              'inline-block px-8 py-3 rounded-lg text-lg font-medium transition-colors',
              background === 'primary' 
                ? 'bg-background text-foreground hover:bg-background/90' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            )}
            contentEditable={!!onEdit}
            onBlur={(e) => onEdit?.('buttonText', e.currentTarget.textContent || '')}
            suppressContentEditableWarning
          >
            {buttonText}
          </a>
        </div>
      </div>
    </div>
  );
}
