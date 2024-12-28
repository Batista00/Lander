import { sendEmail } from './email';
import { Plan } from '../types/plans';
import { PaymentStatus } from '../types/payment';

export async function notifyPaymentSuccess(userId: string, email: string, amount: number, planName: string) {
  await sendEmail({
    to: email,
    template: 'payment-success',
    data: { amount, planName }
  });
}

export async function notifyTrialStarted(userId: string, email: string, plan: Plan, trialEndDate: Date) {
  await sendEmail({
    to: email,
    template: 'trial-welcome',
    data: {
      planName: plan.name,
      trialEndDate
    }
  });
}

export async function notifySubscriptionCancelled(userId: string, email: string, plan: Plan) {
  await sendEmail({
    to: email,
    template: 'subscription-cancelled',
    data: {
      planName: plan.name
    }
  });
}

export async function notifyPaymentOverdue(
  userId: string, 
  email: string, 
  amount: number, 
  daysOverdue: number,
  paymentUrl: string
) {
  await sendEmail({
    to: email,
    template: 'payment-reminder',
    data: {
      amount,
      daysOverdue,
      paymentUrl
    }
  });
}

export async function notifyNewInvoice(
  userId: string,
  email: string,
  invoiceNumber: string,
  amount: number,
  date: Date
) {
  await sendEmail({
    to: email,
    template: 'invoice',
    data: {
      invoiceNumber,
      amount,
      date
    }
  });
}

// Función para manejar notificaciones basadas en eventos de pago
export async function handlePaymentNotification(
  userId: string,
  email: string,
  status: PaymentStatus,
  amount: number,
  planName: string
) {
  switch (status) {
    case 'success':
      await notifyPaymentSuccess(userId, email, amount, planName);
      break;
    case 'failed':
      // Podríamos agregar una notificación de pago fallido
      break;
    case 'pending':
      // Podríamos agregar una notificación de pago pendiente
      break;
  }
}
