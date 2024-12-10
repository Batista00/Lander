"use client";

import { Card } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SellerDashboard() {
  const salesData = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Ventas",
        data: [12, 19, 15, 25, 22, 30],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1
      }
    ]
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Panel de Vendedor</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Ventas Totales</h3>
          <p className="mt-2 text-3xl font-bold">$1,234.56</p>
          <p className="text-sm text-gray-500">+12% vs mes anterior</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Comisiones</h3>
          <p className="mt-2 text-3xl font-bold">$123.45</p>
          <p className="text-sm text-gray-500">10% promedio</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold">Productos Activos</h3>
          <p className="mt-2 text-3xl font-bold">8</p>
          <p className="text-sm text-gray-500">2 pendientes de revisión</p>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Ventas Recientes</h3>
          <Line data={salesData} />
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Productos Más Vendidos</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Landing Page {i}</p>
                  <p className="text-sm text-gray-500">32 ventas</p>
                </div>
                <p className="font-semibold">$299.99</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Últimas Transacciones</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div>
                  <p className="font-medium">Orden #{1000 + i}</p>
                  <p className="text-sm text-gray-500">Landing Page Premium</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">$299.99</p>
                  <p className="text-sm text-gray-500">Comisión: $29.99</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
