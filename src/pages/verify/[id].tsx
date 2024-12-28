import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, CheckCircle2, AlertCircle, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Invoice } from '@/types/billing';
import { downloadInvoice } from '@/services/billing';

interface VerificationStatus {
  isValid: boolean;
  message: string;
  invoice?: Invoice;
}

export default function VerifyInvoicePage() {
  const { id } = useParams();
  const [status, setStatus] = useState<VerificationStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyInvoice();
  }, [id]);

  const verifyInvoice = async () => {
    try {
      setLoading(true);
      // TODO: Implementar verificación real con Firebase
      const response = await fetch(`/api/verify/${id}`);
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('Error al verificar factura:', error);
      setStatus({
        isValid: false,
        message: 'No se pudo verificar la factura. Por favor intenta nuevamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!status?.invoice) return;
    
    try {
      const url = await downloadInvoice(
        status.invoice.billingDetails.userId,
        status.invoice.number
      );
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error al descargar factura:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
          <h2 className="text-2xl font-semibold mb-2">Verificando factura...</h2>
          <p className="text-muted-foreground">
            Esto tomará solo unos segundos
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-3xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {status?.isValid ? (
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              ) : (
                <AlertCircle className="w-16 h-16 text-red-500" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {status?.isValid ? 'Factura Verificada' : 'Verificación Fallida'}
            </CardTitle>
            <CardDescription>
              {status?.message}
            </CardDescription>
          </CardHeader>

          {status?.isValid && status.invoice && (
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">
                      Número de Factura
                    </h3>
                    <p className="mt-1">{status.invoice.number}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">
                      Fecha de Emisión
                    </h3>
                    <p className="mt-1">
                      {new Date(status.invoice.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">
                      Cliente
                    </h3>
                    <p className="mt-1">{status.invoice.billingDetails.name}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">
                      Monto
                    </h3>
                    <p className="mt-1">
                      ${status.invoice.amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <Button
                    onClick={handleDownload}
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Descargar Factura Original
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}
