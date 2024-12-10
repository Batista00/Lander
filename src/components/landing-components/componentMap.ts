import { Hero } from './Hero';
import { Services } from './Services';
import { Testimonials } from './Testimonials';
import { Header } from './Header';

export const componentMap = {
  hero: Hero,
  services: Services,
  testimonials: Testimonials,
  header: Header,
} as const;

export type ComponentType = keyof typeof componentMap;
