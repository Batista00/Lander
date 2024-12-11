"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Share2, Eye, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface ProductDetailProps {
  product: {
    id: string;
    title: string;
    description: string;
    price: number;
    rating: number;
    reviews: number;
    sales: number;
    preview: string;
    seller: {
      name: string;
      rating: number;
      tier: string;
    };
    features: string[];
    components: string[];
  };
}

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="container mx-auto p-6">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Preview */}
        <div className="space-y-4">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={product.preview}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative aspect-video cursor-pointer overflow-hidden rounded-lg border-2 hover:border-primary"
              >
                <Image
                  src={product.preview}
                  alt={`Preview ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="mt-2 flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{product.rating}</span>
                <span className="ml-1 text-muted-foreground">
                  ({product.reviews} reseñas)
                </span>
              </div>
              <div className="flex items-center">
                <Eye className="h-5 w-5 text-muted-foreground" />
                <span className="ml-1">{product.sales} ventas</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-2xl font-bold">${product.price}</p>
            <div className="flex space-x-4">
              <Button className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Comprar Ahora
              </Button>
              <Button variant="outline" className="flex-1">
                Vista Previa
              </Button>
            </div>
          </div>

          <Card className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <p className="font-medium">Vendedor: {product.seller.name}</p>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1">{product.seller.rating}</span>
                  <Badge variant="secondary" className="ml-2">
                    {product.seller.tier}
                  </Badge>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Contactar
              </Button>
            </div>
          </Card>

          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Descripción</TabsTrigger>
              <TabsTrigger value="features">Características</TabsTrigger>
              <TabsTrigger value="components">Componentes</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-muted-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="features" className="mt-4">
              <ul className="list-inside list-disc space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-muted-foreground">
                    {feature}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="components" className="mt-4">
              <ul className="list-inside list-disc space-y-2">
                {product.components.map((component, index) => (
                  <li key={index} className="text-muted-foreground">
                    {component}
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
