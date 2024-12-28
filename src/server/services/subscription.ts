import { db } from '../config/firebase-admin';
import { Subscription } from '../../types/payment';

export async function createSubscription(subscription: Subscription) {
  try {
    await db.collection('subscriptions').doc(subscription.id).set(subscription);
    return subscription;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw new Error('Failed to create subscription');
  }
}

export async function updateSubscription(subscription: Subscription) {
  try {
    await db.collection('subscriptions').doc(subscription.id).update(subscription);
    return subscription;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw new Error('Failed to update subscription');
  }
}

export async function getSubscriptionByPaymentId(paymentId: string) {
  try {
    const subscriptionsSnapshot = await db.collection('subscriptions')
      .where('lastPaymentId', '==', paymentId)
      .limit(1)
      .get();

    if (subscriptionsSnapshot.empty) {
      return null;
    }

    return subscriptionsSnapshot.docs[0].data() as Subscription;
  } catch (error) {
    console.error('Error getting subscription:', error);
    throw new Error('Failed to get subscription');
  }
}

export async function getActiveSubscriptionByUserId(userId: string) {
  try {
    const subscriptionsSnapshot = await db.collection('subscriptions')
      .where('userId', '==', userId)
      .where('status', '==', 'active')
      .limit(1)
      .get();

    if (subscriptionsSnapshot.empty) {
      return null;
    }

    return subscriptionsSnapshot.docs[0].data() as Subscription;
  } catch (error) {
    console.error('Error getting subscription:', error);
    throw new Error('Failed to get subscription');
  }
}
