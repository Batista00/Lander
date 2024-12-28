"use client";

import { useMarketplace } from "@/providers/marketplace-provider";
import { ProductCard } from "./product-card";
import { useEffect } from "react";
import { Alert, CircularProgress, Grid } from "@mui/material";

export function ProductGrid() {
  const { state, loadTemplates } = useMarketplace();
  const { templates, loading, error } = state;

  useEffect(() => {
    loadTemplates();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Alert severity="error" className="mb-4">
        {error}
      </Alert>
    );
  }

  if (templates.length === 0) {
    return (
      <Alert severity="info" className="mb-4">
        No se encontraron templates que coincidan con los filtros.
      </Alert>
    );
  }

  return (
    <Grid container spacing={3}>
      {templates.map((template) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={template.id}>
          <ProductCard product={template} />
        </Grid>
      ))}
    </Grid>
  );
}
