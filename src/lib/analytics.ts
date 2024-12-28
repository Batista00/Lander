import { db } from '@/lib/firebase';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';

interface AnalyticsEvent {
  type: string;
  componentId: string;
  data?: any;
  timestamp: Date;
}

interface ABTest {
  id: string;
  variant: 'A' | 'B';
  componentId: string;
  metrics: {
    views: number;
    clicks: number;
    conversions: number;
  };
}

class AnalyticsService {
  private async logEvent(event: Omit<AnalyticsEvent, 'timestamp'>) {
    try {
      const eventsRef = collection(db, 'analytics_events');
      await addDoc(eventsRef, {
        ...event,
        timestamp: Timestamp.now()
      });
    } catch (error) {
      console.error('Error logging analytics event:', error);
    }
  }

  async trackView(componentId: string, data?: any) {
    await this.logEvent({
      type: 'view',
      componentId,
      data
    });
  }

  async trackClick(componentId: string, data?: any) {
    await this.logEvent({
      type: 'click',
      componentId,
      data
    });
  }

  async trackConversion(componentId: string, data?: any) {
    await this.logEvent({
      type: 'conversion',
      componentId,
      data
    });
  }

  async trackEvent(type: string, data: any) {
    await this.logEvent({
      type,
      componentId: data.componentId || 'general',
      data
    });
  }

  async getComponentStats(componentId: string, startDate?: Date, endDate?: Date) {
    try {
      const eventsRef = collection(db, 'analytics_events');
      let q = query(
        eventsRef,
        where('componentId', '==', componentId)
      );

      if (startDate) {
        q = query(q, where('timestamp', '>=', startDate));
      }
      if (endDate) {
        q = query(q, where('timestamp', '<=', endDate));
      }

      const snapshot = await getDocs(q);
      const events = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return {
        views: events.filter(e => e.type === 'view').length,
        clicks: events.filter(e => e.type === 'click').length,
        conversions: events.filter(e => e.type === 'conversion').length,
        events
      };
    } catch (error) {
      console.error('Error getting component stats:', error);
      return null;
    }
  }

  async startABTest(componentId: string) {
    try {
      const testRef = collection(db, 'ab_tests');
      const testId = Date.now().toString();

      // Crear variante A
      await addDoc(testRef, {
        id: `${testId}_A`,
        componentId,
        variant: 'A',
        metrics: {
          views: 0,
          clicks: 0,
          conversions: 0
        },
        startedAt: Timestamp.now()
      });

      // Crear variante B
      await addDoc(testRef, {
        id: `${testId}_B`,
        componentId,
        variant: 'B',
        metrics: {
          views: 0,
          clicks: 0,
          conversions: 0
        },
        startedAt: Timestamp.now()
      });

      return testId;
    } catch (error) {
      console.error('Error starting AB test:', error);
      return null;
    }
  }

  async updateABTestMetrics(testId: string, variant: 'A' | 'B', metric: keyof ABTest['metrics']) {
    try {
      const testRef = collection(db, 'ab_tests');
      const q = query(
        testRef,
        where('id', '==', `${testId}_${variant}`)
      );
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        const currentMetrics = doc.data().metrics;
        await addDoc(doc.ref, {
          metrics: {
            ...currentMetrics,
            [metric]: currentMetrics[metric] + 1
          }
        });
      }
    } catch (error) {
      console.error('Error updating AB test metrics:', error);
    }
  }

  async getABTestResults(testId: string): Promise<{ A: ABTest['metrics'], B: ABTest['metrics'] } | null> {
    try {
      const testRef = collection(db, 'ab_tests');
      const q = query(testRef, where('id', 'in', [`${testId}_A`, `${testId}_B`]));
      const snapshot = await getDocs(q);

      const results = {
        A: { views: 0, clicks: 0, conversions: 0 },
        B: { views: 0, clicks: 0, conversions: 0 }
      };

      snapshot.docs.forEach(doc => {
        const data = doc.data();
        results[data.variant as 'A' | 'B'] = data.metrics;
      });

      return results;
    } catch (error) {
      console.error('Error getting AB test results:', error);
      return null;
    }
  }
}

export const Analytics = new AnalyticsService();
