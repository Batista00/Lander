import { useState, useEffect, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Store,
  Users,
  BarChart2,
  Settings,
  List,
  Plus,
  Target,
  Zap,
  Bell,
  HelpCircle,
  LogOut,
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
    badge: 0,
    description: 'Vista general de tus estadísticas y rendimiento. Aquí encontrarás un resumen de todas tus landing pages y conversiones.'
  },
  { 
    name: 'Landing Pages', 
    href: '/dashboard/landing-pages', 
    icon: Store,
    badge: 2,
    description: 'Crea y gestiona tus landing pages. Usa nuestro editor drag & drop para diseñar páginas profesionales sin código.',
    subItems: [
      { 
        name: 'Todas las Landing Pages', 
        href: '/dashboard/landing-pages', 
        icon: List,
        description: 'Lista completa de tus landing pages con estadísticas detalladas y opciones de edición.'
      },
      { 
        name: 'Crear Landing Page', 
        href: '/dashboard/landing-pages/editor/new', 
        icon: Plus,
        description: 'Comienza a crear una nueva landing page desde cero o usando una de nuestras plantillas optimizadas.'
      }
    ]
  },
  { 
    name: 'Leads', 
    href: '/dashboard/leads', 
    icon: Users,
    badge: 5,
    description: 'Gestiona todos tus leads capturados. Visualiza, exporta y analiza la información de tus contactos.',
    subItems: [
      { 
        name: 'Todos los Leads', 
        href: '/dashboard/leads/all', 
        icon: List,
        description: 'Lista completa de todos los leads capturados con información detallada y opciones de filtrado.'
      },
      { 
        name: 'Campañas', 
        href: '/dashboard/leads/campaigns', 
        icon: Target,
        description: 'Organiza tus leads por campañas y mide el rendimiento de cada una de ellas.'
      }
    ]
  },
  { 
    name: 'Analytics', 
    href: '/dashboard/analytics', 
    icon: BarChart2,
    badge: 0,
    description: 'Analíticas detalladas de tus landing pages. Métricas avanzadas, comportamiento de usuarios y más.',
    subItems: [
      { 
        name: 'Vista General', 
        href: '/dashboard/analytics/overview', 
        icon: BarChart2,
        description: 'Resumen general de todas tus métricas importantes y KPIs en un solo lugar.'
      },
      { 
        name: 'Conversiones', 
        href: '/dashboard/analytics/conversions', 
        icon: Target,
        description: 'Análisis detallado de tus tasas de conversión y puntos de optimización.'
      }
    ]
  },
  { 
    name: 'Configuración', 
    href: '/dashboard/settings', 
    icon: Settings,
    badge: 0,
    description: 'Personaliza tu cuenta, gestiona integraciones y configura tus preferencias generales.'
  }
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [showWelcomeTip, setShowWelcomeTip] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    // Ocultar el tip después de 10 segundos
    const timer = setTimeout(() => {
      setShowWelcomeTip(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

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
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Header fijo */}
      <div className="fixed top-0 z-50 w-full bg-black/20 backdrop-blur-sm border-b border-white/10 flex items-center justify-between px-4 h-16">
        {/* Logo y botón de menú */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              {isSidebarOpen ? (
                <ChevronLeft className="h-6 w-6" />
              ) : (
                <ChevronRight className="h-6 w-6" />
              )}
            </button>
            
            {/* Tip de bienvenida */}
            {showWelcomeTip && !isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-[#00E5B0] text-black px-3 py-1.5 rounded-lg text-sm whitespace-nowrap"
              >
                👋 Click para expandir el menú
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 transform rotate-45 w-2 h-2 bg-[#00E5B0]" />
              </motion.div>
            )}
          </div>
          <Link to="/dashboard" className="flex items-center gap-2">
            <Zap className="h-8 w-8 text-[#00E5B0]" />
            <span className="font-bold text-xl bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-transparent bg-clip-text">
              LANDER
            </span>
          </Link>
        </div>

        {/* Acciones del header */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-white/5 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF1F8C] rounded-full"></span>
          </button>
          <button className="p-2 rounded-lg hover:bg-white/5">
            <HelpCircle className="h-5 w-5" />
          </button>
          <div className="relative group">
            <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <span className="hidden sm:block">{user?.email}</span>
            </button>
            {/* Menú desplegable del usuario */}
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
      </div>

      {/* Contenedor principal */}
      <div>
        {/* Sidebar */}
        <div
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-black/20 backdrop-blur-sm border-r border-white/10 transition-all duration-300 ${
            isSidebarOpen ? 'w-64' : 'w-[4.5rem]'
          }`}
        >
          <div className="h-full">
            {/* Navegación Principal */}
            <nav className={`h-full py-4 space-y-1 overflow-y-auto ${
              isSidebarOpen ? 'scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20' : 'scrollbar-none'
            }`}>
              {navigation.map((item) => (
                <div key={item.name} className="px-2">
                  <div className="relative group">
                    <button
                      onClick={() => item.subItems ? toggleSubmenu(item.name) : navigate(item.href)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-colors ${
                        isActive(item.href)
                          ? 'bg-white/10 text-[#00E5B0]'
                          : 'text-white/90 hover:bg-white/5'
                      }`}
                    >
                      <item.icon className={`h-5 w-5 flex-shrink-0 ${isActive(item.href) ? 'text-[#00E5B0]' : ''}`} />
                      <motion.span
                        initial={false}
                        animate={{ opacity: isSidebarOpen ? 1 : 0 }}
                        className="truncate"
                      >
                        {item.name}
                      </motion.span>

                      {/* Badge y flecha del submenú */}
                      {isSidebarOpen && item.badge > 0 && (
                        <span className="ml-auto bg-[#FF1F8C] text-white text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                      {isSidebarOpen && item.subItems && (
                        <ChevronRight
                          className={`ml-auto h-4 w-4 transition-transform ${
                            openSubmenu === item.name ? 'rotate-90' : ''
                          }`}
                        />
                      )}
                    </button>

                    {/* Tooltip que aparece cuando el menú está cerrado */}
                    {!isSidebarOpen && (
                      <div className="absolute left-full top-0 ml-2 z-50 pointer-events-none group-hover:pointer-events-auto">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className="bg-[#0B0F19] border border-white/10 rounded-lg p-3 shadow-xl w-64"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <item.icon className="h-5 w-5 text-[#00E5B0]" />
                            <span className="font-medium text-white">{item.name}</span>
                            {item.badge > 0 && (
                              <span className="ml-auto bg-[#FF1F8C] text-white text-xs px-2 py-0.5 rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">{item.description}</p>
                          
                          {/* Mostrar subítems en el tooltip si existen */}
                          {item.subItems && (
                            <div className="mt-2 pt-2 border-t border-white/10">
                              <p className="text-xs text-gray-500 mb-1">Accesos rápidos:</p>
                              {item.subItems.map((subItem) => (
                                <button
                                  key={subItem.href}
                                  onClick={() => navigate(subItem.href)}
                                  className="flex items-center gap-2 w-full text-sm text-gray-400 hover:text-white py-1 px-2 rounded transition-colors hover:bg-white/5"
                                >
                                  <subItem.icon className="h-4 w-4" />
                                  <span>{subItem.name}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Submenú expandible */}
                  <AnimatePresence>
                    {item.subItems && openSubmenu === item.name && isSidebarOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden ml-4 mt-1"
                      >
                        {item.subItems.map((subItem) => (
                          <button
                            key={subItem.href}
                            onClick={() => navigate(subItem.href)}
                            className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                              isActive(subItem.href)
                                ? 'bg-white/10 text-[#00E5B0]'
                                : 'text-white/80 hover:bg-white/5'
                            }`}
                          >
                            <subItem.icon className="h-4 w-4" />
                            <span className="truncate">{subItem.name}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* Contenido principal */}
        <main className={`pt-16 min-h-screen transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-[4.5rem]'
        }`}>
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}