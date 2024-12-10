import { landingPageService } from '@/services/landingPageService';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    try {
        const landings = await landingPageService.getAllLandingPages();
        return {
            landings
        };
    } catch (error) {
        console.error('Error loading landing pages:', error);
        return {
            landings: []
        };
    }
};
