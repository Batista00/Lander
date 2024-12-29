import { useState, useReducer, useCallback } from 'react';
import { aiLandingService } from '@/services/ai/AILandingService';
import type { BusinessContext, AIConfig, AIState, AIAction } from '@/types/ai';

type ActionType = 
  | 'SET_BUSINESS_CONTEXT' 
  | 'SET_ACTIVE_COMPONENT' 
  | 'SET_SUGGESTIONS' 
  | 'SET_ANALYSIS' 
  | 'SET_LOADING' 
  | 'SET_ERROR' 
  | 'UPDATE_CONFIG'
  | 'UPDATE_ASSISTANT';

const initialState: AIState = {
  businessContext: null,
  activeComponent: null,
  suggestions: [],
  analysis: null,
  loading: false,
  error: null,
  config: {
    mode: 'passive',
    autoSuggest: false,
    language: 'es'
  },
  assistant: {
    active: false,
    messages: []
  }
};

function reducer(state: AIState, action: AIAction): AIState {
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
    case 'UPDATE_ASSISTANT':
      return {
        ...state,
        assistant: { ...state.assistant, ...action.payload }
      };
    default:
      return state;
  }
}

export const useAIWorkflowManager = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const setBusinessContext = useCallback((context: BusinessContext) => {
    dispatch({ type: 'SET_BUSINESS_CONTEXT', payload: context });
  }, [dispatch]);

  const updateAssistantMode = useCallback((mode: 'active' | 'passive') => {
    dispatch({
      type: 'UPDATE_ASSISTANT',
      payload: { mode }
    });
  }, [dispatch]);

  const updateAIConfig = useCallback((config: Partial<AIConfig>) => {
    dispatch({ type: 'UPDATE_CONFIG', payload: config });
  }, [dispatch]);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => prev - 1);
  }, []);

  const resetWorkflow = useCallback(() => {
    setCurrentStep(1);
    dispatch({ type: 'SET_BUSINESS_CONTEXT', payload: null });
    dispatch({ type: 'SET_SUGGESTIONS', payload: [] });
    dispatch({ type: 'SET_ANALYSIS', payload: null });
  }, [dispatch]);

  const validateStep = useCallback((step: number): boolean => {
    switch (step) {
      case 1: // Contexto de negocio
        return !!state.businessContext &&
               !!state.businessContext.industry &&
               state.businessContext.goals.length > 0;
      
      case 2: // Selección de template
        return !!state.activeComponent;
      
      case 3: // Personalización
        return true; // Siempre válido ya que es opcional
      
      case 4: // Análisis final
        return !!state.analysis;
      
      default:
        return false;
    }
  }, [state]);

  const startNewWorkflow = useCallback(async () => {
    resetWorkflow();
    updateAssistantMode('active');
  }, [resetWorkflow, updateAssistantMode]);

  const finishWorkflow = useCallback(async () => {
    setLoading(true);
    try {
      // Realizar acciones finales
      updateAssistantMode('passive');
      // Guardar el estado final si es necesario
    } catch (error) {
      console.error('Error finishing workflow:', error);
    } finally {
      setLoading(false);
    }
  }, [updateAssistantMode]);

  return {
    currentStep,
    loading,
    businessContext: state.businessContext,
    assistant: state.assistant,
    config: state.config,
    setBusinessContext,
    updateAssistantMode,
    updateAIConfig,
    nextStep,
    prevStep,
    resetWorkflow,
    validateStep,
    startNewWorkflow,
    finishWorkflow
  };
};
