"use client";

import { Card } from "@/components/ui/card";
import { Seller } from "@/types/seller";
import { Star } from "lucide-react";
import Link from "next/link";

interface FeaturedSellersProps {
  sellers: Seller[];
}

export function FeaturedSellers({ sellers }: FeaturedSellersProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Vendedores Destacados</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sellers.map((seller) => (
          <Link key={seller.id} href={`/marketplace/seller/${seller.id}`}>
            <Card className="group cursor-pointer p-6 transition-shadow hover:shadow-md">
              <div className="flex items-center space-x-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  {/* Avatar del vendedor */}
                  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-2xl">
                    {seller.tier === "ELITE" && "👑"}
                    {seller.tier === "EXPERTO" && "⭐"}
                    {seller.tier === "VERIFICADO" && "✓"}
                    {seller.tier === "NUEVO" && "🌱"}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-semibold group-hover:text-primary">
                      {seller.name}
                    </h3>
                    {seller.verified && (
                      <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                        Verificado
                      </span>
                    )}
                  </div>
                  <div className="mt-1 flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">
                      {seller.rating.overall.toFixed(1)} ({seller.rating.totalReviews})
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {seller.metrics.totalSales} ventas · {seller.tier}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Respuesta</p>
                  <p className="font-medium">{seller.metrics.responseRate}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Completitud</p>
                  <p className="font-medium">{seller.metrics.completionRate}%</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
