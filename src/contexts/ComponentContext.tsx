import React, { createContext, useContext } from 'react';
import { useComponentManager, ComponentConfig } from '@/hooks/useComponentManager';

interface ComponentContextType {
  // Estado
  selectedComponent: ComponentConfig | null;
  draggedComponent: ComponentConfig | null;
  componentBeingEdited: ComponentConfig | null;
  favoritesLoading: boolean;
  
  // Handlers de componentes
  handleComponentSelect: (component: ComponentConfig) => void;
  handleComponentDragStart: (component: ComponentConfig) => void;
  handleComponentDragEnd: () => void;
  handleComponentEdit: (component: ComponentConfig) => void;
  
  // Funciones de favoritos
  saveToFavorites: (component: ComponentConfig) => Promise<void>;
  removeFromFavorites: (componentId: string) => Promise<void>;
  getFavoriteComponent: (componentId: string) => any | null;
  isFavorite: (componentId: string) => boolean;
  getFavoritesByCategory: (category: string) => any[];
  searchFavorites: (query: string) => any[];
  getRecentFavorites: (limit?: number) => any[];
  getMostUsedComponents: (limit?: number) => any[];
}

const ComponentContext = createContext<ComponentContextType | undefined>(undefined);

export const useComponents = () => {
  const context = useContext(ComponentContext);
  if (context === undefined) {
    throw new Error('useComponents must be used within a ComponentProvider');
  }
  return context;
};

export const ComponentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const componentManager = useComponentManager();

  return (
    <ComponentContext.Provider value={componentManager}>
      {children}
    </ComponentContext.Provider>
  );
};
