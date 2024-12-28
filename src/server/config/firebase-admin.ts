import * as admin from 'firebase-admin';
import { PlanType } from '../types/plans';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}

export interface UserPlanUpdate {
  planId: PlanType;
  startDate: Date;
  endDate?: Date | null;
  status: 'active' | 'cancelled' | 'expired';
}

export const updateUserPlan = async (userId: string, planData: UserPlanUpdate) => {
  try {
    await admin.firestore().collection('users').doc(userId).update({
      plan: planData
    });
    return true;
  } catch (error) {
    console.error('Error updating user plan:', error);
    throw error;
  }
};

export const db = admin.firestore();
export const auth = admin.auth();

export default admin;
