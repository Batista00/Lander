import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
  Eye,
} from 'lucide-react';
import { PageBuilder } from '@/components/page-builder/PageBuilder';
import { DeleteLandingModal } from '@/components/page-builder/DeleteLandingModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useLandingStore } from '@/store/landingStore';
import { useAuthStore } from '@/store/auth';
import type { Landing } from '@/store/landingStore';
import { landingPageService } from '@/services/landingPageService';
import { toast } from '@/components/ui/toast';

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

  const handleDelete = async (landing: Landing) => {
    try {
      await landingPageService.deleteLandingPage(landing.id);
      removeLanding(landing.id);
      toast({
        title: "Landing eliminada",
        description: "La landing page se ha eliminado correctamente"
      });
    } catch (error) {
      console.error('Error deleting landing:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la landing page",
        variant: "destructive"
      });
    }
  };

  const filteredLandings = landings.filter(landing => 
    landing.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateNew = () => {
    setShowNewLandingDialog(true);
  };

  const handleCreateLanding = async () => {
    if (!isAuthenticated || !user) {
      navigate('/login');
      return;
    }

    // Verificar el plan del usuario
    if (user.subscription?.plan === 'free' && landings.length >= 1) {
      toast({
        title: "Límite alcanzado",
        description: "Tu plan gratuito permite crear solo una landing page. Actualiza tu plan para crear más.",
        variant: "destructive"
      });
      setShowNewLandingDialog(false);
      return;
    }

    if (newLandingName.trim()) {
      try {
        const newLanding = await addLanding(newLandingName.trim());
        setNewLandingName('');
        setShowNewLandingDialog(false);
        
        if (newLanding && newLanding.id) {
          await loadLandings();
          navigate(`/dashboard/landing-pages/editor/${newLanding.id}`);
        } else {
          console.error('La landing page creada no tiene ID');
        }
      } catch (error) {
        console.error('Error al crear la landing page:', error);
        toast({
          title: "Error",
          description: "No se pudo crear la landing page",
          variant: "destructive"
        });
      }
    }
  };

  const handleEdit = (landing: Landing) => {
    console.log('Editando landing:', landing);
    if (!landing || !landing.id) {
      console.error('Landing inválida o sin ID');
      return;
    }
    navigate(`/dashboard/landing-pages/editor/${landing.id}`);
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
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mis Landing Pages</h1>
        <div className="flex gap-4">
          <Input
            type="search"
            placeholder="Buscar landing pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-[300px]"
          />
          <Button onClick={handleCreateNew}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Landing
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredLandings.map((landing) => (
          <Card key={landing.id} className="flex flex-col bg-[#1E1E1E] border-gray-800">
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">{landing.name}</h3>
                  <p className="text-sm text-gray-400">
                    Estado: {landing.status === 'published' ? 'Publicado' : landing.status === 'draft' ? 'Borrador' : 'Archivado'}
                  </p>
                  <p className="text-sm text-gray-400">
                    Actualizado: {new Date(landing.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 mt-auto border-t border-gray-800 flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(landing)}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-950/20"
              >
                <Trash2 className="h-4 w-4" />
                Eliminar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(landing)}
                className="flex items-center gap-2 text-white hover:bg-gray-800"
              >
                <Settings className="h-4 w-4" />
                Editar
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/dashboard/landing-pages/preview/${landing.id}`)}
                className="flex items-center gap-2 text-white hover:bg-gray-800"
              >
                <Eye className="h-4 w-4" />
                Vista Previa
              </Button>
            </div>
          </Card>
        ))}
      </div>

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
            <Button onClick={handleCreateLanding}>
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
            handleDelete(landingToDelete);
            setLandingToDelete(null);
          }
        }}
        landingName={landingToDelete?.name || ''}
      />
    </div>
  );
}