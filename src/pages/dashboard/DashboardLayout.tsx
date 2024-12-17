import { useState, useEffect, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  Star,
  Menu,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

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
      { name: 'Mis Compras', href: '/dashboard/marketplace/my-purchases' },
      { name: 'Favoritos', href: '/dashboard/marketplace/favorites' },
      { name: 'Perfil de Vendedor', href: '/dashboard/marketplace/developer/me' },
      { name: 'Mis Productos', href: '/dashboard/marketplace/my-products' },
      { name: 'Vender', href: '/dashboard/marketplace/my-products/new' },
      { name: 'Analytics', href: '/dashboard/marketplace/analytics' },
      { name: 'Promociones', href: '/dashboard/marketplace/promotions' },
      { name: 'Comunidad', href: '/dashboard/marketplace/community' },
      { name: 'Reputación', href: '/dashboard/marketplace/reputation' },
      { name: 'Configuración', href: '/dashboard/marketplace/settings' }
    ]
  },
  { 
    name: 'Landing Pages', 
    href: '/dashboard/landing-pages', 
    icon: FileEdit,
    badge: 2,
    subItems: [
      { name: 'Mis Landing Pages', href: '/dashboard/landing-pages' },
      { name: 'Templates', href: '/dashboard/landing-pages/templates' },
      { name: 'Borradores', href: '/dashboard/landing-pages/drafts' },
      { name: 'Archivadas', href: '/dashboard/landing-pages/archived' }
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
      { name: 'Recursos', href: '/dashboard/design/resources' }
    ]
  },
  { 
    name: 'Leads', 
    href: '/dashboard/leads', 
    icon: Users,
    badge: 5,
    subItems: [
      { name: 'Todos los Leads', href: '/dashboard/leads/all' },
      { name: 'Segmentos', href: '/dashboard/leads/segments' },
      { name: 'Campañas', href: '/dashboard/leads/campaigns' }
    ]
  },
  { 
    name: 'Analytics', 
    href: '/dashboard/analytics', 
    icon: BarChart2,
    badge: 0,
    subItems: [
      { name: 'Vista General', href: '/dashboard/analytics/overview' },
      { name: 'Reportes', href: '/dashboard/analytics/reports' },
      { name: 'Conversiones', href: '/dashboard/analytics/conversions' },
      { name: 'Comportamiento', href: '/dashboard/analytics/behavior' }
    ]
  },
  { 
    name: 'Integraciones', 
    href: '/dashboard/integrations', 
    icon: Box,
    badge: 1,
    subItems: [
      { name: 'Apps Conectadas', href: '/dashboard/integrations/apps' },
      { name: 'API Keys', href: '/dashboard/integrations/api-keys' },
      { name: 'Webhooks', href: '/dashboard/integrations/webhooks' }
    ]
  },
  {
    name: 'Configuración',
    href: '/dashboard/settings',
    icon: Settings,
    badge: 0,
    subItems: [
      { name: 'General', href: '/dashboard/settings/general' },
      { name: 'Perfil', href: '/dashboard/settings/profile' },
      { name: 'Facturación', href: '/dashboard/settings/billing' },
      { name: 'Equipo', href: '/dashboard/settings/team' }
    ]
  }
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const defaultDeveloperId = user?.id || 'me';  // Usamos 'me' como fallback

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Sesión cerrada correctamente');
      navigate('/auth/login');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <div className="flex h-screen bg-[#0B0F19] text-white">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? '280px' : '80px' }}
        className="fixed left-0 top-0 h-full bg-black/20 border-r border-white/10 overflow-hidden z-30"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-white/10">
          <Link to="/" className="flex items-center space-x-2">
            <Zap className="w-8 h-8 text-[#00E5B0]" />
            {isSidebarOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-transparent bg-clip-text"
              >
                LANDER
              </motion.span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-2">
          {navigation.map((item) => (
            <div key={item.name} className="mb-2">
              <Link
                to={item.href}
                onClick={(e) => {
                  if (item.subItems) {
                    e.preventDefault();
                    toggleSubmenu(item.name);
                  }
                }}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-white/10 text-[#00E5B0]'
                    : 'hover:bg-white/5'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {isSidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-1 items-center justify-between ml-3"
                  >
                    <span>{item.name}</span>
                    {item.badge > 0 && (
                      <span className="bg-[#FF1F8C] text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    {item.subItems && (
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          openSubmenu === item.name ? 'rotate-90' : ''
                        }`}
                      />
                    )}
                  </motion.div>
                )}
              </Link>

              {/* Submenú */}
              {isSidebarOpen && item.subItems && (
                <AnimatePresence>
                  {openSubmenu === item.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden ml-4 mt-1"
                    >
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          to={subItem.href}
                          className={`flex items-center px-3 py-2 text-sm rounded-lg transition-colors ${
                            isActive(subItem.href)
                              ? 'bg-white/10 text-[#00E5B0]'
                              : 'hover:bg-white/5'
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-[280px]' : 'ml-[80px]'}`}>
        {/* Header */}
        <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-sm fixed top-0 right-0 left-0 z-20 flex items-center justify-between px-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF1F8C] rounded-full"></span>
            </button>
            <button className="p-2 rounded-lg hover:bg-white/5 transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span>{user?.email}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-black/90 backdrop-blur-sm rounded-lg border border-white/10 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link
                  to="/dashboard/settings/profile"
                  className="flex items-center px-4 py-2 hover:bg-white/5 transition-colors"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configuración
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-2 text-red-500 hover:bg-white/5 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="pt-16 min-h-screen">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}