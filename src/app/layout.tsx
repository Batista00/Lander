import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChatWidget } from '@/components/chat/ChatWidget';
import { AuthProvider } from '@/contexts/AuthContext';
import { TokenProvider } from '@/contexts/TokenContext';
import { Toaster } from 'sonner';
import "./globals.css";
import "@/components/chat/ChatWidget.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lander - Landing Page Builder",
  description: "Create beautiful landing pages in minutes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalContext = `
    Lander es una plataforma intuitiva para crear landing pages cautivadoras.
    
    Servicios principales:
    - Constructor de páginas drag & drop
    - Plantillas profesionales
    - Optimización para conversiones
    - Análisis de rendimiento
    - Integración con herramientas de marketing
    
    Precios:
    - Plan Básico: Ideal para emprendedores
    - Plan Pro: Para negocios en crecimiento
    - Plan Enterprise: Soluciones personalizadas
    
    Características destacadas:
    - Interfaz intuitiva
    - Componentes premium
    - Optimización SEO
    - Hosting incluido
    - Soporte 24/7
  `;

  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <TokenProvider>
            {children}
            <ChatWidget pageContext={globalContext} />
            <Toaster />
          </TokenProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
