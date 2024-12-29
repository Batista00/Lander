import { createBrowserRouter } from 'react-router-dom';
import { PrivateRoute } from './components/auth/PrivateRoute';
import { Dashboard } from './pages/dashboard';
import { DashboardHome } from './pages/dashboard/DashboardHome';
import { LandingPages } from './pages/dashboard/LandingPages';
import { Leads } from './pages/dashboard/leads';
import LeadsList from './pages/dashboard/leads/LeadsList';
import LeadsCampaigns from './pages/dashboard/leads/LeadsCampaigns';
import Analytics from './pages/dashboard/Analytics';
import Settings from './pages/dashboard/Settings';
import { LandingEditor } from './components/landing/LandingEditor';

export const router = createBrowserRouter([
  {
    path: '/dashboard',
    element: <PrivateRoute><Dashboard /></PrivateRoute>,
    children: [
      {
        path: '',
        element: <DashboardHome />
      },
      {
        path: 'landing-pages',
        children: [
          {
            path: '',
            element: <LandingPages />
          },
          {
            path: 'editor/new',
            element: <LandingEditor />
          },
          {
            path: 'editor/:id',
            element: <LandingEditor />
          }
        ]
      },
      {
        path: 'leads',
        children: [
          {
            path: 'all',
            element: <LeadsList />
          },
          {
            path: 'campaigns',
            element: <LeadsCampaigns />
          }
        ]
      },
      {
        path: 'analytics',
        element: <Analytics />
      },
      {
        path: 'settings',
        element: <Settings />
      }
    ]
  }
]);
