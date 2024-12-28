import { db } from '../config/firebase-admin';
import { UserPlan, UserPlanUpdate } from '../../types/plans';

export async function getUserById(userId: string) {
  const userDoc = await db.collection('users').doc(userId).get();
  if (!userDoc.exists) {
    throw new Error('User not found');
  }
  return userDoc.data();
}

export async function updateUserPlan(userId: string, update: UserPlanUpdate) {
  try {
    const userRef = db.collection('users').doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    const currentPlan = userDoc.data()?.plan as UserPlan;
    
    // Si el usuario tiene un plan activo, guardarlo en el historial
    if (currentPlan && currentPlan.status === 'active') {
      await db.collection('planHistory').add({
        userId,
        plan: currentPlan,
        endDate: new Date().toISOString(),
        reason: 'plan_change'
      });
    }

    // Actualizar el plan del usuario
    await userRef.update({
      plan: {
        ...currentPlan,
        ...update,
      },
      updatedAt: new Date().toISOString()
    });

    return true;
  } catch (error) {
    console.error('Error updating user plan:', error);
    throw new Error('Failed to update user plan');
  }
}
