import React, { createContext, useContext, useState, useEffect } from 'react';
import { Template } from '../types/templates';

interface TemplateContextType {
  favorites: string[];
  customizations: Array<{
    templateId: string;
    landingId?: string;
    colors?: {
      primary: string;
      secondary: string;
      accent: string;
    };
    fonts?: {
      heading: string;
      body: string;
    };
    logo?: string;
  }>;
  viewHistory: Array<{
    templateId: string;
    timestamp: string;
  }>;
  toggleFavorite: (templateId: string) => void;
  saveCustomization: (templateId: string, customization: any) => void;
  getCustomization: (templateId: string) => any;
  associateTemplateWithLanding: (templateId: string, landingId: string) => void;
  getTemplateByLandingId: (landingId: string) => Template | null;
  addToHistory: (templateId: string) => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [customizations, setCustomizations] = useState<TemplateContextType['customizations']>([]);
  const [viewHistory, setViewHistory] = useState<TemplateContextType['viewHistory']>([]);
  
  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedFavorites = localStorage.getItem('templateFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedCustomizations = localStorage.getItem('templateCustomizations');
    if (savedCustomizations) {
      setCustomizations(JSON.parse(savedCustomizations));
    }

    const savedHistory = localStorage.getItem('templateHistory');
    if (savedHistory) {
      setViewHistory(JSON.parse(savedHistory));
    }
  }, []);

  const toggleFavorite = (templateId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId];
      
      localStorage.setItem('templateFavorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const saveCustomization = (templateId: string, customization: any) => {
    setCustomizations(prev => {
      const index = prev.findIndex(c => c.templateId === templateId);
      const newCustomizations = index >= 0
        ? prev.map(c => c.templateId === templateId ? { ...c, ...customization } : c)
        : [...prev, { templateId, ...customization }];
      
      localStorage.setItem('templateCustomizations', JSON.stringify(newCustomizations));
      return newCustomizations;
    });
  };

  const getCustomization = (templateId: string) => {
    return customizations.find(c => c.templateId === templateId);
  };

  const associateTemplateWithLanding = (templateId: string, landingId: string) => {
    setCustomizations(prev => {
      const newCustomizations = [...prev];
      const index = newCustomizations.findIndex(c => c.templateId === templateId);
      
      if (index >= 0) {
        newCustomizations[index] = { ...newCustomizations[index], landingId };
      } else {
        newCustomizations.push({ templateId, landingId });
      }
      
      localStorage.setItem('templateCustomizations', JSON.stringify(newCustomizations));
      return newCustomizations;
    });
  };

  const getTemplateByLandingId = (landingId: string) => {
    const customization = customizations.find(c => c.landingId === landingId);
    if (!customization) return null;
    
    // Aquí deberías buscar el template en tu lista de templates usando el templateId
    // Por ahora retornamos null, pero deberías implementar la lógica para obtener el template
    return null;
  };

  const addToHistory = (templateId: string) => {
    setViewHistory(prev => {
      const now = new Date().toISOString();
      const newHistory = [
        { templateId, timestamp: now },
        ...prev.filter(h => h.templateId !== templateId)
      ].slice(0, 50); // Mantener solo los últimos 50
      
      localStorage.setItem('templateHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  return (
    <TemplateContext.Provider value={{
      favorites,
      customizations,
      viewHistory,
      toggleFavorite,
      saveCustomization,
      getCustomization,
      associateTemplateWithLanding,
      getTemplateByLandingId,
      addToHistory,
    }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplates = () => {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error('useTemplates must be used within a TemplateProvider');
  }
  return context;
};
