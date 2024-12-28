import React from 'react';
import { Box, Container, useTheme, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as Components from './components';
import { Component, ComponentType } from '@/types/landing';
import { Template } from '@/types/template';

interface EditorLayoutProps {
  components: Component[];
  onComponentEdit?: (componentId: string, content: any) => void;
  isEditing?: boolean;
  template: Template;
}

const StyledComponentWrapper = styled(Box)<{ customStyles?: any }>(({ theme, customStyles }) => {
  const customTheme = theme as typeof theme & { custom: any };
  
  return {
    '&:not(:last-child)': {
      marginBottom: customTheme.custom?.spacing?.element?.spacing || '2rem',
    },

    '& .MuiContainer-root': {
      maxWidth: customTheme.custom?.spacing?.section?.containerWidth || '1280px',
    },

    '& [class*="component-"]': {
      transition: customTheme.custom?.effects?.transition || 'all 0.3s ease-in-out',
    },

    ...(customTheme.custom?.borders && {
      '& .MuiCard-root': {
        border: `${customTheme.custom.borders.width} ${customTheme.custom.borders.style} ${theme.palette.divider}`,
      }
    }),

    // Aplicar estilos personalizados del template
    ...(customStyles && {
      backgroundColor: customStyles.backgroundColor,
      color: customStyles.textColor,
      ...customStyles
    }),
  };
});

const getComponentName = (type: ComponentType): string => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

const AVAILABLE_COMPONENTS = Object.keys(Components);

export const EditorLayout: React.FC<EditorLayoutProps> = ({ 
  components, 
  onComponentEdit, 
  isEditing = false,
  template
}) => {
  const theme = useTheme();

  const renderComponent = (component: Component) => {
    const ComponentName = getComponentName(component.type);
    const DynamicComponent = (Components as any)[ComponentName];

    if (!DynamicComponent) {
      console.warn(`Component ${ComponentName} not found. Available components:`, AVAILABLE_COMPONENTS);
      return (
        <Box sx={{ p: 2, m: 2, textAlign: 'center' }}>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Componente no soportado: {ComponentName}
          </Alert>
          <Box sx={{ fontSize: 'small', color: 'text.secondary' }}>
            Componentes disponibles: {AVAILABLE_COMPONENTS.join(', ')}
          </Box>
        </Box>
      );
    }

    // Combinar los estilos del template con los estilos específicos del componente
    const combinedStyles = {
      ...template?.style,
      ...component.styles,
      // Asegurar que los colores y tipografía del template se apliquen
      ...(template?.customization?.colors && {
        backgroundColor: template.customization.colors.background,
        color: template.customization.colors.text,
      }),
      ...(template?.customization?.fonts && {
        fontFamily: template.customization.fonts.body,
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          fontFamily: template.customization.fonts.heading,
        },
      }),
    };

    return (
      <StyledComponentWrapper key={component.id} customStyles={combinedStyles}>
        <DynamicComponent
          content={component.content}
          styles={combinedStyles}
          onEdit={isEditing ? (content: any) => onComponentEdit?.(component.id, content) : undefined}
          isEditing={isEditing}
        />
      </StyledComponentWrapper>
    );
  };

  return (
    <Box>
      {components.map(component => renderComponent(component))}
    </Box>
  );
};
