import { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlanStore } from '@/store/planStore';
import { mercadoPagoService } from '@/services/mercadoPago';
import { toast } from 'sonner';
import { BillingPeriod, PlanId } from '@/types/plans';

export function PricingPlans() {
  const [billing, setBilling] = useState<BillingPeriod>('monthly');
  const { currentPlan, isTrialing } = usePlanStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectPlan = async (planId: PlanId) => {
    try {
      setIsLoading(true);

      // Si es el mismo plan, redirigir a la configuración de facturación
      if (currentPlan?.id === planId) {
        window.location.href = '/dashboard/settings/billing';
        return;
      }

      // Crear sesión de checkout
      const session = await mercadoPagoService.createCheckoutSession({
        planId,
        billing,
        trialDays: 14, // Solo para planes pagos
      });

      // Inicializar MercadoPago
      await mercadoPagoService.initMercadoPago();

      // Redirigir al checkout
      const mp = (window as any).mp;
      mp.checkout({
        preference: {
          id: session.preferenceId
        },
        render: {
          container: '.cho-container',
          label: 'Pagar',
        }
      });
    } catch (error) {
      toast.error('Error al procesar el pago', {
        description: 'Por favor, intenta nuevamente más tarde'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const yearlyDiscount = 20; // 20% de descuento en planes anuales

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 inline-flex">
            <button
              className={`px-4 py-2 rounded-md ${
                billing === 'monthly' ? 'bg-primary text-white' : 'text-gray-600'
              }`}
              onClick={() => setBilling('monthly')}
            >
              Mensual
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                billing === 'yearly' ? 'bg-primary text-white' : 'text-gray-600'
              }`}
              onClick={() => setBilling('yearly')}
            >
              Anual
              <span className="ml-1 text-xs font-medium text-green-500">
                -{yearlyDiscount}%
              </span>
            </button>
          </div>
        </div>

        {/* Trial Banner */}
        {isTrialing && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-blue-700">
                  Estás en período de prueba del plan {currentPlan?.name}
                </p>
                <p className="text-xs text-blue-600">
                  Elige un plan antes de que termine tu prueba para mantener todas las funcionalidades
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold">Free</h3>
              <div className="mt-4">
                <span className="text-3xl font-bold">$0</span>
                <span className="text-gray-500">/mes</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Perfecto para comenzar
              </p>
              <Button
                className="w-full mt-6"
                variant={currentPlan?.id === 'free' ? 'outline' : 'default'}
                onClick={() => handleSelectPlan('free')}
                disabled={isLoading || currentPlan?.id === 'free'}
              >
                {currentPlan?.id === 'free' ? 'Plan Actual' : 'Seleccionar'}
              </Button>
            </div>
            <div className="px-6 pb-6">
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  1 Landing Page
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  Templates Gratuitos
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  1GB Almacenamiento
                </li>
              </ul>
            </div>
          </div>

          {/* Business Plan */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-primary">
            <div className="p-6">
              <h3 className="text-lg font-semibold">Negocio</h3>
              <div className="mt-4">
                <span className="text-3xl font-bold">
                  ${billing === 'yearly' ? Math.round(29 * (1 - yearlyDiscount / 100)) : 29}
                </span>
                <span className="text-gray-500">/{billing === 'yearly' ? 'mes' : 'mes'}</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Ideal para negocios en crecimiento
              </p>
              <Button
                className="w-full mt-6"
                variant="default"
                onClick={() => handleSelectPlan('business')}
                disabled={isLoading}
              >
                {currentPlan?.id === 'business' ? 'Plan Actual' : 
                 isTrialing ? 'Elegir Plan' : 'Comenzar Prueba Gratuita'}
              </Button>
            </div>
            <div className="px-6 pb-6">
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  5 Landing Pages
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  Templates Premium
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  10GB Almacenamiento
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  Dominio Personalizado
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  Analíticas Avanzadas
                </li>
              </ul>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold">Empresa</h3>
              <div className="mt-4">
                <span className="text-3xl font-bold">
                  ${billing === 'yearly' ? Math.round(99 * (1 - yearlyDiscount / 100)) : 99}
                </span>
                <span className="text-gray-500">/{billing === 'yearly' ? 'mes' : 'mes'}</span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Para empresas que necesitan más
              </p>
              <Button
                className="w-full mt-6"
                variant="default"
                onClick={() => handleSelectPlan('enterprise')}
                disabled={isLoading}
              >
                {currentPlan?.id === 'enterprise' ? 'Plan Actual' : 
                 isTrialing ? 'Elegir Plan' : 'Comenzar Prueba Gratuita'}
              </Button>
            </div>
            <div className="px-6 pb-6">
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  Landing Pages Ilimitadas
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  Todos los Templates
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  100GB Almacenamiento
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  Dominios Ilimitados
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  API Access
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500" />
                  Soporte 24/7
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* MercadoPago Checkout Container */}
      <div className="cho-container"></div>
    </div>
  );
}
