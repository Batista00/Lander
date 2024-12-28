import React from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role?: string;
  company?: string;
  image?: string;
  content: string;
  rating?: number;
}

interface TestimonialsProps {
  content: {
    title?: string;
    subtitle?: string;
    testimonials?: Testimonial[];
    layout?: 'grid' | 'carousel' | 'masonry';
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
    showRatings?: boolean;
    showImages?: boolean;
    style?: 'modern' | 'minimal' | 'cards';
  };
}

export const Testimonials: React.FC<TestimonialsProps> = ({ content }) => {
  const {
    title = 'Lo que dicen nuestros clientes',
    subtitle = 'Testimonios de personas que confían en nosotros',
    testimonials = [
      {
        name: 'Juan Pérez',
        role: 'CEO',
        company: 'Tech Corp',
        content: 'Una experiencia increíble. El producto superó todas nuestras expectativas.',
        rating: 5,
        image: 'https://randomuser.me/api/portraits/men/1.jpg'
      },
      {
        name: 'María García',
        role: 'Directora de Marketing',
        company: 'Digital Solutions',
        content: 'La mejor decisión que tomamos para nuestro negocio. El soporte es excepcional.',
        rating: 5,
        image: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      {
        name: 'Carlos Rodríguez',
        role: 'Emprendedor',
        content: 'Simplemente funciona. Fácil de usar y resultados inmediatos.',
        rating: 4,
        image: 'https://randomuser.me/api/portraits/men/2.jpg'
      }
    ],
    layout = 'grid',
    backgroundColor = 'bg-gray-50',
    textColor = 'text-gray-900',
    accentColor = 'text-blue-600',
    showRatings = true,
    showImages = true,
    style = 'modern'
  } = content || {};

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? accentColor : 'text-gray-300'
        }`}
        fill={index < rating ? 'currentColor' : 'none'}
      />
    ));
  };

  const getCardStyle = () => {
    switch (style) {
      case 'minimal':
        return 'border-0 shadow-none bg-transparent';
      case 'modern':
        return 'backdrop-blur-sm bg-white/80 border border-gray-200 shadow-lg';
      default:
        return 'bg-white border border-gray-200 shadow-md';
    }
  };

  return (
    <section className={`py-16 ${backgroundColor} ${textColor}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div 
          className={`
            ${layout === 'grid' ? 'grid md:grid-cols-3 gap-8' : ''}
            ${layout === 'masonry' ? 'columns-1 md:columns-3 gap-8' : ''}
            ${layout === 'carousel' ? 'flex overflow-x-auto gap-8 pb-8' : ''}
          `}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`
                ${getCardStyle()}
                p-6 rounded-xl mb-8
                ${layout === 'carousel' ? 'flex-shrink-0 w-80' : ''}
              `}
            >
              <div className="flex items-start gap-4 mb-4">
                {showImages && testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  {(testimonial.role || testimonial.company) && (
                    <p className="text-sm opacity-80">
                      {testimonial.role}
                      {testimonial.role && testimonial.company && ' · '}
                      {testimonial.company}
                    </p>
                  )}
                </div>
              </div>

              {showRatings && testimonial.rating && (
                <div className="flex gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>
              )}

              <p className="text-gray-600">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
