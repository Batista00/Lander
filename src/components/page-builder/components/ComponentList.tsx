import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PremiumBadge } from '../PremiumBadge';
import { PREMIUM_COMPONENTS } from '@/components/premium/registry';
import { Component } from '../core/types';

interface ComponentListProps {
  components?: Component[];
  selectedId?: string;
  onAdd?: (type: string) => void;
  onSelect?: (component: Component) => void;
  onDelete?: (id: string) => void;
  isPremiumUser: boolean;
}

const BASIC_COMPONENTS = {
  header: {
    name: 'Encabezado',
    icon: 'Layout',
    category: 'basic'
  },
  hero: {
    name: 'Hero',
    icon: 'Image',
    category: 'basic'
  },
  features: {
    name: 'Características',
    icon: 'List',
    category: 'basic'
  },
  pricing: {
    name: 'Precios',
    icon: 'Tag',
    category: 'basic'
  },
  contact: {
    name: 'Contacto',
    icon: 'Mail',
    category: 'basic'
  }
};

export function ComponentList({
  components = [],
  selectedId,
  onAdd,
  onSelect,
  onDelete,
  isPremiumUser
}: ComponentListProps) {
  // Agrupar componentes por categoría
  const categories = {
    basic: Object.entries(BASIC_COMPONENTS),
    premium: Object.entries(PREMIUM_COMPONENTS)
  };

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6 p-2">
        {/* Componentes Básicos */}
        <div>
          <h3 className="font-semibold mb-2">Componentes Básicos</h3>
          <div className="grid grid-cols-2 gap-2">
            {categories.basic.map(([type, component]) => (
              <Button
                key={type}
                variant="outline"
                className="flex flex-col items-center p-4 h-auto"
                onClick={() => onAdd?.(type)}
              >
                <component.icon className="h-6 w-6 mb-2" />
                <span className="text-sm">{component.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Componentes Premium */}
        <div>
          <h3 className="font-semibold mb-2">Componentes Premium</h3>
          <div className="grid grid-cols-2 gap-2">
            {categories.premium.map(([type, component]) => (
              <Button
                key={type}
                variant="outline"
                className="relative flex flex-col items-center p-4 h-auto"
                onClick={() => isPremiumUser ? onAdd?.(type) : undefined}
                disabled={!isPremiumUser}
              >
                <component.icon className="h-6 w-6 mb-2" />
                <span className="text-sm">{component.name}</span>
                {!isPremiumUser && <PremiumBadge />}
              </Button>
            ))}
          </div>
        </div>

        {/* Lista de Componentes Agregados */}
        {components.length > 0 && (
          <div className="mt-8">
            <h3 className="font-semibold mb-2">Componentes en Página</h3>
            <div className="space-y-2">
              {components.map((component, index) => (
                <Draggable
                  key={component.id}
                  draggableId={component.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`
                        p-2 rounded-md border
                        ${selectedId === component.id ? 'border-[#00FF7F] bg-[#00FF7F]/5' : 'border-gray-200'}
                        cursor-move hover:bg-[#00FF7F]/5
                      `}
                      onClick={() => onSelect?.(component)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">
                          {BASIC_COMPONENTS[component.type]?.name || 
                           PREMIUM_COMPONENTS[component.type]?.name ||
                           component.type}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete?.(component.id);
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
