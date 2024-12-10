"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Package, DollarSign, Users } from "lucide-react";

export default function SellerPage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Panel de Vendedor</h1>
        <Button size="lg">
          <Upload className="mr-2 h-4 w-4" />
          Subir Producto
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="p-6">
          <Package className="h-8 w-8 mb-4 text-primary" />
          <h3 className="text-2xl font-bold">12</h3>
          <p className="text-sm text-muted-foreground">Productos Publicados</p>
        </Card>
        
        <Card className="p-6">
          <DollarSign className="h-8 w-8 mb-4 text-primary" />
          <h3 className="text-2xl font-bold">$1,234</h3>
          <p className="text-sm text-muted-foreground">Ventas Totales</p>
        </Card>
        
        <Card className="p-6">
          <Users className="h-8 w-8 mb-4 text-primary" />
          <h3 className="text-2xl font-bold">45</h3>
          <p className="text-sm text-muted-foreground">Clientes</p>
        </Card>
        
        <Card className="p-6">
          <DollarSign className="h-8 w-8 mb-4 text-primary" />
          <h3 className="text-2xl font-bold">$890</h3>
          <p className="text-sm text-muted-foreground">Este Mes</p>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Últimas Ventas</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b">
              <div>
                <h4 className="font-medium">Landing Page Template {i}</h4>
                <p className="text-sm text-muted-foreground">Hace {i} días</p>
              </div>
              <div className="text-right">
                <p className="font-medium">$49.99</p>
                <p className="text-sm text-green-600">Completado</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
