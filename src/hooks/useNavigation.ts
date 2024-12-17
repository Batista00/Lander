import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export function useNavigation() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const requireAuth = (destination: string) => {
    if (!user) {
      toast.info('Inicia sesión para acceder a esta función');
      navigate('/auth/login', { state: { from: destination } });
      return false;
    }
    return true;
  };

  // Marketplace Navigation
  const handleMarketplace = () => {
    if (requireAuth('/dashboard/marketplace')) {
      navigate('/dashboard/marketplace');
    }
  };

  const handleMyPurchases = () => {
    if (requireAuth('/dashboard/marketplace/my-purchases')) {
      navigate('/dashboard/marketplace/my-purchases');
    }
  };

  const handleFavorites = () => {
    if (requireAuth('/dashboard/marketplace/favorites')) {
      navigate('/dashboard/marketplace/favorites');
    }
  };

  const handleMyProducts = () => {
    if (requireAuth('/dashboard/marketplace/my-products')) {
      navigate('/dashboard/marketplace/my-products');
    }
  };

  const handleMarketplaceSettings = () => {
    if (requireAuth('/dashboard/marketplace/settings')) {
      navigate('/dashboard/marketplace/settings');
    }
  };

  // Landing Pages Navigation
  const handleLandingPages = () => {
    if (requireAuth('/dashboard/landing-pages')) {
      navigate('/dashboard/landing-pages');
    }
  };

  const handleNewLandingPage = () => {
    if (requireAuth('/dashboard/landing-pages/new')) {
      navigate('/dashboard/landing-pages/new');
    }
  };

  // General Navigation
  const handleDashboard = () => {
    if (requireAuth('/dashboard')) {
      navigate('/dashboard');
    }
  };

  const handlePricing = () => {
    navigate('/pricing');
  };

  const handleFeatures = () => {
    navigate('/features');
  };

  const handleCommunity = () => {
    navigate('/community');
  };

  const handleSupport = () => {
    navigate('/support');
  };

  return {
    handleMarketplace,
    handleMyPurchases,
    handleFavorites,
    handleMyProducts,
    handleMarketplaceSettings,
    handleLandingPages,
    handleNewLandingPage,
    handleDashboard,
    handlePricing,
    handleFeatures,
    handleCommunity,
    handleSupport,
  };
}
