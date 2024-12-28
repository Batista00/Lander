import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { favoritesService, ComponentLibrary, FavoriteComponent } from '@/services/favoritesService';
import { notify } from '@/components/ui/toast';

export const useFavorites = () => {
  const { user } = useAuth();
  const [library, setLibrary] = useState<ComponentLibrary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setLibrary(null);
      setLoading(false);
      return;
    }

    const loadLibrary = async () => {
      try {
        const data = await favoritesService.getLibrary(user.uid);
        setLibrary(data);
        setError(null);
      } catch (err) {
        setError(err as Error);
        notify.error('Error al cargar la biblioteca de componentes');
      } finally {
        setLoading(false);
      }
    };

    loadLibrary();
  }, [user]);

  const addFavorite = async (component: Omit<FavoriteComponent, 'dateAdded'>) => {
    if (!user) {
      notify.error('Debes iniciar sesión para agregar favoritos');
      return;
    }

    try {
      await favoritesService.addFavorite(user.uid, component);
      const updatedLibrary = await favoritesService.getLibrary(user.uid);
      setLibrary(updatedLibrary);
    } catch (err) {
      setError(err as Error);
    }
  };

  const removeFavorite = async (componentId: string) => {
    if (!user) {
      notify.error('Debes iniciar sesión para eliminar favoritos');
      return;
    }

    try {
      await favoritesService.removeFavorite(user.uid, componentId);
      const updatedLibrary = await favoritesService.getLibrary(user.uid);
      setLibrary(updatedLibrary);
    } catch (err) {
      setError(err as Error);
    }
  };

  const addCategory = async (category: string) => {
    if (!user) {
      notify.error('Debes iniciar sesión para agregar categorías');
      return;
    }

    try {
      await favoritesService.addCategory(user.uid, category);
      const updatedLibrary = await favoritesService.getLibrary(user.uid);
      setLibrary(updatedLibrary);
    } catch (err) {
      setError(err as Error);
    }
  };

  const removeCategory = async (category: string) => {
    if (!user) {
      notify.error('Debes iniciar sesión para eliminar categorías');
      return;
    }

    try {
      await favoritesService.removeCategory(user.uid, category);
      const updatedLibrary = await favoritesService.getLibrary(user.uid);
      setLibrary(updatedLibrary);
    } catch (err) {
      setError(err as Error);
    }
  };

  const updateComponentCategory = async (componentId: string, newCategory: string) => {
    if (!user) {
      notify.error('Debes iniciar sesión para actualizar categorías');
      return;
    }

    try {
      await favoritesService.updateComponentCategory(user.uid, componentId, newCategory);
      const updatedLibrary = await favoritesService.getLibrary(user.uid);
      setLibrary(updatedLibrary);
    } catch (err) {
      setError(err as Error);
    }
  };

  const updateComponentTags = async (componentId: string, tags: string[]) => {
    if (!user) {
      notify.error('Debes iniciar sesión para actualizar etiquetas');
      return;
    }

    try {
      await favoritesService.updateComponentTags(user.uid, componentId, tags);
      const updatedLibrary = await favoritesService.getLibrary(user.uid);
      setLibrary(updatedLibrary);
    } catch (err) {
      setError(err as Error);
    }
  };

  const getFavoritesByCategory = (category: string) => {
    if (!library) return [];
    return library.favorites.filter(f => f.category === category);
  };

  const searchFavorites = (query: string) => {
    if (!library) return [];
    const searchTerm = query.toLowerCase();
    return library.favorites.filter(f => 
      f.name.toLowerCase().includes(searchTerm) ||
      f.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  };

  return {
    library,
    loading,
    error,
    addFavorite,
    removeFavorite,
    addCategory,
    removeCategory,
    updateComponentCategory,
    updateComponentTags,
    getFavoritesByCategory,
    searchFavorites,
  };
};
