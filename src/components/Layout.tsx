import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useEffect } from 'react';

export function Layout() {
  const location = useLocation();

  // Configuración de títulos y descripciones para SEO
  const seoConfig = {
    '/': {
      title: 'Lander | Crea Landing Pages Profesionales',
      description: 'Crea landing pages profesionales en minutos. Plantillas optimizadas para conversión, análisis en tiempo real y más.'
    },
    '/pricing': {
      title: 'Planes y Precios | Lander',
      description: 'Descubre nuestros planes flexibles que se adaptan a tus necesidades. Comienza gratis y escala según tu crecimiento.'
    },
    '/docs': {
      title: 'Documentación | Lander',
      description: 'Documentación completa para crear landing pages efectivas. Guías, tutoriales y mejores prácticas.'
    }
  };

  useEffect(() => {
    // Actualizar título y descripción según la ruta actual
    const config = seoConfig[location.pathname as keyof typeof seoConfig] || seoConfig['/'];
    document.title = config.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', config.description);
  }, [location]);

  // No renderizar Navbar en rutas de autenticación
  const isAuthRoute = location.pathname.startsWith('/auth/');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthRoute && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isAuthRoute && <Footer />}
    </div>
  );
}