import { RouteObject } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Home } from '../pages/Home';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { ResetPassword } from '../pages/auth/reset-password';
import { Docs } from '../pages/docs';
import { Tutorials } from '../pages/tutorials';
import { Blog } from '../pages/blog';
import { Pricing } from '../pages/pricing';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { DashboardHome } from '../pages/DashboardHome';
import { MarketplaceExplore } from '../pages/marketplace/MarketplaceExplore';
import { MarketplacePurchases } from '../pages/marketplace/MarketplacePurchases';
import { MarketplaceFavorites } from '../pages/marketplace/MarketplaceFavorites';
import { MarketplaceSell } from '../pages/marketplace/MarketplaceSell';
import { MarketplaceSettings } from '../pages/marketplace/MarketplaceSettings';
import { LandingPagesList } from '../pages/landing/LandingPagesList';
import { PageBuilder } from '../pages/landing/PageBuilder';
import { PagePreview } from '../pages/landing/PagePreview';

// Design Pages
import DesignThemes from '../pages/design/Themes';
import DesignComponents from '../pages/design/Components';
import DesignResources from '../pages/design/Resources';

// Leads Pages
import LeadsAll from '../pages/leads/All';
import LeadsSegments from '../pages/leads/Segments';
import LeadsCampaigns from '../pages/leads/Campaigns';

// Analytics Pages
import AnalyticsOverview from '../pages/analytics/Overview';
import AnalyticsReports from '../pages/analytics/Reports';
import AnalyticsConversions from '../pages/analytics/Conversions';
import AnalyticsBehavior from '../pages/analytics/Behavior';

// Integrations Pages
import IntegrationsOverview from '../pages/integrations/Overview';
import IntegrationsApps from '../pages/integrations/Apps';
import IntegrationsAPI from '../pages/integrations/API';
import IntegrationsWebhooks from '../pages/integrations/Webhooks';

// Settings Pages
import SettingsProfile from '../pages/settings/Profile';
import SettingsBilling from '../pages/settings/Billing';
import SettingsTeam from '../pages/settings/Team';
import SettingsNotifications from '../pages/settings/Notifications';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: '',
        element: <DashboardHome />
      },
      {
        path: 'marketplace',
        children: [
          {
            path: '',
            element: <MarketplaceExplore />
          },
          {
            path: 'purchases',
            element: <MarketplacePurchases />
          },
          {
            path: 'favorites',
            element: <MarketplaceFavorites />
          },
          {
            path: 'sell',
            element: <MarketplaceSell />
          },
          {
            path: 'settings',
            element: <MarketplaceSettings />
          }
        ]
      },
      {
        path: 'landing-pages',
        children: [
          {
            path: '',
            element: <LandingPagesList />
          },
          {
            path: 'new',
            element: <PageBuilder />
          },
          {
            path: 'edit/:id',
            element: <PageBuilder />
          },
          {
            path: 'preview/:id',
            element: <PagePreview />
          }
        ]
      },
      {
        path: 'design',
        children: [
          { path: 'themes', element: <DesignThemes /> },
          { path: 'components', element: <DesignComponents /> },
          { path: 'resources', element: <DesignResources /> }
        ]
      },
      {
        path: 'leads',
        children: [
          { path: 'all', element: <LeadsAll /> },
          { path: 'segments', element: <LeadsSegments /> },
          { path: 'campaigns', element: <LeadsCampaigns /> }
        ]
      },
      {
        path: 'analytics',
        children: [
          { path: 'overview', element: <AnalyticsOverview /> },
          { path: 'reports', element: <AnalyticsReports /> },
          { path: 'conversions', element: <AnalyticsConversions /> },
          { path: 'behavior', element: <AnalyticsBehavior /> }
        ]
      },
      {
        path: 'integrations',
        children: [
          { index: true, element: <IntegrationsOverview /> },
          { path: 'apps', element: <IntegrationsApps /> },
          { path: 'api', element: <IntegrationsAPI /> },
          { path: 'webhooks', element: <IntegrationsWebhooks /> }
        ]
      },
      {
        path: 'settings',
        children: [
          { path: 'profile', element: <SettingsProfile /> },
          { path: 'billing', element: <SettingsBilling /> },
          { path: 'team', element: <SettingsTeam /> },
          { path: 'notifications', element: <SettingsNotifications /> }
        ]
      }
    ]
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  }
];
