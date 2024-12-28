import { Plan } from './plans';
import { PaymentStatus } from './payment';
import { PlanId, BillingPeriod } from './plans';

export interface DetallesFacturacion {
  nombre: string;
  identificacionFiscal?: string;  // RUT/CUIT/NIT según el país
  direccion?: {
    calle: string;
    ciudad: string;
    estado: string;
    pais: string;
    codigoPostal: string;
  };
  email: string;
}

export interface MetodoPago {
  id: string;
  tipo: 'tarjeta_credito' | 'tarjeta_debito';
  ultimos4: string;
  marca: string;
  mesVencimiento: number;
  anioVencimiento: number;
  esPredeterminado: boolean;
}

export interface Factura {
  id: string;
  numero: string;
  fecha: Date;
  fechaVencimiento: Date;
  monto: number;
  estado: PaymentStatus;
  items: {
    descripcion: string;
    cantidad: number;
    precioUnitario: number;
    total: number;
  }[];
  detallesFacturacion: DetallesFacturacion;
  downloadUrl?: string;
}

export interface ConfiguracionFacturacion {
  renovacionAutomatica: boolean;
  metodoPagoPredeterminado?: string;
  detallesFacturacion: DetallesFacturacion;
  preferenciasNotificacion: {
    recordatoriosPago: boolean;
    recibirFacturas: boolean;
    recordatoriosFinPrueba: boolean;
  };
}

export interface InformacionFacturacion {
  planId: PlanId;
  periodoPago: BillingPeriod;
  proximaFechaFacturacion: string;
  estadoUltimoPago: PaymentStatus;
  fechaUltimoPago: string;
  monto: number;
}

export interface HistorialFacturacion {
  pagos: {
    id: string;
    fecha: string;
    monto: number;
    estado: PaymentStatus;
    descripcion: string;
  }[];
}
