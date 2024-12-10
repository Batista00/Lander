import React from 'react';
import { componentMap } from '@/components/landing-components/componentMap';

interface ComponentRendererProps {
  component: {
    id: string;
    type: string;
    content: any;
  };
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component }) => {
  if (!component || !component.type) {
    console.warn('Invalid component:', component);
    return null;
  }

  const Component = componentMap[component.type as keyof typeof componentMap];

  if (!Component) {
    console.warn(`Component type "${component.type}" not found in componentMap`);
    return null;
  }

  return (
    <div className="relative w-full">
      <Component content={component.content} />
    </div>
  );
};
