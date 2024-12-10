import React from 'react';
import { useParams } from 'react-router-dom';
import { landingPageService } from '@/services/landingPageService';
import { ComponentRenderer } from '@/components/page-builder/ComponentRenderer';

export const PublicLandingPage: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const [landingPage, setLandingPage] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadLandingPage = async () => {
      try {
        if (!pageId) {
          throw new Error('Page ID not found');
        }

        const page = await landingPageService.getLandingPageById(pageId);
        if (!page) {
          throw new Error('Landing page not found');
        }

        if (!page.isPublished) {
          throw new Error('This landing page is not published');
        }

        setLandingPage(page);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadLandingPage();
  }, [pageId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {landingPage.components.map((component: any, index: number) => (
        <ComponentRenderer
          key={component.id || index}
          component={component}
          isEditing={false}
        />
      ))}
    </div>
  );
};
