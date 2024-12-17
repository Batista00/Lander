import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Bell,
  User,
  Settings,
  LogOut,
  Users,
  ChevronDown,
  Blocks,
  BookOpen,
  Rocket,
  Target,
  LineChart,
  Award,
  ShoppingCart,
  ShoppingBag,
  Heart,
  Package
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../hooks/useNavigation';
import { toast } from 'sonner';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();
  const {
    handleDashboard,
    handleAccount,
    handleSettings,
    handleReferralProgram,
    handleFeatures,
    handlePricing,
    handleCommunity,
    handleSupport
  } = useNavigation();

  const notifications = [
    {
      id: 1,
      title: '¡Bienvenido a Lander!',
      description: 'Comienza a crear tu primera landing page.',
      time: '2 min ago'
    },
    {
      id: 2,
      title: 'Nueva plantilla disponible',
      description: 'Descubre nuestra última plantilla optimizada.',
      time: '1 hour ago'
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Sesión cerrada exitosamente');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Blocks className="w-8 h-8 text-[#00E5B0]" />
            <span className="text-2xl font-bold text-[#00E5B0]">LANDER</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={handleFeatures}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Características
            </button>
            <button
              onClick={handlePricing}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Precios
            </button>
            <button
              onClick={handleCommunity}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Comunidad
            </button>
            <button
              onClick={handleSupport}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Soporte
            </button>
          </div>

          {/* User Menu & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Dashboard Button */}
                <Link
                  to="/dashboard"
                  className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-white"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
                  >
                    <Bell className="w-5 h-5 text-gray-300" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-[#FF1F8C] rounded-full" />
                  </button>
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-80 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg py-2"
                      >
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="px-4 py-3 hover:bg-white/5 transition-colors cursor-pointer"
                          >
                            <p className="text-sm font-medium text-white">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.description}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <User className="w-5 h-5 text-gray-300" />
                    <ChevronDown className="w-4 h-4 text-gray-300" />
                  </button>
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-lg py-2"
                      >
                        <Link
                          to="/dashboard/marketplace"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Marketplace</span>
                        </Link>
                        <Link
                          to="/dashboard/marketplace/my-purchases"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Mis Compras</span>
                        </Link>
                        <Link
                          to="/dashboard/marketplace/favorites"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          <span>Favoritos</span>
                        </Link>
                        <Link
                          to="/dashboard/marketplace/my-products"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors"
                        >
                          <Package className="w-4 h-4" />
                          <span>Mis Productos</span>
                        </Link>
                        <div className="border-t border-white/10 my-2"></div>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Cerrar Sesión</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth/login"
                  className="text-white hover:text-[#00E5B0] transition-colors px-4 py-2"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/auth/register"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FF1F8C] to-[#00E5B0] text-white font-medium hover:opacity-90 transition-all"
                >
                  Registrarse
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4"
            >
              <div className="flex flex-col space-y-4">
                <button
                  onClick={handleFeatures}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Características
                </button>
                <button
                  onClick={handlePricing}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Precios
                </button>
                <button
                  onClick={handleCommunity}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Comunidad
                </button>
                <button
                  onClick={handleSupport}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Soporte
                </button>
                {!user && (
                  <>
                    <hr className="border-white/10" />
                    <Link
                      to="/auth/login"
                      className="text-white hover:text-[#00E5B0] transition-colors"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      to="/auth/register"
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FF1F8C] to-[#00E5B0] text-white font-medium hover:opacity-90 transition-all text-center"
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}