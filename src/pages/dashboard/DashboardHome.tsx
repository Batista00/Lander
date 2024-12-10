import React from 'react';
import { 
  Users, 
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Clock,
  Eye,
  FileEdit,
  TrendingUp,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useLandingStore } from '../../store/landingStore';
import { Card } from '../../components/ui/card';

const stats = [
  {
    name: 'Total Subscribers',
    value: '71,897',
    change: '+122',
    changeType: 'positive',
    icon: Users
  },
  {
    name: 'Total de Leads',
    value: '1,234',
    icon: Users,
    change: '+15.3%',
    changeType: 'increase',
    color: 'green'
  },
  {
    name: 'Tasa de Conversión',
    value: '2.4%',
    icon: BarChart3,
    change: '-0.1%',
    changeType: 'decrease',
    color: 'red'
  },
  {
    name: 'Visitas Totales',
    value: '45.2K',
    icon: Building2,
    change: '+23.1%',
    changeType: 'increase',
    color: 'purple'
  }
];

const recentActivity = [
  {
    id: 1,
    event: 'Nuevo lead capturado',
    page: 'Landing de Producto',
    time: 'hace 2 minutos',
    icon: Users,
    color: 'green'
  },
  {
    id: 2,
    event: 'Página publicada',
    page: 'Showcase de Servicios',
    time: 'hace 1 hora',
    icon: Building2,
    color: 'blue'
  },
  {
    id: 3,
    event: 'Alerta de tráfico alto',
    page: 'Landing Principal',
    time: 'hace 3 horas',
    icon: BarChart3,
    color: 'yellow'
  }
];

const topPages = [
  {
    name: 'Landing de Producto',
    views: '12.5K',
    conversion: '3.2%',
    rating: 4.8
  },
  {
    name: 'Showcase de Servicios',
    views: '8.3K',
    conversion: '2.9%',
    rating: 4.5
  },
  {
    name: 'Landing Principal',
    views: '6.7K',
    conversion: '2.1%',
    rating: 4.2
  }
];

export function DashboardHome() {
  const { components, addComponent } = useLandingStore();
  
  // Limpiamos el localStorage al montar el componente
  React.useEffect(() => {
    localStorage.removeItem('landing-store');
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Panel de Control</h1>
          <p className="mt-1 text-sm text-gray-500">
            ¡Bienvenido de nuevo! Aquí está lo que está sucediendo con tus landing pages.
          </p>
        </div>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          + Nueva Landing Page
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`rounded-lg bg-${stat.color}-100 p-2`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                      <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                  <div className={`flex items-center ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.changeType === 'increase' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    <span className="ml-1 text-sm font-medium">{stat.change}</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="overflow-hidden">
          <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Actividad Reciente</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <li key={activity.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center">
                    <div className={`rounded-lg bg-${activity.color}-100 p-2`}>
                      <activity.icon className={`h-5 w-5 text-${activity.color}-600`} />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.event}</p>
                      <p className="text-sm text-gray-500">{activity.page}</p>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="mr-1.5 h-4 w-4" />
                      {activity.time}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Top Performing Pages */}
        <Card className="overflow-hidden">
          <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Páginas Más Exitosas</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {topPages.map((page, index) => (
                  <li key={page.name} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {page.name}
                        </p>
                        <div className="mt-1 flex items-center space-x-4">
                          <div className="flex items-center text-sm text-gray-500">
                            <Eye className="mr-1.5 h-4 w-4" />
                            {page.views} visitas
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <BarChart3 className="mr-1.5 h-4 w-4" />
                            {page.conversion} conv.
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Star className="mr-1.5 h-4 w-4 text-yellow-400" />
                            {page.rating}
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          index === 0 ? 'bg-green-100 text-green-800' : 
                          index === 1 ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'
                        }`}>
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}