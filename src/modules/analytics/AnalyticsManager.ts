import { create } from 'zustand';

interface PageView {
  pageId: string;
  timestamp: number;
  source: string;
  device: string;
  country: string;
}

interface Conversion {
  pageId: string;
  type: 'form' | 'button' | 'booking';
  timestamp: number;
  data: any;
}

interface ABTest {
  id: string;
  pageId: string;
  variants: {
    id: string;
    name: string;
    traffic: number;
    conversions: number;
  }[];
  startDate: number;
  endDate: number | null;
  status: 'running' | 'completed' | 'stopped';
}

interface AnalyticsState {
  pageViews: PageView[];
  conversions: Conversion[];
  abTests: ABTest[];
  
  // Acciones
  addPageView: (view: Omit<PageView, 'timestamp'>) => void;
  addConversion: (conversion: Omit<Conversion, 'timestamp'>) => void;
  createABTest: (test: Omit<ABTest, 'id'>) => void;
  stopABTest: (testId: string) => void;
  
  // Métricas
  getPageViewsCount: (pageId: string, period?: 'day' | 'week' | 'month') => number;
  getConversionRate: (pageId: string) => number;
  getABTestResults: (testId: string) => {
    winner: string | null;
    confidence: number;
    improvement: number;
  };
}

export const useAnalytics = create<AnalyticsState>((set, get) => ({
  pageViews: [],
  conversions: [],
  abTests: [],

  addPageView: (view) => {
    set((state) => ({
      pageViews: [...state.pageViews, { ...view, timestamp: Date.now() }],
    }));
  },

  addConversion: (conversion) => {
    set((state) => ({
      conversions: [...state.conversions, { ...conversion, timestamp: Date.now() }],
    }));
  },

  createABTest: (test) => {
    const newTest: ABTest = {
      ...test,
      id: Math.random().toString(36).substr(2, 9),
      status: 'running',
    };
    set((state) => ({
      abTests: [...state.abTests, newTest],
    }));
  },

  stopABTest: (testId) => {
    set((state) => ({
      abTests: state.abTests.map((test) =>
        test.id === testId
          ? { ...test, status: 'stopped', endDate: Date.now() }
          : test
      ),
    }));
  },

  getPageViewsCount: (pageId, period = 'day') => {
    const state = get();
    const now = Date.now();
    const periods = {
      day: 24 * 60 * 60 * 1000,
      week: 7 * 24 * 60 * 60 * 1000,
      month: 30 * 24 * 60 * 60 * 1000,
    };

    return state.pageViews.filter(
      (view) =>
        view.pageId === pageId &&
        view.timestamp > now - periods[period]
    ).length;
  },

  getConversionRate: (pageId) => {
    const state = get();
    const views = state.pageViews.filter((view) => view.pageId === pageId).length;
    const conversions = state.conversions.filter(
      (conv) => conv.pageId === pageId
    ).length;

    return views === 0 ? 0 : (conversions / views) * 100;
  },

  getABTestResults: (testId) => {
    const state = get();
    const test = state.abTests.find((t) => t.id === testId);

    if (!test) {
      return {
        winner: null,
        confidence: 0,
        improvement: 0,
      };
    }

    // Implementar cálculo estadístico para determinar el ganador
    const variants = test.variants.sort((a, b) => b.conversions / b.traffic - a.conversions / a.traffic);
    const winner = variants[0];
    const runnerUp = variants[1];

    const improvement = ((winner.conversions / winner.traffic) / (runnerUp.conversions / runnerUp.traffic) - 1) * 100;

    return {
      winner: winner.id,
      confidence: 95, // Implementar cálculo real de confianza estadística
      improvement,
    };
  },
}));
