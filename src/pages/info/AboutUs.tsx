import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AboutUs() {
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
              Sobre Nosotros
            </h1>
            <p className="text-gray-400">Conoce más sobre LANDER y nuestra misión</p>
          </div>

          <div className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Nuestra Historia</h2>
              <p className="text-gray-400 leading-relaxed">
                LANDER nació de la necesidad de simplificar la creación de landing pages efectivas. 
                Fundada por un equipo de desarrolladores y diseñadores apasionados, nuestra misión es 
                democratizar el acceso a herramientas profesionales de marketing digital.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Nuestra Misión</h2>
              <p className="text-gray-400 leading-relaxed">
                Empoderar a empresas y emprendedores con herramientas intuitivas para crear landing pages 
                profesionales sin necesidad de conocimientos técnicos, permitiéndoles enfocarse en lo que 
                mejor saben hacer: hacer crecer sus negocios.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Nuestros Valores</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Innovación",
                    description: "Constantemente buscamos nuevas formas de mejorar y simplificar la experiencia de nuestros usuarios."
                  },
                  {
                    title: "Simplicidad",
                    description: "Creemos que las mejores herramientas son aquellas que son fáciles de usar sin sacrificar funcionalidad."
                  },
                  {
                    title: "Calidad",
                    description: "Nos comprometemos a ofrecer la más alta calidad en cada aspecto de nuestro servicio."
                  },
                  {
                    title: "Empoderamiento",
                    description: "Trabajamos para dar a nuestros usuarios las herramientas que necesitan para alcanzar sus objetivos."
                  }
                ].map((value, index) => (
                  <div 
                    key={index}
                    className="p-6 rounded-xl bg-white/5 backdrop-blur-sm"
                  >
                    <h3 className="text-xl font-semibold text-[#00E5B0] mb-2">{value.title}</h3>
                    <p className="text-gray-400">{value.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
