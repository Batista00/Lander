import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Dashboard } from './pages/dashboard';
import { DashboardHome } from './pages/dashboard/DashboardHome';
import { LandingPages } from './pages/dashboard/LandingPages';
import { PageBuilder } from './components/page-builder/PageBuilder';
import { PublishedLanding } from './components/published/PublishedLanding';
import { Marketplace } from './pages/marketplace/Marketplace';
import { TemplateDetails } from './pages/marketplace/TemplateDetails';
import { Preview } from './pages/preview/Preview';
import { PublishedPage } from './pages/preview/PublishedPage';
import { theme } from './theme/mui-theme';
import { Toaster } from 'sonner';
import { TooltipProvider } from './components/ui/Tooltip';
import { MarketplaceLayout } from './components/marketplace/MarketplaceLayout';
import { Categories } from './pages/marketplace/Categories';
import { Wishlist } from './pages/marketplace/Wishlist';
import { Cart } from './pages/marketplace/Cart';
import { Checkout } from './pages/marketplace/Checkout';
import { OrderHistory } from './pages/marketplace/OrderHistory';
import { SellerProfile } from './pages/marketplace/SellerProfile';
import { SellerDashboard } from './pages/marketplace/SellerDashboard';
import { MyTemplates } from './pages/marketplace/MyTemplates';
import { CreateTemplate } from './pages/marketplace/CreateTemplate';
import { MarketplaceAnalytics } from './pages/marketplace/MarketplaceAnalytics';
import { MarketplaceSettings } from './pages/marketplace/MarketplaceSettings';
import { AuthProvider } from './contexts/AuthContext';
import { Purchases } from './pages/marketplace/Purchases';
import { Favorites } from './pages/marketplace/Favorites';
import { ProductDetails } from './pages/marketplace/ProductDetails';

function App() {
  return (
    <TooltipProvider>
      <Toaster position="top-right" richColors />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="dashboard" element={<Dashboard />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="landing-pages/*" element={<LandingPages />} />
                  <Route path="landing-pages/editor/:pageId" element={<PageBuilder />} />
                  
                  {/* Rutas del Marketplace */}
                  <Route path="marketplace" element={<MarketplaceLayout />}>
                    <Route index element={<Marketplace />} />
                    <Route path="template/:id" element={<TemplateDetails />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="categories/:category" element={<Marketplace />} />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="orders" element={<OrderHistory />} />
                    <Route path="purchases" element={<Purchases />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="sell" element={<Navigate to="/dashboard/marketplace/seller-dashboard" replace />} />
                    <Route path="seller/:id" element={<SellerProfile />} />
                    <Route path="seller-dashboard" element={<SellerDashboard />} />
                    <Route path="seller-dashboard/templates" element={<MyTemplates />} />
                    <Route path="seller-dashboard/templates/create" element={<CreateTemplate />} />
                    <Route path="seller-dashboard/templates/edit/:id" element={<CreateTemplate />} />
                    <Route path="seller-dashboard/analytics" element={<MarketplaceAnalytics />} />
                    <Route path="seller-dashboard/settings" element={<MarketplaceSettings />} />
                    <Route path="template/:id" element={<ProductDetails />} />
                  </Route>
                </Route>
              </Route>
            </Route>

            {/* Rutas públicas */}
            <Route path="/landing/:id" element={<PublishedLanding />} />
            <Route path="/preview/:pageId" element={<Preview />} />
            <Route path="/p/:pageId" element={<PublishedPage />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  );
}

export default App;