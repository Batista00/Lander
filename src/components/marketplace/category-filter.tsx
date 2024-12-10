"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const categories = [
  {
    id: "landing-pages",
    name: "Landing Pages",
    count: 150,
    subcategories: [
      { id: "business", name: "Negocios", count: 45 },
      { id: "portfolio", name: "Portafolio", count: 35 },
      { id: "ecommerce", name: "E-commerce", count: 30 },
      { id: "services", name: "Servicios", count: 25 },
      { id: "events", name: "Eventos", count: 15 },
    ],
  },
  {
    id: "templates",
    name: "Templates",
    count: 80,
    subcategories: [
      { id: "minimal", name: "Minimalista", count: 30 },
      { id: "modern", name: "Moderno", count: 25 },
      { id: "corporate", name: "Corporativo", count: 15 },
      { id: "creative", name: "Creativo", count: 10 },
    ],
  },
  {
    id: "components",
    name: "Componentes",
    count: 200,
    subcategories: [
      { id: "headers", name: "Headers", count: 50 },
      { id: "heroes", name: "Heroes", count: 45 },
      { id: "features", name: "Features", count: 40 },
      { id: "pricing", name: "Pricing", count: 35 },
      { id: "testimonials", name: "Testimonials", count: 30 },
    ],
  },
];

export function CategoryFilter() {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Búsqueda */}
        <div>
          <Label htmlFor="search">Buscar</Label>
          <Input
            id="search"
            placeholder="Buscar en marketplace..."
            className="mt-1.5"
          />
        </div>

        {/* Categorías */}
        <div>
          <h3 className="mb-3 font-semibold">Categorías</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id}>
                <Button
                  variant={selectedCategory === category.id ? "default" : "ghost"}
                  className="w-full justify-between"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span>{category.name}</span>
                  <span className="text-sm text-muted-foreground">
                    ({category.count})
                  </span>
                </Button>
                {selectedCategory === category.id && (
                  <div className="ml-4 mt-2 space-y-1">
                    {category.subcategories.map((sub) => (
                      <Button
                        key={sub.id}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between"
                      >
                        <span>{sub.name}</span>
                        <span className="text-sm text-muted-foreground">
                          ({sub.count})
                        </span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Rango de Precio */}
        <div>
          <Label>Rango de Precio</Label>
          <div className="mt-6">
            <Slider
              defaultValue={[0, 500]}
              max={500}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
            />
            <div className="mt-2 flex items-center justify-between text-sm">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Calificación del Vendedor */}
        <div>
          <h3 className="mb-3 font-semibold">Calificación del Vendedor</h3>
          <div className="space-y-2">
            {["ELITE", "EXPERTO", "VERIFICADO", "TODOS"].map((tier) => (
              <Button
                key={tier}
                variant="ghost"
                className="w-full justify-between"
              >
                <span>{tier}</span>
                {tier === "ELITE" && "👑"}
                {tier === "EXPERTO" && "⭐"}
                {tier === "VERIFICADO" && "✓"}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
