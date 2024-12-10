import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileEdit, 
  Users, 
  BarChart2, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  HelpCircle,
  LogOut,
  Store,
  Palette,
  Box,
  Zap,
  Gift,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth';

interface DashboardLayoutProps {
  children: ReactNode;
}

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: LayoutDashboard,
    badge: 0
  },
  { 
    name: 'Marketplace', 
    href: '/dashboard/marketplace', 
    icon: Store,
    badge: 3,
    subItems: [
      { name: 'Explorar', href: '/dashboard/marketplace' },
      { name: 'Mis Compras', href: '/dashboard/marketplace/purchases' },
      { name: 'Favoritos', href: '/dashboard/marketplace/favorites' },
      { name: 'Vender', href: '/dashboard/marketplace/sell' },
    ]
  },
  { 
    name: 'Landing Pages', 
    href: '/dashboard/landing-pages', 
    icon: FileEdit,
    badge: 2,
    subItems: [
      { name: 'Todas las Páginas', href: '/dashboard/landing-pages' },
      { name: 'Templates', href: '/dashboard/landing-pages/templates' },
      { name: 'Borradores', href: '/dashboard/landing-pages/drafts' },
      { name: 'Archivadas', href: '/dashboard/landing-pages/archived' },
    ]
  },
  { 
    name: 'Diseño', 
    href: '/dashboard/design', 
    icon: Palette,
    badge: 0,
    subItems: [
      { name: 'Temas', href: '/dashboard/design/themes' },
      { name: 'Componentes', href: '/dashboard/design/components' },
      { name: 'Recursos', href: '/dashboard/design/resources' },
    ]
  },
  { 
    name: 'Leads', 
    href: '/dashboard/leads', 
    icon: Users,
    badge: 5,
    subItems: [
      { name: 'Todos los Leads', href: '/dashboard/leads' },
      { name: 'Segmentos', href: '/dashboard/leads/segments' },
      { name: 'Campañas', href: '/dashboard/leads/campaigns' },
    ]
  },
  { 
    name: 'Analytics', 
    href: '/dashboard/analytics', 
    icon: BarChart2,
    badge: 0,
    subItems: [
      { name: 'Vista General', href: '/dashboard/analytics' },
      { name: 'Reportes', href: '/dashboard/analytics/reports' },
      { name: 'Conversiones', href: '/dashboard/analytics/conversions' },
      { name: 'Comportamiento', href: '/dashboard/analytics/behavior' },
    ]
  },
  { 
    name: 'Integraciones', 
    href: '/dashboard/integrations', 
    icon: Box,
    badge: 1,
    subItems: [
      { name: 'Apps', href: '/dashboard/integrations' },
      { name: 'API', href: '/dashboard/integrations/api' },
      { name: 'Webhooks', href: '/dashboard/integrations/webhooks' },
    ]
  },
  { 
    name: 'Settings', 
    href: '/dashboard/settings', 
    icon: Settings,
    badge: 1,
    subItems: [
      { name: 'Perfil', href: '/dashboard/settings' },
      { name: 'Equipo', href: '/dashboard/settings/team' },
      { name: 'Facturación', href: '/dashboard/settings/billing' },
      { name: 'Seguridad', href: '/dashboard/settings/security' },
      { name: 'Notificaciones', href: '/dashboard/settings/notifications' },
    ]
  },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { logout } = useAuthStore();
  const [unreadNotifications] = useState(3);

  // Expande automáticamente el ítem activo
  useEffect(() => {
    const activeItem = navigation.find(item => 
      item.subItems?.some(sub => location.pathname === sub.href) || location.pathname === item.href
    );
    if (activeItem) {
      setExpandedItem(activeItem.name);
    }
  }, [location.pathname]);

  const handleItemClick = (itemName: string) => {
    setExpandedItem(expandedItem === itemName ? null : itemName);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <motion.div 
          className={cn(
            "relative flex flex-col border-r border-gray-200 bg-white transition-all duration-300",
            isCollapsed ? "w-20" : "w-64"
          )}
          animate={{ width: isCollapsed ? 80 : 256 }}
          transition={{ duration: 0.3 }}
        >
          {/* Toggle button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-8 z-10 rounded-full bg-white p-1.5 shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          <div className="flex h-16 items-center justify-center border-b px-4">
            <span className={cn(
              "font-bold text-gray-900 transition-all duration-300",
              isCollapsed ? "text-lg" : "text-xl"
            )}>
              {isCollapsed ? "K" : "KREATOSAPP"}
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-2">
            <AnimatePresence initial={false}>
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    onClick={item.subItems ? () => handleItemClick(item.name) : undefined}
                    className={cn(
                      'group flex items-center justify-between rounded-md px-2 py-2 text-sm font-medium transition-colors',
                      location.pathname === item.href
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <div className="flex items-center">
                      <item.icon className={cn(
                        'h-5 w-5 flex-shrink-0',
                        location.pathname === item.href ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
                      )} />
                      {!isCollapsed && <span className="ml-3">{item.name}</span>}
                    </div>
                    {!isCollapsed && (
                      <div className="flex items-center">
                        {item.badge > 0 && (
                          <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600">
                            {item.badge}
                          </span>
                        )}
                        {item.subItems && (
                          <ChevronRight
                            className={cn(
                              "ml-1 h-4 w-4 transition-transform",
                              expandedItem === item.name && "rotate-90"
                            )}
                          />
                        )}
                      </div>
                    )}
                  </Link>

                  {/* Submenú */}
                  {!isCollapsed && item.subItems && expandedItem === item.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 mt-1 space-y-1"
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className={cn(
                            'block rounded-md py-2 pl-9 pr-2 text-sm font-medium transition-colors',
                            location.pathname === subItem.href
                              ? 'text-blue-600'
                              : 'text-gray-500 hover:text-gray-900'
                          )}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </AnimatePresence>
          </nav>

          {/* Footer del Sidebar */}
          <div className="mt-auto border-t p-4">
            <div className="space-y-2">
              {/* Notifications */}
              <button className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm text-gray-600 hover:bg-gray-50">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-gray-400" />
                  {!isCollapsed && <span className="ml-3">Notifications</span>}
                </div>
                {!isCollapsed && unreadNotifications > 0 && (
                  <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* Help */}
              <button 
                className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                onClick={() => window.open('/documentation', '_blank')}
              >
                <HelpCircle className="h-5 w-5" />
                {!isCollapsed && <span>Ayuda</span>}
              </button>

              {/* Premium */}
              <button
                className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                onClick={() => window.open('/dashboard/marketplace/premium', '_blank')}
              >
                <Star className="h-5 w-5 text-yellow-400" />
                {!isCollapsed && <span>Premium</span>}
              </button>

              {/* Logout */}
              <button 
                onClick={logout}
                className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
                {!isCollapsed && <span>Cerrar Sesión</span>}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          <main className="flex-1">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}