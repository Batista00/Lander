import React, { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import { Button } from './Button';

interface ImageUploadProps {
  onImageUpload: (file: File) => Promise<string>;
  currentImageUrl?: string;
  onRemove?: () => void;
  className?: string;
}

export function ImageUpload({ onImageUpload, currentImageUrl, onRemove, className }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    // Verificar el tipo de archivo
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Solo se permiten imágenes en formato JPG, PNG o WebP');
      return false;
    }

    // Verificar el tamaño (2MB máximo)
    const maxSize = 2 * 1024 * 1024; // 2MB en bytes
    if (file.size > maxSize) {
      setError('La imagen no debe superar los 2MB');
      return false;
    }

    return true;
  };

  const handleFile = async (file: File) => {
    setError(null);
    
    if (!validateFile(file)) {
      return;
    }

    try {
      setIsUploading(true);
      
      // Crear preview
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      // Subir imagen
      const uploadedUrl = await onImageUpload(file);
      setPreview(uploadedUrl);
      
    } catch (err) {
      setError('Error al subir la imagen');
      console.error('Error al subir la imagen:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  };

  return (
    <div className={className}>
      {preview ? (
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <button
            onClick={() => {
              setPreview(null);
              onRemove?.();
            }}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
            transition-colors
          `}
        >
          <UploadCloud className={`w-12 h-12 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
          <p className="mt-2 text-sm text-gray-600">
            Arrastra y suelta una imagen aquí, o
          </p>
          <label htmlFor="file-upload" className="mt-2">
            <Button
              type="button"
              variant="outline"
              disabled={isUploading}
            >
              {isUploading ? 'Subiendo...' : 'Seleccionar archivo'}
            </Button>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileSelect}
              disabled={isUploading}
            />
          </label>
          <p className="mt-2 text-xs text-gray-500">
            PNG, JPG o WebP (máx. 2MB)
          </p>
          {error && (
            <p className="mt-2 text-sm text-red-500">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
