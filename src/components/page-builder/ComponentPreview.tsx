import React from 'react';
import { Component } from '@/store/landingStore';
import {
  Hero,
  Features,
  Products,
  ContactForm,
  Booking,
  Columns,
  Heading,
  Text,
  Container,
  Grid,
  Section,
  List,
  Quote,
  Image,
  Video,
  Gallery,
  Carousel,
} from './components';

interface ComponentPreviewProps {
  component: Component;
  onEdit?: () => void;
}

const componentMap: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  features: Features,
  products: Products,
  contactForm: ContactForm,
  booking: Booking,
  columns: Columns,
  heading: Heading,
  text: Text,
  container: Container,
  grid: Grid,
  section: Section,
  list: List,
  quote: Quote,
  image: Image,
  video: Video,
  gallery: Gallery,
  carousel: Carousel,
};

export function ComponentPreview({ component, onEdit }: ComponentPreviewProps) {
  const Component = componentMap[component.type];

  if (!Component) {
    return (
      <div className="p-4 border-2 border-dashed border-red-300 rounded-lg">
        <p className="text-red-500">
          Componente no encontrado: {component.type}
        </p>
      </div>
    );
  }

  return (
    <div className="relative group">
      <Component
        id={component.id}
        content={component.content}
        onEdit={onEdit}
      />
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 pointer-events-none rounded-lg transition-colors" />
    </div>
  );
}
