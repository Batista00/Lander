import { ProductGrid } from "@/components/marketplace/product-grid";
import { CategoryFilter } from "@/components/marketplace/category-filter";
import { SearchBar } from "@/components/marketplace/search-bar";
import { SortFilter } from "@/components/marketplace/sort-filter";
import { FeaturedSellers } from "@/components/marketplace/featured-sellers";

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold">Marketplace</h1>
          <p className="text-xl text-muted-foreground">
            Encuentra las mejores landing pages, templates y componentes para tu negocio
          </p>
        </div>

        {/* Featured Sellers */}
        <FeaturedSellers
          sellers={[
            {
              id: "1",
              name: "Digital Solutions",
              email: "contact@digitalsolutions.com",
              tier: "ELITE",
              rating: {
                overall: 4.9,
                productQuality: 4.9,
                communication: 4.8,
                delivery: 4.9,
                support: 4.8,
                totalReviews: 250
              },
              metrics: {
                totalSales: 520,
                totalRevenue: 52000,
                averageRating: 4.9,
                responseRate: 98,
                responseTime: 30,
                completionRate: 99,
                refundRate: 0.5
              },
              achievements: [],
              joinedAt: new Date("2023-01-01"),
              lastActive: new Date(),
              verified: true,
              featured: true
            },
            {
              id: "2",
              name: "Creative Labs",
              email: "hello@creativelabs.com",
              tier: "EXPERTO",
              rating: {
                overall: 4.7,
                productQuality: 4.8,
                communication: 4.7,
                delivery: 4.6,
                support: 4.7,
                totalReviews: 180
              },
              metrics: {
                totalSales: 320,
                totalRevenue: 32000,
                averageRating: 4.7,
                responseRate: 95,
                responseTime: 45,
                completionRate: 98,
                refundRate: 1
              },
              achievements: [],
              joinedAt: new Date("2023-03-01"),
              lastActive: new Date(),
              verified: true,
              featured: true
            },
            {
              id: "3",
              name: "Web Masters",
              email: "contact@webmasters.com",
              tier: "VERIFICADO",
              rating: {
                overall: 4.5,
                productQuality: 4.6,
                communication: 4.5,
                delivery: 4.4,
                support: 4.5,
                totalReviews: 120
              },
              metrics: {
                totalSales: 150,
                totalRevenue: 15000,
                averageRating: 4.5,
                responseRate: 92,
                responseTime: 60,
                completionRate: 97,
                refundRate: 2
              },
              achievements: [],
              joinedAt: new Date("2023-06-01"),
              lastActive: new Date(),
              verified: true,
              featured: true
            }
          ]}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Filtros */}
          <div className="space-y-6">
            <CategoryFilter />
            <SortFilter />
          </div>

          {/* Productos */}
          <div className="lg:col-span-3">
            <ProductGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
