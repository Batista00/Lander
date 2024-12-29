import { useState, useCallback } from 'react';
import { useAIWorkflow } from '@/contexts/AIWorkflowContext';
import { aiLandingService } from '@/services/ai/AILandingService';
import type { AIComponentAnalysis, AIOptimization, AITestSuggestion } from '@/types/ai';

export const useAIAnalysis = (componentId: string) => {
  const { state } = useAIWorkflow();
  const [loading, setLoading] = useState(false);
  const [optimizations, setOptimizations] = useState<AIOptimization[]>([]);
  const [testSuggestions, setTestSuggestions] = useState<AITestSuggestion[]>([]);

  const analyzeComponent = useCallback(async () => {
    if (!state.businessContext) return;

    setLoading(true);
    try {
      const analysis = await aiLandingService.analyzeComponent(
        componentId,
        state.businessContext
      );
      return analysis;
    } catch (error) {
      console.error('Error analyzing component:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [componentId, state.businessContext]);

  const getOptimizations = useCallback(async () => {
    setLoading(true);
    try {
      // Obtener el componente actual
      const component = await fetch(`/api/components/${componentId}`).then(res => res.json());
      const optimizations = await aiLandingService.analyzePerformance(component);
      setOptimizations(optimizations);
      return optimizations;
    } catch (error) {
      console.error('Error getting optimizations:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [componentId]);

  const getTestSuggestions = useCallback(async () => {
    setLoading(true);
    try {
      // Obtener métricas actuales del componente
      const metrics = await fetch(`/api/components/${componentId}/metrics`).then(res => res.json());
      const suggestions = await aiLandingService.generateTestSuggestions(componentId, metrics);
      setTestSuggestions(suggestions);
      return suggestions;
    } catch (error) {
      console.error('Error getting test suggestions:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [componentId]);

  return {
    analysis: state.analysis,
    optimizations,
    testSuggestions,
    loading,
    analyzeComponent,
    getOptimizations,
    getTestSuggestions
  };
};
