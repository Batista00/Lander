import { motion } from 'framer-motion';
import { BookOpen, Search, FileText, Code2, Bookmark } from 'lucide-react';

export function Docs() {
  const sections = [
    {
      title: "Primeros Pasos",
      icon: BookOpen,
      items: [
        "Introducción a Lander",
        "Instalación y Configuración",
        "Creando tu primera landing page",
        "Guía de mejores prácticas"
      ]
    },
    {
      title: "Componentes",
      icon: Code2,
      items: [
        "Biblioteca de componentes",
        "Personalización de estilos",
        "Integración de formularios",
        "Elementos interactivos"
      ]
    },
    {
      title: "Guías",
      icon: FileText,
      items: [
        "Optimización SEO",
        "Integración de Analytics",
        "A/B Testing",
        "Despliegue y hosting"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] pt-32">
      <div className="fixed inset-0 pattern-background" />
      
      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Documentación
          </motion.h1>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en la documentación..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00E5B0]/50"
              />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#00E5B0]/20 to-[#FF1F8C]/20">
                  <section.icon className="w-6 h-6 text-[#00E5B0]" />
                </div>
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <a 
                      href="#" 
                      className="flex items-center text-gray-300 hover:text-white transition-colors group"
                    >
                      <Bookmark className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-[#00E5B0]" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
