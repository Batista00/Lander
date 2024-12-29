import { db } from '../../firebase/admin';

const subscriptionsRef = db.collection('subscriptions');

export const createSubscription = async (subscriptionData: any) => {
  const docRef = await subscriptionsRef.add({
    ...subscriptionData,
    createdAt: new Date().toISOString()
  });
  return { id: docRef.id, ...subscriptionData };
};

export const getSubscriptionByPaymentId = async (paymentId: string) => {
  const snapshot = await subscriptionsRef.where('paymentId', '==', paymentId).get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
};

export const updateSubscription = async (subscription: any) => {
  await subscriptionsRef.doc(subscription.id).update(subscription);
  return subscription;
};

export const getActiveSubscriptionByUserId = async (userId: string) => {
  try {
    const subscriptionsSnapshot = await db.collection('subscriptions')
      .where('userId', '==', userId)
      .where('status', '==', 'active')
      .limit(1)
      .get();

    if (subscriptionsSnapshot.empty) {
      return null;
    }

    return subscriptionsSnapshot.docs[0].data();
  } catch (error) {
    console.error('Error getting subscription:', error);
    throw new Error('Failed to get subscription');
  }
};
