"use client";

import { useMarketplace } from "@/providers/marketplace-provider";
import { ProductCard } from "./product-card";

const mockProducts = [
  {
    id: "1",
    title: "Business Landing Pro",
    description: "Landing page profesional para negocios",
    price: 49.99,
    image: "/previews/business-landing.jpg",
    rating: 4.5,
    sales: 120,
    seller: {
      id: "1",
      name: "Digital Solutions",
      rating: 4.8
    }
  },
  {
    id: "2",
    title: "Portfolio Premium",
    description: "Template perfecto para portafolios creativos",
    price: 39.99,
    image: "/previews/portfolio-landing.jpg",
    rating: 4.7,
    sales: 85,
    seller: {
      id: "2",
      name: "Creative Labs",
      rating: 4.6
    }
  },
  {
    id: "3",
    title: "E-commerce Starter",
    description: "Landing page optimizada para e-commerce",
    price: 59.99,
    image: "/previews/ecommerce-landing.jpg",
    rating: 4.8,
    sales: 200,
    seller: {
      id: "3",
      name: "Web Masters",
      rating: 4.9
    }
  },
  {
    id: "4",
    title: "Agency Template",
    description: "Template profesional para agencias",
    price: 69.99,
    image: "/previews/agency-landing.jpg",
    rating: 4.6,
    sales: 150,
    seller: {
      id: "1",
      name: "Digital Solutions",
      rating: 4.8
    }
  },
  {
    id: "5",
    title: "SaaS Landing",
    description: "Landing page perfecta para productos SaaS",
    price: 79.99,
    image: "/previews/saas-landing.jpg",
    rating: 4.9,
    sales: 180,
    seller: {
      id: "2",
      name: "Creative Labs",
      rating: 4.6
    }
  },
  {
    id: "6",
    title: "Startup Pack",
    description: "Pack completo de landing pages para startups",
    price: 99.99,
    image: "/previews/startup-landing.jpg",
    rating: 4.7,
    sales: 90,
    seller: {
      id: "3",
      name: "Web Masters",
      rating: 4.9
    }
  }
];

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {mockProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          description={product.description}
          price={product.price}
          image={product.image}
          rating={product.rating}
          sales={product.sales}
          seller={product.seller}
        />
      ))}
    </div>
  );
}
