import { Component } from './landing';

export type TemplateCategory = 
  | 'business'
  | 'technology'
  | 'creative'
  | 'ecommerce'
  | 'education'
  | 'health'
  | 'nonprofit'
  | 'restaurant'
  | 'real-estate'
  | 'portfolio';

export interface TemplateStyle {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
    background: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    headings: {
      fontFamily?: string;
      weight: number;
      letterSpacing?: string;
    };
    body: {
      fontFamily?: string;
      weight: number;
      letterSpacing?: string;
    };
  };
  spacing: {
    sectionPadding: string;
    elementSpacing: string;
    containerWidth: string;
  };
  borders: {
    radius: string;
    width: string;
    style: string;
  };
  effects: {
    buttonHover: string;
    cardHover: string;
    transition: string;
  };
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: TemplateCategory;
  components: Component[];
  style: TemplateStyle;
  metadata: {
    createdAt: string;
    updatedAt: string;
    author: string;
    version: string;
    tags: string[];
  };
  configuration?: {
    maxSections?: number;
    allowedComponents?: string[];
    requiredComponents?: string[];
    customCSS?: string;
  };
}
