"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function LeadsList() {
  const [leads, setLeads] = useState([]);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Todos los Leads</h1>
          <p className="text-sm text-muted-foreground">
            Gestiona y da seguimiento a tus leads
          </p>
        </div>
      </div>

      <Card className="p-6">
        {leads.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-muted-foreground">No hay leads aún</p>
          </div>
        ) : (
          <div className="divide-y">
            {/* Lista de leads aquí */}
          </div>
        )}
      </Card>
    </div>
  );
}
