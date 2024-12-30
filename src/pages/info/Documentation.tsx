import { motion } from 'framer-motion';
import { ArrowLeft, Book, Code, Lightbulb, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Documentation() {
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
              Documentación
            </h1>
            <p className="text-gray-400">Todo lo que necesitas saber para sacar el máximo provecho de LANDER</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Rocket,
                title: "Guía de Inicio Rápido",
                description: "Comienza a crear tu primera landing page en minutos con nuestra guía paso a paso.",
                link: "/docs/quick-start"
              },
              {
                icon: Book,
                title: "Manual de Usuario",
                description: "Explora todas las funcionalidades y características de LANDER en detalle.",
                link: "/docs/user-guide"
              },
              {
                icon: Code,
                title: "Referencias Técnicas",
                description: "Documentación técnica para desarrolladores y usuarios avanzados.",
                link: "/docs/technical"
              },
              {
                icon: Lightbulb,
                title: "Mejores Prácticas",
                description: "Consejos y estrategias para optimizar tus landing pages.",
                link: "/docs/best-practices"
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

          <div className="p-6 rounded-xl bg-gradient-to-r from-[#FF1F8C]/20 to-[#00E5B0]/20 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-4">¿Necesitas ayuda adicional?</h2>
            <p className="text-gray-400 mb-4">
              Nuestro equipo de soporte está disponible 24/7 para ayudarte con cualquier pregunta o problema.
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
