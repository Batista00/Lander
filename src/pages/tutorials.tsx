import { motion } from 'framer-motion';
import { PlayCircle, Clock, Star, Users } from 'lucide-react';

export function Tutorials() {
  const tutorials = [
    {
      title: "Creando una Landing Page desde Cero",
      description: "Aprende a crear una landing page profesional paso a paso",
      duration: "45 min",
      level: "Principiante",
      students: 1234
    },
    {
      title: "Optimización de Conversión",
      description: "Técnicas avanzadas para mejorar tus tasas de conversión",
      duration: "60 min",
      level: "Intermedio",
      students: 856
    },
    {
      title: "Diseño Responsivo Avanzado",
      description: "Crea landing pages que se vean perfectas en todos los dispositivos",
      duration: "90 min",
      level: "Avanzado",
      students: 645
    },
    {
      title: "Integración de Analytics",
      description: "Aprende a medir y analizar el rendimiento de tu landing page",
      duration: "30 min",
      level: "Intermedio",
      students: 923
    },
    {
      title: "A/B Testing Efectivo",
      description: "Metodologías y mejores prácticas para pruebas A/B",
      duration: "75 min",
      level: "Avanzado",
      students: 478
    },
    {
      title: "SEO para Landing Pages",
      description: "Optimiza tu landing page para los motores de búsqueda",
      duration: "60 min",
      level: "Principiante",
      students: 1567
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] pt-32">
      <div className="fixed inset-0 pattern-background" />
      
      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Tutoriales
          </motion.h1>
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Aprende a crear landing pages efectivas con nuestros tutoriales paso a paso
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6 h-full transition-all duration-300 hover:border-[#00E5B0]/50">
                <div className="relative mb-6 rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-[#00E5B0]/20 to-[#FF1F8C]/20">
                  <PlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-white opacity-75 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#00E5B0] transition-colors">
                  {tutorial.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {tutorial.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {tutorial.duration}
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      {tutorial.level}
                    </span>
                  </div>
                  <span className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {tutorial.students}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
