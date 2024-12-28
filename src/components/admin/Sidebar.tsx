import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import {
  Users,
  Building2,
  Brain,
  BarChart3,
  Settings,
  CreditCard,
  Shield,
  Activity
} from 'lucide-react';

const menuItems = [
  {
    title: 'Dashboard',
    icon: BarChart3,
    path: '/admin',
    permission: 'system.view'
  },
  {
    title: 'Usuarios',
    icon: Users,
    path: '/admin/users',
    permission: 'users.manage'
  },
  {
    title: 'Organizaciones',
    icon: Building2,
    path: '/admin/organizations',
    permission: 'organizations.manage'
  },
  {
    title: 'IA & Agentes',
    icon: Brain,
    path: '/admin/ai',
    permission: 'ai.manage'
  },
  {
    title: 'Facturación',
    icon: CreditCard,
    path: '/admin/billing',
    permission: 'billing.manage'
  },
  {
    title: 'Seguridad',
    icon: Shield,
    path: '/admin/security',
    permission: 'system.security'
  },
  {
    title: 'Monitoreo',
    icon: Activity,
    path: '/admin/monitoring',
    permission: 'system.monitor'
  },
  {
    title: 'Configuración',
    icon: Settings,
    path: '/admin/settings',
    permission: 'system.configure'
  }
];

export function Sidebar() {
  const location = useLocation();
  const { checkPermission } = useAdmin();

  return (
    <aside className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="flex flex-col flex-grow">
            <nav className="flex-1 px-2 space-y-1">
              {menuItems.map((item) =>
                checkPermission(item.permission) ? (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      location.pathname === item.path
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-6 w-6 ${
                        location.pathname === item.path
                          ? 'text-gray-500'
                          : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                    />
                    {item.title}
                  </Link>
                ) : null
              )}
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
}
