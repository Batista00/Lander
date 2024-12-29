import { motion } from 'framer-motion';
import { 
  PlayCircle,
  Zap,
  Lightbulb,
  Target,
  Rocket,
  ArrowRight,
  Users,
  Building2,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Card } from '../../components/ui/card';
import { SparklineChart } from '../../components/charts/SparklineChart';

// Datos de estadísticas reales iniciales para nuevos usuarios
const stats = [
  {
    name: 'Visitantes Únicos',
    value: '0',
    change: 'Nuevo',
    changeType: 'neutral',
    color: 'blue',
    icon: Users,
    historicalData: [0, 0, 0, 0, 0, 0, 0],
    description: 'Personas que han visitado tus landing pages'
  },
  {
    name: 'Leads Capturados',
    value: '0',
    change: 'Nuevo',
    changeType: 'neutral',
    color: 'green',
    icon: Target,
    historicalData: [0, 0, 0, 0, 0, 0, 0],
    description: 'Contactos que han dejado sus datos en tus formularios'
  },
  {
    name: 'Tasa de Conversión',
    value: '0%',
    change: 'Nuevo',
    changeType: 'neutral',
    color: 'purple',
    icon: BarChart3,
    historicalData: [0, 0, 0, 0, 0, 0, 0],
    description: 'Porcentaje de visitantes que se convierten en leads'
  },
  {
    name: 'Landing Pages',
    value: '0',
    change: 'Comienza hoy',
    changeType: 'neutral',
    color: 'indigo',
    icon: Building2,
    historicalData: [0, 0, 0, 0, 0, 0, 0],
    description: 'Número total de landing pages creadas'
  }
];

const tips = [
  {
    title: "¿Por qué necesitas Landing Pages?",
    description: "Las landing pages pueden aumentar tus conversiones hasta un 300% comparado con páginas regulares. Son esenciales para campañas de marketing efectivas.",
    color: "yellow",
    icon: Lightbulb
  },
  {
    title: "Mejores Prácticas",
    description: "Mantén tu mensaje claro, usa llamados a la acción convincentes y asegúrate de que tu página cargue rápido para mejores resultados.",
    color: "blue",
    icon: Target
  },
  {
    title: "Optimización Continua",
    description: "Prueba diferentes diseños, textos y botones. El A/B testing puede mejorar tus tasas de conversión hasta un 50%.",
    color: "green",
    icon: Rocket
  }
];

export function DashboardHome() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8 p-6">
      {/* Welcome Banner para Nuevos Usuarios */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden"
      >
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FF1F8C] rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <Zap className="h-6 w-6 text-[#00E5B0]" />
            </div>
            <h1 className="text-3xl font-bold">
              ¡Bienvenido a tu Centro de Landing Pages! 🚀
            </h1>
          </div>
          
          <p className="text-lg text-blue-100 mb-8">
            Aquí podrás crear, gestionar y optimizar tus landing pages para maximizar tus conversiones.
            Comienza creando tu primera página y observa cómo crecen tus resultados.
          </p>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => window.location.href = '/dashboard/landing-pages'}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center gap-2 hover:gap-3 group"
            >
              Crear Primera Landing Page
              <ArrowRight className="h-4 w-4 transition-all group-hover:transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={() => window.open('/tutorials', '_blank')}
              className="bg-blue-500/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-500/30 transition-colors flex items-center gap-2"
            >
              Ver Tutorial Rápido
              <PlayCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg bg-${stat.color}-100`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                      <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{stat.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className={`flex items-center ${
                    stat.changeType === 'increase' ? 'text-green-600' : 
                    stat.changeType === 'decrease' ? 'text-red-600' : 
                    'text-blue-600'
                  }`}>
                    <span className="text-sm font-medium">{stat.change}</span>
                  </div>
                  <div className="h-12 w-24">
                    <SparklineChart data={stat.historicalData} color={stat.color} />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <motion.div
            key={tip.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="p-6 h-full hover:shadow-lg transition-shadow">
              <div className={`rounded-lg bg-${tip.color}-100 p-2 w-fit mb-4`}>
                <tip.icon className={`h-6 w-6 text-${tip.color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {tip.title}
              </h3>
              <p className="text-gray-600">
                {tip.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Llamada a la Acción */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mt-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">¿Listo para comenzar?</h2>
            <p className="text-purple-100">
              Crea tu primera landing page y comienza a capturar leads hoy mismo.
            </p>
          </div>
          <button 
            onClick={() => window.location.href = '/dashboard/landing-pages'}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors flex items-center"
          >
            Crear Landing Page
            <Rocket className="ml-2 w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}