import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { landingPageService } from '@/services/landingPageService';
import { LandingPage } from '@/types/landing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/toast';
import { Trash2, Eye, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';

export function LandingList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [landings, setLandings] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [landingToDelete, setLandingToDelete] = useState<LandingPage | null>(null);

  useEffect(() => {
    loadLandings();
  }, [user]);

  const loadLandings = async () => {
    if (!user) return;
    try {
      const pages = await landingPageService.getLandingPages();
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

  const handleDelete = async (landing: LandingPage) => {
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
      toast({
        title: "Error",
        description: "No se pudo eliminar la landing page",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
      setLandingToDelete(null);
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {landings.map((landing) => (
          <Card key={landing.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{landing.name}</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(landing)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-gray-500">
                Creada: {new Date(landing.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Estado: {landing.status === 'published' ? 'Publicada' : 'Borrador'}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`/preview/${landing.id}`, '_blank')}
              >
                <Eye className="h-4 w-4 mr-2" />
                Vista Previa
              </Button>
              {landing.status === 'published' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`/p/${landing.id}`, '_blank')}
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Ver Publicada
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
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
    </>
  );
}
