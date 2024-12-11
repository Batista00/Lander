import { useState } from "react"
import { Search } from "lucide-react"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface TempDialogProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export function TempDialog({ open, onClose, onSubmit }: TempDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Título del Diálogo</DialogTitle>
          <DialogDescription>
            Descripción del propósito de este diálogo.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9"
              />
            </div>
          </div>
          
          <div className="h-[400px] pr-4 overflow-y-auto">
            {/* Contenido del área scrolleable */}
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={() => {
              toast.success("¡Operación exitosa!")
              onSubmit({})
            }}>
              Aceptar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
