import { ReactNode } from 'react';

export interface Component {
  id: string;
  type: string;
  content: any;
  order: number;
}

export interface ComponentDefinition {
  name: string;
  icon: ReactNode;
  category: string;
  description: string;
  premium?: boolean;
  defaultContent: any;
}

export interface EditorState {
  components: Component[];
  selectedComponent: Component | null;
  history: {
    past: Component[][];
    future: Component[][];
  };
  gridEnabled: boolean;
  showGuides: boolean;
  devicePreview: 'desktop' | 'tablet' | 'mobile';
}

export interface EditorAction {
  type: 
    | 'ADD_COMPONENT'
    | 'UPDATE_COMPONENT'
    | 'DELETE_COMPONENT'
    | 'REORDER_COMPONENTS'
    | 'SET_SELECTED'
    | 'UNDO'
    | 'REDO'
    | 'TOGGLE_GRID'
    | 'TOGGLE_GUIDES'
    | 'SET_DEVICE_PREVIEW';
  payload?: any;
}

export interface PageBuilderProps {
  pageId: string;
  initialComponents?: Component[];
  onSave?: (components: Component[]) => void;
  isPremiumUser?: boolean;
}
