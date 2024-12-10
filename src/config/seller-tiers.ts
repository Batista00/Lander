import { SellerTierRequirements } from "@/types/seller";

export const SELLER_TIERS: SellerTierRequirements[] = [
  {
    tier: "NUEVO",
    minSales: 0,
    minRating: 0,
    maxRefundRate: 100,
    minResponseRate: 0,
    maxResponseTime: 1440, // 24 horas
    commission: 15, // 15% comisión
    benefits: [
      "Acceso al marketplace",
      "Soporte básico",
      "Hasta 5 productos activos",
    ],
    icon: "🌱"
  },
  {
    tier: "VERIFICADO",
    minSales: 10,
    minRating: 4.0,
    maxRefundRate: 5,
    minResponseRate: 80,
    maxResponseTime: 720, // 12 horas
    commission: 12, // 12% comisión
    benefits: [
      "Badge de vendedor verificado",
      "Hasta 15 productos activos",
      "Prioridad en soporte",
      "Análisis básico de métricas",
      "Acceso a promociones especiales"
    ],
    icon: "✓"
  },
  {
    tier: "EXPERTO",
    minSales: 50,
    minRating: 4.5,
    maxRefundRate: 3,
    minResponseRate: 90,
    maxResponseTime: 360, // 6 horas
    commission: 10, // 10% comisión
    benefits: [
      "Badge de vendedor experto",
      "Productos ilimitados",
      "Soporte prioritario",
      "Análisis avanzado de métricas",
      "Acceso a beta features",
      "Promoción destacada",
      "Programa de referidos"
    ],
    icon: "⭐"
  },
  {
    tier: "ELITE",
    minSales: 200,
    minRating: 4.8,
    maxRefundRate: 1,
    minResponseRate: 95,
    maxResponseTime: 180, // 3 horas
    commission: 8, // 8% comisión
    benefits: [
      "Badge de vendedor elite",
      "Comisión reducida",
      "Soporte VIP",
      "Análisis premium de métricas",
      "Acceso anticipado a features",
      "Promoción premium",
      "Programa de referidos mejorado",
      "Account manager dedicado",
      "Webinars exclusivos"
    ],
    icon: "👑"
  }
];
