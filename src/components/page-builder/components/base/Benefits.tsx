import React from 'react';
import { cn } from '@/lib/utils';

export interface Benefit {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export interface BenefitsProps {
  title?: string;
  description?: string;
  benefits: Benefit[];
  layout?: 'alternating' | 'left' | 'right';
  className?: string;
  onEdit?: (field: string, value: string) => void;
  onBenefitEdit?: (id: string, field: 'title' | 'description', value: string) => void;
}

export function Benefits({
  title,
  description,
  benefits,
  layout = 'alternating',
  className,
  onEdit,
  onBenefitEdit
}: BenefitsProps) {
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
        
        <div className="space-y-24">
          {benefits.map((benefit, index) => {
            const isImageLeft = layout === 'left' || 
              (layout === 'alternating' && index % 2 === 0) ||
              (layout === 'right' && false);

            return (
              <div 
                key={benefit.id}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
              >
                {isImageLeft && benefit.image && (
                  <div className="w-full md:w-1/2">
                    <img 
                      src={benefit.image} 
                      alt={benefit.title}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}
                
                <div className="w-full md:w-1/2">
                  <h3 
                    className="text-2xl md:text-3xl font-bold mb-4"
                    contentEditable={!!onBenefitEdit}
                    onBlur={(e) => onBenefitEdit?.(benefit.id, 'title', e.currentTarget.textContent || '')}
                    suppressContentEditableWarning
                  >
                    {benefit.title}
                  </h3>
                  
                  <p 
                    className="text-lg text-muted-foreground"
                    contentEditable={!!onBenefitEdit}
                    onBlur={(e) => onBenefitEdit?.(benefit.id, 'description', e.currentTarget.textContent || '')}
                    suppressContentEditableWarning
                  >
                    {benefit.description}
                  </p>
                </div>
                
                {!isImageLeft && benefit.image && (
                  <div className="w-full md:w-1/2">
                    <img 
                      src={benefit.image} 
                      alt={benefit.title}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
