"use client";

import { Card } from "@/components/ui/card";
import { ProductGrid } from "@/components/marketplace/product-grid";
import { CategoryFilter } from "@/components/marketplace/category-filter";
import { SortFilter } from "@/components/marketplace/sort-filter";
import { FeaturedSellers } from "@/components/marketplace/featured-sellers";
import { SearchBar } from "@/components/marketplace/search-bar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardMarketplace() {
  return (
    <div className="p-8">
      {/* Header con Stats */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Productos Activos
          </h3>
          <p className="mt-2 text-3xl font-bold">245</p>
          <p className="text-xs text-muted-foreground">+5% vs mes anterior</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Ventas Totales
          </h3>
          <p className="mt-2 text-3xl font-bold">$12,450</p>
          <p className="text-xs text-muted-foreground">+12% vs mes anterior</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Vendedores Activos
          </h3>
          <p className="mt-2 text-3xl font-bold">48</p>
          <p className="text-xs text-muted-foreground">+3 nuevos esta semana</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground">
            Calificación Promedio
          </h3>
          <p className="mt-2 text-3xl font-bold">4.8</p>
          <p className="text-xs text-muted-foreground">De 1,234 reseñas</p>
        </Card>
      </div>

      {/* Acciones Rápidas */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SearchBar />
          <SortFilter />
        </div>
        <Link href="/dashboard/marketplace/products/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Button>
        </Link>
      </div>

      {/* Contenido Principal */}
      <div className="grid gap-8">
        {/* Vendedores Destacados */}
        <Card className="p-6">
          <h2 className="mb-6 text-xl font-semibold">Vendedores Destacados</h2>
          <FeaturedSellers
            sellers={[
              {
                id: "1",
                name: "Digital Solutions",
                email: "contact@digitalsolutions.com",
                tier: "ELITE",
                rating: {
                  overall: 4.9,
                  productQuality: 4.9,
                  communication: 4.8,
                  delivery: 4.9,
                  support: 4.8,
                  totalReviews: 250
                },
                metrics: {
                  totalSales: 520,
                  totalRevenue: 52000,
                  averageRating: 4.9,
                  responseRate: 98,
                  responseTime: 30,
                  completionRate: 99,
                  refundRate: 0.5
                },
                achievements: [],
                joinedAt: new Date("2023-01-01"),
                lastActive: new Date(),
                verified: true,
                featured: true
              },
              {
                id: "2",
                name: "Creative Labs",
                email: "hello@creativelabs.com",
                tier: "EXPERTO",
                rating: {
                  overall: 4.7,
                  productQuality: 4.8,
                  communication: 4.7,
                  delivery: 4.6,
                  support: 4.7,
                  totalReviews: 180
                },
                metrics: {
                  totalSales: 320,
                  totalRevenue: 32000,
                  averageRating: 4.7,
                  responseRate: 95,
                  responseTime: 45,
                  completionRate: 98,
                  refundRate: 1
                },
                achievements: [],
                joinedAt: new Date("2023-03-01"),
                lastActive: new Date(),
                verified: true,
                featured: true
              }
            ]}
          />
        </Card>

        {/* Productos */}
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <CategoryFilter />
          </div>
          <div className="lg:col-span-3">
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
