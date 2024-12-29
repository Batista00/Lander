import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LineChart,
  BarChart,
  PieChart,
  Sparkles,
  TrendingUp,
  Users,
  MousePointerClick,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { aiLandingService, type AIOptimization } from '@/services/ai/AILandingService';
import { motion, AnimatePresence } from 'framer-motion';

interface AnalyticsData {
  views: number;
  conversions: number;
  bounceRate: number;
  avgTimeOnPage: number;
  conversionRate: number;
  trafficSources: {
    source: string;
    percentage: number;
  }[];
  timeline: {
    date: string;
    views: number;
    conversions: number;
  }[];
}

interface AIAnalyticsProps {
  landingPageId: string;
}

export const AIAnalytics: React.FC<AIAnalyticsProps> = ({ landingPageId }) => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [optimizations, setOptimizations] = useState<AIOptimization[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    loadAnalytics();
    loadOptimizations();
  }, [landingPageId]);

  const loadAnalytics = async () => {
    // Cargar datos de analytics
    try {
      const data = await fetch(`/api/analytics/${landingPageId}`).then(res => res.json());
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  const loadOptimizations = async () => {
    try {
      const page = await fetch(`/api/pages/${landingPageId}`).then(res => res.json());
      const optimizations = await aiLandingService.analyzePerformance(page);
      setOptimizations(optimizations);
    } catch (error) {
      console.error('Error loading optimizations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!analytics) return null;

  return (
    <div className="space-y-6">
      {/* KPI Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <h3 className="text-2xl font-bold mt-1">{analytics.views}</h3>
              </div>
              <Users className="w-8 h-8 text-primary opacity-75" />
            </div>
            <Progress
              value={
                ((analytics.views - analytics.timeline[0].views) /
                  analytics.timeline[0].views) *
                100
              }
              className="mt-4"
            />
            <p className="text-sm text-muted-foreground mt-2">
              +15% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversions</p>
                <h3 className="text-2xl font-bold mt-1">{analytics.conversions}</h3>
              </div>
              <MousePointerClick className="w-8 h-8 text-primary opacity-75" />
            </div>
            <Progress
              value={analytics.conversionRate * 100}
              className="mt-4"
            />
            <p className="text-sm text-muted-foreground mt-2">
              {(analytics.conversionRate * 100).toFixed(1)}% conversion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Time on Page</p>
                <h3 className="text-2xl font-bold mt-1">
                  {Math.floor(analytics.avgTimeOnPage / 60)}m {analytics.avgTimeOnPage % 60}s
                </h3>
              </div>
              <Clock className="w-8 h-8 text-primary opacity-75" />
            </div>
            <Progress
              value={(analytics.avgTimeOnPage / 300) * 100}
              className="mt-4"
            />
            <p className="text-sm text-muted-foreground mt-2">
              +30s from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bounce Rate</p>
                <h3 className="text-2xl font-bold mt-1">
                  {(analytics.bounceRate * 100).toFixed(1)}%
                </h3>
              </div>
              <AlertTriangle className="w-8 h-8 text-primary opacity-75" />
            </div>
            <Progress
              value={(1 - analytics.bounceRate) * 100}
              className="mt-4"
            />
            <p className="text-sm text-muted-foreground mt-2">
              -5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights & Optimizations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Insights & Optimizations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {optimizations.map((opt, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-4 rounded-lg border"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={
                      opt.priority === 'high' ? 'destructive' :
                      opt.priority === 'medium' ? 'default' : 'secondary'
                    }>
                      {opt.priority} priority
                    </Badge>
                    <Badge variant="outline">{opt.type}</Badge>
                  </div>
                  <p className="font-medium">{opt.suggestion}</p>
                  <p className="text-sm text-muted-foreground mt-1">{opt.implementation}</p>
                  <p className="text-sm text-primary mt-2">Expected impact: {opt.impact}</p>
                </div>
                <Button variant="outline" size="sm">
                  Apply
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Traffic Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Traffic Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{source.source}</p>
                  <Progress value={source.percentage} className="h-2 w-[200px]" />
                </div>
                <span className="text-sm text-muted-foreground">
                  {source.percentage}%
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline Chart would go here */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Implement your preferred charting library here */}
          <div className="h-[300px]">
            {/* Chart Component */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
