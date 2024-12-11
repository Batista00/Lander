import React from 'react';
import {
  dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/Button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AddComponentDialogProps } from '../interfaces/ComponentInterfaces';
import { Input } from '@/components/ui/input';
import { Search, Star, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const COMPONENT_TYPES = [
  {
    id: 'topbar',
    name: 'Top Bar',
    description: 'Barra superior con información de contacto y redes sociales',
    icon: '📱',
    category: 'basic',
    tags: ['contacto', 'redes sociales', 'header'],
    isPremium: false,
  },
  {
    id: 'header',
    name: 'Header con Logo',
    description: 'Cabecera con logo, menú de navegación y redes sociales',
    icon: '🎨',
    category: 'basic',
    tags: ['logo', 'navegación', 'header'],
    isPremium: false,
  },
  {
    id: 'pricing',
    name: 'Precios',
    description: 'Muestra tus planes y precios',
    icon: '💰',
    category: 'conversion',
    tags: ['precios', 'planes'],
    isPremium: false,
  },
  {
    id: 'contact',
    name: 'Contacto',
    description: 'Añade un formulario de contacto',
    icon: '✉️',
    category: 'conversion',
    tags: ['contacto', 'formulario'],
    isPremium: false,
  },
  {
    id: 'hero',
    name: 'Hero Section',
    description: 'Una sección principal con título, subtítulo y llamada a la acción',
    icon: '🎯',
    category: 'basic',
    tags: ['header', 'inicio', 'principal'],
    isPremium: false,
  },
  {
    id: 'services',
    name: 'Servicios',
    description: 'Muestra tus servicios o características principales',
    icon: '�?,
    category: 'basic',
    tags: ['servicios', 'features'],
    isPremium: false,
  },
  {
    id: 'features',
    name: 'Características',
    description: 'Lista las características principales de tu producto o servicio',
    icon: '�?,
    category: 'basic',
    tags: ['features', 'lista'],
    isPremium: false,
  },
  {
    id: 'testimonials',
    name: 'Testimonios',
    description: 'Muestra testimonios de tus clientes satisfechos',
    icon: '💬',
    category: 'social',
    tags: ['testimonios', 'reviews'],
    isPremium: false,
  },
  {
    id: 'video-hero',
    name: 'Hero con Video',
    description: 'Sección principal con video de fondo y efectos parallax',
    icon: '🎥',
    category: 'premium',
    tags: ['video', 'hero', 'parallax'],
    isPremium: true,
  },
  {
    id: 'team',
    name: 'Equipo',
    description: 'Presenta a tu equipo con un diseño elegante y profesional',
    icon: '👥',
    category: 'premium',
    tags: ['equipo', 'personal'],
    isPremium: true,
  },
  {
    id: 'portfolio',
    name: 'Portafolio',
    description: 'Galería de proyectos con filtros y efectos visuales',
    icon: '🎨',
    category: 'premium',
    tags: ['portfolio', 'galería', 'proyectos'],
    isPremium: true,
  },
  {
    id: 'blog',
    name: 'Blog Grid',
    description: 'Muestra tus últimos artículos en un grid moderno',
    icon: '📝',
    category: 'premium',
    tags: ['blog', 'artículos', 'noticias'],
    isPremium: true,
  },
  {
    id: 'stats',
    name: 'Estadísticas Animadas',
    description: 'Muestra estadísticas con contadores animados',
    icon: '📊',
    category: 'premium',
    tags: ['estadísticas', 'números', 'datos'],
    isPremium: true,
  },
  {
    id: 'faq',
    name: 'FAQ Interactivo',
    description: 'Preguntas frecuentes con animaciones y búsqueda',
    icon: '�?,
    category: 'premium',
    tags: ['faq', 'preguntas', 'ayuda'],
    isPremium: true,
  }
];

export const AddComponentDialog: React.FC<AddComponentDialogProps> = ({
  open,
  onClose,
  onAdd,
  isPremiumUser = false, // Nuevo prop para verificar si el usuario es premium
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const filteredComponents = COMPONENT_TYPES.filter(component => {
    const matchesSearch = 
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      (selectedCategory === 'free' && !component.isPremium) ||
      (selectedCategory === 'premium' && component.isPremium);

    return matchesSearch && matchesCategory;
  });

  const handleComponentClick = (component: typeof COMPONENT_TYPES[0]) => {
    if (component.isPremium && !isPremiumUser) {
      // Aquí podrías mostrar un modal o mensaje para upgrade
      toast.error('Este es un componente premium. Actualiza tu plan para acceder.');
      return;
    }
    onAdd(component.id);
  };

  return (
    <dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Galería de Componentes</DialogTitle>
          <DialogDescription>
            Explora nuestra colección de componentes y construye tu landing page perfecta.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar componentes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="flex-1">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="free" className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                Gratis
              </TabsTrigger>
              <TabsTrigger value="premium" className="flex items-center gap-1">
                <Crown className="w-4 h-4" />
                Premium
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <ScrollArea className="h-[65vh] px-1">
          <div className="grid grid-cols-2 gap-4" role="listbox">
            {filteredComponents.map((component) => (
              <Button
                key={component.id}
                variant="outline"
                className={`flex items-start p-4 h-auto text-left relative ${
                  component.isPremium && !isPremiumUser ? 'opacity-80' : ''
                }`}
                onClick={() => handleComponentClick(component)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl" aria-hidden="true">{component.icon}</span>
                    <h3 className="font-semibold">{component.name}</h3>
                    {component.isPremium && (
                      <Badge variant="premium" className="ml-auto">
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{component.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {component.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {!isPremiumUser && (
              <span className="flex items-center">
                <Crown className="w-4 h-4 mr-1" />
                Actualiza a Premium para acceder a todos los componentes
              </span>
            )}
          </div>
          <Button variant="outline" onClick={onClose}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </dialog>
  );
};
