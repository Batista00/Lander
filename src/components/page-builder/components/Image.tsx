import { cn } from '@/lib/utils';

interface ImageProps {
  id: string;
  content: {
    src: string;
    alt?: string;
    caption?: string;
    aspectRatio?: 'auto' | 'square' | 'video' | 'portrait' | 'wide';
    fit?: 'contain' | 'cover';
    rounded?: boolean;
    shadow?: 'none' | 'small' | 'medium' | 'large';
    border?: boolean;
    borderColor?: string;
    width?: 'small' | 'medium' | 'large' | 'full';
    alignment?: 'left' | 'center' | 'right';
    animation?: 'none' | 'fade' | 'zoom' | 'slide';
  };
  onEdit?: () => void;
}

export function Image({ id, content, onEdit }: ImageProps) {
  const {
    src,
    alt = '',
    caption,
    aspectRatio = 'auto',
    fit = 'cover',
    rounded = false,
    shadow = 'none',
    border = false,
    borderColor = 'border-gray-200',
    width = 'full',
    alignment = 'center',
    animation = 'none'
  } = content;

  const aspectRatioClasses = {
    auto: '',
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[16/9]'
  };

  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-lg'
  };

  const widthClasses = {
    small: 'max-w-sm',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
    full: 'w-full'
  };

  const alignmentClasses = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto'
  };

  const animationClasses = {
    none: '',
    fade: 'animate-fade-in',
    zoom: 'animate-zoom-in',
    slide: 'animate-slide-in'
  };

  return (
    <div className={cn(
      "relative group",
      widthClasses[width],
      alignmentClasses[alignment]
    )}>
      <div className={cn(
        "relative overflow-hidden",
        aspectRatioClasses[aspectRatio],
        shadowClasses[shadow],
        {
          'rounded-lg': rounded,
          'border': border,
          [borderColor]: border
        }
      )}>
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full transition-transform duration-300",
            {
              'object-contain': fit === 'contain',
              'object-cover': fit === 'cover',
              'hover:scale-105': animation === 'zoom'
            },
            animationClasses[animation]
          )}
        />
      </div>

      {caption && (
        <p className="mt-2 text-sm text-gray-600 text-center">
          {caption}
        </p>
      )}

      {onEdit && (
        <button
          onClick={onEdit}
          className="absolute hidden group-hover:flex items-center justify-center top-2 right-2 w-8 h-8 bg-blue-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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
