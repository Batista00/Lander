import { Dialog } from '@headlessui/react';
import { HiOutlineGlobeAlt, HiOutlineClipboard, HiXMark, HiOutlineEye } from 'react-icons/hi2';
import { useLandingStore } from '@/store/landingStore';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface PublishModalProps {
  onClose: () => void;
}

export function PublishModal({ onClose }: PublishModalProps) {
  const { components, publishInfo, publishLanding, unpublishLanding } = useLandingStore();
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState('');

  const getPublicUrl = () => {
    if (typeof publishInfo?.url === 'string') {
      return publishInfo.url;
    }
    if (publishInfo?.url && typeof publishInfo.url === 'object') {
      // Si es un objeto, intentamos obtener la URL como string
      return String(publishInfo.url);
    }
    return '';
  };

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      setError('');
      
      if (!components.length) {
        setError('No hay componentes para publicar. Añade al menos un componente.');
        return;
      }

      const timestamp = Date.now();
      const version = (publishInfo.version || 0) + 1;
      const slug = `${timestamp}-v${version}`;
      const baseUrl = window.location.origin;
      const publicUrl = `${baseUrl}/p/${slug}`;
      
      const publishData = {
        components,
        version,
        publishedAt: new Date().toISOString(),
        url: publicUrl,
        slug,
        status: 'published',
        analytics: {
          views: 0,
          lastView: null
        },
        seo: {
          title: publishInfo.title || 'Mi Landing Page',
          description: publishInfo.description || 'Una landing page creada con Landing Builder',
          keywords: publishInfo.keywords || []
        }
      };

      await publishLanding(publishData);
      
      // Verificar que la URL se haya generado correctamente
      const generatedUrl = getPublicUrl();
      if (!generatedUrl) {
        throw new Error('No se pudo generar la URL pública');
      }

      window.open(generatedUrl, '_blank');
      toast.success('¡Landing page publicada exitosamente!');
      onClose();
      
    } catch (err) {
      console.error('Error al publicar:', err);
      setError(err instanceof Error ? err.message : 'Error al publicar la página. Por favor, intenta de nuevo.');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleUnpublish = async () => {
    try {
      await unpublishLanding();
      toast.success('Landing page despublicada exitosamente');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al despublicar la página.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Error unpublishing:', err);
    }
  };

  const copyToClipboard = async () => {
    try {
      const url = getPublicUrl();
      if (url) {
        await navigator.clipboard.writeText(url);
        toast.success('URL copiada al portapapeles');
      } else {
        throw new Error('No hay URL para copiar');
      }
    } catch (err) {
      console.error('Error copying to clipboard:', err);
      toast.error('Error al copiar la URL');
    }
  };

  // Obtener la URL pública actual
  const publicUrl = getPublicUrl();

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-lg font-medium">
              {publishInfo.status === 'published' ? 'Landing Page Publicada' : 'Publicar Landing Page'}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <HiXMark className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            {publishInfo.lastModifiedAt && (
              <p className="text-sm text-gray-500">
                Última modificación: {new Date(publishInfo.lastModifiedAt).toLocaleString()}
              </p>
            )}

            <div className="rounded-lg bg-gray-50 p-4">
              <h3 className="font-medium">Resumen</h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>• {components.length} componentes</li>
                <li>• Imágenes optimizadas</li>
                <li>• SEO básico incluido</li>
                {publishInfo.version && (
                  <li>• Versión {publishInfo.version}</li>
                )}
                <li>• Estado: <span className={`font-medium ${
                  publishInfo.status === 'published' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {publishInfo.status === 'published' ? 'Publicada' : 'Borrador'}
                </span></li>
              </ul>
            </div>

            {publishInfo.status === 'published' && publicUrl ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <span className="text-sm text-gray-600 truncate">{publicUrl}</span>
                  <button
                    onClick={copyToClipboard}
                    className="ml-2 rounded-md p-2 hover:bg-gray-100"
                    title="Copiar URL"
                  >
                    <HiOutlineClipboard className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => window.open(publicUrl, '_blank')}
                    className="flex items-center space-x-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                  >
                    <HiOutlineEye className="h-5 w-5" />
                    <span>Ver página</span>
                  </button>
                  <button
                    onClick={handleUnpublish}
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                  >
                    Despublicar
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={onClose}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="flex items-center space-x-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isPublishing ? (
                      <>
                        <svg
                          className="h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        <span>Publicando...</span>
                      </>
                    ) : (
                      <>
                        <HiOutlineGlobeAlt className="h-5 w-5" />
                        <span>Publicar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
