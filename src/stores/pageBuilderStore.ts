import { create } from 'zustand';

interface Component {
  id: string;
  type: string;
  data: any;
}

interface PageBuilderStore {
  components: Component[];
  updateComponent: (updatedComponent: Component) => void;
  addComponent: (component: Component) => void;
  removeComponent: (componentId: string) => void;
}

export const usePageBuilderStore = create<PageBuilderStore>((set) => ({
  components: [],
  
  updateComponent: (updatedComponent) => 
    set((state) => ({
      components: state.components.map((component) =>
        component.id === updatedComponent.id ? updatedComponent : component
      ),
    })),
    
  addComponent: (component) =>
    set((state) => ({
      components: [...state.components, component],
    })),
    
  removeComponent: (componentId) =>
    set((state) => ({
      components: state.components.filter((component) => component.id !== componentId),
    })),
}));
