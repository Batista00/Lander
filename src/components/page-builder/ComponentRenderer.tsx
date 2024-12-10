import React from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Heading } from './components/Heading';
import { Text } from './components/Text';
import { Image } from './components/Image';
import { Testimonials } from './components/Testimonials';
import { TopBar } from '../landing/TopBar';
import { Header } from '../landing/Header';
import { Pricing } from '../landing/Pricing';
import { Contact } from '../landing/Contact';

interface ComponentRendererProps {
  component: {
    id?: string;
    type: string;
    data: any;
    visible?: boolean;
  };
  isEditing?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const componentMap: { [key: string]: any } = {
  topbar: TopBar,
  header: Header,
  pricing: Pricing,
  contact: Contact,
  hero: Hero,
  features: Features,
  testimonials: Testimonials,
  heading: Heading,
  text: Text,
  image: Image,
};

export function ComponentRenderer({ 
  component, 
  isEditing = false, 
  onEdit,
  onDelete 
}: ComponentRendererProps) {
  const { type, data, id, visible = true } = component;

  if (!visible) {
    return null;
  }

  const Component = componentMap[type];

  if (!Component) {
    return (
      <div className="p-4 border border-red-300 bg-red-50 text-red-600 rounded">
        <p>Componente no soportado: {type}</p>
      </div>
    );
  }

  return (
    <Component
      id={id}
      data={data}
      onEdit={onEdit}
      onDelete={onDelete}
      isEditing={isEditing}
    />
  );
}

ComponentRenderer.displayName = 'ComponentRenderer';
