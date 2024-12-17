import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Rocket, ArrowRight, Home } from 'lucide-react';
import { toast } from 'sonner';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(email, password);
      toast.success('¡Bienvenido de nuevo!');
      navigate('/dashboard');
    } catch (err) {
      setError('Las credenciales no son correctas. Por favor, inténtalo de nuevo.');
      toast.error('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 pattern-background opacity-50" />
      
      {/* Back to Home Button */}
      <Link
        to="/"
        className="fixed top-4 left-4 inline-flex items-center px-4 py-2 border border-white/10 rounded-lg bg-black/50 text-sm font-medium text-white hover:bg-white/5 transition-colors"
      >
        <Home className="w-4 h-4 mr-2" />
        Volver al inicio
      </Link>
      
      {/* Content */}
      <div className="max-w-md w-full space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] flex items-center justify-center">
              <Rocket className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#00E5B0] via-[#FF1F8C] to-[#00D1FF] text-transparent bg-clip-text mb-2">
            ¡Bienvenido de nuevo!
          </h2>
          <p className="text-gray-400 text-lg mb-2">
            Accede a tu cuenta para continuar
          </p>
          <p className="text-gray-500">
            ¿No tienes una cuenta?{' '}
            <Link
              to="/auth/register"
              className="font-medium text-[#00E5B0] hover:text-[#FF1F8C] transition-colors inline-flex items-center"
            >
              Regístrate aquí
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="bg-red-500/10 text-red-500 p-4 rounded-lg text-sm flex items-center">
              <span className="flex-1">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-white/10 bg-black/50 placeholder-gray-500 text-white focus:outline-none focus:ring-[#00E5B0] focus:border-[#00E5B0] sm:text-sm transition-colors"
                placeholder="Email"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-white/10 bg-black/50 placeholder-gray-500 text-white focus:outline-none focus:ring-[#00E5B0] focus:border-[#00E5B0] sm:text-sm transition-colors"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#00E5B0] focus:ring-[#00E5B0] border-white/10 rounded bg-black/50"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                Recordarme
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/auth/forgot-password"
                className="font-medium text-[#00E5B0] hover:text-[#FF1F8C] transition-colors inline-flex items-center"
              >
                ¿Olvidaste tu contraseña?
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00E5B0] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
              </span>
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </div>

          {/* Social Login Options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#0B0F19] text-gray-400">O continúa con</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-white/10 rounded-lg bg-black/50 text-sm font-medium text-gray-400 hover:bg-white/5 transition-colors"
              >
                <img className="h-5 w-5" src="/google.svg" alt="Google" />
                <span className="ml-2">Google</span>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-white/10 rounded-lg bg-black/50 text-sm font-medium text-gray-400 hover:bg-white/5 transition-colors"
              >
                <img className="h-5 w-5" src="/github.svg" alt="GitHub" />
                <span className="ml-2">GitHub</span>
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
