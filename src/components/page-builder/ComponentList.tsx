import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Crown } from 'lucide-react';
import { ComponentType } from '@/types/landing';

interface ComponentListProps {
  onSelect: (type: ComponentType) => void;
  onClose: () => void;
}

const FREE_COMPONENTS = [
  { type: 'hero' as ComponentType, name: 'Hero', description: 'Sección principal con título y CTA' },
  { type: 'features' as ComponentType, name: 'Características', description: 'Lista de características' },
  { type: 'services' as ComponentType, name: 'Servicios', description: 'Servicios y productos' },
  { type: 'testimonials' as ComponentType, name: 'Testimonios', description: 'Opiniones de clientes' },
  { type: 'texto' as ComponentType, name: 'Texto', description: 'Bloque de texto' },
  { type: 'imagen' as ComponentType, name: 'Imagen', description: 'Imagen o galería' },
  { type: 'boton' as ComponentType, name: 'Botón', description: 'Botón de acción' }
];

const PREMIUM_COMPONENTS = [
  { type: 'pricing' as ComponentType, name: 'Precios', description: 'Planes y precios' },
  { type: 'form' as ComponentType, name: 'Formulario', description: 'Formulario de contacto' },
  { type: 'faq' as ComponentType, name: 'FAQ', description: 'Preguntas frecuentes' },
  { type: 'gallery' as ComponentType, name: 'Galería', description: 'Galería de imágenes' },
  { type: 'stats' as ComponentType, name: 'Estadísticas', description: 'Números y métricas' },
  { type: 'timeline' as ComponentType, name: 'Línea de tiempo', description: 'Historia o proceso' },
  { type: 'comparison' as ComponentType, name: 'Comparación', description: 'Tabla comparativa' }
];

export function ComponentList({ onSelect, onClose }: ComponentListProps) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Añadir Componente</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <h3 className="text-lg font-semibold mb-4">Componentes Gratuitos</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {FREE_COMPONENTS.map(comp => (
              <Button
                key={comp.type}
                variant="outline"
                className="h-24 flex flex-col items-center justify-center text-center p-4 hover:bg-primary/5"
                onClick={() => {
                  onSelect(comp.type);
                  onClose();
                }}
              >
                <span className="text-lg capitalize">{comp.name}</span>
                <span className="text-sm text-muted-foreground mt-1">{comp.description}</span>
              </Button>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-4 mt-8">Componentes Premium</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PREMIUM_COMPONENTS.map(comp => (
              <div key={comp.type} className="relative">
                <Button
                  variant="outline"
                  className="h-24 w-full flex flex-col items-center justify-center text-center p-4 hover:bg-primary/5"
                  onClick={() => {
                    onSelect(comp.type);
                    onClose();
                  }}
                >
                  <Crown className="h-4 w-4 absolute top-2 right-2 text-yellow-500" />
                  <span className="text-lg capitalize">{comp.name}</span>
                  <span className="text-sm text-muted-foreground mt-1">{comp.description}</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
