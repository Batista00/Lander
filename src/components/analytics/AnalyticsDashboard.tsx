import { useState } from 'react';
import { useAnalytics } from '../../modules/analytics/AnalyticsManager';
import { usePremiumStore } from '../../modules/premium/PremiumManager';
import { PremiumStatus } from '../premium/PremiumStatus';
import { Button } from '../ui/Button';

interface AnalyticsDashboardProps {
  pageId: string;
}

export function AnalyticsDashboard({ pageId }: AnalyticsDashboardProps) {
  const { isFeatureEnabled } = usePremiumStore();
  const analytics = useAnalytics();
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('day');

  const metrics = {
    views: analytics.getPageViewsCount(pageId, period),
    conversionRate: analytics.getConversionRate(pageId),
  };

  if (!isFeatureEnabled('analytics')) {
    return (
      <PremiumStatus featureId="analytics">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Analytics Dashboard
          </h2>
          <p className="text-gray-600">
            Obtén insights detallados sobre el rendimiento de tu landing page
          </p>
        </div>
      </PremiumStatus>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Analytics Dashboard
          </h2>
          <p className="text-gray-600">
            Rendimiento de tu landing page
          </p>
        </div>
        <div className="flex space-x-2">
          {(['day', 'week', 'month'] as const).map((p) => (
            <Button
              key={p}
              variant={period === p ? 'default' : 'outline'}
              onClick={() => setPeriod(p)}
            >
              {p === 'day' ? 'Hoy' : p === 'week' ? 'Semana' : 'Mes'}
            </Button>
          ))}
        </div>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Visitas"
          value={metrics.views}
          change={+10.5}
          trend="up"
        />
        <MetricCard
          title="Tasa de Conversión"
          value={`${metrics.conversionRate.toFixed(1)}%`}
          change={-2.3}
          trend="down"
        />
        <MetricCard
          title="Tiempo Promedio"
          value="2:30"
          change={+15.8}
          trend="up"
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Visitas por Hora
          </h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            {/* Implementar gráfico de visitas */}
            <p className="text-gray-500">Gráfico de Visitas</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Fuentes de Tráfico
          </h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            {/* Implementar gráfico de fuentes */}
            <p className="text-gray-500">Gráfico de Fuentes</p>
          </div>
        </div>
      </div>

      {/* A/B Testing */}
      {isFeatureEnabled('abTesting') && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              A/B Testing
            </h3>
            <Button variant="outline">
              Crear Nueva Prueba
            </Button>
          </div>
          <div className="space-y-4">
            {/* Lista de pruebas A/B */}
            <div className="bg-gray-50 p-4 rounded">
              <p className="text-gray-500">No hay pruebas activas</p>
            </div>
          </div>
        </div>
      )}

      {/* Heatmap */}
      {isFeatureEnabled('heatmaps') && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Heatmap
            </h3>
            <Button variant="outline">
              Ver Detalles
            </Button>
          </div>
          <div className="h-96 bg-gray-50 rounded flex items-center justify-center">
            {/* Implementar visualización de heatmap */}
            <p className="text-gray-500">Visualización de Heatmap</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down';
}

function MetricCard({ title, value, change, trend }: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
      <div className="flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <span
          className={`ml-2 text-sm font-medium ${
            trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {change > 0 ? '+' : ''}
          {change}%
        </span>
      </div>
    </div>
  );
}
