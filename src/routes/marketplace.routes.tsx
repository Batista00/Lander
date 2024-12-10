import { RouteObject } from 'react-router-dom';
import { MarketplaceLayout } from '../components/marketplace/layout/MarketplaceLayout';
import { MarketplaceHome } from '../pages/marketplace/MarketplaceHome';
import { TemplateDetails } from '../pages/marketplace/TemplateDetails';
import { SellerProfile } from '../pages/marketplace/SellerProfile';
import { SellerDashboard } from '../pages/marketplace/SellerDashboard';
import { MyTemplates } from '../pages/marketplace/MyTemplates';
import { CreateTemplate } from '../pages/marketplace/CreateTemplate';
import { MarketplaceAnalytics } from '../pages/marketplace/MarketplaceAnalytics';
import { MarketplaceSettings } from '../pages/marketplace/MarketplaceSettings';
import { Categories } from '../pages/marketplace/Categories';
import { Wishlist } from '../pages/marketplace/Wishlist';
import { Cart } from '../pages/marketplace/Cart';
import { Checkout } from '../pages/marketplace/Checkout';
import { OrderHistory } from '../pages/marketplace/OrderHistory';

export const marketplaceRoutes: RouteObject[] = [
  {
    path: '/marketplace',
    element: <MarketplaceLayout />,
    children: [
      { index: true, element: <MarketplaceHome /> },
      { path: 'template/:id', element: <TemplateDetails /> },
      { path: 'seller/:id', element: <SellerProfile /> },
      { path: 'categories', element: <Categories /> },
      { path: 'categories/:category', element: <MarketplaceHome /> },
      { path: 'wishlist', element: <Wishlist /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'orders', element: <OrderHistory /> },
      {
        path: 'seller-dashboard',
        children: [
          { index: true, element: <SellerDashboard /> },
          { path: 'templates', element: <MyTemplates /> },
          { path: 'templates/create', element: <CreateTemplate /> },
          { path: 'templates/edit/:id', element: <CreateTemplate /> },
          { path: 'analytics', element: <MarketplaceAnalytics /> },
          { path: 'settings', element: <MarketplaceSettings /> },
        ],
      },
    ],
  },
];
