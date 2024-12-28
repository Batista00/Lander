import React, { useState } from 'react';
import { Component } from '@/types/landing';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface GalleryProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
  onChange?: (component: Component) => void;
}

export const Gallery: React.FC<GalleryProps> = ({
  component,
  mode = 'preview',
  onChange,
}) => {
  const {
    title = 'Nuestra Galería',
    subtitle = 'Explora nuestro trabajo',
    description = 'Una muestra visual de nuestros mejores proyectos',
    images = [],
    layout = 'grid',
    columns = 3,
    gap = 4,
    aspectRatio = 'square',
    showLightbox = true
  } = component.content;

  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const isEditing = mode === 'edit';

  const handleChange = (field: string, value: string) => {
    if (!onChange) return;
    
    onChange({
      ...component,
      content: {
        ...component.content,
        [field]: value
      }
    });
  };

  const handleImageChange = (index: number, field: string, value: string) => {
    if (!onChange || !images) return;

    const updatedImages = [...images];
    updatedImages[index] = {
      ...updatedImages[index],
      [field]: value
    };

    onChange({
      ...component,
      content: {
        ...component.content,
        images: updatedImages
      }
    });
  };

  const nextImage = () => {
    if (selectedImage === null || !images) return;
    setSelectedImage((selectedImage + 1) % images.length);
  };

  const previousImage = () => {
    if (selectedImage === null || !images) return;
    setSelectedImage((selectedImage - 1 + images.length) % images.length);
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case 'square':
        return 'aspect-square';
      case 'video':
        return 'aspect-video';
      case 'portrait':
        return 'aspect-[3/4]';
      case 'landscape':
        return 'aspect-[4/3]';
      default:
        return 'aspect-square';
    }
  };

  return (
    <div className="relative group py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {isEditing ? (
            <input
              type="text"
              value={subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="text-lg font-semibold text-primary mb-2 bg-transparent border-none focus:ring-2 focus:ring-primary text-center w-full"
            />
          ) : (
            <h3 className="text-lg font-semibold text-primary mb-2">
              {subtitle}
            </h3>
          )}

          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="text-3xl font-bold mb-4 bg-transparent border-none focus:ring-2 focus:ring-primary text-center w-full"
            />
          ) : (
            <h2 className="text-3xl font-bold mb-4">
              {title}
            </h2>
          )}

          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="text-lg mb-8 bg-transparent border-none focus:ring-2 focus:ring-primary text-center w-full"
              rows={2}
            />
          ) : (
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className={cn(
          'grid gap-4',
          layout === 'grid' && columns === 3 && 'md:grid-cols-3',
          layout === 'grid' && columns === 2 && 'md:grid-cols-2',
          layout === 'grid' && columns === 4 && 'md:grid-cols-4',
          layout === 'masonry' && 'columns-1 md:columns-2 lg:columns-3'
        )}>
          {images.map((image, index) => (
            <div
              key={index}
              className={cn(
                'relative group cursor-pointer overflow-hidden rounded-lg',
                layout !== 'masonry' && getAspectRatioClass(),
                layout === 'masonry' && 'mb-4 break-inside-avoid'
              )}
              onClick={() => showLightbox && setSelectedImage(index)}
            >
              <img
                src={image.url}
                alt={image.caption || `Image ${index + 1}`}
                className={cn(
                  'w-full h-full object-cover transition-transform duration-300 group-hover:scale-110',
                  layout !== 'masonry' && 'absolute inset-0'
                )}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    {image.caption && (
                      <p className="text-lg font-semibold mb-2">{image.caption}</p>
                    )}
                    {image.description && (
                      <p className="text-sm">{image.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && showLightbox && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={previousImage}
              className="absolute left-4 text-white hover:text-gray-300"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 text-white hover:text-gray-300"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            <div className="max-w-4xl max-h-[80vh] relative">
              <img
                src={images[selectedImage].url}
                alt={images[selectedImage].caption || `Image ${selectedImage + 1}`}
                className="max-w-full max-h-[80vh] object-contain"
              />
              {images[selectedImage].caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                  <p className="text-lg font-semibold">{images[selectedImage].caption}</p>
                  {images[selectedImage].description && (
                    <p className="text-sm mt-1">{images[selectedImage].description}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
