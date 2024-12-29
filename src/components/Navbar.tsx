import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Blocks,
  Rocket
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '../hooks/useNavigation';
import { toast } from 'sonner';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const {
    handleDashboard,
    handleAccount,
    handleSettings,
    handleFeatures,
    handlePricing,
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
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <Blocks className="w-8 h-8 text-[#00E5B0]" />
            <span className="text-2xl font-bold text-[#00E5B0]">LANDER</span>
          </button>

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
                <button
                  onClick={handleDashboard}
                  className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-white"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>

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
                        <button
                          onClick={() => {
                            handleAccount();
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span>Mi Cuenta</span>
                        </button>
                        <button
                          onClick={() => {
                            handleSettings();
                            setShowUserMenu(false);
                          }}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Configuración</span>
                        </button>
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
                <button
                  onClick={() => navigate('/auth/login')}
                  className="text-white hover:text-[#00E5B0] transition-colors px-4 py-2"
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={() => navigate('/auth/register')}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FF1F8C] to-[#00E5B0] text-white font-medium hover:opacity-90 transition-all"
                >
                  Registrarse
                </button>
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
              className="md:hidden fixed top-20 left-0 right-0 bg-black/90 backdrop-blur-xl border-b border-white/10 z-50"
            >
              <div className="flex flex-col space-y-4 p-4">
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        handleDashboard();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors rounded-lg"
                    >
                      <Rocket className="w-4 h-4" />
                      <span>Dashboard</span>
                    </button>
                    <button
                      onClick={() => {
                        handleAccount();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors rounded-lg"
                    >
                      <User className="w-4 h-4" />
                      <span>Mi Cuenta</span>
                    </button>
                    <button
                      onClick={() => {
                        handleSettings();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors rounded-lg"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Configuración</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-white/10 transition-colors rounded-lg"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleFeatures}
                      className="text-gray-300 hover:text-white transition-colors px-4 py-2"
                    >
                      Características
                    </button>
                    <button
                      onClick={handlePricing}
                      className="text-gray-300 hover:text-white transition-colors px-4 py-2"
                    >
                      Precios
                    </button>
                    <button
                      onClick={handleSupport}
                      className="text-gray-300 hover:text-white transition-colors px-4 py-2"
                    >
                      Soporte
                    </button>
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