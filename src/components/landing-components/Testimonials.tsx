import React from 'react';
import { cn } from '@/lib/utils';

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialsProps {
  content: {
    title?: string;
    subtitle?: string;
    testimonials?: Testimonial[];
    layout?: 'grid' | 'carousel';
    columns?: 1 | 2 | 3;
    style?: {
      backgroundColor?: string;
      textColor?: string;
      cardBackgroundColor?: string;
      cardTextColor?: string;
    };
  };
  isEditing?: boolean;
  onEdit?: (field: string, value: any) => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ content, isEditing, onEdit }) => {
  const {
    title = 'Lo que dicen nuestros clientes',
    subtitle = 'Testimonios de clientes satisfechos',
    testimonials = [],
    layout = 'grid',
    columns = 3,
    style = {
      backgroundColor: 'bg-gray-50',
      textColor: 'text-gray-900',
      cardBackgroundColor: 'bg-white',
      cardTextColor: 'text-gray-700'
    }
  } = content || {};

  const gridCols = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3'
  };

  return (
    <section className={cn('py-24', style.backgroundColor)}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => onEdit?.('title', e.target.value)}
              className={cn(
                'text-4xl font-bold mb-6 w-full text-center bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded',
                style.textColor
              )}
            />
          ) : (
            <h2 className={cn('text-4xl font-bold mb-6', style.textColor)}>
              {title}
            </h2>
          )}

          {isEditing ? (
            <textarea
              value={subtitle}
              onChange={(e) => onEdit?.('subtitle', e.target.value)}
              className={cn(
                'text-xl w-full text-center bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded',
                style.textColor
              )}
            />
          ) : (
            <p className={cn('text-xl', style.textColor)}>{subtitle}</p>
          )}
        </div>

        <div className={cn(
          'grid gap-8',
          layout === 'grid' ? gridCols[columns] : 'grid-cols-1'
        )}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={cn(
                'p-8 rounded-xl shadow-sm transition-all duration-200',
                style.cardBackgroundColor,
                'hover:shadow-lg'
              )}
            >
              {isEditing ? (
                <>
                  <textarea
                    value={testimonial.content}
                    onChange={(e) =>
                      onEdit?.('testimonials', testimonials.map(t =>
                        t.id === testimonial.id ? { ...t, content: e.target.value } : t
                      ))
                    }
                    className={cn(
                      'w-full mb-6 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded text-lg italic',
                      style.cardTextColor
                    )}
                  />
                  <input
                    type="text"
                    value={testimonial.name}
                    onChange={(e) =>
                      onEdit?.('testimonials', testimonials.map(t =>
                        t.id === testimonial.id ? { ...t, name: e.target.value } : t
                      ))
                    }
                    className={cn(
                      'text-lg font-semibold w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded',
                      style.cardTextColor
                    )}
                  />
                  <input
                    type="text"
                    value={testimonial.role || ''}
                    onChange={(e) =>
                      onEdit?.('testimonials', testimonials.map(t =>
                        t.id === testimonial.id ? { ...t, role: e.target.value } : t
                      ))
                    }
                    placeholder="Cargo"
                    className={cn(
                      'text-sm w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded',
                      style.cardTextColor
                    )}
                  />
                  <input
                    type="text"
                    value={testimonial.company || ''}
                    onChange={(e) =>
                      onEdit?.('testimonials', testimonials.map(t =>
                        t.id === testimonial.id ? { ...t, company: e.target.value } : t
                      ))
                    }
                    placeholder="Empresa"
                    className={cn(
                      'text-sm w-full bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded',
                      style.cardTextColor
                    )}
                  />
                </>
              ) : (
                <>
                  <p className={cn('text-lg italic mb-6', style.cardTextColor)}>
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    {testimonial.avatar && (
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                    )}
                    <div>
                      <h4 className={cn('font-semibold', style.cardTextColor)}>
                        {testimonial.name}
                      </h4>
                      {(testimonial.role || testimonial.company) && (
                        <p className={cn('text-sm', style.cardTextColor)}>
                          {testimonial.role}
                          {testimonial.role && testimonial.company && ' - '}
                          {testimonial.company}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
