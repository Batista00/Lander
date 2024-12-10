export interface Component {
  id: string;
  type: 'heading' | 'text' | 'image' | 'carousel';
  componentType: 'basic' | 'premium';
  content: {
    title?: string;
    subtitle?: string;
    description?: string;
    backgroundColor: string;
    textColor?: string;
    alignment: string;
    padding: string;
    imageUrl?: string;
    altText?: string;
    caption?: string;
    width?: string;
    height?: string;
    rounded?: boolean;
    shadow?: boolean;
    fontSize?: string;
    items?: any[];
    autoplay?: boolean;
    interval?: number;
    showArrows?: boolean;
    showDots?: boolean;
  };
}

export interface Landing {
  id: string;
  name: string;
  description?: string;
  components: Component[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  userId: string;
  isPublic: boolean;
  settings?: {
    theme?: string;
    layout?: string;
    analytics?: boolean;
  };
}
