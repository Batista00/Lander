import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, KeyRound, ArrowRight, Home } from 'lucide-react';
import { toast } from 'sonner';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Aquí iría la lógica para enviar el email de recuperación
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulación
      setIsSent(true);
      toast.success('Se ha enviado un enlace de recuperación a tu email');
    } catch (error) {
      toast.error('Error al enviar el email de recuperación');
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

      {/* Back to Login Button */}
      <Link
        to="/auth/login"
        className="fixed top-4 right-4 inline-flex items-center px-4 py-2 border border-white/10 rounded-lg bg-black/50 text-sm font-medium text-white hover:bg-white/5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver al login
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
              <KeyRound className="w-8 h-8 text-white" />
            </div>
          </div>

          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-[#00E5B0] via-[#FF1F8C] to-[#00D1FF] text-transparent bg-clip-text mb-2">
            ¿Olvidaste tu contraseña?
          </h2>
          <p className="text-gray-400 text-lg">
            No te preocupes, te ayudaremos a recuperar tu cuenta
          </p>
        </motion.div>

        {!isSent ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
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
                  placeholder="Ingresa tu email"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00E5B0] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Enviando...' : 'Enviar enlace de recuperación'}
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 p-6 rounded-lg border border-white/10 bg-black/50"
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#00E5B0]/10 flex items-center justify-center">
                <Mail className="w-8 h-8 text-[#00E5B0]" />
              </div>
              <h3 className="text-xl font-semibold text-white">
                ¡Revisa tu email!
              </h3>
              <p className="text-gray-400">
                Hemos enviado un enlace de recuperación a <strong>{email}</strong>. 
                Por favor, revisa tu bandeja de entrada y sigue las instrucciones.
              </p>
              <div className="pt-4">
                <p className="text-sm text-gray-500">
                  ¿No recibiste el email?{' '}
                  <button
                    onClick={handleSubmit}
                    className="text-[#00E5B0] hover:text-[#FF1F8C] transition-colors inline-flex items-center"
                  >
                    Reenviar
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
