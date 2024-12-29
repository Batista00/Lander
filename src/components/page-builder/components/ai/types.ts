import { HeroProps, FeaturesProps, BenefitsProps, CTAProps } from '../base';
import { BaseComponent } from '@/types/components';

export interface AIContext {
  lastGeneration: Date;
  tokensUsed: number;
  improvements: string[];
}

export interface AIComponentBase extends BaseComponent {
  aiContext: AIContext;
}

export interface AIHeroComponent extends AIComponentBase {
  type: 'hero';
  props: HeroProps;
}

export interface AIFeaturesComponent extends AIComponentBase {
  type: 'features';
  props: FeaturesProps;
}

export interface AIBenefitsComponent extends AIComponentBase {
  type: 'benefits';
  props: BenefitsProps;
}

export interface AICTAComponent extends AIComponentBase {
  type: 'cta';
  props: CTAProps;
}

export type AIComponent = 
  | AIHeroComponent 
  | AIFeaturesComponent 
  | AIBenefitsComponent 
  | AICTAComponent;
