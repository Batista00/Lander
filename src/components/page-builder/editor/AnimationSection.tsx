import React from 'react';
import { EditorSection } from './EditorSection';
import { FormField, Select, Input, Checkbox, Slider } from './FormField';

interface AnimationSectionProps {
  content: any;
  onChange: (field: string, value: any) => void;
}

const animationOptions = [
  { value: 'none', label: 'Ninguna' },
  { value: 'fade', label: 'Desvanecer' },
  { value: 'slide', label: 'Deslizar' },
  { value: 'bounce', label: 'Rebotar' },
];

export function AnimationSection({ content, onChange }: AnimationSectionProps) {
  return (
    <EditorSection title="Animación">
      <FormField label="Tipo de animación" htmlFor="animation">
        <Select
          id="animation"
          value={content.animation || 'none'}
          onChange={(e) => onChange('animation', e.target.value)}
          options={animationOptions}
        />
      </FormField>

      {content.animation && content.animation !== 'none' && (
        <>
          <FormField label="Duración (s)" htmlFor="animationDuration">
            <Input
              id="animationDuration"
              type="number"
              min="0"
              step="0.1"
              value={content.animationDuration || '0.3'}
              onChange={(e) => onChange('animationDuration', e.target.value)}
            />
          </FormField>

          <FormField label="Retraso (s)" htmlFor="animationDelay">
            <Input
              id="animationDelay"
              type="number"
              min="0"
              step="0.1"
              value={content.animationDelay || '0'}
              onChange={(e) => onChange('animationDelay', e.target.value)}
            />
          </FormField>

          <FormField label="Efecto Parallax" htmlFor="parallaxEffect">
            <Checkbox
              id="parallaxEffect"
              checked={content.parallaxEffect || false}
              onChange={(e) => onChange('parallaxEffect', e.target.checked)}
            >
              Activar efecto parallax
            </Checkbox>
          </FormField>

          {content.parallaxEffect && (
            <FormField label="Intensidad del Parallax" htmlFor="parallaxIntensity">
              <Slider
                id="parallaxIntensity"
                min="1"
                max="10"
                value={content.parallaxIntensity || 5}
                onChange={(e) => onChange('parallaxIntensity', Number(e.target.value))}
              />
            </FormField>
          )}
        </>
      )}
    </EditorSection>
  );
}
