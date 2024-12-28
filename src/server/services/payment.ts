import { db } from '../config/firebase-admin';
import { Payment } from '../../types/payment';

export async function createPayment(payment: Payment) {
  try {
    await db.collection('payments').doc(payment.id).set(payment);
    return payment;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw new Error('Failed to create payment');
  }
}

export async function getPaymentById(paymentId: string) {
  try {
    const paymentDoc = await db.collection('payments').doc(paymentId).get();
    if (!paymentDoc.exists) {
      return null;
    }
    return paymentDoc.data() as Payment;
  } catch (error) {
    console.error('Error getting payment:', error);
    throw new Error('Failed to get payment');
  }
}

export async function updatePayment(payment: Payment) {
  try {
    await db.collection('payments').doc(payment.id).update(payment);
    return payment;
  } catch (error) {
    console.error('Error updating payment:', error);
    throw new Error('Failed to update payment');
  }
}
