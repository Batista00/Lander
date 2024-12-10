"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface CartItem {
  id: string;
  title: string;
  price: number;
  preview: string;
}

export function CartButton() {
  const [items, setItems] = useState<CartItem[]>([]);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrito de Compras</SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex h-full flex-col">
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-center text-muted-foreground">
                Tu carrito está vacío
              </p>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        {/* Imagen del producto */}
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
                          ${item.price}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setItems(items.filter((i) => i.id !== item.id))
                      }
                    >
                      Eliminar
                    </Button>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Total</p>
                  <p className="font-bold">${total.toFixed(2)}</p>
                </div>
                <Button className="mt-4 w-full">Proceder al Pago</Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
