import { motion } from 'framer-motion';
import { ArrowLeft, HelpCircle, Search, MessageCircle, FileText, Video } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Help() {
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
              Centro de Ayuda
            </h1>
            <p className="text-gray-400">Encuentra respuestas a tus preguntas y aprende a usar LANDER</p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar en la ayuda..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-[#00E5B0] focus:border-transparent"
            />
          </div>

          {/* Quick Help Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: HelpCircle,
                title: "Preguntas Frecuentes",
                description: "Encuentra respuestas a las preguntas más comunes sobre LANDER.",
                link: "/help/faq"
              },
              {
                icon: Video,
                title: "Video Tutoriales",
                description: "Aprende a usar LANDER con nuestros videos paso a paso.",
                link: "/help/tutorials"
              },
              {
                icon: FileText,
                title: "Guías y Recursos",
                description: "Descarga guías detalladas y recursos útiles.",
                link: "/help/guides"
              },
              {
                icon: MessageCircle,
                title: "Soporte en Vivo",
                description: "Obtén ayuda inmediata de nuestro equipo de soporte.",
                link: "/help/support"
              }
            ].map((section, index) => (
              <Link
                key={index}
                to={section.link}
                className="group p-6 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                <section.icon className="w-8 h-8 text-[#00E5B0] mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{section.title}</h3>
                <p className="text-gray-400">{section.description}</p>
              </Link>
            ))}
          </div>

          {/* Popular Topics */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Temas Populares</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Cómo crear tu primera landing page",
                "Integración con herramientas de marketing",
                "Optimización para motores de búsqueda",
                "Personalización de plantillas",
                "Análisis de conversiones",
                "Configuración de dominios personalizados"
              ].map((topic, index) => (
                <Link
                  key={index}
                  to={`/help/topic/${index}`}
                  className="flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span className="text-[#00E5B0]">#{index + 1}</span>
                  <span className="text-gray-400">{topic}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-[#FF1F8C]/20 to-[#00E5B0]/20 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-4">¿No encuentras lo que buscas?</h2>
            <p className="text-gray-400 mb-4">
              Nuestro equipo de soporte está listo para ayudarte con cualquier pregunta que tengas.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <span>Contactar Soporte</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
