import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MessageSquare, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Contact() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Back button */}
      <div className="fixed top-4 left-4 z-50">
        <Link 
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </Link>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00E5B0] via-[#FF1F8C] to-[#00D1FF] text-transparent bg-clip-text mb-4">
              Contacto
            </h1>
            <p className="text-gray-400">Estamos aquí para ayudarte. ¿Cómo podemos asistirte hoy?</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Información de Contacto</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-[#00E5B0]" />
                    <a href="mailto:soporte@lander.lat" className="text-gray-400 hover:text-white transition-colors">
                      soporte@lander.lat
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-[#00E5B0]" />
                    <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <MessageSquare className="w-5 h-5 text-[#00E5B0]" />
                    <span className="text-gray-400">
                      Chat en vivo disponible 24/7
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-semibold text-white mb-4">Horario de Atención</h3>
                <div className="space-y-2 text-gray-400">
                  <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                  <p>Sábado: 10:00 AM - 2:00 PM</p>
                  <p>Domingo: Cerrado</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Envíanos un Mensaje</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#00E5B0] focus:border-transparent"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#00E5B0] focus:border-transparent"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#00E5B0] focus:border-transparent"
                    placeholder="¿Cómo podemos ayudarte?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 rounded-lg bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
