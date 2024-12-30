import { motion } from 'framer-motion';
import { ArrowRightIcon, BrainCircuit, Blocks, PlayCircle, CheckCircle2, Rocket, Target, LineChart, Award, CheckCircle, Users, Zap, Shield, Check } from 'lucide-react';
import { ChatWidget } from '@/components/chat/ChatWidget';
import { Navbar } from '@/components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BackgroundGradient } from '@/components/BackgroundGradient';

export function Home() {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(true);

  const handleGetStarted = () => {
    navigate('/auth/register');
  };

  const handleViewDemo = () => {
    // Implementar demo
  };

  const plans = {
    monthly: [
      {
        name: "Free",
        price: "$0",
        oldPrice: null,
        description: "Perfecto para comenzar",
        features: [
          "1 Landing Page",
          "100 tokens mensuales",
          "30 conversaciones de agente IA",
          "Uso mensual",
          "Soporte por email"
        ],
        cta: "Comenzar Gratis",
        popular: false,
        color: "from-[#00E5B0] to-[#00D1FF]"
      },
      {
        name: "Premium",
        price: "$29.990",
        oldPrice: "$59.990",
        description: "Para negocios en crecimiento",
        features: [
          "Hasta 5 Landing Pages",
          "500 tokens editor IA",
          "500 conversaciones agente IA Premium",
          "Soporte prioritario",
          "Plantillas premium",
          "Dominio personalizado"
        ],
        cta: "Comenzar Prueba Gratuita",
        popular: true,
        color: "from-[#FF1F8C] to-[#00E5B0]",
        savings: "50% descuento"
      },
      {
        name: "Negocio",
        price: "$59.990",
        oldPrice: "$119.990",
        description: "Máximo poder y flexibilidad",
        features: [
          "Landing Pages ilimitadas",
          "Tokens ilimitados",
          "Agente IA Premium ilimitado",
          "Soporte 24/7",
          "Todas las funciones premium",
          "Setup personalizado"
        ],
        cta: "Contactar Ventas",
        popular: false,
        color: "from-[#00D1FF] to-[#FF1F8C]",
        savings: "50% descuento"
      }
    ],
    annual: [
      {
        name: "Free",
        price: "$0",
        oldPrice: null,
        description: "Perfecto para comenzar",
        features: [
          "1 Landing Page",
          "100 tokens mensuales",
          "30 conversaciones de agente IA",
          "Uso mensual",
          "Soporte por email"
        ],
        cta: "Comenzar Gratis",
        popular: false,
        color: "from-[#00E5B0] to-[#00D1FF]"
      },
      {
        name: "Premium",
        price: "$299.990",
        oldPrice: "$599.990",
        description: "Para negocios en crecimiento",
        features: [
          "Hasta 5 Landing Pages",
          "500 tokens editor IA",
          "500 conversaciones agente IA Premium",
          "Soporte prioritario",
          "Plantillas premium",
          "Dominio personalizado"
        ],
        cta: "Comenzar Prueba Gratuita",
        popular: true,
        color: "from-[#FF1F8C] to-[#00E5B0]",
        savings: "50% descuento"
      },
      {
        name: "Negocio",
        price: "$599.990",
        oldPrice: "$1.199.990",
        description: "Máximo poder y flexibilidad",
        features: [
          "Landing Pages ilimitadas",
          "Tokens ilimitados",
          "Agente IA Premium ilimitado",
          "Soporte 24/7",
          "Todas las funciones premium",
          "Setup personalizado"
        ],
        cta: "Contactar Ventas",
        popular: false,
        color: "from-[#00D1FF] to-[#FF1F8C]",
        savings: "50% descuento"
      }
    ]
  };

  return (
    <div className="relative min-h-screen bg-[#0B0F19]">
      <BackgroundGradient />
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

      {/* Benefits Section */}
      <section className="py-16 relative">
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Beneficios clave */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-8 mb-16"
            >
              {[
                {
                  title: "Diseño sin código",
                  description: "Interfaz drag & drop intuitiva",
                  icon: Blocks
                },
                {
                  title: "Optimización SEO",
                  description: "Mejor posicionamiento en buscadores",
                  icon: Target
                },
                {
                  title: "Alta velocidad",
                  description: "Carga rápida garantizada",
                  icon: Zap
                },
                {
                  title: "Datos seguros",
                  description: "Seguridad de nivel empresarial",
                  icon: Shield
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0">
                    <benefit.icon className="w-6 h-6 text-[#00E5B0]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Logos y métricas */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-gray-400 mb-8">Empresas que confían en nosotros</p>
              <div className="flex justify-center items-center space-x-8 mb-12">
                <div className="w-24 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white/50 text-sm font-medium">EMPRESA 1</span>
                </div>
                <div className="w-24 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white/50 text-sm font-medium">EMPRESA 2</span>
                </div>
                <div className="w-24 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                  <span className="text-white/50 text-sm font-medium">EMPRESA 3</span>
                </div>
              </div>
              <div className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2">
                <Users className="w-4 h-4 text-[#00E5B0]" />
                <span className="text-white text-sm">+10,000 usuarios activos</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-[#00E5B0] via-[#FF1F8C] to-[#00D1FF] text-transparent bg-clip-text mb-4">
                Todo lo que necesitas
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Herramientas poderosas y fáciles de usar para crear landing pages que convierten
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                {
                  title: "Editor Visual",
                  description: "Arrastra y suelta elementos para crear páginas únicas sin escribir código",
                  icon: Blocks,
                  color: "from-[#FF1F8C] to-[#00E5B0]"
                },
                {
                  title: "Análisis en Tiempo Real",
                  description: "Monitorea el rendimiento y comportamiento de tus visitantes",
                  icon: LineChart,
                  color: "from-[#00E5B0] to-[#00D1FF]"
                },
                {
                  title: "Optimización A/B",
                  description: "Prueba diferentes versiones para maximizar conversiones",
                  icon: Target,
                  color: "from-[#00D1FF] to-[#FF1F8C]"
                },
                {
                  title: "Plantillas Premium",
                  description: "Diseños profesionales listos para personalizar",
                  icon: Rocket,
                  color: "from-[#FF1F8C] to-[#00D1FF]"
                },
                {
                  title: "SEO Avanzado",
                  description: "Herramientas para mejorar tu visibilidad en buscadores",
                  icon: Award,
                  color: "from-[#00E5B0] to-[#FF1F8C]"
                },
                {
                  title: "Integraciones",
                  description: "Conecta con tus herramientas favoritas sin problemas",
                  icon: Zap,
                  color: "from-[#00D1FF] to-[#00E5B0]"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                       style={{
                         backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`
                       }}
                  />
                  <div className="p-8 relative">
                    <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#00E5B0] to-[#FF1F8C] bg-opacity-10">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 relative">
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-[#00E5B0] via-[#FF1F8C] to-[#00D1FF] text-transparent bg-clip-text mb-4">
                Planes que se adaptan a ti
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                Elige el plan perfecto para tu negocio
              </p>

              {/* Toggle switch */}
              <div className="flex items-center justify-center gap-4">
                <span className={`text-sm ${!isAnnual ? 'text-white font-semibold' : 'text-gray-400'}`}>Mensual</span>
                <button
                  onClick={() => setIsAnnual(!isAnnual)}
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-gradient-to-r from-[#FF1F8C] to-[#00E5B0]"
                >
                  <span className="sr-only">Toggle annual billing</span>
                  <span
                    className={`${
                      isAnnual ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </button>
                <span className={`text-sm ${isAnnual ? 'text-white font-semibold' : 'text-gray-400'}`}>
                  Anual
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-[#FF1F8C] to-[#00E5B0] text-white">
                    Ahorra 50%
                  </span>
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(isAnnual ? plans.annual : plans.monthly).map((plan, index) => (
                <motion.div
                  key={index}
                  className={`relative ${plan.popular ? 'scale-105' : ''}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`relative overflow-hidden rounded-2xl ${plan.popular ? 'bg-gradient-to-r p-[1px]' : 'bg-white/5'} ${plan.popular ? plan.color : ''}`}>
                    <div className={`${plan.popular ? 'bg-[#0B0F19] rounded-2xl' : ''} p-8 h-full`}>
                      {plan.popular && (
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-[#FF1F8C] to-[#00E5B0] text-white">
                            Popular
                          </span>
                        </div>
                      )}
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                        <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                        <div className="flex items-baseline mb-2">
                          <span className="text-4xl font-bold text-white">{plan.price}</span>
                          {plan.price !== "$0" && (
                            <span className="text-gray-400 ml-2">/{isAnnual ? 'año' : 'mes'}</span>
                          )}
                        </div>
                        {plan.oldPrice && (
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-gray-400 line-through text-sm">{plan.oldPrice}</span>
                            <span className="text-[#00E5B0] text-sm font-medium">{plan.savings}</span>
                          </div>
                        )}
                      </div>
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-300">
                            <Check className="w-5 h-5 text-[#00E5B0] mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Link
                        to="/auth/register"
                        className={`w-full inline-flex justify-center items-center px-6 py-3 rounded-full ${
                          plan.popular
                            ? 'bg-gradient-to-r from-[#FF1F8C] to-[#00E5B0]'
                            : 'bg-white/10 hover:bg-white/20'
                        } text-white font-semibold transition-all duration-300`}
                      >
                        {plan.cta}
                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { 
                  value: "10K+", 
                  label: "Páginas Creadas", 
                  icon: Rocket,
                  color: "from-[#FF1F8C] to-[#00E5B0]"
                },
                { 
                  value: "95%", 
                  label: "Satisfacción", 
                  icon: Target,
                  color: "from-[#00E5B0] to-[#00D1FF]"
                },
                { 
                  value: "2X", 
                  label: "Más Conversiones", 
                  icon: LineChart,
                  color: "from-[#00D1FF] to-[#FF1F8C]"
                },
                { 
                  value: "24/7", 
                  label: "Soporte", 
                  icon: Award,
                  color: "from-[#FF1F8C] to-[#00D1FF]"
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-2xl bg-white/5 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
                  <div className="relative">
                    <stat.icon className="w-8 h-8 text-[#00E5B0] mb-4" />
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative">
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold bg-gradient-to-r from-[#00E5B0] via-[#FF1F8C] to-[#00D1FF] text-transparent bg-clip-text mb-4">
                Lo que dicen nuestros clientes
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Historias de éxito de quienes ya confían en nosotros
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Ana Martínez",
                  role: "Marketing Manager",
                  company: "TechCorp",
                  image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
                  quote: "Incrementamos nuestras conversiones en un 150% en solo dos meses."
                },
                {
                  name: "Carlos Ruiz",
                  role: "CEO",
                  company: "StartupX",
                  image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
                  quote: "La mejor inversión que hemos hecho para nuestro negocio digital."
                },
                {
                  name: "Laura Sánchez",
                  role: "Digital Strategist",
                  company: "AgenciaY",
                  image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
                  quote: "Interfaz intuitiva y resultados increíbles. Totalmente recomendado."
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-2xl bg-white/5 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-6">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      <p className="text-[#00E5B0] text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF1F8C] via-[#00E5B0] to-[#00D1FF] p-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#0B0F19] rounded-[23px] p-12 text-center relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-4xl font-bold text-white mb-6">
                    ¿Listo para transformar tu presencia digital?
                  </h2>
                  <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                    Únete a miles de empresas que ya están creando landing pages extraordinarias
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link 
                      to="/auth/register"
                      className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FF1F8C] to-[#00E5B0] text-white font-bold text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-[#FF1F8C]/20 flex items-center group"
                    >
                      <Rocket className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Comienza Gratis
                      <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <div className="flex items-center text-gray-400">
                      <Shield className="w-5 h-5 mr-2 text-[#00E5B0]" />
                      <span>14 días de prueba gratis</span>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-[#FF1F8C] to-transparent opacity-10 blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-l from-[#00E5B0] to-transparent opacity-10 blur-3xl transform translate-x-1/2 translate-y-1/2" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ChatWidget pageContext="home" />
    </div>
  );
}