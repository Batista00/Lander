import React from 'react';

interface HeroProps {
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    backgroundImage?: string;
    buttonStyle?: 'primary' | 'secondary';
    overlayColor?: string;
    overlayOpacity?: number;
    height?: string;
    layout?: 'center' | 'left' | 'right';
    backgroundColor?: string;
    textColor?: string;
  };
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
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
};
