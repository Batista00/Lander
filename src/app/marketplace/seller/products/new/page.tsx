"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { Switch } from "@/components/ui/switch";

export default function NewProduct() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Nuevo Producto</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Información Básica</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input id="title" placeholder="Ej: Landing Page Profesional" />
              </div>
              <div>
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  placeholder="Describe tu producto..."
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="price">Precio ($)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="99.99"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Imágenes y Preview</h2>
            <div className="space-y-4">
              <div>
                <Label>Imagen Principal</Label>
                <ImageUpload 
                  onChange={(url) => console.log(url)}
                  value=""
                />
              </div>
              <div>
                <Label>Imágenes Adicionales</Label>
                <ImageUpload 
                  onChange={(url) => console.log(url)}
                  value=""
                  multiple
                />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Componentes Incluidos</h2>
            <div className="space-y-4">
              {[
                "Header",
                "Hero",
                "Features",
                "Pricing",
                "Testimonials",
                "Contact",
                "Footer"
              ].map((component) => (
                <div key={component} className="flex items-center justify-between">
                  <Label htmlFor={component}>{component}</Label>
                  <Switch id={component} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold">Opciones de Personalización</h2>
            <div className="space-y-4">
              {[
                "Colores",
                "Fuentes",
                "Layout",
                "Contenido",
                "Imágenes",
                "Animaciones"
              ].map((option) => (
                <div key={option} className="flex items-center justify-between">
                  <Label htmlFor={option}>{option}</Label>
                  <Switch id={option} />
                </div>
              ))}
            </div>
          </Card>

          <div className="flex justify-end space-x-4">
            <Button variant="outline">Guardar como borrador</Button>
            <Button>Publicar producto</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
