import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLandingStore } from '@/store/landingStore';

export function PublishedLanding() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { components, publishInfo } = useLandingStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPage = () => {
      try {
        if (!id) {
          throw new Error('ID no válido');
        }

        // Verificar si la landing está publicada
        if (publishInfo.status !== 'published') {
          throw new Error('Esta landing page no está disponible o ha sido despublicada.');
        }

        // Verificar si la URL coincide con el ID
        const expectedPath = `/landing/${id}`;
        const currentUrl = new URL(publishInfo.url || '');
        if (!currentUrl.pathname.endsWith(expectedPath)) {
          throw new Error('Esta landing page no está disponible o ha sido despublicada.');
        }

        setError('');
      } catch (err: any) {
        setError(err.message || 'Error al cargar la landing page');
      } finally {
        setIsLoading(false);
      }
    };

    loadPage();
  }, [id, publishInfo]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-600">Cargando landing page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">404</h1>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => navigate('/dashboard/landing-pages')}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Volver al dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {components.map((component) => (
          <div 
            key={component.id}
            className="my-8"
            style={{
              ...component.style,
              backgroundColor: component.content.backgroundColor,
              color: component.content.textColor,
            }}
          >
            {component.content.title && (
              <h2 
                className="text-3xl font-bold mb-4"
                style={{
                  textAlign: component.content.alignment || 'left'
                }}
              >
                {component.content.title}
              </h2>
            )}
            {component.content.subtitle && (
              <h3 
                className="text-xl text-gray-600 mb-4"
                style={{
                  textAlign: component.content.alignment || 'left'
                }}
              >
                {component.content.subtitle}
              </h3>
            )}
            {component.content.description && (
              <p 
                className="text-gray-700"
                style={{
                  textAlign: component.content.alignment || 'left'
                }}
              >
                {component.content.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
