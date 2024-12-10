import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ComponentRenderer } from '@/components/page-builder/ComponentRenderer';
import { HiX, HiDesktopComputer, HiDeviceMobile } from 'react-icons/hi';

interface PreviewData {
  components: any[];
  lastUpdated: string;
}

export function Preview() {
  const { pageId } = useParams<{ pageId: string }>();
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    const loadPreviewData = () => {
      const data = localStorage.getItem(`preview_${pageId}`);
      if (data) {
        try {
          const parsedData = JSON.parse(data);
          setPreviewData(parsedData);
          document.title = `Vista Previa | ${pageId}`;
        } catch (error) {
          console.error('Error parsing preview data:', error);
        }
      }
    };

    loadPreviewData();
    // Actualizar cada segundo para ver cambios en tiempo real
    const interval = setInterval(loadPreviewData, 1000);
    return () => clearInterval(interval);
  }, [pageId]);

  if (!previewData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No hay contenido para previsualizar</p>
      </div>
    );
  }

  const handleClose = () => {
    window.close();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra de herramientas */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-2 rounded-lg ${
                viewMode === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
              }`}
              title="Vista de Escritorio"
            >
              <HiDesktopComputer className="w-6 h-6" />
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-2 rounded-lg ${
                viewMode === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
              }`}
              title="Vista Móvil"
            >
              <HiDeviceMobile className="w-6 h-6" />
            </button>
            <div className="text-sm text-gray-500">
              Última actualización: {new Date(previewData.lastUpdated).toLocaleString()}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleClose}
              className="p-2 text-gray-600 hover:text-gray-800"
              title="Cerrar previsualización"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Contenedor de previsualización */}
      <div className="pt-16 min-h-screen flex justify-center bg-gray-100">
        <div
          className={`bg-white transition-all duration-300 ${
            viewMode === 'mobile' ? 'w-[375px] my-4 shadow-lg rounded-lg' : 'w-full'
          }`}
        >
          {previewData.components.map((component) => (
            <ComponentRenderer key={component.id} component={component} />
          ))}
        </div>
      </div>
    </div>
  );
}
