import { db } from '../../firebase/admin';

const paymentsRef = db.collection('payments');

export const createPayment = async (paymentData: any) => {
  const docRef = await paymentsRef.add({
    ...paymentData,
    createdAt: new Date().toISOString()
  });
  return { id: docRef.id, ...paymentData };
};

export const getPaymentById = async (paymentId: string) => {
  const doc = await paymentsRef.doc(paymentId).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

export const updatePayment = async (payment: any) => {
  await paymentsRef.doc(payment.id).update(payment);
  return payment;
};
