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
  const [successMessage, setSuccessMessage] = useState('');
  const [publicUrl, setPublicUrl] = useState('');

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
    setIsPublishing(true);
    try {
      await publishLanding({
        seo: {
          title: publishInfo.title || 'Mi Landing Page',
          description: publishInfo.description || 'Una landing page creada con Landing Builder'
        }
      });
      
      const generatedUrl = getPublicUrl();
      if (!generatedUrl) {
        throw new Error('No se pudo generar la URL pública');
      }
      
      setSuccessMessage(`¡Landing page publicada exitosamente! URL pública: ${generatedUrl}`);
      setPublicUrl(generatedUrl);
      toast.success('¡Landing page publicada exitosamente!', {
        description: `Tu landing page está disponible en: ${generatedUrl}`,
        action: {
          label: 'Ver Publicada',
          onClick: () => window.open(generatedUrl, '_blank')
        },
      });
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
  const currentPublicUrl = getPublicUrl();

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

            <div className="mt-8 flex justify-end gap-4">
              {publishInfo.status === 'published' && (
                <button
                  onClick={handleUnpublish}
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Despublicar
                </button>
              )}
              {publishInfo.status === 'published' ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => window.open(currentPublicUrl, '_blank')}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <HiOutlineEye className="mr-2 -ml-1 h-5 w-5" />
                    Ver Publicada
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <HiOutlineClipboard className="mr-2 -ml-1 h-5 w-5" />
                    Copiar URL
                  </button>
                </div>
              ) : (
                <button
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className={`inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    isPublishing ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <HiOutlineGlobeAlt className="mr-2 -ml-1 h-5 w-5" />
                  {isPublishing ? 'Publicando...' : 'Publicar'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
