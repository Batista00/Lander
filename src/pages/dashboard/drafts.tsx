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

export default function Drafts() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [drafts, setDrafts] = useState<LandingPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [draftToDelete, setDraftToDelete] = useState<LandingPage | null>(null);
  const [selectedDrafts, setSelectedDrafts] = useState<string[]>([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  useEffect(() => {
    loadDrafts();
  }, [user]);

  const loadDrafts = async () => {
    if (!user) return;
    try {
      const pages = await landingPageService.getDraftPages(user.uid);
      setDrafts(pages);
    } catch (error) {
      console.error('Error loading drafts:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los borradores",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (draft: LandingPage) => {
    setDraftToDelete(draft);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!draftToDelete) return;

    try {
      await landingPageService.deleteDraft(draftToDelete.id);
      setDrafts(prev => prev.filter(d => d.id !== draftToDelete.id));
      toast({
        title: "Éxito",
        description: "Borrador eliminado correctamente",
        variant: "success"
      });
    } catch (error) {
      console.error('Error deleting draft:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el borrador",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
      setDraftToDelete(null);
    }
  };

  const handleBulkDelete = () => {
    setBulkDeleteDialogOpen(true);
  };

  const confirmBulkDelete = async () => {
    try {
      await Promise.all(selectedDrafts.map(id => 
        landingPageService.deleteDraft(id)
      ));
      setDrafts(prev => prev.filter(d => !selectedDrafts.includes(d.id)));
      setSelectedDrafts([]);
      toast({
        title: "Éxito",
        description: "Borradores eliminados correctamente",
        variant: "success"
      });
    } catch (error) {
      console.error('Error deleting drafts:', error);
      toast({
        title: "Error",
        description: "No se pudieron eliminar los borradores",
        variant: "destructive"
      });
    } finally {
      setBulkDeleteDialogOpen(false);
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
        <h1 className="text-2xl font-bold">Borradores</h1>
        {selectedDrafts.length > 0 && (
          <Button onClick={handleBulkDelete} variant="destructive">
            Eliminar Seleccionados ({selectedDrafts.length})
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {drafts.map((draft) => (
          <div
            key={draft.id}
            className="bg-white rounded-lg p-4 shadow flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={selectedDrafts.includes(draft.id)}
                onChange={() => {
                  if (selectedDrafts.includes(draft.id)) {
                    setSelectedDrafts(prev => prev.filter(id => id !== draft.id));
                  } else {
                    setSelectedDrafts(prev => [...prev, draft.id]);
                  }
                }}
                className="h-4 w-4"
              />
              <div>
                <h3 className="font-medium">{draft.title}</h3>
                <p className="text-sm text-gray-500">
                  Última modificación: {new Date(draft.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/dashboard/landing-pages/${draft.id}`)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(draft)}
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Single Draft Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eliminar Borrador</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este borrador? Esta acción no se puede deshacer.
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
            <DialogTitle>Eliminar Borradores</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar los {selectedDrafts.length} borradores seleccionados? Esta acción no se puede deshacer.
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
