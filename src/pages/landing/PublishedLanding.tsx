import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { landingPageService } from '@/services/landingPageService';
import { LandingPage } from '@/types/landing-page';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { RenderLandingPage } from '@/components/page-builder/RenderLandingPage';

const PublishedLanding = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);

  useEffect(() => {
    const loadLandingPage = async () => {
      try {
        if (!id) throw new Error('ID no válido');

        const page = await landingPageService.getLandingPageById(id);
        
        if (!page) {
          throw new Error('Landing page no encontrada');
        }

        // Verificar si la página está publicada
        if (page.status !== 'published') {
          throw new Error('Esta landing page no está publicada');
        }

        // Verificar si la página ha expirado
        if (page.publishConfig?.expirationDate) {
          const expirationDate = new Date(page.publishConfig.expirationDate);
          if (expirationDate < new Date()) {
            throw new Error('Esta landing page ha expirado');
          }
        }

        // Si la página requiere contraseña y no se ha ingresado
        if (page.publishConfig?.hasPassword && !password) {
          setShowPasswordPrompt(true);
          setLandingPage(page);
          return;
        }

        setLandingPage(page);
        setError(null);
        setShowPasswordPrompt(false);
      } catch (err) {
        console.error('Error loading landing page:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar la landing page');
        toast({
          title: "Error",
          description: err instanceof Error ? err.message : 'Error al cargar la landing page',
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadLandingPage();
  }, [id, password, toast]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Aquí deberíamos verificar la contraseña con el hash almacenado
      // Por ahora solo ocultamos el prompt
      setShowPasswordPrompt(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Contraseña incorrecta",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !landingPage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-gray-600 mb-4">{error || 'No se pudo cargar la landing page'}</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  if (showPasswordPrompt) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">Página Protegida</h2>
          <p className="text-gray-600 mb-4 text-center">
            Esta página está protegida con contraseña
          </p>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Ingresa la contraseña"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <RenderLandingPage
        landingPage={landingPage}
        mode="published"
      />
    </div>
  );
};

export default PublishedLanding;
