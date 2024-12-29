"use client";

import { Card } from "@/components/ui/card";

export default function Settings() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Configuración</h1>
        <p className="text-sm text-muted-foreground">
          Gestiona las configuraciones de tu cuenta
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Perfil</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nombre</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="Tu nombre"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                placeholder="tu@email.com"
                disabled
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Notificaciones</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificaciones por email</p>
                <p className="text-sm text-muted-foreground">
                  Recibe notificaciones cuando tengas nuevos leads
                </p>
              </div>
              <input type="checkbox" className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-medium mb-4">Plan Actual</h2>
          <div>
            <p className="font-medium">Plan Gratuito</p>
            <p className="text-sm text-muted-foreground">
              100 leads por mes
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
