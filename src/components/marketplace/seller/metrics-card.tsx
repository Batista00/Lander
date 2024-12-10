"use client";

import { Card } from "@/components/ui/card";
import { SellerMetrics } from "@/types/seller";
import {
  Clock,
  DollarSign,
  MessageSquare,
  RefreshCcw,
  ShoppingCart,
  Star,
  ThumbsDown,
} from "lucide-react";

interface MetricsCardProps {
  metrics: SellerMetrics;
}

export function MetricsCard({ metrics }: MetricsCardProps) {
  const metricItems = [
    {
      label: "Ventas Totales",
      value: metrics.totalSales,
      icon: ShoppingCart,
      format: (v: number) => v.toString(),
    },
    {
      label: "Ingresos",
      value: metrics.totalRevenue,
      icon: DollarSign,
      format: (v: number) => `$${v.toLocaleString()}`,
    },
    {
      label: "Calificación",
      value: metrics.averageRating,
      icon: Star,
      format: (v: number) => v.toFixed(1),
    },
    {
      label: "Tasa de Respuesta",
      value: metrics.responseRate,
      icon: MessageSquare,
      format: (v: number) => `${v}%`,
    },
    {
      label: "Tiempo de Respuesta",
      value: metrics.responseTime,
      icon: Clock,
      format: (v: number) => `${v} min`,
    },
    {
      label: "Tasa de Completitud",
      value: metrics.completionRate,
      icon: RefreshCcw,
      format: (v: number) => `${v}%`,
    },
    {
      label: "Tasa de Reembolso",
      value: metrics.refundRate,
      icon: ThumbsDown,
      format: (v: number) => `${v}%`,
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="mb-4 text-lg font-semibold">Métricas de Rendimiento</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {metricItems.map((item) => (
          <div
            key={item.label}
            className="flex items-center space-x-4 rounded-lg border p-4"
          >
            <div className="rounded-full bg-primary/10 p-2">
              <item.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="text-lg font-semibold">
                {item.format(item.value)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
