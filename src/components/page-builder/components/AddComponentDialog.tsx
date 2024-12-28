import { useState } from 'react';
import { Search, Star, Lock, Sparkles, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type ComponentInfo = {
  type: string;
  name: string;
  icon: string;
  isPremium?: boolean;
  isCallToAction?: boolean;
};

const COMPONENT_CATEGORIES = {
  basic: {
    name: 'Básicos',
    components: [
      { type: 'hero', name: 'Hero', icon: '🎯' },
      { type: 'text', name: 'Texto', icon: '📝' },
      { type: 'image', name: 'Imagen', icon: '🖼️' },
      { type: 'section', name: 'Sección', icon: '⬚' },
      { type: 'features', name: 'Features', icon: '✨' },
      { type: 'button', name: 'Botón', icon: '🔘' },
      { type: 'container', name: 'Contenedor', icon: '▢' },
      { type: 'form', name: 'Formulario', icon: '📋' },
    ]
  },
  cta: {
    name: 'Llamadas a Acción',
    components: [
      { type: 'cta-hero', name: 'Hero CTA', icon: '🎯', isPremium: true, isCallToAction: true },
      { type: 'cta-button', name: 'Botón CTA', icon: '🔥', isPremium: true, isCallToAction: true },
      { type: 'cta-form', name: 'Formulario CTA', icon: '📋', isPremium: true, isCallToAction: true },
      { type: 'cta-pricing', name: 'Precios CTA', icon: '💰', isPremium: true, isCallToAction: true },
      { type: 'cta-countdown', name: 'Contador CTA', icon: '⏱️', isPremium: true, isCallToAction: true },
      { type: 'cta-social', name: 'Social CTA', icon: '📱', isPremium: true, isCallToAction: true },
    ]
  },
  premium: {
    name: 'Premium',
    components: [
      // Componentes Interactivos
      { type: 'carousel', name: 'Carrusel', icon: '🎠', isPremium: true },
      { type: 'tabs', name: 'Pestañas', icon: '📑', isPremium: true },
      { type: 'accordion', name: 'Acordeón', icon: '🎵', isPremium: true },
      { type: 'animated-counter', name: 'Contador', icon: '🔄', isPremium: true },
      { type: 'slider', name: 'Slider', icon: '↔️', isPremium: true },
      { type: 'gallery', name: 'Galería', icon: '🖼️', isPremium: true },
      
      // Componentes de Conversión
      { type: 'pricing', name: 'Precios', icon: '💰', isPremium: true },
      { type: 'testimonials', name: 'Testimonios', icon: '💬', isPremium: true },
      { type: 'reviews', name: 'Reseñas', icon: '⭐', isPremium: true },
      { type: 'faq', name: 'FAQ', icon: '❓', isPremium: true },
      { type: 'comparison', name: 'Comparativa', icon: '⚖️', isPremium: true },
      
      // Componentes Multimedia
      { type: 'video-player', name: 'Video', icon: '🎥', isPremium: true },
      { type: 'audio-player', name: 'Audio', icon: '🎧', isPremium: true },
      { type: '3d-viewer', name: '3D', icon: '🔮', isPremium: true },
      { type: 'maps', name: 'Mapas', icon: '🗺️', isPremium: true },
      { type: 'social-feed', name: 'Feed Social', icon: '📱', isPremium: true },
      { type: 'chat', name: 'Chat', icon: '💭', isPremium: true }
    ]
  }
};

interface AddComponentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (type: string) => void;
  isPremiumUser?: boolean;
}

export function AddComponentDialog({
  open,
  onOpenChange,
  onSelect,
  isPremiumUser = true, // Temporalmente true para desarrollo
}: AddComponentDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('basic');

  const filterComponents = (components: ComponentInfo[]) => {
    return components.filter((component) =>
      component.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleSelectComponent = (component: ComponentInfo) => {
    if (component.isPremium && !isPremiumUser) {
      return;
    }
    onSelect(component.type);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader className="flex-shrink-0 relative pr-8">
          <DialogTitle className="text-black">Añadir Componente</DialogTitle>
          <DialogDescription className="text-gray-600">
            Selecciona el tipo de componente que deseas añadir
          </DialogDescription>
          <DialogClose className="absolute right-2 top-2 opacity-70 ring-offset-white transition-opacity hover:opacity-100">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="relative mb-4 flex-shrink-0">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar componentes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex-1 min-h-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mb-4 flex-shrink-0">
              {Object.entries(COMPONENT_CATEGORIES).map(([key, category]) => (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="text-sm font-semibold text-gray-700 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#1ce480]/80 data-[state=active]:to-[#12c4a0]/80 data-[state=active]:text-black"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {Object.entries(COMPONENT_CATEGORIES).map(([key, category]) => (
                <TabsContent 
                  key={key} 
                  value={key} 
                  className="grid grid-cols-4 gap-3 mt-0"
                  style={{ 
                    margin: 0,
                    display: activeTab === key ? 'grid' : 'none',
                    alignContent: 'start'
                  }}
                >
                  {filterComponents(category.components).map((component) => (
                    <Button
                      key={component.type}
                      variant={component.isPremium ? "secondary" : "outline"}
                      className={cn(
                        "h-24 relative flex flex-col items-center justify-center gap-1 p-2",
                        "transition-colors",
                        component.isPremium && !isPremiumUser && "opacity-80",
                        component.isPremium ? "bg-yellow-100/80 border-2 border-black hover:bg-yellow-200/90" : "hover:bg-gray-100",
                        component.isCallToAction && "ring-2 ring-yellow-400 border-black"
                      )}
                      onClick={() => handleSelectComponent(component)}
                      disabled={component.isPremium && !isPremiumUser}
                    >
                      {component.isPremium && !isPremiumUser && (
                        <Lock className="absolute top-1 right-1 h-4 w-4 text-black" />
                      )}
                      {component.isCallToAction && (
                        <Sparkles className="absolute top-1 left-1 h-4 w-4 text-yellow-500" />
                      )}
                      {component.isPremium && isPremiumUser && (
                        <Star className="absolute top-1 right-1 h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-2xl mb-1 text-black">{component.icon}</span>
                      <span className="text-sm font-bold text-black">{component.name}</span>
                    </Button>
                  ))}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>

        {!isPremiumUser && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg flex-shrink-0">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-base font-bold text-black">Actualiza a Premium</span>
            </div>
            <p className="text-sm text-gray-600 mt-2 mb-3 font-medium">
              Desbloquea componentes premium y llamadas a la acción
            </p>
            <Button 
              variant="default" 
              className="w-full bg-gradient-to-r from-[#1ce480]/90 to-[#12c4a0]/90 hover:from-[#1ce480] hover:to-[#12c4a0] text-black font-semibold" 
              onClick={() => {/* TODO: Implementar upgrade */}}
            >
              Actualizar Ahora
            </Button>
          </div>
        )}
      </DialogContent>

      <style global="true">{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #1ce480 #f3f4f6;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1ce480;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #12c4a0;
        }
      `}</style>
    </Dialog>
  );
}
