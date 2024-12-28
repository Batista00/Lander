import { Template } from '../types/templates';
import { LandingPage } from '../types/landing';
import { landingPageService } from './landingPageService';
import { getCurrentUser } from '../lib/auth';

export const templateService = {
  useTemplate: async (template: Template): Promise<LandingPage> => {
    try {
      const user = getCurrentUser();
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      // Crear una nueva landing page basada en el template
      const landingData = {
        name: `${template.title} - ${new Date().toLocaleDateString()}`,
        description: template.description,
        sections: template.sections || [],
        components: template.components || [],
        userId: user.uid,
        settings: {
          seo: {
            title: template.title,
            description: template.description,
            keywords: template.tags?.join(', ') || ''
          }
        },
        status: 'draft',
        analytics: {
          views: 0,
          leads: 0,
          conversions: 0
        }
      };

      const newLanding = await landingPageService.create(landingData);

      if (!newLanding || !newLanding.id) {
        throw new Error('Error al crear la landing page');
      }

      return newLanding;
    } catch (error) {
      console.error('Error en useTemplate:', error);
      throw error;
    }
  },

  saveLanding: async (landing: LandingPage): Promise<LandingPage> => {
    try {
      return await landingPageService.update(landing.id, landing);
    } catch (error) {
      console.error('Error en saveLanding:', error);
      throw error;
    }
  },

  publishLanding: async (landing: LandingPage): Promise<LandingPage> => {
    try {
      return await landingPageService.publish(landing.id);
    } catch (error) {
      console.error('Error en publishLanding:', error);
      throw error;
    }
  }
};
