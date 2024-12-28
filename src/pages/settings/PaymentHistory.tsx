import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Download, FileText, Search } from 'lucide-react';
import { Invoice } from '@/types/billing';
import { PaymentStatus } from '@/types/payment';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth'; // Added import
import { getInvoices, downloadInvoice } from '@/services/invoice';

const statusColors: Record<PaymentStatus, string> = {
  success: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-red-100 text-red-800',
};

const statusLabels: Record<PaymentStatus, string> = {
  success: 'Pagado',
  pending: 'Pendiente',
  failed: 'Fallido',
};

export function PaymentHistoryPage() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'all'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | '30' | '90' | '180'>('all');
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadInvoices();
    }
  }, [user, statusFilter, dateFilter]);

  const loadInvoices = async () => {
    if (!user) return;

    try {
      setLoading(true);
      
      const filters: any = {};
      
      if (dateFilter !== 'all') {
        const date = new Date();
        date.setDate(date.getDate() - parseInt(dateFilter));
        filters.startDate = date;
      }
      
      if (statusFilter !== 'all') {
        filters.status = statusFilter;
      }

      const fetchedInvoices = await getInvoices(user.uid, filters);
      setInvoices(fetchedInvoices);
    } catch (error) {
      console.error('Error al cargar facturas:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las facturas. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = async (invoice: Invoice) => {
    if (!user) return;

    try {
      const downloadUrl = await downloadInvoice(user.uid, invoice.number);
      window.open(downloadUrl, '_blank');
    } catch (error) {
      console.error('Error al descargar factura:', error);
      toast({
        title: "Error",
        description: "No se pudo descargar la factura. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch = 
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.billingDetails.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    
    const matchesDate = () => {
      if (dateFilter === 'all') return true;
      const days = parseInt(dateFilter);
      const date = new Date();
      date.setDate(date.getDate() - days);
      return invoice.date >= date;
    };

    return matchesSearch && matchesStatus && matchesDate();
  });

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Historial de Pagos</CardTitle>
          <CardDescription>
            Visualiza y descarga tus facturas y pagos anteriores
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-6">
            {/* Filtros */}
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por número de factura o nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as PaymentStatus | 'all')}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="success">Pagado</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="failed">Fallido</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={dateFilter}
                onValueChange={(value) => setDateFilter(value as 'all' | '30' | '90' | '180')}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todo el historial</SelectItem>
                  <SelectItem value="30">Últimos 30 días</SelectItem>
                  <SelectItem value="90">Últimos 90 días</SelectItem>
                  <SelectItem value="180">Últimos 180 días</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tabla de facturas */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        Cargando facturas...
                      </TableCell>
                    </TableRow>
                  ) : filteredInvoices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        No se encontraron facturas
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredInvoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>
                          {format(invoice.date, 'dd/MM/yyyy', { locale: es })}
                        </TableCell>
                        <TableCell>{invoice.number}</TableCell>
                        <TableCell>
                          {invoice.items[0]?.description}
                          {invoice.items.length > 1 && 
                            ` + ${invoice.items.length - 1} más`}
                        </TableCell>
                        <TableCell>
                          ${invoice.amount.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[invoice.status]}`}>
                            {statusLabels[invoice.status]}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadInvoice(invoice)}
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(invoice.downloadUrl, '_blank')}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
