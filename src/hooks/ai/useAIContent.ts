import { useState, useCallback } from 'react';
import { useAIWorkflow } from '@/contexts/AIWorkflowContext';
import type { AIContentSuggestion } from '@/types/ai';

export const useAIContent = (componentId: string) => {
  const { state, generateSuggestions, applySuggestion } = useAIWorkflow();
  const [generating, setGenerating] = useState(false);

  const generateContent = useCallback(async (type?: string) => {
    setGenerating(true);
    try {
      await generateSuggestions(componentId, type);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setGenerating(false);
    }
  }, [componentId, generateSuggestions]);

  const applySuggestionToComponent = useCallback(async (suggestionId: string) => {
    try {
      await applySuggestion(suggestionId);
    } catch (error) {
      console.error('Error applying suggestion:', error);
    }
  }, [applySuggestion]);

  return {
    suggestions: state.suggestions,
    generating,
    generateContent,
    applySuggestion: applySuggestionToComponent
  };
};
