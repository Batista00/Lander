import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';

export type BuilderMode = 'ai' | 'manual';
export type EditorView = 'desktop' | 'tablet' | 'mobile';

export interface LandingPage {
  id: string;
  name: string;
  template: string;
  components: any[];
  styles: any;
  settings: {
    seo: any;
    analytics: any;
    integrations: any;
  };
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    status: 'draft' | 'published' | 'archived';
  };
}

export interface AIAssistant {
  isActive: boolean;
  suggestions: any[];
  context: string;
  history: any[];
}

interface BuilderContextType {
  // Estado general
  mode: BuilderMode;
  setMode: (mode: BuilderMode) => void;
  currentStep: string;
  setCurrentStep: (step: string) => void;
  
  // Landing Page
  currentPage: LandingPage | null;
  setCurrentPage: (page: LandingPage | null) => void;
  savedPages: LandingPage[];
  
  // Editor
  editorView: EditorView;
  setEditorView: (view: EditorView) => void;
  selectedComponent: string | null;
  setSelectedComponent: (id: string | null) => void;
  
  // AI Assistant
  aiAssistant: AIAssistant;
  toggleAI: () => void;
  updateAIContext: (context: string) => void;
  
  // Templates
  templates: any[];
  selectedTemplate: string | null;
  setSelectedTemplate: (id: string | null) => void;
  
  // Acciones
  savePage: () => Promise<void>;
  publishPage: () => Promise<void>;
  previewPage: () => void;
  exportPage: () => Promise<void>;
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export const BuilderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<BuilderMode>('ai');
  const [currentStep, setCurrentStep] = useState('welcome');
  const [currentPage, setCurrentPage] = useState<LandingPage | null>(null);
  const [savedPages, setSavedPages] = useState<LandingPage[]>([]);
  const [editorView, setEditorView] = useState<EditorView>('desktop');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [aiAssistant, setAIAssistant] = useState<AIAssistant>({
    isActive: true,
    suggestions: [],
    context: '',
    history: []
  });

  const toggleAI = () => {
    setAIAssistant(prev => ({ ...prev, isActive: !prev.isActive }));
  };

  const updateAIContext = (context: string) => {
    setAIAssistant(prev => ({ ...prev, context }));
  };

  const savePage = async () => {
    // Implementar lógica de guardado
  };

  const publishPage = async () => {
    // Implementar lógica de publicación
  };

  const previewPage = () => {
    // Implementar lógica de preview
  };

  const exportPage = async () => {
    // Implementar lógica de exportación
  };

  return (
    <BuilderContext.Provider
      value={{
        mode,
        setMode,
        currentStep,
        setCurrentStep,
        currentPage,
        setCurrentPage,
        savedPages,
        editorView,
        setEditorView,
        selectedComponent,
        setSelectedComponent,
        aiAssistant,
        toggleAI,
        updateAIContext,
        templates: [], // Implementar carga de templates
        selectedTemplate,
        setSelectedTemplate,
        savePage,
        publishPage,
        previewPage,
        exportPage
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};
