import { landingPageService } from '@/services/landingPageService';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    try {
        // Primero intentamos buscar por ID
        let landing = await landingPageService.getLandingPageById(params.id);
        
        // Si no encontramos por ID, intentamos buscar por dominio personalizado
        if (!landing) {
            landing = await landingPageService.getLandingPageByDomain(params.id);
        }

        if (!landing) {
            throw error(404, {
                message: 'Página no encontrada',
                code: 'NOT_FOUND'
            });
        }

        if (!landing.published) {
            throw error(403, {
                message: 'Esta página no está publicada',
                code: 'NOT_PUBLISHED'
            });
        }

        return {
            landing
        };
    } catch (e) {
        throw error(404, {
            message: 'Página no encontrada',
            code: 'NOT_FOUND'
        });
    }
};
