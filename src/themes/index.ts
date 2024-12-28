import { createTheme, Theme } from '@mui/material';

// Tema base con configuraciones comunes
const baseTheme = createTheme({
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

// Temas específicos por industria
export const themes: Record<string, Theme> = {
  // Tema Tecnología/SaaS
  technology: createTheme({
    ...baseTheme,
    palette: {
      primary: {
        main: '#2563eb', // Azul
        light: '#60a5fa',
        dark: '#1d4ed8',
      },
      secondary: {
        main: '#7c3aed', // Violeta
        light: '#a78bfa',
        dark: '#5b21b6',
      },
      background: {
        default: '#f8fafc',
        paper: '#ffffff',
      },
    },
  }),

  // Tema Negocios/Corporativo
  business: createTheme({
    ...baseTheme,
    palette: {
      primary: {
        main: '#0f766e', // Verde azulado
        light: '#14b8a6',
        dark: '#0d5a5a',
      },
      secondary: {
        main: '#334155', // Gris azulado
        light: '#64748b',
        dark: '#1e293b',
      },
      background: {
        default: '#f8fafc',
        paper: '#ffffff',
      },
    },
  }),

  // Tema Creativo/Diseño
  creative: createTheme({
    ...baseTheme,
    palette: {
      primary: {
        main: '#ec4899', // Rosa
        light: '#f472b6',
        dark: '#db2777',
      },
      secondary: {
        main: '#8b5cf6', // Violeta
        light: '#a78bfa',
        dark: '#6d28d9',
      },
      background: {
        default: '#fdf2f8',
        paper: '#ffffff',
      },
    },
  }),

  // Tema E-commerce
  ecommerce: createTheme({
    ...baseTheme,
    palette: {
      primary: {
        main: '#f59e0b', // Naranja
        light: '#fbbf24',
        dark: '#d97706',
      },
      secondary: {
        main: '#06b6d4', // Cyan
        light: '#22d3ee',
        dark: '#0891b2',
      },
      background: {
        default: '#fffbeb',
        paper: '#ffffff',
      },
    },
  }),

  // Tema Educación
  education: createTheme({
    ...baseTheme,
    palette: {
      primary: {
        main: '#4f46e5', // Índigo
        light: '#6366f1',
        dark: '#4338ca',
      },
      secondary: {
        main: '#10b981', // Esmeralda
        light: '#34d399',
        dark: '#059669',
      },
      background: {
        default: '#f5f3ff',
        paper: '#ffffff',
      },
    },
  }),
});
