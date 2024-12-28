import React from 'react';
import { useTheme } from '@/themes/ThemeContext';
import { ComponentEditorProps } from '@/types/components';

export function withTheme<P extends ComponentEditorProps>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) {
  return function ThemedComponent(props: P) {
    const { getComponentStyles } = useTheme();
    const variant = (props.component.content as any).variant;
    const themeStyles = getComponentStyles(componentName, variant);

    return (
      <WrappedComponent
        {...props}
        themeStyles={themeStyles}
      />
    );
  };
}
