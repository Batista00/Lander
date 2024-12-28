import { useState, useEffect } from 'react';
import { createClient } from 'pexels';

const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const client = createClient(PEXELS_API_KEY);

interface PexelsImage {
  id: string;
  width: number;
  height: number;
  url: string;
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

interface UsePexelsImagesProps {
  query: string;
  perPage?: number;
}

interface UsePexelsImagesReturn {
  images: PexelsImage[];
  loading: boolean;
  error: Error | null;
  loadMore: () => void;
  hasMore: boolean;
}

export const usePexelsImages = ({ query, perPage = 15 }: UsePexelsImagesProps): UsePexelsImagesReturn => {
  const [images, setImages] = useState<PexelsImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = async (currentPage: number) => {
    try {
      setLoading(true);
      const response = await client.photos.search({
        query,
        per_page: perPage,
        page: currentPage,
        orientation: 'landscape',
        size: 'large',
      });

      if (response.photos.length === 0) {
        setHasMore(false);
      } else {
        setImages(prev => currentPage === 1 ? response.photos : [...prev, ...response.photos]);
      }
    } catch (err) {
      console.error('Error fetching images from Pexels:', err);
      setError(err instanceof Error ? err : new Error('Error fetching images'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    setImages([]);
    setHasMore(true);
    fetchImages(1);
  }, [query]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchImages(nextPage);
    }
  };

  return { images, loading, error, loadMore, hasMore };
};

// Imágenes predeterminadas por categoría
export const getDefaultTemplateImages = (category: string): { preview: string; thumbnail: string } => {
  const defaultImages = {
    business: {
      preview: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    technology: {
      preview: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    startup: {
      preview: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      thumbnail: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    education: {
      preview: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      thumbnail: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    health: {
      preview: 'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      thumbnail: 'https://images.pexels.com/photos/4386464/pexels-photo-4386464.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    default: {
      preview: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  };

  return defaultImages[category as keyof typeof defaultImages] || defaultImages.default;
};
