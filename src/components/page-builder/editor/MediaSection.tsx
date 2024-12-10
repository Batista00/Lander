import React from 'react';
import { EditorSection } from './EditorSection';
import { FormField, Input, Checkbox, Select } from './FormField';

interface MediaSectionProps {
  content: any;
  onChange: (field: string, value: any) => void;
}

const imageFitOptions = [
  { value: 'cover', label: 'Cubrir' },
  { value: 'contain', label: 'Contener' },
  { value: 'fill', label: 'Llenar' },
  { value: 'none', label: 'Ninguno' },
];

export function MediaSection({ content, onChange }: MediaSectionProps) {
  return (
    <EditorSection title="Multimedia">
      {/* Imagen */}
      <FormField label="URL de la imagen" htmlFor="imageUrl">
        <Input
          id="imageUrl"
          type="text"
          value={content.imageUrl || ''}
          onChange={(e) => onChange('imageUrl', e.target.value)}
          placeholder="https://ejemplo.com/imagen.jpg"
        />
      </FormField>

      {content.imageUrl && (
        <>
          <FormField label="Texto alternativo" htmlFor="imageAlt">
            <Input
              id="imageAlt"
              type="text"
              value={content.imageAlt || ''}
              onChange={(e) => onChange('imageAlt', e.target.value)}
              placeholder="Descripción de la imagen"
            />
          </FormField>

          <FormField label="Ajuste de imagen" htmlFor="imageFit">
            <Select
              id="imageFit"
              value={content.imageFit || 'cover'}
              onChange={(e) => onChange('imageFit', e.target.value)}
              options={imageFitOptions}
            />
          </FormField>
        </>
      )}

      {/* Video */}
      <FormField label="URL del video" htmlFor="videoUrl">
        <Input
          id="videoUrl"
          type="text"
          value={content.videoUrl || ''}
          onChange={(e) => onChange('videoUrl', e.target.value)}
          placeholder="https://ejemplo.com/video.mp4"
        />
      </FormField>

      {content.videoUrl && (
        <div className="space-y-2">
          <Checkbox
            id="videoAutoplay"
            checked={content.videoAutoplay || false}
            onChange={(e) => onChange('videoAutoplay', e.target.checked)}
          >
            Reproducción automática
          </Checkbox>

          <Checkbox
            id="videoMuted"
            checked={content.videoMuted || false}
            onChange={(e) => onChange('videoMuted', e.target.checked)}
          >
            Silenciado
          </Checkbox>

          <Checkbox
            id="videoLoop"
            checked={content.videoLoop || false}
            onChange={(e) => onChange('videoLoop', e.target.checked)}
          >
            Reproducir en bucle
          </Checkbox>
        </div>
      )}
    </EditorSection>
  );
}
