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

  // Account Navigation
  const handleAccount = () => {
    if (requireAuth('/dashboard/account')) {
      navigate('/dashboard/account');
    }
  };

  const handleSettings = () => {
    if (requireAuth('/dashboard/settings')) {
      navigate('/dashboard/settings');
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

  const handleSupport = () => {
    navigate('/support');
  };

  return {
    handleLandingPages,
    handleNewLandingPage,
    handleAccount,
    handleSettings,
    handleDashboard,
    handlePricing,
    handleFeatures,
    handleSupport,
  };
}
