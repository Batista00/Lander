import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ComponentRenderer } from '@/components/page-builder/ComponentRenderer';
import { landingPageService } from '@/services/landingPageService';

interface PublishedData {
  components: any[];
  settings: any;
}

export function PublishedPage() {
  const { pageId } = useParams();
  const [publishedData, setPublishedData] = useState<PublishedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!pageId) {
          throw new Error('No se proporcionó un ID de página');
        }

        const data = await landingPageService.getPublishedPage(pageId);
        if (!data) {
          throw new Error('Página no encontrada');
        }

        setPublishedData(data);
      } catch (err) {
        if (err instanceof Error) {
          if (err.message === 'not-found') {
            setError('La página no existe');
          } else if (err.message === 'not-published') {
            setError('Esta página no está publicada');
          } else {
            setError(err.message);
          }
        } else {
          setError('Error desconocido al cargar la página');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!publishedData || !publishedData.components) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-600 mb-4">No encontrado</h1>
          <p className="text-gray-600">La página solicitada no existe o está vacía</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {publishedData.components.map((component) => (
        <ComponentRenderer
          key={component.id}
          component={component}
          isEditing={false}
        />
      ))}
    </div>
  );
}
