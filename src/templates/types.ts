import { Component } from '@/types/components';
import { Theme } from '@/themes/types';

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  components: Component[];
  theme: Theme;
  tags: string[];
  isPremium?: boolean;
}

export interface TemplateRegistry {
  [key: string]: Template;
}
