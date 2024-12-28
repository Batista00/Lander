import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { ComponentType } from '@/types/components';
import { BASIC_COMPONENTS, PREMIUM_COMPONENTS } from '../core/ComponentRegistry';

interface AddComponentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (componentType: ComponentType) => void;
  isPremiumUser?: boolean;
}

export function AddComponentDialog({
  open,
  onOpenChange,
  onSelect,
  isPremiumUser = false,
}: AddComponentDialogProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  // Combinar componentes básicos y premium
  const allComponents = React.useMemo(() => {
    const components = [
      ...Object.entries(BASIC_COMPONENTS).map(([type, config]) => ({
        type: type as ComponentType,
        ...config,
        isPremium: false
      })),
      ...Object.entries(PREMIUM_COMPONENTS).map(([type, config]) => ({
        type: type as ComponentType,
        ...config,
        isPremium: true
      }))
    ];
    return components;
  }, []);

  const filteredComponents = React.useMemo(() => {
    return allComponents.filter(component => {
      const matchesSearch = 
        component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (component.tags || []).some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      
      const matchesCategory = 
        selectedCategory === 'all' || 
        (selectedCategory === 'premium' && component.isPremium) ||
        (selectedCategory === 'free' && !component.isPremium);
      
      return matchesSearch && matchesCategory;
    });
  }, [allComponents, searchTerm, selectedCategory]);

  const handleSelectComponent = (componentType: ComponentType) => {
    if (!componentType) {
      console.error('Tipo de componente no válido');
      return;
    }
    onSelect(componentType);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Añadir Componente</DialogTitle>
          <DialogDescription>
            Elige un componente para añadir a tu landing page
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Barra de búsqueda */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar componentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtros por categoría */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="w-full justify-start">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="free">Gratis</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Lista de componentes */}
          <ScrollArea className="h-[400px] pr-4">
            <div className="grid grid-cols-2 gap-4">
              {filteredComponents.map((component) => (
                <button
                  key={component.type}
                  onClick={() => handleSelectComponent(component.type)}
                  className={`
                    p-4 rounded-lg border text-left transition-all
                    ${component.isPremium && !isPremiumUser
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:border-primary cursor-pointer'
                    }
                  `}
                  disabled={component.isPremium && !isPremiumUser}
                >
                  <div className="flex items-start space-x-3">
                    {component.icon && (
                      <component.icon className="h-5 w-5 mt-1" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{component.name}</h3>
                        {component.isPremium && (
                          <Badge variant="secondary">Premium</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {component.description}
                      </p>
                      {component.tags && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {component.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};
