import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ComponentRenderer } from '@/components/page-builder/ComponentRenderer';
import { HiX, HiDesktopComputer, HiDeviceMobile, HiDeviceTablet } from 'react-icons/hi';
import { landingPageService } from '@/services/landingPageService';
import { LandingPage } from '@/types/landing';
import { toast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';

interface PreviewData {
  components: any[];
  lastUpdated: string;
}

export function Preview() {
  const { pageId } = useParams<{ pageId: string }>();
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isLoading, setIsLoading] = useState(true);

  // Obtener la URL base según el entorno
  const baseUrl = import.meta.env.VITE_APP_URL || 'http://localhost:5173';

  // Cargar datos de Firebase
  const loadLandingPage = useCallback(async () => {
    if (!pageId) return;

    try {
      const page = await landingPageService.getLandingPageById(pageId);
      if (page) {
        setLandingPage(page);
        setPreviewData({
          components: page.components,
          lastUpdated: page.updatedAt.toISOString()
        });
      }
    } catch (error) {
      console.error('Error loading landing page:', error);
      toast.error('Error al cargar la página');
    }
  }, [pageId]);

  // Cargar datos del localStorage (para vista previa en tiempo real)
  const loadPreviewData = useCallback(() => {
    if (!pageId) return;
    
    const data = localStorage.getItem(`preview_${pageId}`);
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        if (parsedData && Array.isArray(parsedData.components)) {
          setPreviewData(parsedData);
        }
      } catch (error) {
        console.error('Error parsing preview data:', error);
      }
    }
  }, [pageId]);

  // Efecto inicial para cargar datos
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await loadLandingPage();
      loadPreviewData();
      setIsLoading(false);
    };

    loadData();

    // Configurar polling para localStorage
    const interval = setInterval(loadPreviewData, 1000);
    return () => clearInterval(interval);
  }, [pageId, loadLandingPage, loadPreviewData]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!previewData && !landingPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No hay contenido para previsualizar</p>
      </div>
    );
  }

  const handleClose = () => {
    window.close();
  };

  const getDeviceWidth = () => {
    switch (viewMode) {
      case 'mobile':
        return 'w-[375px]';
      case 'tablet':
        return 'w-[768px]';
      default:
        return 'w-full';
    }
  };

  const components = previewData?.components || landingPage?.components || [];
  const lastUpdated = previewData?.lastUpdated || landingPage?.updatedAt?.toISOString() || '';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra de herramientas */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setViewMode('desktop')}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === 'desktop' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-800'
              )}
              title="Vista de Escritorio"
            >
              <HiDesktopComputer className="w-6 h-6" />
            </button>
            <button
              onClick={() => setViewMode('tablet')}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === 'tablet' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-800'
              )}
              title="Vista de Tablet"
            >
              <HiDeviceTablet className="w-6 h-6" />
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={cn(
                "p-2 rounded-lg transition-colors",
                viewMode === 'mobile' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-800'
              )}
              title="Vista Móvil"
            >
              <HiDeviceMobile className="w-6 h-6" />
            </button>
            <div className="text-sm text-gray-500">
              Última actualización: {new Date(lastUpdated).toLocaleString()}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {landingPage?.status === 'published' && (
              <a
                href={`/landing/${pageId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Ver página publicada
              </a>
            )}
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
      <div className="pt-16 min-h-screen flex justify-center bg-gray-100 p-4">
        <div
          className={cn(
            "bg-white transition-all duration-300 shadow-lg rounded-lg",
            getDeviceWidth(),
            viewMode !== 'desktop' && "my-4"
          )}
        >
          {components.map((component) => (
            <ComponentRenderer 
              key={component.id} 
              component={component}
              viewMode={viewMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
