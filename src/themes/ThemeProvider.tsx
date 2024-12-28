import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createTheme, Theme } from '@mui/material/styles';
import { TemplateStyle } from '../types/template';

interface EditorThemeProviderProps {
  children: React.ReactNode;
  templateStyle: TemplateStyle;
}

const createCustomTheme = (templateStyle: TemplateStyle): Theme => {
  return createTheme({
    palette: {
      primary: {
        main: templateStyle.colors.primary,
      },
      secondary: {
        main: templateStyle.colors.secondary,
      },
      background: {
        default: templateStyle.colors.background,
        paper: '#ffffff',
      },
      text: {
        primary: templateStyle.colors.text,
      },
    },
    typography: {
      fontFamily: templateStyle.typography.fontFamily,
      h1: {
        fontFamily: templateStyle.typography.headings.fontFamily || templateStyle.typography.fontFamily,
        fontWeight: templateStyle.typography.headings.weight,
        letterSpacing: templateStyle.typography.headings.letterSpacing,
      },
      h2: {
        fontFamily: templateStyle.typography.headings.fontFamily || templateStyle.typography.fontFamily,
        fontWeight: templateStyle.typography.headings.weight,
        letterSpacing: templateStyle.typography.headings.letterSpacing,
      },
      h3: {
        fontFamily: templateStyle.typography.headings.fontFamily || templateStyle.typography.fontFamily,
        fontWeight: templateStyle.typography.headings.weight,
        letterSpacing: templateStyle.typography.headings.letterSpacing,
      },
      body1: {
        fontFamily: templateStyle.typography.body.fontFamily || templateStyle.typography.fontFamily,
        fontWeight: templateStyle.typography.body.weight,
        letterSpacing: templateStyle.typography.body.letterSpacing,
      },
      body2: {
        fontFamily: templateStyle.typography.body.fontFamily || templateStyle.typography.fontFamily,
        fontWeight: templateStyle.typography.body.weight,
        letterSpacing: templateStyle.typography.body.letterSpacing,
      },
    },
    shape: {
      borderRadius: parseInt(templateStyle.borders.radius),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: templateStyle.borders.radius,
            transition: templateStyle.effects.transition,
            '&:hover': {
              transform: templateStyle.effects.buttonHover,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: templateStyle.borders.radius,
            transition: templateStyle.effects.transition,
            '&:hover': {
              transform: templateStyle.effects.cardHover,
            },
          },
        },
      },
    },
    // Estilos personalizados para componentes del editor
    custom: {
      spacing: {
        section: {
          padding: templateStyle.spacing.sectionPadding,
          containerWidth: templateStyle.spacing.containerWidth,
        },
        element: {
          spacing: templateStyle.spacing.elementSpacing,
        },
      },
      borders: {
        width: templateStyle.borders.width,
        style: templateStyle.borders.style,
      },
      effects: {
        transition: templateStyle.effects.transition,
        hover: {
          button: templateStyle.effects.buttonHover,
          card: templateStyle.effects.cardHover,
        },
      },
    },
  });
};

export const EditorThemeProvider: React.FC<EditorThemeProviderProps> = ({
  children,
  templateStyle,
}) => {
  const theme = createCustomTheme(templateStyle);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
