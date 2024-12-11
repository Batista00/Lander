import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Search, Star, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface AddComponentDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (componentType: string) => void;
  isPremiumUser?: boolean;
}

const COMPONENT_TYPES = [
  {
    id: 'topbar',
    name: 'Top Bar',
    description: 'Barra superior con información importante',
    icon: Star,
    category: 'basic',
    tags: ['navegación', 'header'],
    isPremium: false,
  },
  {
    id: 'header',
    name: 'Header',
    description: 'Encabezado principal con navegación',
    icon: Star,
    category: 'basic',
    tags: ['navegación', 'menu'],
    isPremium: false,
  },
  {
    id: 'hero',
    name: 'Hero',
    description: 'Sección principal destacada',
    icon: Star,
    category: 'basic',
    tags: ['principal', 'destacado'],
    isPremium: false,
  },
  {
    id: 'features',
    name: 'Features',
    description: 'Muestra tus servicios o características principales',
    icon: Star,
    category: 'basic',
    tags: ['servicios', 'features'],
    isPremium: false,
  },
  {
    id: 'services',
    name: 'Services',
    description: 'Lista detallada de servicios',
    icon: Star,
    category: 'premium',
    tags: ['servicios', 'ofertas'],
    isPremium: true,
  },
  {
    id: 'testimonials',
    name: 'Testimonials',
    description: 'Testimonios de clientes satisfechos',
    icon: Star,
    category: 'premium',
    tags: ['testimonios', 'reviews'],
    isPremium: true,
  },
  {
    id: 'pricing',
    name: 'Pricing',
    description: 'Planes y precios de tus servicios',
    icon: Star,
    category: 'premium',
    tags: ['precios', 'planes'],
    isPremium: true,
  },
  {
    id: 'contact',
    name: 'Contact',
    description: 'Formulario de contacto',
    icon: Star,
    category: 'basic',
    tags: ['contacto', 'formulario'],
    isPremium: false,
  }
];

export function AddComponentDialog({
  open,
  onClose,
  onAdd,
  isPremiumUser = false,
}: AddComponentDialogProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const filteredComponents = COMPONENT_TYPES.filter(component => {
    const matchesSearch = 
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      (selectedCategory === 'premium' && component.isPremium) ||
      (selectedCategory === 'free' && !component.isPremium);
    
    return matchesSearch && matchesCategory;
  });

  const handleAddComponent = (componentType: string, isPremium: boolean) => {
    if (isPremium && !isPremiumUser) {
      toast.error('Esta es una característica premium. Por favor, actualiza tu plan para acceder.');
      return;
    }
    onAdd(componentType);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir Componente</DialogTitle>
          <DialogDescription>
            Elige un componente para añadir a tu página
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Buscar componentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                prefix={<Search className="w-4 h-4 text-gray-400" />}
              />
            </div>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="free">Gratis</TabsTrigger>
                <TabsTrigger value="premium">Premium</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ScrollArea className="h-[400px] pr-4">
            <div className="grid grid-cols-2 gap-4">
              {filteredComponents.map((component) => (
                <button
                  key={component.id}
                  onClick={() => handleAddComponent(component.id, component.isPremium)}
                  className="flex flex-col items-start p-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <component.icon className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">{component.name}</span>
                    {component.isPremium && (
                      <Badge variant="secondary">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{component.description}</p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
