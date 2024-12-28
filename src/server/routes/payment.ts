import express from 'express';
import mercadopago from 'mercadopago';
import { Request, Response } from 'express';
import { PaymentPreference, Payment, Subscription } from '../../types/payment';
import { PlanId, BillingPeriod } from '../../types/plans';
import { getUserById, updateUserPlan } from '../services/user';
import { createPayment, getPaymentById, updatePayment } from '../services/payment';
import { createSubscription, updateSubscription, getSubscriptionByPaymentId } from '../services/subscription';
import { auth } from '../middleware/auth';

const router = express.Router();

// Configurar MercadoPago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN || ''
});

// Middleware de autenticación para proteger las rutas
router.use(auth);

// Crear preferencia de pago
router.post('/create-preference', async (req: Request, res: Response) => {
  try {
    const { userId, planId, billingPeriod } = req.body;

    // Obtener detalles del plan
    const plan = await getPlanById(planId);
    if (!plan) {
      return res.status(404).json({ error: 'Plan no encontrado' });
    }

    // Crear preferencia
    const preference: PaymentPreference = {
      items: [{
        title: `${plan.name} - ${billingPeriod}`,
        quantity: 1,
        unit_price: plan.price,
        description: plan.description
      }],
      metadata: {
        userId,
        planId,
        billingPeriod
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL}/payment/success`,
        failure: `${process.env.FRONTEND_URL}/payment/failure`,
        pending: `${process.env.FRONTEND_URL}/payment/pending`
      }
    };

    const response = await mercadopago.preferences.create(preference);
    res.json(response.body);
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    res.status(500).json({ error: 'Error al crear preferencia de pago' });
  }
});

// Procesar pago exitoso
router.post('/success', async (req: Request, res: Response) => {
  try {
    const { payment_id, metadata } = req.body;
    const { userId, planId, billingPeriod } = metadata;

    // Obtener detalles del pago
    const paymentInfo = await mercadopago.payment.get(payment_id);
    
    // Crear registro de pago
    const payment: Payment = {
      id: payment_id,
      status: paymentInfo.body.status,
      amount: paymentInfo.body.transaction_amount,
      userId,
      planId,
      billingPeriod,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await createPayment(payment);

    // Actualizar plan del usuario
    const userPlanUpdate = {
      planId,
      billingPeriod,
      startDate: new Date().toISOString(),
      endDate: calculateEndDate(billingPeriod),
      status: 'active'
    };
    await updateUserPlan(userId, userPlanUpdate);

    res.json({ success: true });
  } catch (error) {
    console.error('Error al procesar pago:', error);
    res.status(500).json({ error: 'Error al procesar pago' });
  }
});

// Webhook para notificaciones de MercadoPago
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const paymentInfo = await mercadopago.payment.get(data.id);
      const payment = await getPaymentById(data.id);
      
      if (payment) {
        // Actualizar estado del pago
        payment.status = paymentInfo.body.status;
        payment.updatedAt = new Date().toISOString();
        await updatePayment(payment);

        // Si el pago es recurrente, actualizar suscripción
        const subscription = await getSubscriptionByPaymentId(data.id);
        if (subscription) {
          subscription.lastPaymentDate = new Date().toISOString();
          subscription.nextPaymentDate = calculateNextPaymentDate(subscription.billingPeriod);
          await updateSubscription(subscription);
        }
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error en webhook:', error);
    res.status(500).json({ error: 'Error al procesar webhook' });
  }
});

function calculateEndDate(billingPeriod: BillingPeriod): string {
  const date = new Date();
  if (billingPeriod === 'monthly') {
    date.setMonth(date.getMonth() + 1);
  } else {
    date.setFullYear(date.getFullYear() + 1);
  }
  return date.toISOString();
}

function calculateNextPaymentDate(billingPeriod: BillingPeriod): string {
  return calculateEndDate(billingPeriod);
}

// Rutas para manejar el retorno del pago
router.get('/success', async (req: Request, res: Response) => {
  const paymentId = req.query.payment_id;
  // Aquí podrías verificar el estado del pago si lo necesitas
  res.redirect(`${process.env.FRONTEND_URL}/payment/success?payment_id=${paymentId}`);
});

router.get('/failure', async (req: Request, res: Response) => {
  res.redirect(`${process.env.FRONTEND_URL}/payment/failure`);
});

router.get('/pending', async (req: Request, res: Response) => {
  res.redirect(`${process.env.FRONTEND_URL}/payment/pending`);
});

// Ruta para actualizar al plan gratuito
router.post('/upgrade-free', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    // Actualizar el plan del usuario a gratuito
    await updateUserPlan(userId, {
      planId: 'free',
      startDate: new Date().toISOString(),
      endDate: null, // Plan gratuito no tiene fecha de finalización
      status: 'active'
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error upgrading to free plan:', error);
    res.status(500).json({ error: 'Error al actualizar al plan gratuito' });
  }
});

export default router;
