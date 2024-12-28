export interface ComponentInfo {
  type: string;
  name: string;
  icon: string;
  isPremium?: boolean;
  isCallToAction?: boolean;
}

export interface ComponentTemplate {
  defaultProps: Record<string, any>;
  template: (props: Record<string, any>) => ComponentNode;
}

export interface ComponentNode {
  type: string;
  className?: string;
  style?: Record<string, string | number>;
  children?: ComponentNode[] | string;
  [key: string]: any;
}

export interface EditorState {
  components: ComponentNode[];
  selectedComponent?: string | null;
  history: {
    past: ComponentNode[][];
    present: ComponentNode[];
    future: ComponentNode[][];
  };
  metadata: {
    title: string;
    description?: string;
    lastModified: number;
    version: number;
    author?: string;
  };
  settings: {
    theme?: string;
    layout?: string;
    customStyles?: Record<string, any>;
  };
}
