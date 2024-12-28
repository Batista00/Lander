import React, { useState, useEffect } from 'react';
import { createClient, Photo, PhotosWithTotalResults } from 'pexels';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Image } from '@/components/ui/image';

interface PexelsImagePickerProps {
  onSelect: (url: string) => void;
  buttonText?: string;
  currentImage?: string;
}

export function PexelsImagePicker({ onSelect, buttonText = 'Seleccionar Imagen', currentImage }: PexelsImagePickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const client = createClient(import.meta.env.VITE_PEXELS_API_KEY || '');

  const searchPhotos = async (searchQuery: string) => {
    try {
      setLoading(true);
      setError(null);
      const response: PhotosWithTotalResults = await client.photos.search({
        query: searchQuery,
        per_page: 20,
        orientation: 'landscape'
      });
      setPhotos(response.photos);
    } catch (err) {
      setError('Error al cargar imágenes. Por favor, intenta de nuevo.');
      console.error('Error fetching photos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && !photos.length) {
      searchPhotos('business');
    }
  }, [open]);

  const handleSelect = (photo: Photo) => {
    onSelect(photo.src.large);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer">
          {currentImage ? (
            <Image
              src={currentImage}
              alt="Selected image"
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-500">{buttonText}</span>
            </div>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Seleccionar Imagen de Pexels</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Buscar imágenes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  searchPhotos(query);
                }
              }}
            />
            <Button onClick={() => searchPhotos(query)}>Buscar</Button>
          </div>
          
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <ScrollArea className="h-[500px]">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative aspect-video rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => handleSelect(photo)}
                  >
                    <Image
                      src={photo.src.medium}
                      alt={photo.alt || 'Pexels photo'}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
          
          <div className="text-xs text-gray-500 text-center">
            Photos provided by{' '}
            <a
              href="https://www.pexels.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Pexels
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
