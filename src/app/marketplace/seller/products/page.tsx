"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export default function SellerProducts() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mis Landing Pages</h1>
        <Link href="/marketplace/seller/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nueva Landing Page
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            {/* Preview Image */}
            <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <span className="text-gray-400">Vista previa no disponible</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Landing Page {i}</h3>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  Activo
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Landing page profesional para negocios
              </p>
              
              {/* Stats */}
              <div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <p className="text-sm text-gray-500">Ventas</p>
                  <p className="font-semibold">32</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ingresos</p>
                  <p className="font-semibold">$9,599.68</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <span className="text-lg font-bold">$299.99</span>
                <div className="space-x-2">
                  <Link href={`/marketplace/seller/products/${i}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-1 h-4 w-4" />
                      Editar
                    </Button>
                  </Link>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="mr-1 h-4 w-4" />
                    Eliminar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
