import { CartButton } from "@/components/marketplace/cart-button";

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {/* Botón de carrito flotante */}
      <div className="fixed bottom-4 right-4 z-50">
        <CartButton />
      </div>
      
      {/* Contenido principal */}
      <main>{children}</main>
    </div>
  );
}
