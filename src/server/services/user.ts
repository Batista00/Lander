import { db } from '../../firebase/admin';

const usersRef = db.collection('users');

export const getUserById = async (userId: string) => {
  const doc = await usersRef.doc(userId).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
};

export const updateUserPlan = async (userId: string, planData: any) => {
  await usersRef.doc(userId).update({
    plan: planData,
    updatedAt: new Date().toISOString()
  });
  return { userId, ...planData };
};
