import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ResetPassword } from './pages/auth/reset-password';
import { Dashboard } from './pages/dashboard';
import { DashboardHome } from './pages/dashboard/DashboardHome';
import { useAuth } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import { MarketplaceProvider } from './contexts/MarketplaceContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';

// Marketplace
import ProductGrid from './pages/marketplace/ProductGrid';
import MyPurchases from './pages/marketplace/MyPurchases';
import { Favorites } from './pages/marketplace/Favorites';
import SellerProducts from './pages/marketplace/SellerProducts';
import { ProductDetails } from './pages/marketplace/ProductDetails';
import { SellerProfile } from './pages/marketplace/SellerProfile';
import { DeveloperProfile } from './pages/marketplace/DeveloperProfile';
import { MarketplaceSettings } from './pages/marketplace/MarketplaceSettings';
import { MarketplaceAnalytics } from './pages/marketplace/MarketplaceAnalytics';
import { MarketplacePromotions } from './pages/marketplace/MarketplacePromotions';
import { MarketplaceCommunity } from './pages/marketplace/MarketplaceCommunity';
import { MarketplaceReputation } from './pages/marketplace/MarketplaceReputation';

// Landing Pages
import LandingPages from './pages/landing/LandingPages';
import PageBuilder from './pages/landing/PageBuilder';
import PreviewPage from './pages/landing/PreviewPage';
import PublishedLanding from './pages/landing/PublishedLanding';
import LandingTemplates from './pages/landing/LandingTemplates';
import LandingDrafts from './pages/landing/LandingDrafts';
import LandingArchived from './pages/landing/LandingArchived';

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

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <MarketplaceProvider>
        <Toaster position="top-right" expand={true} richColors />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
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
            <Route path="p/:id" element={<PublishedLanding />} />
          </Route>

          {/* Rutas protegidas del dashboard */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route index element={<DashboardHome />} />
            
            {/* Landing Pages */}
            <Route path="landing-pages">
              <Route index element={<LandingPages />} />
              <Route path="new" element={<PageBuilder />} />
              <Route path=":id" element={<PageBuilder />} />
              <Route path="templates" element={<LandingTemplates />} />
              <Route path="drafts" element={<LandingDrafts />} />
              <Route path="archived" element={<LandingArchived />} />
              <Route path="preview/:id" element={<PreviewPage />} />
            </Route>

            {/* Marketplace */}
            <Route path="marketplace">
              <Route index element={<ProductGrid />} />
              <Route path="my-purchases" element={<MyPurchases />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="my-products">
                <Route index element={<SellerProducts />} />
                <Route path="new" element={<SellerProducts />} />
              </Route>
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="developer/:id" element={<DeveloperProfile />} />
              <Route path="seller/:id" element={<SellerProfile />} />
              <Route path="analytics" element={<MarketplaceAnalytics />} />
              <Route path="promotions" element={<MarketplacePromotions />} />
              <Route path="community" element={<MarketplaceCommunity />} />
              <Route path="reputation" element={<MarketplaceReputation />} />
              <Route path="settings" element={<MarketplaceSettings />} />
            </Route>
          </Route>

          {/* Ruta 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MarketplaceProvider>
    </LocalizationProvider>
  );
}

// Componente para rutas públicas que redirigen si el usuario está autenticado
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default App;