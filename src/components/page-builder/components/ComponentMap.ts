import { Hero } from './Hero';
import { Features } from './Features';
import { Section } from './Section';
import { Testimonials } from './Testimonials';
import { TextComponent } from './TextComponent';
import { Image } from './Image';
import { Button } from './Button';
import { Form } from './Form';
import { FAQSimple as FAQ } from './FAQSimple';
import { Pricing } from './Pricing';
import { About } from './About';
import { Services } from './Services';
import { Contact } from './Contact';
import { Gallery } from './Gallery';
import { Team } from './Team';
import { Blog } from './Blog';
import { Stats } from './Stats';
import {
  PremiumBlog,
  PremiumTeam,
  PremiumTestimonials,
  PremiumPricing,
  ModernHero,
  ModernContact,
  ModernProjects,
  ModernServices,
  ModernStats,
  ModernTestimonials,
  Newsletter,
  AdvancedBooking,
  HeroCTA,
  FAQ as PremiumFAQ
} from './premium';
import { ComponentType } from '@/types/landing';

export const ComponentMap: { [key in ComponentType]?: React.ComponentType<any> } = {
  // Componentes Base
  [ComponentType.Hero]: Hero,
  [ComponentType.Features]: Features,
  [ComponentType.Text]: TextComponent,
  [ComponentType.Image]: Image,
  [ComponentType.Button]: Button,
  [ComponentType.Testimonios]: Testimonials,
  [ComponentType.Form]: Form,
  [ComponentType.Pricing]: Pricing,
  [ComponentType.FAQ]: FAQ,
  [ComponentType.About]: About,
  [ComponentType.Services]: Services,
  [ComponentType.Contact]: Contact,
  [ComponentType.Gallery]: Gallery,
  [ComponentType.Team]: Team,
  [ComponentType.Blog]: Blog,
  [ComponentType.Stats]: Stats,

  // Componentes Premium
  [ComponentType.PremiumBlog]: PremiumBlog,
  [ComponentType.PremiumTeam]: PremiumTeam,
  [ComponentType.PremiumTestimonials]: PremiumTestimonials,
  [ComponentType.PremiumPricing]: PremiumPricing,
  [ComponentType.ModernHero]: ModernHero,
  [ComponentType.ModernContact]: ModernContact,
  [ComponentType.ModernProjects]: ModernProjects,
  [ComponentType.ModernServices]: ModernServices,
  [ComponentType.ModernStats]: ModernStats,
  [ComponentType.ModernTestimonials]: ModernTestimonials,
  [ComponentType.Newsletter]: Section,
  [ComponentType.AdvancedBooking]: Section,
  [ComponentType.HeroCTA]: HeroCTA,
  [ComponentType.PremiumFAQ]: PremiumFAQ,

  // Componentes Base Adicionales
  [ComponentType.Programs]: Section,
  [ComponentType.Video]: Section,
  [ComponentType.Map]: Section,
  [ComponentType.Social]: Section,
  [ComponentType.Analytics]: Section,
  [ComponentType.Clients]: Section,
  [ComponentType.Carousel]: Section,
  [ComponentType.FAQSimple]: Section,
  [ComponentType.Comparison]: Section,
  [ComponentType.Timeline]: Section,
  [ComponentType.VideoPlayer]: Section,
  [ComponentType.AudioPlayer]: Section,
  [ComponentType.ThreeDViewer]: Section,
  [ComponentType.Maps]: Section,
  [ComponentType.SocialFeed]: Section,
  [ComponentType.Chat]: Section
};

export const defaultComponents = [
  {
    id: '1',
    type: ComponentType.Hero,
    content: {
      title: 'Hero Title',
      subtitle: 'Hero Subtitle',
      description: 'Hero Description'
    }
  }
];
