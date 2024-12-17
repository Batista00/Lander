import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRightIcon,
  BrainCircuit, 
  Blocks, 
  Palette,
  Gauge,
  Shield,
  PlayCircle,
  CheckCircle2,
  Users,
  BarChart3,
  Globe2,
  Zap,
  Rocket,
  Target,
  LineChart,
  Award,
  HelpCircle
} from 'lucide-react';
import { Footer } from '../components/Footer';
import { useNavigation } from '../hooks/useNavigation';

export function Home() {
  const {
    handleGetStarted,
    handleStartTrial,
    handleViewDemo,
    handleFeatures,
    handleCaseStudies,
    handleTestimonials,
    handleIntegrations,
    handleTemplates,
    handleCommunity,
    handleSupport
  } = useNavigation();

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      <div className="fixed inset-0 pattern-background" />
      
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
                <button 
                  onClick={handleGetStarted}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FF1F8C] to-[#00E5B0] text-white font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#FF1F8C]/20 flex items-center group"
                >
                  <Blocks className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Comienza Gratis
                  <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={handleViewDemo}
                  className="px-8 py-4 rounded-full bg-white/10 text-white font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center group"
                >
                  <PlayCircle className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Ver Demo
                </button>
              </div>
              {/* Nueva CTA - Trial Gratuito */}
              <div className="mt-8 flex items-center justify-center">
                <span className="text-gray-400 mr-2">¿No estás seguro?</span>
                <button 
                  onClick={handleStartTrial}
                  className="text-[#00E5B0] hover:text-[#FF1F8C] transition-colors font-medium flex items-center group"
                >
                  Prueba 14 días gratis
                  <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative overflow-hidden">
        <div className="container relative z-10 max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Características Únicas
            </motion.h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-base">
              Todo lo que necesitas para destacar en el mundo digital
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Palette,
                title: "Diseño Intuitivo",
                description: "Interfaz drag & drop que hace la creación de páginas simple y rápida",
                color: "#00E5B0"
              },
              {
                icon: Gauge,
                title: "Optimizado para Conversión",
                description: "Plantillas y elementos diseñados para maximizar tus conversiones",
                color: "#FF1F8C"
              },
              {
                icon: Shield,
                title: "Seguridad Avanzada",
                description: "Protección integrada y cumplimiento de estándares web",
                color: "#00D1FF"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card-hover backdrop-blur-xl bg-white/5 p-6 rounded-xl border border-white/10 transition-all duration-300 group-hover:border-[#00E5B0]/50 h-full flex flex-col">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-white/5 to-white/10 group-hover:from-[#00E5B0]/20 group-hover:to-[#FF1F8C]/20 transition-all duration-300">
                      <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00E5B0] transition-colors">{feature.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Nueva CTA - Características */}
          <div className="text-center mt-12">
            <button
              onClick={handleFeatures}
              className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 group"
            >
              <span>Explora todas las características</span>
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              ¿Por qué elegir Lander?
            </motion.h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Descubre cómo podemos ayudarte a alcanzar tus objetivos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Para Todos",
                description: "No necesitas conocimientos técnicos para crear páginas profesionales"
              },
              {
                icon: BarChart3,
                title: "Resultados Reales",
                description: "Optimiza tus conversiones con análisis detallados y A/B testing"
              },
              {
                icon: Globe2,
                title: "SEO Optimizado",
                description: "Mejora tu posicionamiento con páginas optimizadas para buscadores"
              },
              {
                icon: Zap,
                title: "Alto Rendimiento",
                description: "Páginas rápidas y responsive que cargan en cualquier dispositivo"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-[#00E5B0]/20 to-[#FF1F8C]/20 mb-4">
                  <benefit.icon className="w-6 h-6 text-[#00E5B0]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
          {/* Nueva CTA - Casos de Éxito */}
          <div className="text-center mt-12">
            <button
              onClick={handleCaseStudies}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-white hover:opacity-90 transition-opacity group"
            >
              <Target className="w-5 h-5 mr-2" />
              <span>Ver casos de éxito</span>
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Rocket,
                value: "10K+",
                label: "Landing Pages Creadas"
              },
              {
                icon: Target,
                value: "95%",
                label: "Tasa de Satisfacción"
              },
              {
                icon: LineChart,
                value: "2X",
                label: "Aumento en Conversiones"
              },
              {
                icon: Award,
                value: "#1",
                label: "En Facilidad de Uso"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-[#00E5B0]/20 to-[#FF1F8C]/20 mb-4">
                  <stat.icon className="w-8 h-8 text-[#00E5B0]" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          {/* Nueva CTA - Testimonios */}
          <div className="text-center mt-12">
            <button
              onClick={handleTestimonials}
              className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 group"
            >
              <Users className="w-5 h-5 mr-2" />
              <span>Lee las historias de nuestros usuarios</span>
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Planes que se adaptan a ti
            </motion.h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Elige el plan que mejor se ajuste a tus necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Básico",
                price: "Gratis",
                features: [
                  "1 Landing Page",
                  "Plantillas Básicas",
                  "Análisis Básico",
                  "Soporte por Email"
                ]
              },
              {
                name: "Pro",
                price: "$19/mes",
                popular: true,
                features: [
                  "10 Landing Pages",
                  "Todas las Plantillas",
                  "Análisis Avanzado",
                  "Soporte Prioritario",
                  "Dominio Personalizado",
                  "A/B Testing"
                ]
              },
              {
                name: "Empresa",
                price: "$49/mes",
                features: [
                  "Landing Pages Ilimitadas",
                  "Plantillas Exclusivas",
                  "Análisis Premium",
                  "Soporte 24/7",
                  "Múltiples Dominios",
                  "API Access"
                ]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={`relative ${plan.popular ? 'scale-105' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`
                  h-full p-8 rounded-2xl border backdrop-blur-xl
                  ${plan.popular 
                    ? 'bg-gradient-to-b from-[#00E5B0]/10 to-[#FF1F8C]/10 border-[#00E5B0]/50' 
                    : 'bg-white/5 border-white/10'
                  }
                `}>
                  {plan.popular && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-white">
                      Más Popular
                    </span>
                  )}
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="text-3xl font-bold text-white mb-4">{plan.price}</div>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-[#00E5B0] mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={handleGetStarted}
                    className={`
                      block w-full py-3 px-6 rounded-xl text-center font-medium transition-all duration-300
                      ${plan.popular
                        ? 'bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-white hover:opacity-90'
                        : 'bg-white/10 text-white hover:bg-white/20'
                      }
                    `}
                  >
                    Comenzar Ahora
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nueva Sección - Integrations */}
      <section className="py-20 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Integrado con tus herramientas favoritas
            </motion.h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Conecta Lander con las mejores herramientas de marketing y análisis
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {/* Logos de integraciones aquí */}
          </div>
          {/* Nueva CTA - Integraciones */}
          <div className="text-center mt-12">
            <button
              onClick={handleIntegrations}
              className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 group"
            >
              <span>Explora todas las integraciones</span>
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Nueva Sección - Templates */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#0B0F19] to-[#0B0F19]/50">
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Plantillas profesionales
            </motion.h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Comienza con una de nuestras plantillas optimizadas para conversión
            </p>
          </div>
          {/* Nueva CTA - Templates */}
          <div className="text-center mt-12">
            <button
              onClick={handleTemplates}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-white hover:opacity-90 transition-opacity group"
            >
              <Palette className="w-5 h-5 mr-2" />
              <span>Explora las plantillas</span>
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Nueva Sección - Community */}
      <section className="py-20 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Únete a nuestra comunidad
            </motion.h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Conecta con otros creadores y comparte tus experiencias
            </p>
          </div>
          {/* Nueva CTA - Community */}
          <div className="text-center mt-12">
            <button
              onClick={handleCommunity}
              className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 group"
            >
              <Users className="w-5 h-5 mr-2" />
              <span>Únete a la comunidad</span>
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Nueva Sección - Support */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[#0B0F19]/50 to-[#0B0F19]">
        <div className="container relative z-10">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Soporte 24/7
            </motion.h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Estamos aquí para ayudarte en cada paso del camino
            </p>
          </div>
          {/* Nueva CTA - Support */}
          <div className="text-center mt-12">
            <button
              onClick={handleSupport}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-white hover:opacity-90 transition-opacity group"
            >
              <HelpCircle className="w-5 h-5 mr-2" />
              <span>Obtén ayuda</span>
              <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-xl bg-white/5 p-12 rounded-3xl border border-white/10"
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-transparent bg-clip-text">
                ¿Listo para empezar?
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Únete a miles de usuarios que ya están creando landing pages increíbles
              </p>
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-[#FF1F8C] to-[#00E5B0] text-white font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#FF1F8C]/20"
              >
                <Rocket className="w-5 h-5 mr-2" />
                Comienza tu prueba gratuita
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}