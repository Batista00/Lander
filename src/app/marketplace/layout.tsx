import { Metadata } from "next";
import { MarketplaceProvider } from "@/providers/marketplace-provider";

export const metadata: Metadata = {
  title: "Marketplace - Landing Builder",
  description: "Encuentra y compra las mejores landing pages para tu negocio",
};

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MarketplaceProvider>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </MarketplaceProvider>
  );
}
