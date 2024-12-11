import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteLandingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  landingName: string;
}

export function DeleteLandingModal({
  isOpen,
  onClose,
  onDelete,
  landingName
}: DeleteLandingModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar Landing Page</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que quieres eliminar la landing page "{landingName}"? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center gap-2 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <p className="text-sm text-gray-500">
            Todos los datos asociados con esta landing page serán eliminados permanentemente.
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" className="bg-red-600 hover:bg-red-700" onClick={onDelete}>
            Eliminar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
