import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePlanStore } from '@/store/planStore';
import { PaymentHistory, Subscription } from '@/types/payment';
import { mercadoPagoService } from '@/services/mercadoPago';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  CreditCard, 
  Receipt, 
  Calendar,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Billing() {
  const { currentPlan, isTrialing, trialEndDate } = usePlanStore();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [paymentHistory, setPaymentHistory] = useState<PaymentHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBillingData = async () => {
      try {
        // Cargar datos de suscripción y pagos
        const subscriptionData = await mercadoPagoService.getSubscription('subscription_id');
        setSubscription(subscriptionData);

        // TODO: Implementar endpoint para historial de pagos
        setPaymentHistory([
          {
            id: '1',
            amount: 29,
            currency: 'USD',
            status: 'approved',
            date: new Date(),
            description: 'Plan Negocio - Mensual',
            paymentMethod: {
              type: 'credit_card',
              last4: '4242'
            }
          }
        ]);
      } catch (error) {
        console.error('Error loading billing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBillingData();
  }, []);

  const getStatusBadge = (status: string) => {
    const badges = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800'
    };

    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Facturación</h1>

      {/* Plan Actual */}
      <Card className="p-6 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-semibold mb-2">Plan Actual</h2>
            <p className="text-gray-600">
              {currentPlan?.name} - {subscription?.billing === 'monthly' ? 'Mensual' : 'Anual'}
            </p>
            {isTrialing && trialEndDate && (
              <div className="mt-2 flex items-center gap-2 text-sm text-blue-600">
                <AlertCircle className="w-4 h-4" />
                <span>
                  Período de prueba hasta {format(new Date(trialEndDate), 'dd/MM/yyyy')}
                </span>
              </div>
            )}
          </div>
          <Button variant="outline" onClick={() => navigate('/pricing')}>
            Cambiar Plan
          </Button>
        </div>
      </Card>

      <Tabs defaultValue="payment-method">
        <TabsList className="mb-6">
          <TabsTrigger value="payment-method" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Método de Pago
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Receipt className="w-4 h-4" />
            Historial
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Facturas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payment-method">
          <Card className="p-6">
            {subscription?.paymentMethodId ? (
              <div>
                <h3 className="font-medium mb-4">Método de Pago Actual</h3>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <CreditCard className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="font-medium">
                      •••• •••• •••• {subscription?.paymentMethod?.last4}
                    </p>
                    <p className="text-sm text-gray-500">
                      Expira: {subscription?.paymentMethod?.expMonth}/{subscription?.paymentMethod?.expYear}
                    </p>
                  </div>
                  <Button variant="outline" className="ml-auto">
                    Actualizar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No hay método de pago registrado</p>
                <Button>Agregar Método de Pago</Button>
              </div>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="p-6">
            <h3 className="font-medium mb-4">Historial de Pagos</h3>
            <div className="space-y-4">
              {paymentHistory.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">{payment.description}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(payment.date), "d 'de' MMMM, yyyy", { locale: es })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${payment.amount} {payment.currency}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(payment.status)}`}>
                      {payment.status === 'approved' && <CheckCircle2 className="w-4 h-4 inline mr-1" />}
                      {payment.status === 'rejected' && <XCircle className="w-4 h-4 inline mr-1" />}
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card className="p-6">
            <h3 className="font-medium mb-4">Facturas</h3>
            <div className="text-center py-8 text-gray-500">
              <p>Las facturas se generarán automáticamente</p>
              <p>después de cada pago exitoso</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
