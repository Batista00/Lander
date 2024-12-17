import { 
  collection, 
  query, 
  where, 
  getDocs, 
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  orderBy,
  limit,
  Timestamp,
  DocumentReference,
  setDoc,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';

export interface Template {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  previewImage: string;
  downloadUrl: string;
  sellerId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  templateId: string;
  price: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Review {
  id: string;
  templateId: string;
  rating: number;
  comment: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Promotion {
  id: string;
  code: string;
  discount: number;
  expirationDate: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  sellerId: string;
}

export interface Settings {
  id: string;
  currency: string;
  taxes: number;
  discount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Developer {
  id: string;
  name: string;
  email: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Templates
export const getTemplates = async (filters?: any) => {
  try {
    console.log('Verificando autenticación...');
    const auth = getAuth();
    
    // Esperar a que la autenticación se inicialice
    if (!auth.currentUser) {
      console.log('Usuario no autenticado, esperando autenticación...');
      await new Promise<void>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            unsubscribe();
            resolve();
          }
        });
      });
    }

    console.log('Usuario autenticado:', auth.currentUser?.uid);
    console.log('Intentando obtener templates...');
    const templatesRef = collection(db, 'marketplace_templates');
    
    // Consulta simple sin filtros primero
    const querySnapshot = await getDocs(templatesRef);
    console.log('Documentos obtenidos:', querySnapshot.size);
    
    // Filtrar y mapear los resultados
    const templates = querySnapshot.docs
      .map(doc => {
        const data = doc.data();
        console.log('Template data:', data);
        return {
          id: doc.id,
          ...data
        };
      })
      .filter(template => 
        template.status === 'published' &&
        (!filters?.category || template.category === filters.category)
      )
      .sort((a, b) => {
        const bTime = b.createdAt?.seconds || 0;
        const aTime = a.createdAt?.seconds || 0;
        return bTime - aTime;
      }) as Template[];

    console.log('Templates filtrados:', templates.length);
    return { success: true, data: templates };
  } catch (error) {
    console.error('Error detallado al obtener los templates:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

export const getTemplateById = async (id: string) => {
  try {
    const docRef = doc(db, 'marketplace_templates', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return { success: false, error: 'Template not found' };
    }

    return { 
      success: true, 
      data: {
        id: docSnap.id,
        ...docSnap.data()
      } as Template 
    };
  } catch (error) {
    console.error('Error al obtener el template:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

export const createTemplate = async (template: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const auth = getAuth();
    if (!auth.currentUser) {
      return { success: false, error: 'User not authenticated' };
    }

    const newTemplate = {
      ...template,
      authorId: auth.currentUser.uid,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    const docRef = await addDoc(collection(db, 'marketplace_templates'), newTemplate);
    return { 
      success: true, 
      data: {
        id: docRef.id,
        ...newTemplate
      } as Template 
    };
  } catch (error) {
    console.error('Error al crear el template:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};

export const updateTemplate = async (id: string, template: Partial<Template>) => {
  try {
    const docRef = doc(db, 'marketplace_templates', id);
    await updateDoc(docRef, {
      ...template,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error al actualizar el template:', error);
    throw error;
  }
};

export const deleteTemplate = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'marketplace_templates', id));
  } catch (error) {
    console.error('Error al eliminar el template:', error);
    throw error;
  }
};

// Analytics
export const getAnalytics = async (timeRange: string = '7d') => {
  try {
    const auth = getAuth();
    if (!auth.currentUser) {
      return { 
        success: false, 
        error: 'User not authenticated',
        data: null
      };
    }

    // Por ahora, devolver datos de ejemplo
    const defaultAnalytics = {
      totalSales: 0,
      salesTrend: 0,
      totalOrders: 0,
      ordersTrend: 0,
      averageRating: 0,
      ratingTrend: 0,
      totalUsers: 0,
      usersTrend: 0,
      salesData: [],
      ordersData: [],
      topTemplates: [],
      recentOrders: []
    };

    // TODO: Implementar la lógica real de analytics
    return { 
      success: true, 
      data: defaultAnalytics
    };
  } catch (error) {
    console.error('Error al obtener analytics:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      data: null
    };
  }
};

// Orders
export const createOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...order,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error al crear la orden:', error);
    throw error;
  }
};

export const getSellerOrders = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('sellerId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    throw error;
  }
};

export const getOrdersByUser = async (userId: string) => {
  try {
    const q = query(
      collection(db, 'orders'),
      where('buyerId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
  } catch (error) {
    console.error('Error al obtener órdenes:', error);
    throw error;
  }
};

// File Upload
export const uploadTemplateFile = async (file: File, templateId: string) => {
  try {
    const storageRef = ref(storage, `marketplace_templates/${templateId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error('Error al subir archivo:', error);
    throw error;
  }
};

export const marketplaceService = {
  // Templates
  async getTemplates(filters?: any) {
    return getTemplates(filters);
  },

  async getTemplateById(id: string) {
    return getTemplateById(id);
  },

  // Analytics
  async getAnalytics(timeRange: string = '7d') {
    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        return { 
          success: false, 
          error: 'User not authenticated',
          data: null
        };
      }

      // Por ahora, devolver datos de ejemplo
      const defaultAnalytics = {
        totalSales: 0,
        salesTrend: 0,
        totalOrders: 0,
        ordersTrend: 0,
        averageRating: 0,
        ratingTrend: 0,
        totalUsers: 0,
        usersTrend: 0,
        salesData: [],
        ordersData: [],
        topTemplates: [],
        recentOrders: []
      };

      // TODO: Implementar la lógica real de analytics
      return { 
        success: true, 
        data: defaultAnalytics
      };
    } catch (error) {
      console.error('Error al obtener analytics:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        data: null
      };
    }
  },

  // Developer Profile
  async getDeveloperProfile(developerId?: string): Promise<{ success: boolean, data: Developer | null, error?: string }> {
    try {
      if (!developerId) {
        console.error('getDeveloperProfile: No se proporcionó developerId');
        return { 
          success: false, 
          error: 'Developer ID is required', 
          data: null 
        };
      }

      console.log('getDeveloperProfile: Iniciando búsqueda para developerId:', developerId);
      
      // Primero intentamos buscar en la colección de developers
      const developerRef = doc(db, 'developers', developerId);
      let developerDoc = await getDoc(developerRef);

      // Si no existe en developers, buscamos en users
      if (!developerDoc.exists()) {
        console.log('getDeveloperProfile: No se encontró en developers, buscando en users...');
        const userRef = doc(db, 'users', developerId);
        developerDoc = await getDoc(userRef);
      }

      if (!developerDoc.exists()) {
        console.log('getDeveloperProfile: No se encontró el perfil en ninguna colección');
        
        // Si no existe el perfil, creamos uno básico
        const auth = getAuth();
        const currentUser = auth.currentUser;
        
        if (currentUser && currentUser.uid === developerId) {
          console.log('getDeveloperProfile: Creando perfil básico para el usuario actual');
          const basicProfile = {
            id: developerId,
            name: currentUser.displayName || 'Usuario sin nombre',
            email: currentUser.email || '',
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            bio: '',
            skills: [],
            portfolio: [],
            socialLinks: {},
            userId: developerId
          };

          // Guardar el perfil básico en la colección de developers
          await setDoc(doc(db, 'developers', developerId), basicProfile);
          
          return { 
            success: true, 
            data: basicProfile as Developer
          };
        }
        
        return { 
          success: false, 
          error: 'Developer profile not found', 
          data: null 
        };
      }

      const developerData = developerDoc.data();
      console.log('getDeveloperProfile: Datos encontrados:', developerData);

      // Asegurarnos de que tenemos todos los campos necesarios
      const profile = {
        id: developerDoc.id,
        name: developerData.name || developerData.displayName || 'Unknown Developer',
        email: developerData.email || '',
        createdAt: developerData.createdAt || Timestamp.now(),
        updatedAt: developerData.updatedAt || Timestamp.now(),
        bio: developerData.bio || '',
        skills: developerData.skills || [],
        portfolio: developerData.portfolio || [],
        socialLinks: developerData.socialLinks || {},
        userId: developerData.userId || developerDoc.id,
        ...developerData
      };

      console.log('getDeveloperProfile: Perfil procesado:', profile);

      return { 
        success: true, 
        data: profile as Developer
      };
    } catch (error) {
      console.error('getDeveloperProfile: Error al obtener el perfil:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        data: null 
      };
    }
  },

  async updateDeveloperProfile(developerId?: string, profile?: Partial<Developer>): Promise<{ success: boolean, error?: string }> {
    try {
      if (!developerId) {
        return { 
          success: false, 
          error: 'Developer ID is required' 
        };
      }

      if (!profile) {
        return { 
          success: false, 
          error: 'Profile data is required' 
        };
      }

      const developerRef = doc(db, 'users', developerId);
      await updateDoc(developerRef, {
        ...profile,
        updatedAt: Timestamp.now()
      });
      return { success: true };
    } catch (error) {
      console.error('Error al actualizar el perfil del desarrollador:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  },

  // Órdenes
  async getOrders(): Promise<Order[]> {
    try {
      const ordersRef = collection(db, 'orders');
      const snapshot = await getDocs(ordersRef);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
    } catch (error) {
      console.error('Error al obtener las órdenes:', error);
      throw error;
    }
  },

  async createOrder(templateId: string): Promise<Order> {
    try {
      const ordersRef = collection(db, 'orders');
      const orderData = {
        templateId,
        status: 'pending',
        createdAt: new Date(),
      };
      const docRef = await addDoc(ordersRef, orderData);
      return { id: docRef.id, ...orderData } as Order;
    } catch (error) {
      console.error('Error al crear la orden:', error);
      throw error;
    }
  },

  // Reviews
  async createReview(templateId: string, rating: number, comment: string): Promise<Review> {
    try {
      const reviewsRef = collection(db, 'reviews');
      const reviewData = {
        templateId,
        rating,
        comment,
        createdAt: new Date(),
      };
      const docRef = await addDoc(reviewsRef, reviewData);
      return { id: docRef.id, ...reviewData } as Review;
    } catch (error) {
      console.error('Error al crear la review:', error);
      throw error;
    }
  },

  // Favoritos
  async getFavorites(): Promise<Template[]> {
    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        return { success: false, error: 'User not authenticated', data: [] };
      }

      const userId = auth.currentUser.uid;
      const favoritesRef = collection(db, 'favorites');
      const q = query(favoritesRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);

      const favorites = [];
      for (const doc of querySnapshot.docs) {
        const favoriteData = doc.data();
        const templateId = favoriteData.templateId;
        
        // Obtener los detalles del template
        const templateDoc = await getDoc(doc(db, 'marketplace_templates', templateId));
        if (templateDoc.exists()) {
          favorites.push({
            id: templateDoc.id,
            ...templateDoc.data(),
            favoriteId: doc.id // Guardamos el ID del documento de favoritos para poder eliminarlo después
          });
        }
      }

      return { success: true, data: favorites };
    } catch (error) {
      console.error('Error al obtener favoritos:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        data: [] 
      };
    }
  },

  async addToFavorites(templateId: string): Promise<void> {
    try {
      const favoritesRef = collection(db, 'favorites');
      await addDoc(favoritesRef, {
        templateId,
        userId: getAuth().currentUser.uid,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error('Error al agregar a favoritos:', error);
      throw error;
    }
  },

  async removeFromFavorites(templateId: string): Promise<void> {
    try {
      const favoritesRef = collection(db, 'favorites');
      const q = query(favoritesRef, where('templateId', '==', templateId));
      const snapshot = await getDocs(q);
      const doc = snapshot.docs[0];
      if (doc) {
        await deleteDoc(doc.ref);
      }
    } catch (error) {
      console.error('Error al remover de favoritos:', error);
      throw error;
    }
  },

  // Carrito
  async getCart(): Promise<{ items: Template[], total: number, taxes: number, discount: number }> {
    // Simular llamada a API
    return {
      items: [],
      total: 0,
      taxes: 0,
      discount: 0
    };
  },

  async addToCart(templateId: string): Promise<void> {
    // Implementar lógica real
  },

  async removeFromCart(templateId: string): Promise<void> {
    // Implementar lógica real
  },

  async updateCartItemQuantity(itemId: string, change: number): Promise<void> {
    // Implementar lógica real
  },

  async applyPromoCode(code: string): Promise<void> {
    // Implementar lógica real
  },

  // Promociones
  async getPromotions(): Promise<{ success: boolean; data: Promotion[]; error?: string }> {
    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        await new Promise<void>((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              unsubscribe();
              resolve();
            }
          });
        });
      }

      if (!auth.currentUser) {
        return {
          success: false,
          data: [],
          error: 'User not authenticated'
        };
      }

      const promotionsRef = collection(db, 'promotions');
      const q = query(promotionsRef, where('sellerId', '==', auth.currentUser.uid));
      const snapshot = await getDocs(q);
      
      return {
        success: true,
        data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Promotion))
      };
    } catch (error) {
      console.error('Error al obtener promociones:', error);
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  async createPromotion(promotion: Omit<Promotion, 'id'>): Promise<{ success: boolean; data?: Promotion; error?: string }> {
    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        return {
          success: false,
          error: 'User not authenticated'
        };
      }

      const promotionWithSeller = {
        ...promotion,
        sellerId: auth.currentUser.uid,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const promotionsRef = collection(db, 'promotions');
      const docRef = await addDoc(promotionsRef, promotionWithSeller);
      
      return {
        success: true,
        data: { id: docRef.id, ...promotionWithSeller }
      };
    } catch (error) {
      console.error('Error al crear promoción:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  async updatePromotion(id: string, promotion: Partial<Promotion>): Promise<{ success: boolean; data?: Promotion; error?: string }> {
    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        return {
          success: false,
          error: 'User not authenticated'
        };
      }

      const promotionRef = doc(db, 'promotions', id);
      const promotionDoc = await getDoc(promotionRef);
      
      if (!promotionDoc.exists()) {
        return {
          success: false,
          error: 'Promotion not found'
        };
      }

      const currentPromotion = promotionDoc.data() as Promotion;
      if (currentPromotion.sellerId !== auth.currentUser.uid) {
        return {
          success: false,
          error: 'Unauthorized to update this promotion'
        };
      }

      const updatedPromotion = {
        ...promotion,
        updatedAt: Timestamp.now()
      };

      await updateDoc(promotionRef, updatedPromotion);
      
      return {
        success: true,
        data: { id, ...currentPromotion, ...updatedPromotion }
      };
    } catch (error) {
      console.error('Error al actualizar promoción:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  async deletePromotion(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const auth = getAuth();
      if (!auth.currentUser) {
        return {
          success: false,
          error: 'User not authenticated'
        };
      }

      const promotionRef = doc(db, 'promotions', id);
      const promotionDoc = await getDoc(promotionRef);
      
      if (!promotionDoc.exists()) {
        return {
          success: false,
          error: 'Promotion not found'
        };
      }

      const promotion = promotionDoc.data() as Promotion;
      if (promotion.sellerId !== auth.currentUser.uid) {
        return {
          success: false,
          error: 'Unauthorized to delete this promotion'
        };
      }

      await deleteDoc(promotionRef);
      return { success: true };
    } catch (error) {
      console.error('Error al eliminar promoción:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },

  // Configuraciones
  async getSettings(): Promise<Settings> {
    try {
      const settingsRef = doc(db, 'settings', 'marketplace');
      const settingsDoc = await getDoc(settingsRef);
      
      if (!settingsDoc.exists()) {
        // Create default settings if they don't exist
        const defaultSettings: Settings = {
          id: 'marketplace',
          currency: 'USD',
          taxes: 0,
          discount: 0,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        };
        
        await setDoc(settingsRef, defaultSettings);
        return defaultSettings;
      }
      
      return { id: settingsDoc.id, ...settingsDoc.data() } as Settings;
    } catch (error) {
      console.error('Error al obtener configuraciones:', error);
      throw error;
    }
  },

  async updateSettings(settings: Partial<Settings>): Promise<Settings> {
    try {
      const settingsRef = doc(db, 'settings', 'marketplace');
      await updateDoc(settingsRef, settings);
      return { id: 'marketplace', ...settings } as Settings;
    } catch (error) {
      console.error('Error al actualizar configuraciones:', error);
      throw error;
    }
  },
};
