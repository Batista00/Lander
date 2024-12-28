import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { useFavorites } from './useFavorites';
import { notify } from '@/components/ui/toast';

export interface ComponentConfig {
  id: string;
  type: string;
  name: string;
  category: string;
  preview: string;
  props: Record<string, any>;
  styles: Record<string, any>;
}

export const useComponentManager = () => {
  const { user } = useAuth();
  const { 
    library,
    loading: favoritesLoading,
    addFavorite,
    removeFavorite,
    getFavoritesByCategory,
    searchFavorites 
  } = useFavorites();

  const [selectedComponent, setSelectedComponent] = useState<ComponentConfig | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<ComponentConfig | null>(null);
  const [componentBeingEdited, setComponentBeingEdited] = useState<ComponentConfig | null>(null);

  const handleComponentSelect = useCallback((component: ComponentConfig) => {
    setSelectedComponent(component);
  }, []);

  const handleComponentDragStart = useCallback((component: ComponentConfig) => {
    setDraggedComponent(component);
  }, []);

  const handleComponentDragEnd = useCallback(() => {
    setDraggedComponent(null);
  }, []);

  const handleComponentEdit = useCallback((component: ComponentConfig) => {
    setComponentBeingEdited(component);
  }, []);

  const saveToFavorites = useCallback(async (component: ComponentConfig) => {
    if (!user) {
      notify.error('Debes iniciar sesión para guardar favoritos');
      return;
    }

    try {
      await addFavorite({
        id: component.id,
        name: component.name,
        type: component.type,
        category: 'General',
        preview: component.preview,
        config: {
          props: component.props,
          styles: component.styles
        },
        tags: []
      });
      notify.success('Componente guardado en favoritos');
    } catch (error) {
      notify.error('Error al guardar en favoritos');
    }
  }, [user, addFavorite]);

  const removeFromFavorites = useCallback(async (componentId: string) => {
    if (!user) {
      notify.error('Debes iniciar sesión para eliminar favoritos');
      return;
    }

    try {
      await removeFavorite(componentId);
      notify.success('Componente eliminado de favoritos');
    } catch (error) {
      notify.error('Error al eliminar de favoritos');
    }
  }, [user, removeFavorite]);

  const getFavoriteComponent = useCallback((componentId: string) => {
    if (!library) return null;
    return library.favorites.find(f => f.id === componentId) || null;
  }, [library]);

  const isFavorite = useCallback((componentId: string) => {
    if (!library) return false;
    return library.favorites.some(f => f.id === componentId);
  }, [library]);

  const getRecentFavorites = useCallback((limit: number = 5) => {
    if (!library) return [];
    return [...library.favorites]
      .sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime())
      .slice(0, limit);
  }, [library]);

  const getMostUsedComponents = useCallback((limit: number = 5) => {
    if (!library) return [];
    // Aquí podrías implementar la lógica para trackear el uso de componentes
    // Por ahora retornamos los primeros N favoritos
    return library.favorites.slice(0, limit);
  }, [library]);

  return {
    // Estado
    selectedComponent,
    draggedComponent,
    componentBeingEdited,
    favoritesLoading,
    library,

    // Handlers de componentes
    handleComponentSelect,
    handleComponentDragStart,
    handleComponentDragEnd,
    handleComponentEdit,

    // Funciones de favoritos
    saveToFavorites,
    removeFromFavorites,
    getFavoriteComponent,
    isFavorite,
    getFavoritesByCategory,
    searchFavorites,
    getRecentFavorites,
    getMostUsedComponents,
  };
};
