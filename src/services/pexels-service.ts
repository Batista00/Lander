import { createClient, Photo, PhotosWithTotalResults } from 'pexels';

class PexelsService {
  private client: ReturnType<typeof createClient>;

  constructor() {
    this.client = createClient(import.meta.env.VITE_PEXELS_API_KEY);
  }

  async searchImages(query: string, options?: {
    orientation?: 'landscape' | 'portrait' | 'square';
    size?: 'large' | 'medium' | 'small';
    color?: string;
    perPage?: number;
    page?: number;
  }): Promise<Photo[]> {
    try {
      const result = await this.client.photos.search({
        query,
        orientation: options?.orientation,
        size: options?.size,
        color: options?.color,
        per_page: options?.perPage || 10,
        page: options?.page || 1
      }) as PhotosWithTotalResults;

      return result.photos;
    } catch (error) {
      console.error('Error searching Pexels images:', error);
      return [];
    }
  }

  async getCuratedPhotos(options?: {
    perPage?: number;
    page?: number;
  }): Promise<Photo[]> {
    try {
      const result = await this.client.photos.curated({
        per_page: options?.perPage || 10,
        page: options?.page || 1
      }) as PhotosWithTotalResults;

      return result.photos;
    } catch (error) {
      console.error('Error getting curated photos:', error);
      return [];
    }
  }

  getPhotoUrl(photo: Photo, size: 'original' | 'large' | 'medium' | 'small' = 'large'): string {
    switch (size) {
      case 'original':
        return photo.src.original;
      case 'large':
        return photo.src.large;
      case 'medium':
        return photo.src.medium;
      case 'small':
        return photo.src.small;
      default:
        return photo.src.large;
    }
  }
}

export const pexelsService = new PexelsService();
