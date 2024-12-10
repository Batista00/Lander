import { cn } from '@/lib/utils';
import { useState } from 'react';

interface GalleryImage {
  id: string;
  src: string;
  alt?: string;
  title?: string;
  description?: string;
}

interface GalleryProps {
  id: string;
  content: {
    images: GalleryImage[];
    layout?: 'grid' | 'masonry' | 'carousel';
    columns?: 2 | 3 | 4;
    gap?: 'small' | 'medium' | 'large';
    aspectRatio?: 'square' | 'auto';
    lightbox?: boolean;
    rounded?: boolean;
    shadow?: 'none' | 'small' | 'medium' | 'large';
    hover?: 'none' | 'zoom' | 'overlay';
    showCaptions?: boolean;
  };
  onEdit?: () => void;
  premium?: boolean;
}

export function Gallery({ id, content, onEdit, premium = true }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

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
    images = [],
    layout = 'grid',
    columns = 3,
    gap = 'medium',
    aspectRatio = 'square',
    lightbox = true,
    rounded = false,
    shadow = 'none',
    hover = 'overlay',
    showCaptions = false
  } = content;

  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
  };

  const gapClasses = {
    small: 'gap-2',
    medium: 'gap-4',
    large: 'gap-6'
  };

  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-lg'
  };

  const renderImage = (image: GalleryImage) => (
    <div
      key={image.id}
      className={cn(
        "group relative overflow-hidden",
        {
          'aspect-square': aspectRatio === 'square',
          'rounded-lg': rounded
        },
        shadowClasses[shadow]
      )}
      onClick={() => lightbox && setSelectedImage(image)}
    >
      <img
        src={image.src}
        alt={image.alt || ''}
        className={cn(
          "w-full h-full object-cover transition-transform duration-300",
          {
            'group-hover:scale-110': hover === 'zoom'
          }
        )}
      />
      
      {hover === 'overlay' && (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {(image.title || image.description) && (
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              {image.title && (
                <h4 className="text-lg font-semibold">{image.title}</h4>
              )}
              {image.description && (
                <p className="text-sm opacity-90">{image.description}</p>
              )}
            </div>
          )}
        </div>
      )}

      {showCaptions && (image.title || image.description) && (
        <div className="mt-2">
          {image.title && (
            <h4 className="text-sm font-semibold">{image.title}</h4>
          )}
          {image.description && (
            <p className="text-xs text-gray-600">{image.description}</p>
          )}
        </div>
      )}
    </div>
  );

  const renderLightbox = () => {
    if (!selectedImage) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        onClick={() => setSelectedImage(null)}
      >
        <div className="relative max-w-4xl mx-auto p-4">
          <img
            src={selectedImage.src}
            alt={selectedImage.alt || ''}
            className="max-h-[80vh] w-auto"
          />
          {(selectedImage.title || selectedImage.description) && (
            <div className="absolute bottom-4 left-4 right-4 text-white text-center">
              {selectedImage.title && (
                <h4 className="text-xl font-semibold">{selectedImage.title}</h4>
              )}
              {selectedImage.description && (
                <p className="mt-2 text-sm opacity-90">{selectedImage.description}</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative group">
      <div className={cn(
        layout === 'grid' && 'grid',
        layout === 'grid' && columnClasses[columns],
        gapClasses[gap]
      )}>
        {images.map(renderImage)}
      </div>

      {lightbox && renderLightbox()}

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
