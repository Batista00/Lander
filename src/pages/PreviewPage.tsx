import React from 'react';
import { useParams } from 'react-router-dom';
import { landingPageService } from '@/services/landingPageService';
import { ComponentRenderer } from '@/components/page-builder/ComponentRenderer';
import { Loader2 } from 'lucide-react';

export const PreviewPage: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const [components, setComponents] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadPreview = async () => {
      if (!pageId) {
        setError('ID de página no válido');
        setLoading(false);
        return;
      }

      try {
        // Primero intentamos cargar desde localStorage para una vista previa instantánea
        const cachedData = localStorage.getItem(`preview_${pageId}`);
        if (cachedData) {
          const { components: cachedComponents, lastUpdated } = JSON.parse(cachedData);
          setComponents(cachedComponents);
        }

        // Luego cargamos los datos actuales de la base de datos
        const page = await landingPageService.getLandingPageById(pageId);
        if (page) {
          setComponents(page.components);
          // Actualizamos el caché
          localStorage.setItem(`preview_${pageId}`, JSON.stringify({
            components: page.components,
            lastUpdated: new Date().toISOString()
          }));
        } else {
          setError('La página no existe');
        }
      } catch (error) {
        console.error('Error al cargar la vista previa:', error);
        setError('Error al cargar la vista previa');
      } finally {
        setLoading(false);
      }
    };

    loadPreview();
  }, [pageId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {components.map((component) => (
        <ComponentRenderer key={component.id} component={component} />
      ))}
    </div>
  );
};
