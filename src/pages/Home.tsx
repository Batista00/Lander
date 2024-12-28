import { motion } from 'framer-motion';
import { ArrowRightIcon, BrainCircuit, Blocks, PlayCircle, CheckCircle2, Rocket, Target, LineChart, Award } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { Navbar } from '@/components/Navbar';
import { Link, useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth/register');
  };

  const handleViewDemo = () => {
    // Implementar demo
  };

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-24">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-[#FF1F8C] to-[#00E5B0] text-white mb-8">
                <BrainCircuit className="w-4 h-4 mr-2" />
                Potencia tu presencia digital
              </span>
              <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-[#00E5B0] via-[#FF1F8C] to-[#00D1FF] text-transparent bg-clip-text font-display">
                Crea landing pages que cautivan
              </h1>
              <p className="text-xl text-gray-300 mb-12 font-light leading-relaxed max-w-3xl mx-auto">
                Convierte visitantes en clientes con nuestra plataforma intuitiva.
              </p>
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <Link 
                  to="/auth/register"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FF1F8C] to-[#00E5B0] text-white font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#FF1F8C]/20 flex items-center group"
                >
                  <Blocks className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Comienza Gratis
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/auth/login"
                  className="px-8 py-4 rounded-full bg-white/10 text-white font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center group"
                >
                  <PlayCircle className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Iniciar Sesión
                </Link>
              </div>
              {/* Nueva CTA - Trial Gratuito */}
              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400 mr-2">¿No estás seguro?</span>
                <Link 
                  to="/auth/register"
                  className="text-[#00E5B0] hover:text-[#FF1F8C] transition-colors font-medium flex items-center group"
                >
                  Prueba 14 días gratis
                  <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Editor Intuitivo",
                description: "Crea sin código",
                icon: Blocks,
                color: "from-[#FF1F8C] to-[#00E5B0]"
              },
              {
                title: "Análisis Avanzado",
                description: "Datos en tiempo real",
                icon: LineChart,
                color: "from-[#00E5B0] to-[#00D1FF]"
              },
              {
                title: "Tecnología de Punta",
                description: "Siempre actualizado",
                icon: Rocket,
                color: "from-[#00D1FF] to-[#FF1F8C]"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className={`p-8 h-full flex flex-col items-center text-center bg-gradient-to-br ${feature.color} bg-opacity-10`}>
                  <feature.icon className="w-12 h-12 text-[#00E5B0] mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "10K+", label: "Páginas", icon: Rocket },
              { value: "95%", label: "Satisfacción", icon: Target },
              { value: "2X", label: "Conversión", icon: LineChart },
              { value: "#1", label: "Ranking", icon: Award }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <stat.icon className="w-6 h-6 text-[#00E5B0] mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="container relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              ¿Listo para empezar?
            </h2>
            <Link 
              to="/auth/register"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#FF1F8C] to-[#00E5B0] text-white font-bold hover:opacity-90 transition-opacity"
            >
              Comienza Gratis
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatWidget pageContext="home" />
    </div>
  );
}