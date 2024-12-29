import React from 'react';
import { cn } from '@/lib/utils';

export interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  alignment?: 'left' | 'center' | 'right';
  className?: string;
  onEdit?: (field: string, value: string) => void;
}

export function Hero({
  title,
  subtitle,
  description,
  image,
  ctaText,
  ctaLink,
  alignment = 'center',
  className,
  onEdit
}: HeroProps) {
  return (
    <div className={cn(
      'relative min-h-[500px] flex items-center justify-center bg-background',
      `text-${alignment}`,
      className
    )}>
      {image && (
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className={cn(
          'max-w-4xl mx-auto',
          alignment === 'left' ? 'ml-0' : 
          alignment === 'right' ? 'mr-0' : 'mx-auto'
        )}>
          {subtitle && (
            <h2 
              className="text-lg md:text-xl mb-4 text-primary"
              contentEditable={!!onEdit}
              onBlur={(e) => onEdit?.('subtitle', e.currentTarget.textContent || '')}
              suppressContentEditableWarning
            >
              {subtitle}
            </h2>
          )}
          
          <h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            contentEditable={!!onEdit}
            onBlur={(e) => onEdit?.('title', e.currentTarget.textContent || '')}
            suppressContentEditableWarning
          >
            {title}
          </h1>
          
          {description && (
            <p 
              className="text-lg md:text-xl mb-8 text-muted-foreground"
              contentEditable={!!onEdit}
              onBlur={(e) => onEdit?.('description', e.currentTarget.textContent || '')}
              suppressContentEditableWarning
            >
              {description}
            </p>
          )}
          
          {ctaText && (
            <a
              href={ctaLink}
              className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors"
              contentEditable={!!onEdit}
              onBlur={(e) => onEdit?.('ctaText', e.currentTarget.textContent || '')}
              suppressContentEditableWarning
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
