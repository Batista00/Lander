"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

const favorites = [
  {
    id: "1",
    title: "E-commerce Template Pro",
    price: 79.99,
    seller: "Web Solutions Inc",
    rating: 4.8,
    image: "/products/ecommerce-template.jpg"
  },
  {
    id: "2",
    title: "Blog Theme Premium",
    price: 29.99,
    seller: "Theme Masters",
    rating: 4.5,
    image: "/products/blog-theme.jpg"
  }
];

export default function FavoritesPage() {
  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Mis Favoritos</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((item) => (
          <Card key={item.id} className="p-6">
            <div className="aspect-square relative mb-4 bg-muted rounded-lg">
              {/* Placeholder para imagen */}
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                Vista previa no disponible
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                por {item.seller}
              </p>
              <p className="mt-2 font-medium">${item.price}</p>
              
              <div className="mt-4 flex space-x-2">
                <Button className="flex-1" variant="outline">
                  <Heart className="mr-2 h-4 w-4 fill-current" />
                  Quitar
                </Button>
                <Button className="flex-1">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Comprar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
