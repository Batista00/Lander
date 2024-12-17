import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { UserRating, RatingStats, RatingCategory } from '../types/rating';

const RATINGS_COLLECTION = 'user_ratings';

export const ratingService = {
  // Crear una nueva calificación
  async createRating(rating: Omit<UserRating, 'id' | 'createdAt' | 'updatedAt' | 'helpful'>): Promise<string> {
    const ratingData = {
      ...rating,
      createdAt: new Date(),
      updatedAt: new Date(),
      helpful: 0
    };

    const docRef = await addDoc(collection(db, RATINGS_COLLECTION), ratingData);
    return docRef.id;
  },

  // Obtener todas las calificaciones de un usuario
  async getUserRatings(userId: string): Promise<UserRating[]> {
    const q = query(collection(db, RATINGS_COLLECTION), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate()
    } as UserRating));
  },

  // Obtener estadísticas de calificaciones de un usuario
  async getUserRatingStats(userId: string): Promise<RatingStats> {
    const ratings = await this.getUserRatings(userId);
    
    // Inicializar estadísticas
    const stats: RatingStats = {
      averageRating: 0,
      totalRatings: ratings.length,
      categoryAverages: {
        [RatingCategory.COMMUNICATION]: 0,
        [RatingCategory.PRODUCT_QUALITY]: 0,
        [RatingCategory.DELIVERY_TIME]: 0,
        [RatingCategory.SUPPORT]: 0,
        [RatingCategory.DOCUMENTATION]: 0
      },
      ratingDistribution: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      }
    };

    if (ratings.length === 0) return stats;

    // Calcular distribución y promedios
    let totalRating = 0;
    const categoryTotals: { [key in RatingCategory]: { sum: number; count: number } } = {
      [RatingCategory.COMMUNICATION]: { sum: 0, count: 0 },
      [RatingCategory.PRODUCT_QUALITY]: { sum: 0, count: 0 },
      [RatingCategory.DELIVERY_TIME]: { sum: 0, count: 0 },
      [RatingCategory.SUPPORT]: { sum: 0, count: 0 },
      [RatingCategory.DOCUMENTATION]: { sum: 0, count: 0 }
    };

    ratings.forEach(rating => {
      // Actualizar distribución
      stats.ratingDistribution[rating.rating as 1|2|3|4|5]++;
      
      // Actualizar totales por categoría
      totalRating += rating.rating;
      const cat = categoryTotals[rating.category];
      cat.sum += rating.rating;
      cat.count++;
    });

    // Calcular promedios
    stats.averageRating = totalRating / ratings.length;
    
    // Calcular promedios por categoría
    Object.entries(categoryTotals).forEach(([category, data]) => {
      stats.categoryAverages[category as RatingCategory] = 
        data.count > 0 ? data.sum / data.count : 0;
    });

    return stats;
  },

  // Marcar una calificación como útil
  async markRatingAsHelpful(ratingId: string): Promise<void> {
    const ratingRef = doc(db, RATINGS_COLLECTION, ratingId);
    const ratingSnap = await getDoc(ratingRef);
    
    if (ratingSnap.exists()) {
      await updateDoc(ratingRef, {
        helpful: (ratingSnap.data().helpful || 0) + 1
      });
    }
  },

  // Eliminar una calificación
  async deleteRating(ratingId: string): Promise<void> {
    await deleteDoc(doc(db, RATINGS_COLLECTION, ratingId));
  }
};
