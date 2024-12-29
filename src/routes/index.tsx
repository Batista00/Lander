import { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Auth Pages
import { Login } from '@/pages/auth/Login';
import { Register } from '@/pages/auth/Register';

// Dashboard
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { DashboardHome } from '@/pages/dashboard/Home';

// Landing Pages
import { LandingPagesList } from '@/components/landing-pages/LandingPagesList';
import { LandingEditor } from '@/components/landing/LandingEditor';
import { LandingPagesLayout } from '@/components/landing/LandingPagesLayout';

// Layout
import { ProtectedRoute } from '@/components/ProtectedRoute';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      {
        path: '',
        element: <DashboardHome />
      },
      {
        path: 'landing-pages',
        element: <ProtectedRoute><LandingPagesLayout /></ProtectedRoute>,
        children: [
          {
            path: '',
            element: <LandingPagesList />
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
      }
    ]
  }
];
