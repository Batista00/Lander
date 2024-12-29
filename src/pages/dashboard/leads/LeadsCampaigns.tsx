"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function LeadsCampaigns() {
  const [campaigns, setCampaigns] = useState([]);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Campañas</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona tus campañas de email marketing
          </p>
        </div>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Nueva Campaña
        </button>
      </div>

      <Card className="p-6">
        {campaigns.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No hay campañas activas</p>
          </div>
        ) : (
          <div className="divide-y">
            {/* Lista de campañas aquí */}
          </div>
        )}
      </Card>
    </div>
  );
}
