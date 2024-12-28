import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { landingPageService } from '@/services/landingPageService';
import { LandingPage } from '@/types/landing';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/toast';
import { Trash2, Edit, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';
import { DashboardHead } from '@/components/dashboard/DashboardHead';

export default function LandingPages() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [landings, setLandings] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [landingToDelete, setLandingToDelete] = useState<LandingPage | null>(null);
  const [selectedLandings, setSelectedLandings] = useState<string[]>([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  useEffect(() => {
    loadLandings();
  }, [user]);

  const loadLandings = async () => {
    if (!user) return;
    try {
      console.log('Cargando landing pages para usuario:', user.uid);
      const pages = await landingPageService.getLandingPages();
      console.log('Landing pages cargadas:', pages);
      setLandings(pages);
    } catch (error) {
      console.error('Error loading landings:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las landing pages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (landing: LandingPage) => {
    setLandingToDelete(landing);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!landingToDelete) return;

    try {
      await landingPageService.deleteLandingPage(landingToDelete.id);
      setLandings(prev => prev.filter(l => l.id !== landingToDelete.id));
      toast({
        title: "Landing eliminada",
        description: "La landing page se ha eliminado correctamente"
      });
    } catch (error) {
      console.error('Error deleting landing:', error);
      let errorMessage = "No se pudo eliminar la landing page";
      
      if (error instanceof Error) {
        if (error.message === 'not-found') {
          errorMessage = "La página no existe o ya fue eliminada";
        } else if (error.message === 'permission-denied') {
          errorMessage = "No tienes permiso para eliminar esta página";
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
      setLandingToDelete(null);
    }
  };

  const handleBulkDelete = () => {
    setBulkDeleteDialogOpen(true);
  };

  const confirmBulkDelete = async () => {
    try {
      await Promise.all(selectedLandings.map(id => 
        landingPageService.deleteLandingPage(id)
      ));
      setLandings(prev => prev.filter(l => !selectedLandings.includes(l.id)));
      setSelectedLandings([]);
      toast({
        title: "Landing pages eliminadas",
        description: "Las landing pages se han eliminado correctamente",
        variant: "default"
      });
    } catch (error) {
      console.error('Error deleting landings:', error);
      let errorMessage = "No se pudieron eliminar algunas landing pages";
      
      if (error instanceof Error) {
        if (error.message === 'permission-denied') {
          errorMessage = "No tienes permiso para eliminar una o más páginas";
        }
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setBulkDeleteDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <DashboardHead 
        title="Landing Pages"
        description="Gestiona todas tus landing pages, crea nuevas y monitorea su rendimiento."
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl">Landing Pages</h1>
          <div className="flex gap-2">
            {selectedLandings.length > 0 && (
              <Button onClick={handleBulkDelete} variant="destructive">
                Eliminar seleccionadas ({selectedLandings.length})
              </Button>
            )}
            <Button onClick={() => navigate('/dashboard/landing-pages/new')} className="bg-[#00DC8F] hover:bg-[#00DC8F]/90">
              Nueva Landing Page
            </Button>
          </div>
        </div>

        <div className="bg-[#1E1E1E] rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg">Plan Free</h2>
              <p className="text-sm text-gray-400">{landings.length} de 1 landing pages utilizadas</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/pricing')} className="border-[#00DC8F] text-[#00DC8F] hover:bg-[#00DC8F]/10">
              Actualizar Plan
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {landings.map((landing) => (
            <div key={landing.id} className="bg-[#1E1E1E] rounded-lg p-4">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium">{landing.title}</h3>
                    <p className="text-[#00DC8F] text-sm">Estado: {landing.status || 'Borrador'}</p>
                    <p className="text-sm text-gray-400">Actualizado: {new Date(landing.updatedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-auto">
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
                    className="flex items-center gap-2"
                    onClick={() => navigate(`/dashboard/landing-pages/${landing.id}`)}
                  >
                    <Edit className="h-4 w-4" />
                    Editar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => window.open(`/preview/${landing.id}`, '_blank')}
                  >
                    <Eye className="h-4 w-4" />
                    Vista Previa
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {landings.length === 0 && (
            <div className="text-center py-8 bg-[#1E1E1E] rounded-lg">
              <p className="text-gray-400 mb-4">No tienes landing pages creadas</p>
              <Button onClick={() => navigate('/dashboard/landing-pages/new')} className="bg-[#00DC8F] hover:bg-[#00DC8F]/90">
                Crear mi primera landing page
              </Button>
            </div>
          )}
        </div>

        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Eliminar Landing Page</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que quieres eliminar esta landing page? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Eliminar Landing Pages</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que quieres eliminar las {selectedLandings.length} landing pages seleccionadas? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setBulkDeleteDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={confirmBulkDelete}>
                Eliminar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
