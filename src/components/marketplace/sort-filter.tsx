"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

export function SortFilter() {
  return (
    <Card className="p-4">
      <Select defaultValue="newest">
        <SelectTrigger>
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Más recientes</SelectItem>
          <SelectItem value="popular">Más populares</SelectItem>
          <SelectItem value="rating">Mejor calificados</SelectItem>
          <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
          <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
          <SelectItem value="sales">Más vendidos</SelectItem>
        </SelectContent>
      </Select>
    </Card>
  );
}
