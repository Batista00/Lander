import React from 'react';
import {
  Type,
  Image as ImageIcon,
  MessageSquare,
  Grid,
  ListOrdered,
  Quote as QuoteIcon,
  Video as VideoIcon,
  Images,
  Presentation,
  Plus,
  Lock
} from 'lucide-react';
import { useLandingStore } from '../../store/landingStore';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/Button';

interface SidebarMenuProps {
}

const componentTypes = [
  {
    category: 'Básicos',
    items: [
      { type: 'heading', label: 'Encabezado', icon: Type, premium: false },
      { type: 'text', label: 'Texto', icon: MessageSquare, premium: false },
      { type: 'image', label: 'Imagen', icon: ImageIcon, premium: false },
      { type: 'button', label: 'Botón', icon: Plus, premium: false },
    ],
  },
  {
    category: 'Avanzados',
    items: [
      { type: 'carousel', label: 'Carrusel', icon: Presentation, premium: true },
      { type: 'gallery', label: 'Galería', icon: Images, premium: true },
      { type: 'video', label: 'Video', icon: VideoIcon, premium: true },
      { type: 'grid', label: 'Grid', icon: Grid, premium: true },
      { type: 'list', label: 'Lista', icon: ListOrdered, premium: true },
      { type: 'quote', label: 'Cita', icon: QuoteIcon, premium: true },
    ],
  },
];

export const SidebarMenu: React.FC<SidebarMenuProps> = () => {
  const { userSettings, addComponent } = useLandingStore();

  const handleAddComponent = (type: string, premium: boolean) => {
    if (premium && userSettings.plan !== 'premium') {
      toast.error('Esta función solo está disponible para usuarios premium');
      return;
    }

    try {
      addComponent(type);
      toast.success(`Componente ${type} añadido`);
    } catch (error) {
      toast.error('Error al añadir el componente');
    }
  };

  return (
    <div className="w-64 bg-white border-r overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Componentes</h2>
        {componentTypes.map((category) => (
          <div key={category.category} className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">
              {category.category}
            </h3>
            <div className="space-y-2">
              {category.items.map((item) => (
                <Button
                  key={item.type}
                  onClick={() => handleAddComponent(item.type, item.premium)}
                  className="flex items-center w-full justify-start"
                  variant="ghost"
                  size="sm"
                >
                  <item.icon className="w-5 h-5 mr-3 text-gray-600" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.premium && (
                    <Lock className="w-4 h-4 text-gray-400" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
