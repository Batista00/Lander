import { Request, Response } from 'express';
import { db } from '../config/firebase-admin';
import { sendPaymentConfirmationEmail } from '../services/email';
import { PaymentStatus, Subscription } from '../../types/payment';
import { updateUserPlan } from '../services/user';

export async function handleMercadoPagoWebhook(req: Request, res: Response) {
  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const paymentRef = db.collection('payments').doc(data.id);
      const payment = await paymentRef.get();

      if (payment.exists) {
        const paymentData = payment.data();
        const { userId, planId, billingPeriod } = paymentData;

        // Actualizar estado del pago
        await paymentRef.update({
          status: data.status as PaymentStatus,
          updatedAt: new Date().toISOString()
        });

        if (data.status === 'approved') {
          // Actualizar plan del usuario
          await updateUserPlan(userId, {
            planId,
            billingPeriod,
            startDate: new Date().toISOString(),
            endDate: calculateEndDate(billingPeriod),
            status: 'active'
          });

          // Enviar email de confirmación
          await sendPaymentConfirmationEmail(userId, {
            planId,
            amount: data.transaction_amount,
            date: new Date().toISOString()
          });

          // Si es una suscripción, actualizar próxima fecha de pago
          const subscriptionRef = db.collection('subscriptions')
            .where('userId', '==', userId)
            .where('status', '==', 'active')
            .limit(1);

          const subscriptionSnapshot = await subscriptionRef.get();
          
          if (!subscriptionSnapshot.empty) {
            const subscription = subscriptionSnapshot.docs[0].data() as Subscription;
            await subscriptionRef.docs[0].ref.update({
              lastPaymentDate: new Date().toISOString(),
              nextPaymentDate: calculateNextPaymentDate(subscription.billingPeriod)
            });
          }
        }
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Error processing webhook' });
  }
}

function calculateEndDate(billingPeriod: 'monthly' | 'yearly'): string {
  const date = new Date();
  if (billingPeriod === 'monthly') {
    date.setMonth(date.getMonth() + 1);
  } else {
    date.setFullYear(date.getFullYear() + 1);
  }
  return date.toISOString();
}

function calculateNextPaymentDate(billingPeriod: 'monthly' | 'yearly'): string {
  return calculateEndDate(billingPeriod);
}
