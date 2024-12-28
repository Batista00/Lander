import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { validateCoupon } from '@/services/coupon';
import { CouponValidationResult } from '@/types/coupon';

interface CouponInputProps {
  userId: string;
  planId: string;
  amount: number;
  onCouponApplied: (result: CouponValidationResult) => void;
}

export function CouponInput({ userId, planId, amount, onCouponApplied }: CouponInputProps) {
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      setError('Por favor ingresa un código de cupón');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await validateCoupon(
        couponCode,
        userId,
        planId,
        amount
      );

      if (result.isValid && result.discount) {
        toast({
          title: "¡Cupón aplicado!",
          description: `Se ha aplicado un descuento de $${(amount - result.discount.finalAmount).toFixed(2)}`,
        });
        onCouponApplied(result);
        setCouponCode('');
      } else {
        setError(result.message || 'Cupón inválido');
      }
    } catch (error) {
      console.error('Error al validar cupón:', error);
      setError('Ocurrió un error al validar el cupón');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Código de descuento"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          className="uppercase"
          disabled={loading}
        />
        <Button
          onClick={handleApplyCoupon}
          disabled={loading || !couponCode.trim()}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Validando
            </>
          ) : (
            'Aplicar'
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
