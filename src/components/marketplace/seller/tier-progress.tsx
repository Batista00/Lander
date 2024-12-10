"use client";

import { SELLER_TIERS } from "@/config/seller-tiers";
import { Seller, SellerTier } from "@/types/seller";
import { Progress } from "@/components/ui/progress";

interface TierProgressProps {
  seller: Seller;
}

export function TierProgress({ seller }: TierProgressProps) {
  const currentTierIndex = SELLER_TIERS.findIndex(
    (tier) => tier.tier === seller.tier
  );
  const nextTier = SELLER_TIERS[currentTierIndex + 1];

  if (!nextTier) return null;

  const calculateProgress = () => {
    const salesProgress = (seller.metrics.totalSales / nextTier.minSales) * 100;
    const ratingProgress =
      (seller.rating.overall / nextTier.minRating) * 100;
    const responseProgress =
      (seller.metrics.responseRate / nextTier.minResponseRate) * 100;

    return Math.min(
      Math.floor((salesProgress + ratingProgress + responseProgress) / 3),
      100
    );
  };

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            Progreso hacia {nextTier.tier}
          </h3>
          <p className="text-sm text-muted-foreground">
            {nextTier.icon} Siguiente nivel
          </p>
        </div>
        <span className="text-2xl font-bold">{calculateProgress()}%</span>
      </div>

      <Progress value={calculateProgress()} className="h-2" />

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm font-medium">Ventas</p>
          <p className="text-xs text-muted-foreground">
            {seller.metrics.totalSales} / {nextTier.minSales}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Calificación</p>
          <p className="text-xs text-muted-foreground">
            {seller.rating.overall.toFixed(1)} / {nextTier.minRating}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Respuesta</p>
          <p className="text-xs text-muted-foreground">
            {seller.metrics.responseRate}% / {nextTier.minResponseRate}%
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium">Beneficios del siguiente nivel:</p>
        <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
          {nextTier.benefits.slice(0, 3).map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
          {nextTier.benefits.length > 3 && (
            <li>Y {nextTier.benefits.length - 3} beneficios más...</li>
          )}
        </ul>
      </div>
    </div>
  );
}
