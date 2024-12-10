import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useLandingStore from '../../store/landingStore';

export default function PublishedLanding() {
  const router = useRouter();
  const { id } = router.query;
  const { components, publishInfo } = useLandingStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!router.isReady) return;

    // Verificar si la landing está publicada y coincide con el ID
    const currentUrl = window.location.href;
    if (publishInfo.status !== 'published' || !publishInfo.url || !currentUrl.includes(publishInfo.url)) {
      setError('Esta landing page no está disponible o ha sido despublicada.');
    }

    setIsLoading(false);
  }, [router.isReady, publishInfo, id]);

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
            onClick={() => router.push('/')}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  // Renderizar los componentes de la landing page
  return (
    <div className="min-h-screen">
      {components.map((component) => (
        <div key={component.id}>
          {/* Aquí renderizarías cada componente según su tipo */}
          {/* Usar el mismo sistema de renderizado que en PageBuilder pero sin los controles de edición */}
          <pre>{JSON.stringify(component, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}
