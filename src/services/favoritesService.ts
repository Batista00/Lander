import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { notify } from '@/components/ui/toast';

export interface FavoriteComponent {
  id: string;
  name: string;
  type: string;
  category: string;
  preview: string;
  config: any;
  dateAdded: Date;
  tags: string[];
}

export interface ComponentLibrary {
  userId: string;
  favorites: FavoriteComponent[];
  categories: string[];
  lastUpdated: Date;
}

class FavoritesService {
  private static instance: FavoritesService;
  private readonly COLLECTION_NAME = 'componentLibraries';

  private constructor() {}

  public static getInstance(): FavoritesService {
    if (!FavoritesService.instance) {
      FavoritesService.instance = new FavoritesService();
    }
    return FavoritesService.instance;
  }

  private getLibraryRef(userId: string) {
    return doc(db, this.COLLECTION_NAME, userId);
  }

  async initializeLibrary(userId: string): Promise<ComponentLibrary> {
    const libraryRef = this.getLibraryRef(userId);
    const initialLibrary: ComponentLibrary = {
      userId,
      favorites: [],
      categories: ['General'],
      lastUpdated: new Date(),
    };

    try {
      await setDoc(libraryRef, initialLibrary);
      notify.success('Biblioteca de componentes inicializada');
      return initialLibrary;
    } catch (error) {
      notify.error('Error al inicializar la biblioteca de componentes');
      throw error;
    }
  }

  async getLibrary(userId: string): Promise<ComponentLibrary> {
    const libraryRef = this.getLibraryRef(userId);
    
    try {
      const doc = await getDoc(libraryRef);
      if (!doc.exists()) {
        return this.initializeLibrary(userId);
      }
      return doc.data() as ComponentLibrary;
    } catch (error) {
      notify.error('Error al obtener la biblioteca de componentes');
      throw error;
    }
  }

  async addFavorite(userId: string, component: Omit<FavoriteComponent, 'dateAdded'>): Promise<void> {
    const libraryRef = this.getLibraryRef(userId);
    const favoriteComponent: FavoriteComponent = {
      ...component,
      dateAdded: new Date(),
    };

    try {
      await updateDoc(libraryRef, {
        favorites: arrayUnion(favoriteComponent),
        lastUpdated: new Date(),
      });
      notify.success('Componente agregado a favoritos');
    } catch (error) {
      notify.error('Error al agregar el componente a favoritos');
      throw error;
    }
  }

  async removeFavorite(userId: string, componentId: string): Promise<void> {
    const library = await this.getLibrary(userId);
    const component = library.favorites.find(f => f.id === componentId);
    
    if (!component) {
      notify.error('Componente no encontrado en favoritos');
      return;
    }

    const libraryRef = this.getLibraryRef(userId);
    
    try {
      await updateDoc(libraryRef, {
        favorites: arrayRemove(component),
        lastUpdated: new Date(),
      });
      notify.success('Componente eliminado de favoritos');
    } catch (error) {
      notify.error('Error al eliminar el componente de favoritos');
      throw error;
    }
  }

  async addCategory(userId: string, category: string): Promise<void> {
    const libraryRef = this.getLibraryRef(userId);
    
    try {
      await updateDoc(libraryRef, {
        categories: arrayUnion(category),
        lastUpdated: new Date(),
      });
      notify.success('Categoría agregada');
    } catch (error) {
      notify.error('Error al agregar la categoría');
      throw error;
    }
  }

  async removeCategory(userId: string, category: string): Promise<void> {
    if (category === 'General') {
      notify.error('No se puede eliminar la categoría General');
      return;
    }

    const libraryRef = this.getLibraryRef(userId);
    
    try {
      await updateDoc(libraryRef, {
        categories: arrayRemove(category),
        lastUpdated: new Date(),
      });
      notify.success('Categoría eliminada');
    } catch (error) {
      notify.error('Error al eliminar la categoría');
      throw error;
    }
  }

  async updateComponentCategory(
    userId: string, 
    componentId: string, 
    newCategory: string
  ): Promise<void> {
    const library = await this.getLibrary(userId);
    const componentIndex = library.favorites.findIndex(f => f.id === componentId);
    
    if (componentIndex === -1) {
      notify.error('Componente no encontrado');
      return;
    }

    if (!library.categories.includes(newCategory)) {
      notify.error('Categoría no válida');
      return;
    }

    const updatedFavorites = [...library.favorites];
    updatedFavorites[componentIndex] = {
      ...updatedFavorites[componentIndex],
      category: newCategory,
    };

    const libraryRef = this.getLibraryRef(userId);
    
    try {
      await updateDoc(libraryRef, {
        favorites: updatedFavorites,
        lastUpdated: new Date(),
      });
      notify.success('Categoría del componente actualizada');
    } catch (error) {
      notify.error('Error al actualizar la categoría del componente');
      throw error;
    }
  }

  async updateComponentTags(
    userId: string, 
    componentId: string, 
    tags: string[]
  ): Promise<void> {
    const library = await this.getLibrary(userId);
    const componentIndex = library.favorites.findIndex(f => f.id === componentId);
    
    if (componentIndex === -1) {
      notify.error('Componente no encontrado');
      return;
    }

    const updatedFavorites = [...library.favorites];
    updatedFavorites[componentIndex] = {
      ...updatedFavorites[componentIndex],
      tags,
    };

    const libraryRef = this.getLibraryRef(userId);
    
    try {
      await updateDoc(libraryRef, {
        favorites: updatedFavorites,
        lastUpdated: new Date(),
      });
      notify.success('Etiquetas del componente actualizadas');
    } catch (error) {
      notify.error('Error al actualizar las etiquetas del componente');
      throw error;
    }
  }
}

export const favoritesService = FavoritesService.getInstance();
