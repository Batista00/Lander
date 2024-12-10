import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  getDoc,
  orderBy,
  limit,
  Timestamp,
  DocumentReference,
} from 'firebase/firestore';
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

// Templates
export const getTemplates = async (category?: string) => {
  try {
    let q = query(
      collection(db, 'templates'),
      orderBy('createdAt', 'desc')
    );

    if (category) {
      q = query(q, where('category', '==', category));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Template[];
  } catch (error) {
    console.error('Error al obtener los templates:', error);
    throw error;
  }
};

export const getTemplateById = async (id: string) => {
  try {
    const docRef = doc(db, 'templates', id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      console.error('Error: Template no encontrado');
      return null;
    }
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as Template;
  } catch (error) {
    console.error('Error al obtener el template:', error);
    throw error;
  }
};

export const createTemplate = async (template: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'templates'), {
      ...template,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error al crear el template:', error);
    throw error;
  }
};

export const updateTemplate = async (id: string, template: Partial<Template>) => {
  try {
    const docRef = doc(db, 'templates', id);
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
    await deleteDoc(doc(db, 'templates', id));
  } catch (error) {
    console.error('Error al eliminar el template:', error);
    throw error;
  }
};

// Analytics
export const getSellerAnalytics = async (userId: string) => {
  try {
    // Get templates count
    const templatesQuery = query(
      collection(db, 'templates'),
      where('sellerId', '==', userId)
    );
    const templatesSnapshot = await getDocs(templatesQuery);
    const totalTemplates = templatesSnapshot.size;

    // Get orders count and total sales
    const ordersQuery = query(
      collection(db, 'orders'),
      where('sellerId', '==', userId)
    );
    const ordersSnapshot = await getDocs(ordersQuery);
    let totalSales = 0;
    ordersSnapshot.forEach(doc => {
      const data = doc.data();
      totalSales += data.amount || 0;
    });

    return {
      totalTemplates,
      totalOrders: ordersSnapshot.size,
      totalSales
    };
  } catch (error) {
    console.error('Error al obtener analíticas:', error);
    throw error;
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
    const storageRef = ref(storage, `templates/${templateId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error('Error al subir archivo:', error);
    throw error;
  }
};
