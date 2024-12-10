"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

const purchases = [
  {
    id: "1",
    title: "Business Landing Pro",
    purchaseDate: "2023-12-01",
    price: 49.99,
    status: "Completado",
    downloads: 2,
    seller: "Digital Solutions"
  },
  {
    id: "2",
    title: "Portfolio Premium",
    purchaseDate: "2023-11-15",
    price: 39.99,
    status: "Completado",
    downloads: 1,
    seller: "Creative Labs"
  }
];

export default function PurchasesPage() {
  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Mis Compras</h1>
      
      <div className="space-y-6">
        {purchases.map((purchase) => (
          <Card key={purchase.id} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{purchase.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Vendedor: {purchase.seller}
                </p>
                <p className="text-sm text-muted-foreground">
                  Fecha: {new Date(purchase.purchaseDate).toLocaleDateString()}
                </p>
                <p className="mt-2 font-medium">${purchase.price}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="mr-2 h-4 w-4" />
                  Vista Previa
                </Button>
                <Button size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
