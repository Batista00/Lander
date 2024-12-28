export type DiscountType = 'percentage' | 'fixed';

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  startDate: Date;
  endDate: Date | null;
  maxUses: number | null;
  currentUses: number;
  minPurchaseAmount?: number;
  maxDiscountAmount?: number;
  applicablePlans: string[]; // IDs de los planes a los que se puede aplicar
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CouponUsage {
  id: string;
  couponId: string;
  userId: string;
  orderId: string;
  usedAt: Date;
  discountAmount: number;
  originalAmount: number;
}

export interface CouponValidationResult {
  isValid: boolean;
  message?: string;
  discount?: {
    type: DiscountType;
    value: number;
    finalAmount: number;
  };
}
