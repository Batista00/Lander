"use client";

import { Card } from "@/components/ui/card";
import { DashboardHead } from '@/components/dashboard/DashboardHead';

export default function DashboardPage() {
  return (
    <>
      <DashboardHead 
        title="Panel de Control"
        description="Gestiona tus landing pages, analiza estadísticas y optimiza tu rendimiento desde un solo lugar."
      />
      <div className="p-8">
        <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Landing Pages
            </h3>
            <p className="mt-2 text-3xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">4 activas</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Visitas Totales
            </h3>
            <p className="mt-2 text-3xl font-bold">1,234</p>
            <p className="text-xs text-muted-foreground">+12% vs mes anterior</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Conversiones
            </h3>
            <p className="mt-2 text-3xl font-bold">3.2%</p>
            <p className="text-xs text-muted-foreground">+0.5% vs mes anterior</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Ingresos
            </h3>
            <p className="mt-2 text-3xl font-bold">$2,345</p>
            <p className="text-xs text-muted-foreground">+8% vs mes anterior</p>
          </Card>
        </div>
      </div>
    </>
  );
}
