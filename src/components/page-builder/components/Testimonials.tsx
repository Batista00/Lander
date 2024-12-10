import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { ComponentProps } from '../interfaces/Component';

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  content: string;
}

interface TestimonialsProps extends ComponentProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
}

const defaultProps: TestimonialsProps = {
  id: '',
  type: 'testimonials',
  title: 'Lo que dicen nuestros clientes',
  subtitle: 'Descubre por qué nuestros clientes confían en nosotros',
  testimonials: [
    {
      id: '1',
      name: 'Ana García',
      role: 'CEO',
      company: 'Tech Solutions',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      content: 'Esta landing page superó todas nuestras expectativas. La facilidad de uso y el diseño profesional nos ayudaron a aumentar nuestras conversiones significativamente.'
    },
    {
      id: '2',
      name: 'Carlos Rodríguez',
      role: 'Marketing Manager',
      company: 'Digital Agency',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      content: 'Una herramienta increíble que nos permitió crear una presencia en línea impactante en cuestión de minutos. El soporte al cliente es excepcional.'
    },
    {
      id: '3',
      name: 'María Torres',
      role: 'Founder',
      company: 'Creative Studio',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      content: 'La mejor inversión que hemos hecho para nuestro negocio en línea. La personalización y las opciones de diseño son exactamente lo que necesitábamos.'
    }
  ]
};

export const Testimonials: React.FC<TestimonialsProps> = ({ 
  title = defaultProps.title,
  subtitle = defaultProps.subtitle,
  testimonials = defaultProps.testimonials
}) => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-lg shadow-lg relative hover:-translate-y-1 transition-transform duration-300"
            >
              <FaQuoteLeft 
                className="w-8 h-8 text-blue-500 opacity-20 absolute top-4 left-4"
              />
              <div className="flex flex-col space-y-4">
                <p className="text-gray-600 pt-6">
                  {testimonial.content}
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    {(testimonial.role || testimonial.company) && (
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                        {testimonial.role && testimonial.company && ' · '}
                        {testimonial.company}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Testimonials.defaultProps = defaultProps;
