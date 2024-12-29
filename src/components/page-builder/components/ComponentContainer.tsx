import React from 'react';
import { AVAILABLE_COMPONENTS } from '../config/components';
import { cn } from '@/lib/utils';

interface ComponentContainerProps {
  type: string;
  children: React.ReactNode;
  className?: string;
}

export const ComponentContainer: React.FC<ComponentContainerProps> = ({
  type,
  children,
  className
}) => {
  const componentConfig = AVAILABLE_COMPONENTS.find(c => c.type === type);
  const maxWidth = componentConfig?.maxWidth || 'max-w-7xl';

  return (
    <div className="w-full py-12 px-4">
      <div className={cn(
        'mx-auto',
        maxWidth,
        className
      )}>
        {children}
      </div>
    </div>
  );
};
