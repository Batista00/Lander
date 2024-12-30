import { Routes, Route, Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ResetPassword } from './pages/auth/reset-password';
import { Dashboard } from './pages/dashboard';
import { DashboardHome } from './pages/dashboard/DashboardHome';
import { Builder } from './pages/builder/Builder';
import { Preview } from './pages/preview/Preview';
import { Settings } from './pages/dashboard/Settings';
import { Pricing } from './pages/Pricing';
import { AboutUs } from './pages/info/AboutUs';
import { Contact } from './pages/info/Contact';
import { Documentation } from './pages/info/Documentation';
import { Help } from './pages/info/Help';
import { useAuth } from './contexts/AuthContext';
import { Toaster } from "@/components/ui/toaster";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { TemplateProvider } from './contexts/TemplateContext';
import { useEffect } from 'react';
import { startEmailQueueProcessor } from './services/emailQueue';
import { LandingPagesList } from '@/components/landing-pages/LandingPagesList';

// Landing Pages
import { PageBuilder } from './pages/landing/PageBuilder';
import { PreviewPage } from './pages/landing/PreviewPage';
import { PublicLandingPage } from './pages/public/PublicLandingPage';
import { LandingTemplates } from './pages/landing/LandingTemplates';
import { LandingDrafts } from './pages/landing/LandingDrafts';
import { LandingArchived } from './pages/landing/LandingArchived';

// Leads
import { LeadsAll, LeadsSegments, LeadsCampaigns } from './pages/leads';

// Componente para proteger rutas
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
}

// Componente para proteger rutas de pago
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
}

function App() {
  const { user } = useAuth();

  // Iniciar el procesador de cola de emails solo si es necesario
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    
    const startQueue = async () => {
      if (user && window.location.pathname.includes('/leads')) {
        console.log('Iniciando procesador de cola de emails para usuario:', user.uid);
        try {
          cleanup = startEmailQueueProcessor(5); // Procesar cada 5 minutos
        } catch (error) {
          console.error('Error al iniciar el procesador de cola:', error);
        }
      }
    };

    startQueue();

    return () => {
      if (cleanup) {
        console.log('Limpiando procesador de cola de emails...');
        cleanup();
      }
    };
  }, [user, window.location.pathname]);

  return (
    <>
      <Toaster />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
        <TemplateProvider>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="pricing" element={<Pricing />} />
              {/* Info pages */}
              <Route path="about" element={<AboutUs />} />
              <Route path="contact" element={<Contact />} />
              <Route path="docs" element={<Documentation />} />
              <Route path="help" element={<Help />} />
              <Route path="auth">
                <Route path="login" element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } />
                <Route path="register" element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                } />
                <Route path="reset-password" element={
                  <PublicRoute>
                    <ResetPassword />
                  </PublicRoute>
                } />
              </Route>
            </Route>

            {/* Rutas de landing pages públicas */}
            <Route path="/l/:pageId" element={<PublicLandingPage />} />

            {/* Rutas protegidas del dashboard */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }>
              <Route index element={<DashboardHome />} />
              
              {/* Landing Pages */}
              <Route path="landing-pages">
                <Route index element={<LandingPagesList />} />
                <Route path="editor/new" element={<PageBuilder />} />
                <Route path="editor/:id" element={<PageBuilder />} />
                <Route path="preview/:id" element={<PreviewPage />} />
                <Route path="templates" element={<LandingTemplates />} />
                <Route path="drafts" element={<LandingDrafts />} />
                <Route path="archived" element={<LandingArchived />} />
              </Route>

              {/* Leads */}
              <Route path="leads">
                <Route index element={<LeadsAll />} />
                <Route path="all" element={<LeadsAll />} />
                <Route path="segments" element={<LeadsSegments />} />
                <Route path="campaigns" element={<LeadsCampaigns />} />
              </Route>
            </Route>
          </Routes>
        </TemplateProvider>
      </LocalizationProvider>
    </>
  );
}

// Componente para rutas públicas que redirigen si el usuario está autenticado
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}

export default App;