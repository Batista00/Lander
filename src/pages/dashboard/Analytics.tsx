"use client";

import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Lun', visits: 0 },
  { name: 'Mar', visits: 0 },
  { name: 'Mie', visits: 0 },
  { name: 'Jue', visits: 0 },
  { name: 'Vie', visits: 0 },
  { name: 'Sab', visits: 0 },
  { name: 'Dom', visits: 0 },
];

export default function Analytics() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Métricas y estadísticas de tus landing pages
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Visitas Totales
          </h3>
          <p className="mt-2 text-3xl font-bold">0</p>
          <p className="text-xs text-muted-foreground">Últimos 7 días</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Conversiones
          </h3>
          <p className="mt-2 text-3xl font-bold">0%</p>
          <p className="text-xs text-muted-foreground">Tasa promedio</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Leads Generados
          </h3>
          <p className="mt-2 text-3xl font-bold">0</p>
          <p className="text-xs text-muted-foreground">Este mes</p>
        </Card>

        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Landing Pages Activas
          </h3>
          <p className="mt-2 text-3xl font-bold">0</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <h3 className="mb-4 text-lg font-medium">Visitas por Día</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="visits" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
