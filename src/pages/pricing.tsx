import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Pricing() {
  const plans = [
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
            Planes que se adaptan a ti
          </motion.h1>
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Elige el plan que mejor se ajuste a tus necesidades y comienza a crear landing pages increíbles
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative ${plan.popular ? 'scale-105' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                <Link
                  to="/auth/register"
                  className={`
                    block w-full py-3 px-6 rounded-xl text-center font-medium transition-all duration-300
                    ${plan.popular
                      ? 'bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-white hover:opacity-90'
                      : 'bg-white/10 text-white hover:bg-white/20'
                    }
                  `}
                >
                  Comenzar Ahora
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
