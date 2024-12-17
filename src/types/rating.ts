export interface UserRating {
  id: string;
  userId: string;         // ID del usuario que está siendo calificado
  ratedBy: string;        // ID del usuario que realiza la calificación
  rating: number;         // Calificación (1-5)
  comment: string;        // Comentario opcional
  orderId: string;        // ID de la orden relacionada
  templateId: string;     // ID del template relacionado
  createdAt: Date;       // Fecha de creación
  updatedAt: Date;       // Fecha de última actualización
  helpful: number;        // Número de usuarios que encontraron útil esta calificación
  category: RatingCategory; // Categoría de la calificación
}

export enum RatingCategory {
  COMMUNICATION = 'communication',      // Comunicación con el vendedor
  PRODUCT_QUALITY = 'product_quality',  // Calidad del producto
  DELIVERY_TIME = 'delivery_time',      // Tiempo de entrega
  SUPPORT = 'support',                  // Soporte post-venta
  DOCUMENTATION = 'documentation'       // Calidad de la documentación
}

export interface RatingStats {
  averageRating: number;           // Promedio general
  totalRatings: number;           // Total de calificaciones
  categoryAverages: {             // Promedios por categoría
    [key in RatingCategory]: number;
  };
  ratingDistribution: {          // Distribución de calificaciones
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}
