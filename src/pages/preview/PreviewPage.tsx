import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { landingPageService } from '@/services/landingPageService';
import { LandingPage } from '@/types/landing';
import { ComponentRenderer } from '@/components/page-builder/components/ComponentRenderer';

export default function PreviewPage() {
  const { id } = useParams();
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPage = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const pageData = await landingPageService.getLandingPageById(id);
        if (pageData) {
          setLandingPage({
            ...pageData,
            components: Array.isArray(pageData.components) ? pageData.components : [],
            createdAt: new Date(pageData.createdAt),
            updatedAt: new Date(pageData.updatedAt),
            publishedAt: pageData.publishedAt ? new Date(pageData.publishedAt) : null
          });
        }
      } catch (error) {
        console.error('Error loading preview page:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!landingPage) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">No se encontró la página</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {landingPage.components.map((component) => (
        <ComponentRenderer
          key={component.id}
          component={component}
          isEditing={false}
        />
      ))}
    </div>
  );
}
