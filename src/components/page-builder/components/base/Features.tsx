import React from 'react';
import { cn } from '@/lib/utils';

export interface Feature {
  id: string;
  icon?: string;
  title: string;
  description: string;
}

export interface FeaturesProps {
  title?: string;
  description?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  className?: string;
  onEdit?: (field: string, value: string) => void;
  onFeatureEdit?: (id: string, field: 'title' | 'description', value: string) => void;
}

export function Features({
  title,
  description,
  features,
  columns = 3,
  className,
  onEdit,
  onFeatureEdit
}: FeaturesProps) {
  return (
    <div className={cn('py-16 bg-background', className)}>
      <div className="container mx-auto px-4">
        {title && (
          <h2 
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            contentEditable={!!onEdit}
            onBlur={(e) => onEdit?.('title', e.currentTarget.textContent || '')}
            suppressContentEditableWarning
          >
            {title}
          </h2>
        )}
        
        {description && (
          <p 
            className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
            contentEditable={!!onEdit}
            onBlur={(e) => onEdit?.('description', e.currentTarget.textContent || '')}
            suppressContentEditableWarning
          >
            {description}
          </p>
        )}
        
        <div className={cn(
          'grid gap-8',
          columns === 2 ? 'md:grid-cols-2' :
          columns === 3 ? 'md:grid-cols-3' :
          'md:grid-cols-4'
        )}>
          {features.map((feature) => (
            <div 
              key={feature.id}
              className="p-6 rounded-lg border bg-card text-card-foreground"
            >
              {feature.icon && (
                <div className="w-12 h-12 mb-4 text-primary">
                  <img src={feature.icon} alt="" className="w-full h-full object-contain" />
                </div>
              )}
              
              <h3 
                className="text-xl font-semibold mb-3"
                contentEditable={!!onFeatureEdit}
                onBlur={(e) => onFeatureEdit?.(feature.id, 'title', e.currentTarget.textContent || '')}
                suppressContentEditableWarning
              >
                {feature.title}
              </h3>
              
              <p 
                className="text-muted-foreground"
                contentEditable={!!onFeatureEdit}
                onBlur={(e) => onFeatureEdit?.(feature.id, 'description', e.currentTarget.textContent || '')}
                suppressContentEditableWarning
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
