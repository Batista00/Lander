import { useState, useCallback } from 'react';
import { useAIWorkflow } from '@/contexts/AIWorkflowContext';
import { aiLandingService } from '@/services/ai/AILandingService';
import type { AIRecommendation, AIAnalysis } from '@/types/ai';

export const useAITemplates = () => {
  const { state } = useAIWorkflow();
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templateAnalysis, setTemplateAnalysis] = useState<AIAnalysis | null>(null);

  const getRecommendations = useCallback(async () => {
    if (!state.businessContext) return;

    setLoading(true);
    try {
      const recs = await aiLandingService.analyzeBusinessContext(state.businessContext);
      setRecommendations(recs);
      return recs;
    } catch (error) {
      console.error('Error getting recommendations:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, [state.businessContext]);

  const analyzeTemplate = useCallback(async (templateId: string) => {
    if (!state.businessContext) return;

    setLoading(true);
    try {
      // Obtener el template
      const template = await fetch(`/api/templates/${templateId}`).then(res => res.json());
      const analysis = await aiLandingService.analyzeTemplate(templateId, state.businessContext);
      setTemplateAnalysis(analysis);
      setSelectedTemplate(templateId);
      return analysis;
    } catch (error) {
      console.error('Error analyzing template:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [state.businessContext]);

  const selectTemplate = useCallback(async (templateId: string) => {
    setSelectedTemplate(templateId);
    return analyzeTemplate(templateId);
  }, [analyzeTemplate]);

  return {
    recommendations,
    selectedTemplate,
    templateAnalysis,
    loading,
    getRecommendations,
    analyzeTemplate,
    selectTemplate
  };
};
