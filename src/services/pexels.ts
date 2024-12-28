import { createClient } from 'pexels';

// Recomiendo mover esto a variables de entorno
const PEXELS_API_KEY = 'TU_API_KEY_AQUI';

const client = createClient(PEXELS_API_KEY);

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
}

export interface PexelsSearchResult {
  total_results: number;
  page: number;
  per_page: number;
  photos: PexelsPhoto[];
  next_page: string;
}

export const pexelsService = {
  async searchPhotos(query: string, perPage: number = 15, page: number = 1): Promise<PexelsSearchResult> {
    try {
      const response = await client.photos.search({
        query,
        per_page: perPage,
        page: page
      });
      return response as PexelsSearchResult;
    } catch (error) {
      console.error('Error fetching photos from Pexels:', error);
      throw error;
    }
  },

  async getPhotoById(id: number): Promise<PexelsPhoto> {
    try {
      const response = await client.photos.show({ id });
      return response as PexelsPhoto;
    } catch (error) {
      console.error('Error fetching photo from Pexels:', error);
      throw error;
    }
  },

  async getCuratedPhotos(perPage: number = 15, page: number = 1): Promise<PexelsSearchResult> {
    try {
      const response = await client.photos.curated({
        per_page: perPage,
        page: page
      });
      return response as PexelsSearchResult;
    } catch (error) {
      console.error('Error fetching curated photos from Pexels:', error);
      throw error;
    }
  },

  getDefaultImages(category: string): { preview: string; thumbnail: string } {
    // Mapeo de categorías a IDs de fotos de Pexels preseleccionadas
    const categoryMap: Record<string, { previewId: number; thumbnailId: number }> = {
      'business': { previewId: 3183150, thumbnailId: 3183153 },
      'technology': { previewId: 1181467, thumbnailId: 1181671 },
      'startup': { previewId: 1181244, thumbnailId: 1181263 },
      'education': { previewId: 5428836, thumbnailId: 5428838 },
      'health': { previewId: 4386464, thumbnailId: 4386466 },
      'default': { previewId: 1181467, thumbnailId: 1181671 }
    };

    const { previewId, thumbnailId } = categoryMap[category] || categoryMap.default;

    return {
      preview: `https://images.pexels.com/photos/${previewId}/pexels-photo-${previewId}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
      thumbnail: `https://images.pexels.com/photos/${thumbnailId}/pexels-photo-${thumbnailId}.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=1`
    };
  }
};
