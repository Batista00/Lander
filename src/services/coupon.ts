import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  increment,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Coupon, CouponUsage, CouponValidationResult } from '@/types/coupon';

export async function createCoupon(couponData: Omit<Coupon, 'id' | 'currentUses' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const couponRef = await addDoc(collection(db, 'coupons'), {
      ...couponData,
      currentUses: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return couponRef.id;
  } catch (error) {
    console.error('Error al crear cupón:', error);
    throw error;
  }
}

export async function getCoupon(code: string): Promise<Coupon | null> {
  try {
    const couponsRef = collection(db, 'coupons');
    const q = query(couponsRef, where('code', '==', code.toUpperCase()));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const couponDoc = querySnapshot.docs[0];
    return {
      id: couponDoc.id,
      ...couponDoc.data()
    } as Coupon;
  } catch (error) {
    console.error('Error al obtener cupón:', error);
    throw error;
  }
}

export async function validateCoupon(
  code: string,
  userId: string,
  planId: string,
  amount: number
): Promise<CouponValidationResult> {
  try {
    const coupon = await getCoupon(code);

    if (!coupon) {
      return {
        isValid: false,
        message: 'Cupón no encontrado'
      };
    }

    // Validar si el cupón está activo
    if (!coupon.isActive) {
      return {
        isValid: false,
        message: 'Este cupón no está activo'
      };
    }

    // Validar fecha de inicio
    if (coupon.startDate > new Date()) {
      return {
        isValid: false,
        message: 'Este cupón aún no está vigente'
      };
    }

    // Validar fecha de expiración
    if (coupon.endDate && coupon.endDate < new Date()) {
      return {
        isValid: false,
        message: 'Este cupón ha expirado'
      };
    }

    // Validar número máximo de usos
    if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
      return {
        isValid: false,
        message: 'Este cupón ha alcanzado el límite máximo de usos'
      };
    }

    // Validar si el plan es aplicable
    if (!coupon.applicablePlans.includes(planId)) {
      return {
        isValid: false,
        message: 'Este cupón no es válido para el plan seleccionado'
      };
    }

    // Validar monto mínimo de compra
    if (coupon.minPurchaseAmount && amount < coupon.minPurchaseAmount) {
      return {
        isValid: false,
        message: `El monto mínimo para usar este cupón es $${coupon.minPurchaseAmount}`
      };
    }

    // Validar si el usuario ya usó el cupón
    const usageRef = collection(db, 'couponUsage');
    const q = query(
      usageRef,
      where('couponId', '==', coupon.id),
      where('userId', '==', userId)
    );
    const usageSnapshot = await getDocs(q);

    if (!usageSnapshot.empty) {
      return {
        isValid: false,
        message: 'Ya has usado este cupón anteriormente'
      };
    }

    // Calcular el descuento
    let discountAmount = 0;
    if (coupon.discountType === 'percentage') {
      discountAmount = (amount * coupon.discountValue) / 100;
      if (coupon.maxDiscountAmount) {
        discountAmount = Math.min(discountAmount, coupon.maxDiscountAmount);
      }
    } else {
      discountAmount = Math.min(coupon.discountValue, amount);
    }

    const finalAmount = Math.max(0, amount - discountAmount);

    return {
      isValid: true,
      discount: {
        type: coupon.discountType,
        value: coupon.discountValue,
        finalAmount
      }
    };
  } catch (error) {
    console.error('Error al validar cupón:', error);
    throw error;
  }
}

export async function applyCoupon(
  couponId: string,
  userId: string,
  orderId: string,
  originalAmount: number,
  discountAmount: number
): Promise<void> {
  try {
    // Registrar el uso del cupón
    await addDoc(collection(db, 'couponUsage'), {
      couponId,
      userId,
      orderId,
      usedAt: serverTimestamp(),
      originalAmount,
      discountAmount
    });

    // Incrementar el contador de usos
    const couponRef = doc(db, 'coupons', couponId);
    await updateDoc(couponRef, {
      currentUses: increment(1),
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error al aplicar cupón:', error);
    throw error;
  }
}

export async function getActiveCoupons(): Promise<Coupon[]> {
  try {
    const couponsRef = collection(db, 'coupons');
    const q = query(
      couponsRef,
      where('isActive', '==', true),
      where('endDate', '>', new Date())
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Coupon[];
  } catch (error) {
    console.error('Error al obtener cupones activos:', error);
    throw error;
  }
}

export async function deactivateCoupon(couponId: string): Promise<void> {
  try {
    const couponRef = doc(db, 'coupons', couponId);
    await updateDoc(couponRef, {
      isActive: false,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error al desactivar cupón:', error);
    throw error;
  }
}
