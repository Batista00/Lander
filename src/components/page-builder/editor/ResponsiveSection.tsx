import React from 'react';
import { EditorSection } from './EditorSection';
import { FormField, Checkbox, Input, Select } from './FormField';

interface ResponsiveSectionProps {
  content: any;
  onChange: (field: string, value: any) => void;
}

const marginOptions = [
  { value: 'm-0', label: 'Sin margen' },
  { value: 'm-2', label: 'Pequeño' },
  { value: 'm-4', label: 'Medio' },
  { value: 'm-6', label: 'Grande' },
  { value: 'm-8', label: 'Muy grande' },
];

const widthOptions = [
  { value: 'w-full', label: 'Completo' },
  { value: 'w-1/2', label: '50%' },
  { value: 'w-1/3', label: '33%' },
  { value: 'w-2/3', label: '66%' },
  { value: 'w-1/4', label: '25%' },
  { value: 'w-3/4', label: '75%' },
];

export function ResponsiveSection({ content, onChange }: ResponsiveSectionProps) {
  const handleResponsiveChange = (device: 'mobile' | 'tablet' | 'desktop', value: boolean) => {
    onChange('responsiveHidden', {
      ...content.responsiveHidden,
      [device]: value,
    });
  };

  return (
    <EditorSection title="Responsive">
      <FormField label="Ocultar en dispositivos" htmlFor="responsive-hidden">
        <div className="space-y-2">
          <Checkbox
            id="hide-mobile"
            checked={content.responsiveHidden?.mobile || false}
            onChange={(e) => handleResponsiveChange('mobile', e.target.checked)}
          >
            Móvil
          </Checkbox>
          <Checkbox
            id="hide-tablet"
            checked={content.responsiveHidden?.tablet || false}
            onChange={(e) => handleResponsiveChange('tablet', e.target.checked)}
          >
            Tablet
          </Checkbox>
          <Checkbox
            id="hide-desktop"
            checked={content.responsiveHidden?.desktop || false}
            onChange={(e) => handleResponsiveChange('desktop', e.target.checked)}
          >
            Escritorio
          </Checkbox>
        </div>
      </FormField>

      <FormField label="Margen" htmlFor="margin">
        <Select
          id="margin"
          value={content.margin || 'm-0'}
          onChange={(e) => onChange('margin', e.target.value)}
          options={marginOptions}
        />
      </FormField>

      <FormField label="Ancho" htmlFor="width">
        <Select
          id="width"
          value={content.width || 'w-full'}
          onChange={(e) => onChange('width', e.target.value)}
          options={widthOptions}
        />
      </FormField>

      <FormField label="Altura mínima" htmlFor="minHeight">
        <Input
          id="minHeight"
          type="text"
          value={content.minHeight || ''}
          onChange={(e) => onChange('minHeight', e.target.value)}
          placeholder="Ejemplo: 200px o 50vh"
        />
      </FormField>

      <FormField label="Ancho máximo" htmlFor="maxWidth">
        <Input
          id="maxWidth"
          type="text"
          value={content.maxWidth || ''}
          onChange={(e) => onChange('maxWidth', e.target.value)}
          placeholder="Ejemplo: 1200px o 80%"
        />
      </FormField>

      <FormField label="Índice Z" htmlFor="zIndex">
        <Input
          id="zIndex"
          type="number"
          value={content.zIndex || '0'}
          onChange={(e) => onChange('zIndex', Number(e.target.value))}
        />
      </FormField>
    </EditorSection>
  );
}
