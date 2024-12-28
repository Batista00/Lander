import { useAdmin } from '@/contexts/AdminContext';
import { Card } from '@/components/ui/card';
import {
  Users,
  Brain,
  CreditCard,
  Activity,
  AlertTriangle
} from 'lucide-react';

export default function AdminDashboard() {
  const { permissions } = useAdmin();

  const stats = [
    {
      title: 'Usuarios Activos',
      value: '1,234',
      change: '+12.3%',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      title: 'Uso de IA',
      value: '45.6K',
      change: '+23.4%',
      icon: Brain,
      color: 'text-purple-500'
    },
    {
      title: 'Ingresos',
      value: '$12.3K',
      change: '+8.2%',
      icon: CreditCard,
      color: 'text-green-500'
    },
    {
      title: 'Tasa de Error',
      value: '0.8%',
      change: '-2.1%',
      icon: AlertTriangle,
      color: 'text-red-500'
    }
  ];

  const alerts = [
    {
      title: 'Alto uso de IA',
      description: 'Organización XYZ ha excedido el 90% de su cuota',
      type: 'warning'
    },
    {
      title: 'Nuevo registro de admin',
      description: 'Se requiere aprobación para nuevo admin',
      type: 'info'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Panel de Administración</h2>
        <div className="flex items-center space-x-4">
          <Activity className="h-5 w-5 text-green-500" />
          <span>Sistema Operativo</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
            <div className="mt-2">
              <span className={stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {stat.change}
              </span>
              <span className="text-gray-600 text-sm"> vs. último mes</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Alertas Recientes</h3>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  alert.type === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'
                }`}
              >
                <h4 className="font-medium">{alert.title}</h4>
                <p className="text-sm text-gray-600">{alert.description}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Actividad Reciente</h3>
          {/* Aquí irá el componente de actividad reciente */}
        </Card>
      </div>
    </div>
  );
}
