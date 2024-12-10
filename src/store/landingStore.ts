import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { landingPageService } from '@/services/landingPageService';

export interface LandingComponent {
  id: string;
  type: string;
  data: any;
  order: number;
}

export interface Landing {
  id: string;
  name: string;
  components: LandingComponent[];
  devicePreview: 'desktop' | 'tablet' | 'mobile';
  published: boolean;
  publishedUrl?: string;
  createdAt: number;
  updatedAt: number;
  userId: string;
  customDomain?: string;
  status?: 'draft' | 'published';
}

export interface LandingStore {
  landings: Landing[];
  currentLanding: Landing | null;
  isPreviewMode: boolean;
  isLoading: boolean;
  error: string | null;
  setCurrentLanding: (landing: Landing | null) => void;
  addLanding: (name: string) => Promise<Landing>;
  removeLanding: (id: string) => Promise<void>;
  updateLanding: (id: string, data: Partial<Landing>) => Promise<void>;
  addComponent: (landingId: string, component: Omit<LandingComponent, 'id' | 'order'>) => Promise<void>;
  updateComponent: (landingId: string, componentId: string, data: Partial<LandingComponent>) => Promise<void>;
  removeComponent: (landingId: string, componentId: string) => Promise<void>;
  reorderComponents: (landingId: string, startIndex: number, endIndex: number) => Promise<void>;
  setDevicePreview: (device: 'desktop' | 'tablet' | 'mobile') => void;
  setPreviewMode: (isPreview: boolean) => void;
  loadLandings: () => Promise<void>;
  clearStore: () => void;
}

export const useLandingStore = create<LandingStore>((set, get) => ({
  landings: [],
  currentLanding: null,
  isPreviewMode: false,
  isLoading: false,
  error: null,

  setCurrentLanding: (landing) => set({ currentLanding: landing }),

  loadLandings: async () => {
    set({ isLoading: true, error: null });
    try {
      console.log('Cargando landing pages...');
      const landings = await landingPageService.getAllLandingPages();
      console.log('Landing pages cargadas:', landings);
      set({ landings, isLoading: false });
    } catch (error) {
      console.error('Error al cargar landing pages:', error);
      set({ error: 'Error al cargar las landing pages', isLoading: false });
    }
  },

  addLanding: async (name) => {
    set({ isLoading: true, error: null });
    try {
      console.log('Creando nueva landing page:', name);
      const newLanding = await landingPageService.createLandingPage(name);
      if (!newLanding) {
        throw new Error('Error al crear la landing page');
      }
      
      // Actualizar el store con la nueva landing
      set((state) => ({
        landings: [...state.landings, newLanding],
        currentLanding: newLanding,
        isLoading: false
      }));
      
      return newLanding;
    } catch (error) {
      console.error('Error al crear landing page:', error);
      set({ error: 'Error al crear la landing page', isLoading: false });
      throw error;
    }
  },

  removeLanding: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await landingPageService.deleteLandingPage(id);
      set((state) => ({
        landings: state.landings.filter((l) => l.id !== id),
        currentLanding: state.currentLanding?.id === id ? null : state.currentLanding,
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Error deleting landing page', isLoading: false });
    }
  },

  updateLanding: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const updatedLanding = await landingPageService.updateLandingPage(id, data);
      if (updatedLanding) {
        set((state) => ({
          landings: state.landings.map((l) => (l.id === id ? updatedLanding : l)),
          currentLanding: state.currentLanding?.id === id ? updatedLanding : state.currentLanding,
          isLoading: false
        }));
      }
    } catch (error) {
      set({ error: 'Error updating landing page', isLoading: false });
    }
  },

  addComponent: async (landingId, component) => {
    const landing = get().landings.find((l) => l.id === landingId);
    if (!landing) return;

    const newComponent: LandingComponent = {
      ...component,
      id: nanoid(),
      order: landing.components.length,
    };

    const updatedComponents = [...landing.components, newComponent];
    await get().updateLanding(landingId, { components: updatedComponents });
  },

  updateComponent: async (landingId, componentId, data) => {
    set({ isLoading: true, error: null });
    try {
      const landing = get().landings.find((l) => l.id === landingId);
      if (!landing) {
        throw new Error('Landing page no encontrada');
      }

      // Encontrar y actualizar el componente
      const updatedComponents = landing.components.map((component) => {
        if (component.id === componentId) {
          return {
            ...component,
            ...data,
            data: {
              ...component.data,
              ...(data.data || {})
            }
          };
        }
        return component;
      });

      // Actualizar el componente en Firebase
      const updatedLanding = {
        ...landing,
        components: updatedComponents,
        updatedAt: Date.now()
      };

      await landingPageService.updateLandingPage(landingId, updatedLanding);

      // Actualizar el store
      set((state) => ({
        landings: state.landings.map((l) =>
          l.id === landingId ? updatedLanding : l
        ),
        currentLanding:
          state.currentLanding?.id === landingId
            ? updatedLanding
            : state.currentLanding,
        isLoading: false
      }));

      console.log('Componente actualizado:', {
        landingId,
        componentId,
        updatedData: data
      });
    } catch (error) {
      console.error('Error al actualizar el componente:', error);
      set({
        error: 'Error al actualizar el componente',
        isLoading: false
      });
      throw error;
    }
  },

  removeComponent: async (landingId, componentId) => {
    const landing = get().landings.find((l) => l.id === landingId);
    if (!landing) return;

    const updatedComponents = landing.components.filter((c) => c.id !== componentId);
    await get().updateLanding(landingId, { components: updatedComponents });
  },

  reorderComponents: async (landingId, startIndex, endIndex) => {
    const landing = get().landings.find((l) => l.id === landingId);
    if (!landing) return;

    const components = [...landing.components];
    const [removed] = components.splice(startIndex, 1);
    components.splice(endIndex, 0, removed);

    const updatedComponents = components.map((c, index) => ({
      ...c,
      order: index,
    }));

    await get().updateLanding(landingId, { components: updatedComponents });
  },

  setDevicePreview: (device) => {
    const { currentLanding } = get();
    if (currentLanding) {
      set((state) => ({
        landings: state.landings.map((l) =>
          l.id === currentLanding.id ? { ...l, devicePreview: device } : l
        ),
        currentLanding: { ...currentLanding, devicePreview: device },
      }));
    }
  },

  setPreviewMode: (isPreview) => set({ isPreviewMode: isPreview }),

  clearStore: () => set({ landings: [], currentLanding: null, isPreviewMode: false, error: null }),
}));
