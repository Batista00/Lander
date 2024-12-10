import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  content: any;
  className?: string;
  children?: ReactNode;
}

export function Section({ content, className, children }: ComponentProps) {
  return (
    <section
      className={cn(
        "relative py-16",
        content.backgroundColor && `bg-[${content.backgroundColor}]`,
        content.textColor && `text-[${content.textColor}]`,
        className
      )}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}

export function Hero({ content }: ComponentProps) {
  const {
    title = 'Título por defecto',
    subtitle = 'Subtítulo por defecto',
    description = '',
    buttonText = '',
    buttonLink = '#',
    backgroundImage = '',
    buttonStyle = 'primary',
    overlayColor = 'rgba(0, 0, 0, 0.5)',
    overlayOpacity = 0.5,
    height = 'h-screen',
    layout = 'center',
    backgroundColor = 'bg-gray-900',
    textColor = 'text-white'
  } = content || {};

  const sectionStyle = {
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative' as const,
  };

  const overlayStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: overlayColor,
    opacity: overlayOpacity,
  };

  return (
    <section 
      className={`relative ${height} flex items-center ${backgroundColor} ${textColor}`}
      style={sectionStyle}
    >
      {backgroundImage && <div style={overlayStyle} />}
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto ${layout === 'center' ? 'text-center' : ''}`}>
          <h1 className="text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl mb-4">{subtitle}</p>
          {description && <p className="text-lg mb-8">{description}</p>}
          {buttonText && (
            <a
              href={buttonLink}
              className={`inline-block px-8 py-3 ${
                buttonStyle === 'primary'
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white text-blue-600 hover:bg-gray-100'
              } rounded-lg transition-colors`}
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export function Features({ content }: ComponentProps) {
  return (
    <Section content={content}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
        <p className="text-xl text-gray-600">{content.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.features?.map((feature: any, index: number) => (
          <div key={index} className="p-6 bg-white rounded-lg shadow-sm">
            {feature.icon && <div className="text-blue-600 mb-4">{feature.icon}</div>}
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Text({ content }: ComponentProps) {
  return (
    <Section content={content}>
      <div className={cn(
        "prose prose-lg mx-auto",
        content.alignment === 'center' && "text-center",
        content.alignment === 'right' && "text-right"
      )}>
        {content.text}
      </div>
    </Section>
  );
}

export function Image({ content }: ComponentProps) {
  return (
    <Section content={content}>
      <div className="max-w-4xl mx-auto">
        <img
          src={content.url}
          alt={content.alt || ""}
          className={cn(
            "w-full h-auto rounded-lg",
            content.shadow && "shadow-lg"
          )}
        />
        {content.caption && (
          <p className="mt-2 text-center text-gray-600 text-sm">{content.caption}</p>
        )}
      </div>
    </Section>
  );
}

export function Contact({ content }: ComponentProps) {
  return (
    <Section content={content}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">{content.title}</h2>
          <p className="text-xl text-gray-600">{content.subtitle}</p>
        </div>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Tu mensaje"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </Section>
  );
}

// Exportar un mapa de componentes para uso dinámico
export const componentMap = {
  hero: Hero,
  features: Features,
  text: Text,
  image: Image,
  contact: Contact,
};

export * from './Hero';
export * from './componentMap';
