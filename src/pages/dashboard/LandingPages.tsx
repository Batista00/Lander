import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/card';
import {
  Plus,
  Search,
  Settings,
  Bell,
  HelpCircle,
  Grid as GridIcon,
  List,
  Filter,
  SortAsc,
  Trash2,
} from 'lucide-react';
import { PageBuilder } from '@/components/page-builder/PageBuilder';
import { DeleteLandingModal } from '@/components/page-builder/DeleteLandingModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useLandingStore } from '@/store/landingStore';
import { useAuthStore } from '@/store/auth';
import type { Landing } from '@/store/landingStore';

export function LandingPages() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const [isBuilding, setIsBuilding] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [landingToDelete, setLandingToDelete] = useState<Landing | null>(null);
  const [showNewLandingDialog, setShowNewLandingDialog] = useState(false);
  const [newLandingName, setNewLandingName] = useState('');
  
  const { landings = [], removeLanding, addLanding, currentLanding, loadLandings } = useLandingStore();

  useEffect(() => {
    // Cargar las landing pages al montar el componente
    loadLandings();
  }, [loadLandings]);

  useEffect(() => {
    // Si no está autenticado, redirigir al login
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleDelete = (landing: Landing) => {
    setLandingToDelete(landing);
  };

  const confirmDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta landing page?')) {
      removeLanding(id);
    }
  };

  const handleCreateNew = () => {
    setShowNewLandingDialog(true);
  };

  const handleCreateLanding = async () => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    if (newLandingName.trim()) {
      try {
        const newLanding = await addLanding(newLandingName.trim());
        setNewLandingName('');
        setShowNewLandingDialog(false);
        
        // Asegurarnos de que tenemos un ID válido
        if (newLanding && newLanding.id) {
          // Recargar la lista de landings
          await loadLandings();
          // Navegar al editor
          navigate(`/dashboard/landing-pages/editor/${newLanding.id}`);
        } else {
          console.error('La landing page creada no tiene ID');
        }
      } catch (error) {
        console.error('Error al crear la landing page:', error);
      }
    }
  };

  const handleEdit = (id: string) => {
    if (!id) {
      console.error('ID de landing page inválido');
      return;
    }
    navigate(`/dashboard/landing-pages/editor/${id}`);
  };

  // Si hay una landing page actual y estamos en modo construcción, mostrar el editor
  if (currentLanding && isBuilding) {
    return (
      <div className="h-[calc(100vh-6rem)]">
        <PageBuilder landing={currentLanding} onClose={() => setIsBuilding(false)} />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="border-b bg-white">
          <div className="flex h-16 items-center px-4">
            <div className="flex-1">
              <h1 className="text-2xl font-semibold">Landing Pages</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleCreateNew}
                size="sm"
              >
                <Plus className="mr-2 h-4 w-4" />
                Nueva Landing Page
              </Button>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="border-b bg-gray-50/40 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                <Input
                  placeholder="Buscar landing pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
              </Button>
              <Button variant="outline" size="sm">
                <SortAsc className="mr-2 h-4 w-4" />
                Ordenar
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <GridIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {landings.map((landing) => (
                <Card key={landing.id} className="relative group">
                  <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                    {landing.thumbnail ? (
                      <img
                        src={landing.thumbnail}
                        alt={landing.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        Sin vista previa
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{landing.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {landing.publishedUrl ? 'Publicada' : 'Borrador'}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(landing.id)}
                      >
                        Editar
                      </Button>
                      {landing.publishedUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(landing.publishedUrl, '_blank')}
                        >
                          Ver Publicada
                        </Button>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(landing)}
                    className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {landings.map((landing) => (
                <div
                  key={landing.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border"
                >
                  <div>
                    <h3 className="font-semibold">{landing.name}</h3>
                    <p className="text-sm text-gray-500">
                      {landing.publishedUrl ? 'Publicada' : 'Borrador'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(landing.id)}
                    >
                      Editar
                    </Button>
                    {landing.publishedUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(landing.publishedUrl, '_blank')}
                      >
                        Ver Publicada
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(landing)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Diálogo de nueva landing page */}
      <Dialog open={showNewLandingDialog} onOpenChange={setShowNewLandingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Landing Page</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Nombre de la landing page"
              value={newLandingName}
              onChange={(e) => setNewLandingName(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewLandingDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateLanding} disabled={!newLandingName.trim()}>
              Crear
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmación de eliminación */}
      <DeleteLandingModal
        isOpen={!!landingToDelete}
        onClose={() => setLandingToDelete(null)}
        onConfirm={() => {
          if (landingToDelete) {
            confirmDelete(landingToDelete.id);
            setLandingToDelete(null);
          }
        }}
        landingName={landingToDelete?.name || ''}
      />
    </>
  );
}