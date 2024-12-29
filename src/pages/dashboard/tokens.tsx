import React, { useState, useEffect } from 'react';
import { useTokens } from '@/contexts/TokenContext';
import { TOKEN_PACKAGES } from '@/types/token';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Coins, CreditCard, History } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { DashboardHead } from '@/components/dashboard/DashboardHead';
import { PaymentService } from '@/services/paymentService';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

const paymentService = new PaymentService();

export default function TokensPage() {
  const { balance, transactions, purchaseTokens, refreshBalance } = useTokens();
  const [purchasing, setPurchasing] = useState(false);
  const searchParams = useSearchParams();

  // Manejar el estado del pago cuando el usuario regresa
  useEffect(() => {
    const status = searchParams?.get('status');
    if (status) {
      switch (status) {
        case 'success':
          toast.success('¡Compra exitosa! Tus tokens estarán disponibles en breve.');
          refreshBalance();
          break;
        case 'failure':
          toast.error('La compra no pudo completarse. Intenta nuevamente.');
          break;
        case 'pending':
          toast.info('Tu pago está pendiente. Te notificaremos cuando se complete.');
          break;
      }
    }
  }, [searchParams]);

  const handlePurchase = async (amount: number, cost: number) => {
    if (purchasing) return;
    
    try {
      setPurchasing(true);
      const purchaseId = await purchaseTokens(amount, cost);
      
      // Crear checkout de Mercado Pago
      const checkoutUrl = await paymentService.createTokenPurchaseCheckout({
        id: purchaseId,
        userId: user.uid,
        amount,
        cost,
        status: 'pending',
        createdAt: new Date()
      });
      
      // Redirigir al checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error purchasing tokens:', error);
      toast.error('No se pudo procesar la compra. Intenta nuevamente.');
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <>
      <DashboardHead
        title="Tokens LANDER"
        description="Compra y administra tus tokens para potenciar tu landing page con IA."
      />
      
      <div className="p-6 space-y-6">
        {/* Balance actual */}
        <Card className="p-6 bg-[#1E1E1E]">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-[#00DC8F]/10">
              <Coins className="w-8 h-8 text-[#00DC8F]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {balance?.available || 0} Tokens
              </h2>
              <p className="text-gray-400">
                Has usado {balance?.lifetime ? balance.lifetime - balance.available : 0} tokens en total
              </p>
            </div>
          </div>
        </Card>

        {/* Paquetes de tokens */}
        <div className="grid gap-6 md:grid-cols-3">
          {Object.entries(TOKEN_PACKAGES).map(([key, package]) => (
            <Card key={key} className="p-6 bg-[#1E1E1E]">
              <h3 className="text-xl font-bold mb-2">{key}</h3>
              <p className="text-3xl font-bold mb-4">
                {package.amount} <span className="text-[#00DC8F]">Tokens</span>
              </p>
              <p className="text-gray-400 mb-6">
                ${(package.price / 100).toFixed(2)} USD
              </p>
              <Button
                onClick={() => handlePurchase(package.amount, package.price)}
                disabled={purchasing}
                className="w-full bg-[#00DC8F] hover:bg-[#00DC8F]/90"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Comprar Ahora
              </Button>
            </Card>
          ))}
        </div>

        {/* Historial de transacciones */}
        <Card className="p-6 bg-[#1E1E1E]">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5" />
            <h2 className="text-xl font-bold">Historial de Transacciones</h2>
          </div>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg bg-black/20"
              >
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-400">
                    {format(transaction.timestamp, "d 'de' MMMM, yyyy HH:mm", { locale: es })}
                  </p>
                </div>
                <p className={`font-bold ${
                  transaction.amount > 0 ? 'text-[#00DC8F]' : 'text-red-500'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount} tokens
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
