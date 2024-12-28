import { Theme } from './types';

export const modernTheme: Theme = {
  name: 'modern',
  colors: {
    primary: '#2563eb',
    secondary: '#4f46e5',
    background: '#ffffff',
    text: '#1f2937',
    accent: '#f59e0b',
    muted: '#6b7280'
  },
  typography: {
    fontFamily: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem'
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      bold: '700'
    }
  },
  spacing: {
    container: {
      padding: '1.5rem',
      maxWidth: '1280px'
    },
    section: {
      padding: '4rem 0',
      margin: '2rem 0'
    }
  },
  components: {
    Hero: {
      variants: {
        centered: `
          text-center
          bg-gradient-to-b from-primary/10 to-transparent
          py-24
        `,
        leftAligned: `
          text-left
          bg-gradient-to-r from-primary/10 to-transparent
          py-24
        `,
        minimal: `
          text-center
          bg-background
          py-16
        `
      },
      defaultVariant: 'centered'
    },
    Button: {
      variants: {
        primary: `
          bg-primary
          text-white
          hover:bg-primary/90
          font-medium
          rounded-lg
          px-6
          py-3
        `,
        secondary: `
          bg-secondary
          text-white
          hover:bg-secondary/90
          font-medium
          rounded-lg
          px-6
          py-3
        `,
        outline: `
          border-2
          border-primary
          text-primary
          hover:bg-primary/10
          font-medium
          rounded-lg
          px-6
          py-3
        `
      },
      defaultVariant: 'primary'
    }
  }
};
