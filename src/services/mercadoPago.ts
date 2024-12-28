import { CheckoutSession, Subscription } from '@/types/payment';
import { PlanId, BillingPeriod } from '@/types/plans';

class MercadoPagoService {
  private readonly API_URL = import.meta.env.VITE_API_URL;
  private readonly MP_PUBLIC_KEY = import.meta.env.VITE_MP_PUBLIC_KEY;

  async createCheckoutSession(params: {
    planId: PlanId;
    billing: BillingPeriod;
    trialDays?: number;
  }): Promise<CheckoutSession> {
    const response = await fetch(`${this.API_URL}/checkout/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error('Error al crear la sesión de checkout');
    }

    return response.json();
  }

  async getSubscription(subscriptionId: string): Promise<Subscription> {
    const response = await fetch(`${this.API_URL}/subscriptions/${subscriptionId}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener la suscripción');
    }

    return response.json();
  }

  async cancelSubscription(subscriptionId: string): Promise<void> {
    const response = await fetch(`${this.API_URL}/subscriptions/${subscriptionId}/cancel`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Error al cancelar la suscripción');
    }
  }

  async updateSubscription(
    subscriptionId: string,
    updates: Partial<{ planId: PlanId; billing: BillingPeriod }>
  ): Promise<Subscription> {
    const response = await fetch(`${this.API_URL}/subscriptions/${subscriptionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar la suscripción');
    }

    return response.json();
  }

  // Método para inicializar MercadoPago en el cliente
  initMercadoPago(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.onload = () => {
        // @ts-ignore
        const mp = new MercadoPago(this.MP_PUBLIC_KEY);
        (window as any).mp = mp;
        resolve();
      };
      script.onerror = () => reject(new Error('Error al cargar MercadoPago SDK'));
      document.body.appendChild(script);
    });
  }
}

export const mercadoPagoService = new MercadoPagoService();
