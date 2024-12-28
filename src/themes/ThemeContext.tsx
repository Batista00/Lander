import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme } from './types';
import { modernTheme } from './modern';

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  getComponentStyles: (componentName: string, variant?: string) => string;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: modernTheme,
  setTheme: () => {},
  getComponentStyles: () => ''
});

export function useTheme() {
  return useContext(ThemeContext);
}

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: Theme;
}

export function ThemeProvider({ children, initialTheme = modernTheme }: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(initialTheme);

  const getComponentStyles = (componentName: string, variant?: string) => {
    const componentConfig = currentTheme.components[componentName];
    if (!componentConfig) return '';

    const variantName = variant || componentConfig.defaultVariant;
    return componentConfig.variants[variantName] || '';
  };

  const value = {
    currentTheme,
    setTheme: setCurrentTheme,
    getComponentStyles
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
