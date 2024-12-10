"use client";

import { ProductDetail } from "@/components/marketplace/product-detail";

export default function ProductPage({ params }: { params: { productId: string } }) {
  // En un caso real, aquí cargaríamos los datos del producto desde la API
  const mockProduct = {
    id: params.productId,
    title: "Landing Page Profesional",
    description: "Una landing page moderna y profesional perfecta para negocios. Incluye todas las secciones necesarias para convertir visitantes en clientes.",
    price: 99.99,
    rating: 4.8,
    reviews: 124,
    sales: 350,
    preview: "/previews/landing-1.jpg",
    seller: {
      name: "Digital Solutions",
      rating: 4.9,
      tier: "ELITE"
    },
    features: [
      "Diseño responsive",
      "Optimizado para SEO",
      "Carga rápida",
      "Personalización completa",
      "Soporte incluido por 30 días",
      "Actualizaciones gratuitas"
    ],
    components: [
      "Header con navegación",
      "Hero section",
      "Características del producto",
      "Testimonios",
      "Precios",
      "FAQ",
      "Formulario de contacto",
      "Footer"
    ]
  };

  return <ProductDetail product={mockProduct} />;
}
