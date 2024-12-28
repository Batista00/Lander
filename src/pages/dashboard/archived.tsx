import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { landingPageService } from '@/services/landingPageService';
import { LandingPage } from '@/types/landing';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/toast';
import { Trash2, RefreshCw, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';

export default function Archived() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [archived, setArchived] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<LandingPage | null>(null);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  useEffect(() => {
    loadArchived();
  }, [user]);

  const loadArchived = async () => {
    if (!user) return;
    try {
      const pages = await landingPageService.getArchivedPages(user.uid);
      setArchived(pages);
    } catch (error) {
      console.error('Error loading archived pages:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las páginas archivadas",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (page: LandingPage) => {
    setPageToDelete(page);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!pageToDelete) return;

    try {
      await landingPageService.deleteArchivedPage(pageToDelete.id);
      setArchived(prev => prev.filter(p => p.id !== pageToDelete.id));
      toast({
        title: "Éxito",
        description: "Página eliminada correctamente",
        variant: "success"
      });
    } catch (error) {
      console.error('Error deleting page:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la página",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
      setPageToDelete(null);
    }
  };

  const handleBulkDelete = () => {
    setBulkDeleteDialogOpen(true);
  };

  const confirmBulkDelete = async () => {
    try {
      await Promise.all(selectedPages.map(id => 
        landingPageService.deleteArchivedPage(id)
      ));
      setArchived(prev => prev.filter(p => !selectedPages.includes(p.id)));
      setSelectedPages([]);
      toast({
        title: "Éxito",
        description: "Páginas eliminadas correctamente",
        variant: "success"
      });
    } catch (error) {
      console.error('Error deleting pages:', error);
      toast({
        title: "Error",
        description: "No se pudieron eliminar las páginas",
        variant: "destructive"
      });
    } finally {
      setBulkDeleteDialogOpen(false);
    }
  };

  const handleRestore = async (pageId: string) => {
    try {
      await landingPageService.restoreArchivedPage(pageId);
      setArchived(prev => prev.filter(p => p.id !== pageId));
      toast({
        title: "Éxito",
        description: "Página restaurada correctamente",
        variant: "success"
      });
    } catch (error) {
      console.error('Error restoring page:', error);
      toast({
        title: "Error",
        description: "No se pudo restaurar la página",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Páginas Archivadas</h1>
        {selectedPages.length > 0 && (
          <Button onClick={handleBulkDelete} variant="destructive">
            Eliminar Seleccionadas ({selectedPages.length})
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {archived.map((page) => (
          <div
            key={page.id}
            className="bg-white rounded-lg p-4 shadow flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={selectedPages.includes(page.id)}
                onChange={() => {
                  if (selectedPages.includes(page.id)) {
                    setSelectedPages(prev => prev.filter(id => id !== page.id));
                  } else {
                    setSelectedPages(prev => [...prev, page.id]);
                  }
                }}
                className="h-4 w-4"
              />
              <div>
                <h3 className="font-medium">{page.title}</h3>
                <p className="text-sm text-gray-500">
                  Archivada el: {new Date(page.archivedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRestore(page.id)}
              >
                <RefreshCw className="w-4 h-4 text-green-500" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(page)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Single Page Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Página Archivada</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar esta página permanentemente? Esta acción no se puede deshacer.
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

      {/* Bulk Delete Dialog */}
      <Dialog open={bulkDeleteDialogOpen} onOpenChange={setBulkDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Páginas Archivadas</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar las {selectedPages.length} páginas seleccionadas permanentemente? Esta acción no se puede deshacer.
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
  );
}
