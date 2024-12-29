import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { landingPageService } from '@/services/landingPageService';
import { LandingPage } from '@/types/landing';
import { LandingPreview } from '@/components/page-builder/preview/LandingPreview';
import { Loader2 } from 'lucide-react';

export function PreviewPage() {
  const { id } = useParams<{ id: string }>();
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPage() {
      if (!id) return;

      try {
        setLoading(true);
        const page = await landingPageService.getLandingPage(id);
        setLandingPage(page);
      } catch (error) {
        console.error('Error loading landing page:', error);
        setError('No se pudo cargar la landing page');
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !landingPage) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Error</h1>
          <p className="mt-2 text-gray-600">{error || 'No se encontró la landing page'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <LandingPreview landingPage={landingPage} />
    </div>
  );
}
