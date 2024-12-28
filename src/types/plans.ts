export type PlanId = 'gratuito' | 'pro' | 'empresa';

export type PeriodoPago = 'mensual' | 'anual';

export interface Plan {
  id: PlanId;
  nombre: string;
  descripcion: string;
  precio: number;
  caracteristicas: string[];
  periodoPago: PeriodoPago;
}

export interface PlanUsuario {
  planId: PlanId;
  periodoPago: PeriodoPago;
  fechaInicio: string;
  fechaFin: string;
  estado: 'activo' | 'cancelado' | 'expirado';
}

export interface ActualizacionPlanUsuario {
  planId?: PlanId;
  periodoPago?: PeriodoPago;
  fechaInicio?: string;
  fechaFin?: string;
  estado?: 'activo' | 'cancelado' | 'expirado';
}
