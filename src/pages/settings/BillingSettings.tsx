import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, Bell, Building2 } from 'lucide-react';
import { BillingSettings, PaymentMethod } from '@/types/billing';
import { usePlanStore } from '@/store/planStore';

const defaultBillingSettings: BillingSettings = {
  autoRenew: true,
  billingDetails: {
    name: '',
    email: '',
    taxId: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    }
  },
  notificationPreferences: {
    paymentReminders: true,
    receiveInvoices: true,
    trialEndReminders: true
  }
};

export function BillingSettingsPage() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<BillingSettings>(defaultBillingSettings);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(false);
  const currentPlan = usePlanStore(state => state.currentPlan);

  useEffect(() => {
    loadBillingSettings();
    loadPaymentMethods();
  }, []);

  const loadBillingSettings = async () => {
    // TODO: Cargar configuración desde Firebase
    setSettings(defaultBillingSettings);
  };

  const loadPaymentMethods = async () => {
    // TODO: Cargar métodos de pago desde MercadoPago
    setPaymentMethods([]);
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // TODO: Guardar configuración en Firebase
      toast({
        title: "Configuración guardada",
        description: "Los cambios han sido guardados exitosamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const handleAddPaymentMethod = async () => {
    // TODO: Integrar con MercadoPago para agregar nuevo método de pago
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Configuración de Facturación</h1>
      
      <Tabs defaultValue="payment-methods">
        <TabsList>
          <TabsTrigger value="payment-methods">
            <CreditCard className="w-4 h-4 mr-2" />
            Métodos de Pago
          </TabsTrigger>
          <TabsTrigger value="billing-info">
            <Building2 className="w-4 h-4 mr-2" />
            Información de Facturación
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notificaciones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payment-methods">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pago</CardTitle>
              <CardDescription>
                Administra tus tarjetas y métodos de pago
              </CardDescription>
            </CardHeader>
            <CardContent>
              {paymentMethods.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">
                    No tienes métodos de pago guardados
                  </p>
                  <Button onClick={handleAddPaymentMethod}>
                    Agregar método de pago
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded">
                      <div className="flex items-center space-x-4">
                        <CreditCard className="w-6 h-6" />
                        <div>
                          <p className="font-medium">
                            {method.brand} terminada en {method.last4}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Vence: {method.expiryMonth}/{method.expiryYear}
                          </p>
                        </div>
                      </div>
                      {method.isDefault && (
                        <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                          Principal
                        </span>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" onClick={handleAddPaymentMethod}>
                    Agregar otro método de pago
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing-info">
          <Card>
            <CardHeader>
              <CardTitle>Información de Facturación</CardTitle>
              <CardDescription>
                Información que aparecerá en tus facturas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre/Razón Social</Label>
                    <Input
                      id="name"
                      value={settings.billingDetails.name}
                      onChange={(e) => setSettings({
                        ...settings,
                        billingDetails: {
                          ...settings.billingDetails,
                          name: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">RUT/CUIT/NIT</Label>
                    <Input
                      id="taxId"
                      value={settings.billingDetails.taxId}
                      onChange={(e) => setSettings({
                        ...settings,
                        billingDetails: {
                          ...settings.billingDetails,
                          taxId: e.target.value
                        }
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="street">Dirección</Label>
                  <Input
                    id="street"
                    value={settings.billingDetails.address?.street}
                    onChange={(e) => setSettings({
                      ...settings,
                      billingDetails: {
                        ...settings.billingDetails,
                        address: {
                          ...settings.billingDetails.address!,
                          street: e.target.value
                        }
                      }
                    })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input
                      id="city"
                      value={settings.billingDetails.address?.city}
                      onChange={(e) => setSettings({
                        ...settings,
                        billingDetails: {
                          ...settings.billingDetails,
                          address: {
                            ...settings.billingDetails.address!,
                            city: e.target.value
                          }
                        }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Estado/Provincia</Label>
                    <Input
                      id="state"
                      value={settings.billingDetails.address?.state}
                      onChange={(e) => setSettings({
                        ...settings,
                        billingDetails: {
                          ...settings.billingDetails,
                          address: {
                            ...settings.billingDetails.address!,
                            state: e.target.value
                          }
                        }
                      })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="country">País</Label>
                    <Input
                      id="country"
                      value={settings.billingDetails.address?.country}
                      onChange={(e) => setSettings({
                        ...settings,
                        billingDetails: {
                          ...settings.billingDetails,
                          address: {
                            ...settings.billingDetails.address!,
                            country: e.target.value
                          }
                        }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">Código Postal</Label>
                    <Input
                      id="zipCode"
                      value={settings.billingDetails.address?.zipCode}
                      onChange={(e) => setSettings({
                        ...settings,
                        billingDetails: {
                          ...settings.billingDetails,
                          address: {
                            ...settings.billingDetails.address!,
                            zipCode: e.target.value
                          }
                        }
                      })}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Preferencias de Notificación</CardTitle>
              <CardDescription>
                Configura qué notificaciones quieres recibir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Recordatorios de pago</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe recordatorios cuando tu pago esté próximo a vencer
                    </p>
                  </div>
                  <Switch
                    checked={settings.notificationPreferences.paymentReminders}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notificationPreferences: {
                        ...settings.notificationPreferences,
                        paymentReminders: checked
                      }
                    })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Facturas</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe tus facturas por correo electrónico
                    </p>
                  </div>
                  <Switch
                    checked={settings.notificationPreferences.receiveInvoices}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notificationPreferences: {
                        ...settings.notificationPreferences,
                        receiveInvoices: checked
                      }
                    })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Recordatorios de prueba gratuita</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe notificaciones sobre el estado de tu período de prueba
                    </p>
                  </div>
                  <Switch
                    checked={settings.notificationPreferences.trialEndReminders}
                    onCheckedChange={(checked) => setSettings({
                      ...settings,
                      notificationPreferences: {
                        ...settings.notificationPreferences,
                        trialEndReminders: checked
                      }
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button 
          onClick={handleSaveSettings}
          disabled={loading}
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </div>
  );
}
