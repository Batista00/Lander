import { createBrowserRouter } from 'react-router-dom';
import PricingPage from './pages/Pricing';
import PaymentResult from './pages/PaymentResult';
import Checkout from './pages/Checkout';
import { PrivateRoute } from './components/auth/PrivateRoute';

export const router = createBrowserRouter([
  // ... tus otras rutas ...
  {
    path: '/pricing',
    element: <PricingPage />
  },
  {
    path: '/checkout/:planId',
    element: <PrivateRoute><Checkout /></PrivateRoute>
  },
  {
    path: '/payment/:status',
    element: <PaymentResult />
  }
]);
