import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface CarouselSlide {
  id: string;
  src: string;
  alt?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
}

interface CarouselProps {
  id: string;
  content: {
    slides: CarouselSlide[];
    autoplay?: boolean;
    interval?: number;
    animation?: 'slide' | 'fade';
    arrows?: boolean;
    dots?: boolean;
    height?: 'small' | 'medium' | 'large' | 'screen';
    overlay?: boolean;
    overlayOpacity?: 'light' | 'medium' | 'dark';
    showContent?: boolean;
    contentPosition?: 'center' | 'bottom';
  };
  onEdit?: () => void;
  premium?: boolean;
}

export function Carousel({ id, content, onEdit, premium = true }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  if (!premium) {
    return (
      <div className="relative p-8 text-center bg-gradient-to-r from-purple-100 to-purple-50 rounded-lg border-2 border-dashed border-purple-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-purple-500 bg-white px-4 py-2 rounded-full shadow-sm">
            Componente Premium 🌟
          </div>
        </div>
      </div>
    );
  }

  const {
    slides = [],
    autoplay = true,
    interval = 5000,
    animation = 'slide',
    arrows = true,
    dots = true,
    height = 'medium',
    overlay = true,
    overlayOpacity = 'medium',
    showContent = true,
    contentPosition = 'center'
  } = content;

  useEffect(() => {
    if (autoplay && !isHovered) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [autoplay, interval, slides.length, isHovered]);

  const heightClasses = {
    small: 'h-[300px]',
    medium: 'h-[500px]',
    large: 'h-[700px]',
    screen: 'h-screen'
  };

  const overlayClasses = {
    light: 'bg-black/30',
    medium: 'bg-black/50',
    dark: 'bg-black/70'
  };

  const contentPositionClasses = {
    center: 'items-center',
    bottom: 'items-end pb-16'
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div
      className={cn(
        "relative group overflow-hidden",
        heightClasses[height]
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-500",
          {
            'flex': animation === 'slide'
          }
        )}
        style={animation === 'slide' ? {
          transform: `translateX(-${currentSlide * 100}%)`
        } : undefined}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-500",
              {
                'opacity-0': animation === 'fade' && index !== currentSlide,
                'relative': animation === 'slide',
                'min-w-full': animation === 'slide'
              }
            )}
          >
            <img
              src={slide.src}
              alt={slide.alt || ''}
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {overlay && (
              <div className={cn(
                "absolute inset-0",
                overlayClasses[overlayOpacity]
              )} />
            )}

            {showContent && (slide.title || slide.description) && (
              <div className={cn(
                "absolute inset-0 flex justify-center text-white",
                contentPositionClasses[contentPosition]
              )}>
                <div className="max-w-3xl mx-4 text-center">
                  {slide.title && (
                    <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                  )}
                  {slide.description && (
                    <p className="text-xl mb-8">{slide.description}</p>
                  )}
                  {slide.buttonText && slide.buttonUrl && (
                    <a
                      href={slide.buttonUrl}
                      className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                      {slide.buttonText}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {arrows && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {dots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentSlide ? "bg-white w-4" : "bg-white/50"
              )}
            />
          ))}
        </div>
      )}

      {onEdit && (
        <button
          onClick={onEdit}
          className="absolute hidden group-hover:flex items-center justify-center top-2 right-2 w-8 h-8 bg-blue-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
