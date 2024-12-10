import React from 'react';
import { EditorSection } from './EditorSection';
import { FormField, Select, Input, ColorPicker, Slider } from './FormField';

interface StyleSectionProps {
  content: any;
  onChange: (field: string, value: any) => void;
}

const borderRadiusOptions = [
  { value: 'rounded-none', label: 'Sin borde' },
  { value: 'rounded', label: 'Pequeño' },
  { value: 'rounded-md', label: 'Medio' },
  { value: 'rounded-lg', label: 'Grande' },
  { value: 'rounded-full', label: 'Completo' },
];

const borderWidthOptions = [
  { value: 'border-0', label: 'Sin borde' },
  { value: 'border', label: 'Normal' },
  { value: 'border-2', label: 'Medio' },
  { value: 'border-4', label: 'Grueso' },
];

const shadowOptions = [
  { value: 'shadow-none', label: 'Sin sombra' },
  { value: 'shadow-sm', label: 'Pequeña' },
  { value: 'shadow', label: 'Normal' },
  { value: 'shadow-md', label: 'Media' },
  { value: 'shadow-lg', label: 'Grande' },
  { value: 'shadow-xl', label: 'Extra grande' },
];

const hoverEffectOptions = [
  { value: 'none', label: 'Ninguno' },
  { value: 'scale', label: 'Escalar' },
  { value: 'glow', label: 'Brillar' },
  { value: 'lift', label: 'Elevar' },
];

export function StyleSection({ content, onChange }: StyleSectionProps) {
  return (
    <EditorSection title="Estilos">
      <FormField label="Radio del borde" htmlFor="borderRadius">
        <Select
          id="borderRadius"
          value={content.borderRadius || 'rounded-none'}
          onChange={(e) => onChange('borderRadius', e.target.value)}
          options={borderRadiusOptions}
        />
      </FormField>

      <FormField label="Ancho del borde" htmlFor="borderWidth">
        <Select
          id="borderWidth"
          value={content.borderWidth || 'border-0'}
          onChange={(e) => onChange('borderWidth', e.target.value)}
          options={borderWidthOptions}
        />
      </FormField>

      {content.borderWidth && content.borderWidth !== 'border-0' && (
        <FormField label="Color del borde" htmlFor="borderColor">
          <ColorPicker
            id="borderColor"
            value={content.borderColor || '#000000'}
            onChange={(e) => onChange('borderColor', e.target.value)}
          />
        </FormField>
      )}

      <FormField label="Sombra" htmlFor="boxShadow">
        <Select
          id="boxShadow"
          value={content.boxShadow || 'shadow-none'}
          onChange={(e) => onChange('boxShadow', e.target.value)}
          options={shadowOptions}
        />
      </FormField>

      <FormField label="Opacidad" htmlFor="opacity">
        <Slider
          id="opacity"
          min="0"
          max="100"
          value={content.opacity ? content.opacity * 100 : 100}
          onChange={(e) => onChange('opacity', Number(e.target.value) / 100)}
        />
      </FormField>

      <FormField label="Desenfoque" htmlFor="blur">
        <Slider
          id="blur"
          min="0"
          max="20"
          value={content.blur || 0}
          onChange={(e) => onChange('blur', Number(e.target.value))}
        />
      </FormField>

      <FormField label="Efecto al pasar el mouse" htmlFor="hoverEffect">
        <Select
          id="hoverEffect"
          value={content.hoverEffect || 'none'}
          onChange={(e) => onChange('hoverEffect', e.target.value)}
          options={hoverEffectOptions}
        />
      </FormField>

      <FormField label="Clases personalizadas" htmlFor="customClasses">
        <Input
          id="customClasses"
          value={content.customClasses?.join(' ') || ''}
          onChange={(e) => onChange('customClasses', e.target.value.split(' ').filter(Boolean))}
          placeholder="Ejemplo: my-2 px-4"
        />
      </FormField>
    </EditorSection>
  );
}
