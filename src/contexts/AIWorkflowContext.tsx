import { createContext, useContext, useReducer, ReactNode } from 'react';
import { db } from '@/firebase/config';
import { doc, collection, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

interface AIState {
  businessContext: any | null;
  activeComponent: string | null;
  suggestions: any[];
  analysis: any | null;
  loading: boolean;
  error: string | null;
  config: {
    mode: 'active' | 'passive';
    autoSuggest: boolean;
    language: string;
  };
}

type AIAction =
  | { type: 'SET_BUSINESS_CONTEXT'; payload: any }
  | { type: 'SET_ACTIVE_COMPONENT'; payload: string }
  | { type: 'SET_SUGGESTIONS'; payload: any[] }
  | { type: 'SET_ANALYSIS'; payload: any }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_CONFIG'; payload: Partial<AIState['config']> };

const initialState: AIState = {
  businessContext: null,
  activeComponent: null,
  suggestions: [],
  analysis: null,
  loading: false,
  error: null,
  config: {
    mode: 'passive',
    autoSuggest: true,
    language: 'es'
  }
};

const AIWorkflowContext = createContext<{
  state: AIState;
  dispatch: React.Dispatch<AIAction>;
  updateConfig: (config: Partial<AIState['config']>) => void;
  setBusinessContext: (context: any) => Promise<void>;
  setActiveComponent: (componentId: string) => void;
  generateSuggestions: (componentId: string, type?: string) => Promise<void>;
  applySuggestion: (suggestionId: string) => Promise<void>;
} | null>(null);

const aiReducer = (state: AIState, action: AIAction): AIState => {
  switch (action.type) {
    case 'SET_BUSINESS_CONTEXT':
      return { ...state, businessContext: action.payload };
    case 'SET_ACTIVE_COMPONENT':
      return { ...state, activeComponent: action.payload };
    case 'SET_SUGGESTIONS':
      return { ...state, suggestions: action.payload };
    case 'SET_ANALYSIS':
      return { ...state, analysis: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'UPDATE_CONFIG':
      return {
        ...state,
        config: { ...state.config, ...action.payload }
      };
    default:
      return state;
  }
};

export const AIWorkflowProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(aiReducer, initialState);

  const updateConfig = async (config: Partial<AIState['config']>) => {
    dispatch({ type: 'UPDATE_CONFIG', payload: config });
    // Guardar en Firebase
    try {
      const configRef = doc(db, 'ai_config', 'current');
      await updateDoc(configRef, {
        ...config,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating config:', error);
    }
  };

  const setBusinessContext = async (context: any) => {
    dispatch({ type: 'SET_BUSINESS_CONTEXT', payload: context });
    // Guardar en Firebase
    try {
      await addDoc(collection(db, 'business_contexts'), {
        ...context,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error saving business context:', error);
    }
  };

  const setActiveComponent = (componentId: string) => {
    dispatch({ type: 'SET_ACTIVE_COMPONENT', payload: componentId });
  };

  const generateSuggestions = async (componentId: string, type?: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Obtener el componente
      const component = await fetch(`/api/components/${componentId}`).then(res => res.json());
      
      // Generar sugerencias
      const suggestions = await fetch('/api/ai/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ component, type, context: state.businessContext })
      }).then(res => res.json());

      dispatch({ type: 'SET_SUGGESTIONS', payload: suggestions });

      // Guardar en Firebase
      await addDoc(collection(db, 'ai_suggestions'), {
        componentId,
        type,
        suggestions,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error generating suggestions:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error generando sugerencias' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const applySuggestion = async (suggestionId: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Aplicar sugerencia
      const result = await fetch('/api/ai/apply-suggestion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suggestionId })
      }).then(res => res.json());

      // Actualizar estado
      if (result.success) {
        const updatedSuggestions = state.suggestions.filter(s => s.id !== suggestionId);
        dispatch({ type: 'SET_SUGGESTIONS', payload: updatedSuggestions });

        // Guardar en Firebase
        await addDoc(collection(db, 'applied_suggestions'), {
          suggestionId,
          result,
          appliedAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error applying suggestion:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error aplicando sugerencia' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <AIWorkflowContext.Provider
      value={{
        state,
        dispatch,
        updateConfig,
        setBusinessContext,
        setActiveComponent,
        generateSuggestions,
        applySuggestion
      }}
    >
      {children}
    </AIWorkflowContext.Provider>
  );
};

export const useAIWorkflow = () => {
  const context = useContext(AIWorkflowContext);
  if (!context) {
    throw new Error('useAIWorkflow must be used within an AIWorkflowProvider');
  }
  return context;
};
