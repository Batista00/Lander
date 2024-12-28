import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon?: string;
  link?: string;
  image?: string;
  price?: string;
  features?: string[];
}

interface ServicesProps {
  content: {
    title?: string;
    subtitle?: string;
    services?: Service[];
    layout?: 'grid' | 'list' | 'featured';
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
    showPricing?: boolean;
    showImages?: boolean;
    columns?: 2 | 3 | 4;
    style?: 'modern' | 'minimal' | 'cards';
  };
}

export const Services: React.FC<ServicesProps> = ({ content }) => {
  const {
    title = 'Nuestros Servicios',
    subtitle = 'Soluciones diseñadas para tu éxito',
    services = [
      {
        title: 'Diseño Web',
        description: 'Creamos sitios web modernos y responsivos que cautivan a tus visitantes.',
        icon: 'Palette',
        price: '$999',
        features: ['Diseño personalizado', 'Responsive', 'SEO optimizado'],
        image: '/images/services/web-design.jpg'
      },
      {
        title: 'Marketing Digital',
        description: 'Estrategias efectivas para aumentar tu presencia online.',
        icon: 'TrendingUp',
        price: '$799',
        features: ['Redes sociales', 'Email marketing', 'Analytics'],
        image: '/images/services/marketing.jpg'
      },
      {
        title: 'Desarrollo de Apps',
        description: 'Aplicaciones nativas y multiplataforma de alto rendimiento.',
        icon: 'Smartphone',
        price: '$1,499',
        features: ['iOS y Android', 'UI/UX personalizado', 'Soporte continuo'],
        image: '/images/services/app-dev.jpg'
      }
    ],
    layout = 'grid',
    backgroundColor = 'bg-white',
    textColor = 'text-gray-900',
    accentColor = 'text-blue-600',
    showPricing = true,
    showImages = true,
    columns = 3,
    style = 'modern'
  } = content || {};

  const getCardStyle = () => {
    switch (style) {
      case 'minimal':
        return 'border-0 shadow-none bg-transparent';
      case 'modern':
        return 'backdrop-blur-sm bg-white/80 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow';
      default:
        return 'bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow';
    }
  };

  const getGridClass = () => {
    switch (columns) {
      case 2:
        return 'md:grid-cols-2';
      case 4:
        return 'md:grid-cols-2 lg:grid-cols-4';
      default:
        return 'md:grid-cols-3';
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
            ${layout === 'grid' ? `grid ${getGridClass()} gap-8` : ''}
            ${layout === 'list' ? 'space-y-8' : ''}
            ${layout === 'featured' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : ''}
          `}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className={`
                ${getCardStyle()}
                rounded-xl overflow-hidden
                ${layout === 'list' ? 'flex items-start gap-6' : ''}
              `}
            >
              {showImages && service.image && layout !== 'list' && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <div className={layout === 'list' ? 'flex-1' : ''}>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="opacity-80 mb-4">{service.description}</p>

                  {service.features && (
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${accentColor}`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  {showPricing && service.price && (
                    <div className="mb-4">
                      <span className="text-2xl font-bold">{service.price}</span>
                      {service.price.includes('/') && (
                        <span className="text-sm opacity-70">
                          {service.price.split('/')[1]}
                        </span>
                      )}
                    </div>
                  )}

                  {service.link && (
                    <a
                      href={service.link}
                      className={`inline-flex items-center gap-2 ${accentColor} hover:underline`}
                    >
                      Saber más
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
