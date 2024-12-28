import React from 'react';
import { ChatWidget } from '@/components/chat/ChatWidget';

export default function Home() {
  const pageContext = `
    Bienvenido a nuestra página principal. Somos una empresa especializada en 
    desarrollo web y soluciones digitales. Ofrecemos servicios de:
    - Desarrollo web personalizado
    - Diseño UI/UX
    - Marketing digital
    - Optimización SEO
    - Consultoría tecnológica
    
    Nuestro objetivo es ayudar a las empresas a crecer en el mundo digital
    con soluciones innovadoras y efectivas.
  `;

  return (
    <main className="min-h-screen">
      {/* Aquí va el contenido principal de tu landing page */}
      
      {/* Widget del chatbot */}
      <ChatWidget pageContext={pageContext} />
    </main>
  );
}
