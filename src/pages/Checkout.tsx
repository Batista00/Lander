import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { plans } from '../data/plans';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Inicializar MercadoPago con tu clave pública
initMercadoPago(import.meta.env.VITE_MERCADOPAGO_PUBLIC_KEY);

interface CheckoutProps {}

const Checkout: React.FC<CheckoutProps> = () => {
  const { planId } = useParams<{ planId: string }>();
  const [searchParams] = useSearchParams();
  const interval = searchParams.get('interval') || 'monthly';
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const plan = plans.find(p => p.id === planId);
  const price = interval === 'yearly' ? plan?.price * 12 * 0.8 : plan?.price;

  useEffect(() => {
    const createPreference = async () => {
      try {
        if (!plan) throw new Error('Plan no encontrado');

        const response = await fetch('/api/create-preference', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            planId,
            interval,
            price,
            title: `Plan ${plan.name} - ${interval === 'yearly' ? 'Anual' : 'Mensual'}`,
            quantity: 1,
          }),
        });

        if (!response.ok) {
          throw new Error('Error al crear la preferencia de pago');
        }

        const data = await response.json();
        setPreferenceId(data.preferenceId);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    createPreference();
  }, [planId, interval, plan, price]);

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Plan no encontrado</h2>
          <p className="mt-2 text-gray-600">El plan seleccionado no existe.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
          
          <div className="border-b border-gray-200 pb-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumen de la orden</h2>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-medium text-gray-900">{plan.name}</h3>
                <p className="text-gray-500">{interval === 'yearly' ? 'Plan Anual' : 'Plan Mensual'}</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">${price?.toFixed(2)}</p>
            </div>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {preferenceId && (
            <div className="flex justify-center">
              <Wallet 
                initialization={{ preferenceId }}
                customization={{ texts: { valueProp: 'smart_option' } }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
