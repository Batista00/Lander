import { Template } from './types';
import { ComponentType } from '@/types/components';
import { modernTheme } from '@/themes/modern';

export const modernBusinessTemplate: Template = {
  id: 'modern-business',
  name: 'Modern Business',
  description: 'Una plantilla moderna y profesional para negocios',
  thumbnail: '/templates/modern-business.jpg',
  category: 'business',
  tags: ['modern', 'business', 'professional'],
  theme: modernTheme,
  components: [
    {
      id: crypto.randomUUID(),
      type: ComponentType.Hero,
      content: {
        title: 'Impulsa tu Negocio al Siguiente Nivel',
        subtitle: 'Soluciones innovadoras para empresas modernas',
        description: 'Ofrecemos las herramientas y servicios que necesitas para hacer crecer tu negocio en la era digital.',
        buttonText: 'Comienza Ahora',
        buttonLink: '#contact',
        buttonStyle: 'primary',
        layout: 'center',
        variant: 'centered'
      },
      styles: {
        variant: 'centered'
      }
    }
    // Aquí puedes agregar más componentes predefinidos para esta plantilla
  ]
};
