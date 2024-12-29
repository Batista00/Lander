import { useState, useCallback } from 'react';
import { aiLandingService } from '@/services/ai/AILandingService';
import type { AIEnhancedAnalytics } from '@/types/ai';

export const useAIAnalytics = (landingPageId: string) => {
  const [loading, setLoading] = useState(false);
  const [analytics, setAnalytics] = useState<AIEnhancedAnalytics | null>(null);
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 días atrás
    new Date()
  ]);

  const getEnhancedAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      // Obtener métricas base
      const metrics = await fetch(
        `/api/analytics/${landingPageId}?start=${dateRange[0].toISOString()}&end=${dateRange[1].toISOString()}`
      ).then(res => res.json());

      // Mejorar con IA
      const enhancedAnalytics = await aiLandingService.enhanceAnalytics(metrics);
      setAnalytics(enhancedAnalytics);
      return enhancedAnalytics;
    } catch (error) {
      console.error('Error getting enhanced analytics:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [landingPageId, dateRange]);

  const updateDateRange = useCallback((start: Date, end: Date) => {
    setDateRange([start, end]);
  }, []);

  const getInsightsByMetric = useCallback((metric: string) => {
    if (!analytics) return [];
    return analytics.insights.filter(insight => insight.metric === metric);
  }, [analytics]);

  const getPredictionsByMetric = useCallback((metric: string) => {
    if (!analytics) return [];
    return analytics.predictions.filter(prediction => prediction.metric === metric);
  }, [analytics]);

  const getSegmentsByConversionRate = useCallback((minRate: number) => {
    if (!analytics) return [];
    return analytics.segments.filter(segment => segment.conversionRate >= minRate);
  }, [analytics]);

  const getTopPerformingSegments = useCallback((limit: number = 5) => {
    if (!analytics) return [];
    return [...analytics.segments]
      .sort((a, b) => b.conversionRate - a.conversionRate)
      .slice(0, limit);
  }, [analytics]);

  const getMetricTrend = useCallback((metric: keyof AIEnhancedAnalytics['metrics']) => {
    if (!analytics) return 'neutral';
    
    const prediction = analytics.predictions.find(p => p.metric === metric);
    if (!prediction) return 'neutral';

    const change = ((prediction.predicted - prediction.current) / prediction.current) * 100;
    if (change > 5) return 'positive';
    if (change < -5) return 'negative';
    return 'neutral';
  }, [analytics]);

  return {
    analytics,
    loading,
    dateRange,
    getEnhancedAnalytics,
    updateDateRange,
    getInsightsByMetric,
    getPredictionsByMetric,
    getSegmentsByConversionRate,
    getTopPerformingSegments,
    getMetricTrend
  };
};
