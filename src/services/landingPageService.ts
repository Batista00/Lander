import { v4 as uuidv4 } from 'uuid';
import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { useAuthStore } from '@/store/auth';

interface Component {
  id: string;
  type: string;
  data: Record<string, any>;
  order: number;
  visible?: boolean;
}

interface LandingPage {
  id?: string;
  name: string;
  components: Component[];
  published: boolean;
  publishedUrl?: string;
  userId: string;
  customDomain?: string;
  createdAt: Date;
  updatedAt: Date;
  theme?: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  devicePreview?: string;
  status?: 'draft' | 'published' | 'archived';
  thumbnail?: string;
}

interface DomainValidation {
  isValid: boolean;
  error?: string;
}

interface UserPlan {
  isPremium: boolean;
  expiresAt?: Date;
}

class LandingPageError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'LandingPageError';
  }
}

const COLLECTION_NAME = 'landing_pages';
const COLLECTION_DOMAINS = 'domains';

function getCurrentUser() {
  const { user } = useAuthStore.getState();
  if (!user?.uid && !user?.id) {
    console.error('Usuario no autenticado:', user);
    throw new LandingPageError('Usuario no autenticado', 'auth/not-authenticated');
  }
  return {
    ...user,
    uid: user.uid || user.id
  };
}

const convertTimestampToDate = (timestamp: any): Date => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  if (timestamp instanceof Date) {
    return timestamp;
  }
  if (typeof timestamp === 'number') {
    return new Date(timestamp);
  }
  return new Date();
};

const getUserPlan = async (userId: string): Promise<UserPlan> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists()) {
      return { isPremium: false };
    }

    const userData = userDoc.data();
    return {
      isPremium: userData.isPremium || false,
      expiresAt: userData.premiumExpiresAt ? new Date(userData.premiumExpiresAt) : undefined
    };
  } catch (error) {
    console.error('Error al obtener el plan del usuario:', error);
    return { isPremium: false };
  }
};

const generatePublicUrl = (pageId: string, customDomain?: string): string => {
  if (customDomain) {
    return `https://${customDomain}`;
  }
  return `${import.meta.env.VITE_PUBLIC_URL}/p/${pageId}`;
};

const validateDomain = async (domain: string): Promise<DomainValidation> => {
  try {
    if (!domain) {
      return { isValid: false, error: 'El dominio es requerido' };
    }

    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
    if (!domainRegex.test(domain)) {
      return { 
        isValid: false, 
        error: 'El formato del dominio no es válido' 
      };
    }

    const domainsRef = collection(db, COLLECTION_DOMAINS);
    const q = query(domainsRef, where('domain', '==', domain));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { 
        isValid: false, 
        error: 'El dominio ya está en uso' 
      };
    }

    const user = getCurrentUser();
    const userPlan = await getUserPlan(user.uid);

    if (!userPlan.isPremium) {
      return { 
        isValid: false, 
        error: 'Necesitas una cuenta premium para usar dominios personalizados' 
      };
    }

    return { isValid: true };
  } catch (error) {
    console.error('Error al validar el dominio:', error);
    return { 
      isValid: false, 
      error: 'Error al validar el dominio' 
    };
  }
};

const getLandingPageById = async (id: string): Promise<LandingPage | null> => {
  try {
    console.log('Obteniendo landing page por ID:', id);
    if (!id) {
      console.error('ID no proporcionado');
      throw new LandingPageError('ID no proporcionado', 'invalid-id');
    }

    const user = getCurrentUser();
    console.log('Usuario actual:', user.uid);

    const docRef = doc(db, COLLECTION_NAME, id);
    console.log('Referencia del documento:', docRef.path);

    const docSnap = await getDoc(docRef);
    console.log('¿Existe el documento?:', docSnap.exists());

    if (!docSnap.exists()) {
      console.error('Landing page no encontrada');
      throw new LandingPageError('Landing page no encontrada', 'not-found');
    }

    const data = docSnap.data();
    console.log('Datos obtenidos:', data);

    if (!data) {
      console.error('Datos de landing page no válidos');
      throw new LandingPageError('Datos de landing page no válidos', 'invalid-data');
    }

    // Verificar que la landing page pertenece al usuario actual
    if (data.userId !== user.uid) {
      console.error('Usuario no autorizado');
      throw new LandingPageError('No tienes permiso para acceder a esta landing page', 'permission-denied');
    }

    const landingPage: LandingPage = {
      ...data,
      id: docSnap.id,
      createdAt: convertTimestampToDate(data.createdAt),
      updatedAt: convertTimestampToDate(data.updatedAt),
      components: data.components || [],
      theme: data.theme || {
        primary: '#3B82F6',
        secondary: '#10B981',
        background: '#FFFFFF',
        text: '#1F2937'
      },
      status: data.status || 'draft',
      thumbnail: data.thumbnail || generateThumbnail(data.components)
    };

    console.log('Landing page procesada:', landingPage);
    return landingPage;
  } catch (error) {
    console.error('Error detallado al obtener la landing page:', {
      error,
      message: error.message,
      code: error.code,
      stack: error.stack
    });

    if (error instanceof LandingPageError) {
      throw error;
    }
    throw new LandingPageError('Error al obtener la landing page', 'unknown-error');
  }
};

const getLandingPageByDomain = async (domain: string): Promise<LandingPage | null> => {
  try {
    const domainsRef = collection(db, COLLECTION_DOMAINS);
    const q = query(domainsRef, where('domain', '==', domain));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const domainDoc = querySnapshot.docs[0];
    const { landingPageId } = domainDoc.data();

    return getLandingPageById(landingPageId);
  } catch (error) {
    console.error('Error al obtener la landing page por dominio:', error);
    throw new LandingPageError('Error al obtener la landing page', 'unknown-error');
  }
};

const publishLandingPage = async (
  id: string, 
  domainType: 'default' | 'custom', 
  customDomain?: string
): Promise<LandingPage | null> => {
  try {
    const user = getCurrentUser();
    const pageRef = doc(db, COLLECTION_NAME, id);
    const pageDoc = await getDoc(pageRef);

    if (!pageDoc.exists()) {
      throw new Error('Landing page not found');
    }

    const pageData = pageDoc.data() as LandingPage;
    const publishedUrl = customDomain || `${window.location.origin}/p/${id}`;

    const updatedData = {
      ...pageData,
      published: true,
      publishedUrl,
      customDomain: customDomain || null,
      updatedAt: serverTimestamp(),
      status: 'published'
    };

    await updateDoc(pageRef, updatedData);

    return updatedData;
  } catch (error) {
    console.error('Error publishing landing page:', error);
    throw error;
  }
};

const unpublishLandingPage = async (id: string): Promise<LandingPage | null> => {
  try {
    const user = getCurrentUser();
    const landingPage = await getLandingPageById(id);

    if (!landingPage) {
      throw new LandingPageError('La landing page no existe', 'not-found');
    }

    if (landingPage.userId !== user.uid) {
      throw new LandingPageError('No tienes permiso para despublicar esta landing page', 'permission-denied');
    }

    if (landingPage.customDomain) {
      const domainsRef = collection(db, COLLECTION_DOMAINS);
      const q = query(domainsRef, where('domain', '==', landingPage.customDomain));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const domainDoc = querySnapshot.docs[0];
        await deleteDoc(domainDoc.ref);
      }
    }

    const updateData = {
      published: false,
      publishedUrl: null,
      customDomain: null,
      updatedAt: serverTimestamp()
    };

    return updateLandingPage(id, updateData);
  } catch (error) {
    if (error instanceof LandingPageError) {
      throw error;
    }
    console.error('Error al despublicar la landing page:', error);
    throw new LandingPageError('Error al despublicar la landing page', 'unknown-error');
  }
};

const sanitizeComponent = (component: any) => {
  const sanitized: any = {};
  
  // Only include non-undefined values
  Object.keys(component).forEach(key => {
    if (component[key] !== undefined) {
      if (key === 'data' && typeof component[key] === 'object') {
        sanitized[key] = sanitizeData(component[key]);
      } else {
        sanitized[key] = component[key];
      }
    }
  });
  
  return sanitized;
};

const sanitizeData = (data: any) => {
  const sanitized: any = {};
  
  Object.keys(data).forEach(key => {
    if (data[key] !== undefined) {
      if (typeof data[key] === 'object' && data[key] !== null) {
        sanitized[key] = sanitizeData(data[key]);
      } else {
        sanitized[key] = data[key];
      }
    }
  });
  
  return sanitized;
};

const updateLandingPage = async (
  id: string,
  data: Partial<LandingPage>
): Promise<LandingPage | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new LandingPageError('Landing page no encontrada', 'not-found');
    }

    // Sanitize components before update
    const updatedComponents = data.components?.map(component => 
      sanitizeComponent(component)
    ) || [];

    const updateData = {
      ...sanitizeData(data),
      components: updatedComponents,
      updatedAt: serverTimestamp()
    };

    console.log('Actualizando landing page:', {
      id,
      updateData: {
        ...updateData,
        components: updatedComponents.map(c => ({
          id: c.id,
          type: c.type,
          data: c.data
        }))
      }
    });

    await updateDoc(docRef, updateData);

    // Obtener los datos actualizados
    const updatedDoc = await getDoc(docRef);
    const updatedData = updatedDoc.data() as LandingPage;

    return {
      ...updatedData,
      id,
      components: updatedComponents,
      createdAt: convertTimestampToDate(updatedData.createdAt),
      updatedAt: convertTimestampToDate(updatedData.updatedAt)
    };
  } catch (error) {
    if (error instanceof LandingPageError) {
      throw error;
    }
    console.error('Error al actualizar la landing page:', error);
    throw new LandingPageError('Error al actualizar la landing page', 'unknown-error');
  }
};

const generateThumbnail = (components: any[]): string => {
  // Por ahora, retornamos una imagen por defecto
  return '/placeholder-landing.jpg';
};

const getPublishedPage = async (id: string): Promise<LandingPage | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new LandingPageError('Página no encontrada', 'not-found');
    }

    const data = docSnap.data();
    if (!data.published) {
      throw new LandingPageError('Esta página no está publicada', 'not-published');
    }

    return {
      components: data.components || [],
      settings: data.settings || {},
    };
  } catch (error) {
    console.error('Error al obtener la página publicada:', error);
    throw error;
  }
};

export const landingPageService = {
  async getAllLandingPages(): Promise<LandingPage[]> {
    try {
      const user = getCurrentUser();
      const landingsRef = collection(db, COLLECTION_NAME);
      
      // Primero obtenemos los documentos por userId
      const q = query(
        landingsRef, 
        where('userId', '==', user.uid)
      );
      
      console.log('Buscando landings para usuario:', user.uid);
      const querySnapshot = await getDocs(q);
      console.log('Landings encontradas:', querySnapshot.size);
      
      // Ordenamos los resultados en memoria
      const landings = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || 'Sin título',
          components: data.components || [],
          devicePreview: data.devicePreview || 'desktop',
          published: data.published || false,
          publishedUrl: data.publishedUrl || '',
          createdAt: convertTimestampToDate(data.createdAt),
          updatedAt: convertTimestampToDate(data.updatedAt),
          userId: data.userId,
          customDomain: data.customDomain || '',
          status: data.status || 'draft',
          thumbnail: data.thumbnail || generateThumbnail(data.components)
        };
      });

      // Ordenar por updatedAt de forma descendente
      return landings.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    } catch (error) {
      console.error('Error al obtener landing pages:', error);
      throw error;
    }
  },

  getLandingPageById,
  getLandingPageByDomain,

  async createLandingPage(name: string): Promise<LandingPage | null> {
    try {
      const user = getCurrentUser();
      console.log('Creando landing page para usuario:', user.uid);

      const newLanding: LandingPage = {
        name,
        components: [],
        published: false,
        userId: user.uid,
        createdAt: new Date(),
        updatedAt: new Date(),
        theme: {
          primary: '#3B82F6',
          secondary: '#10B981',
          background: '#FFFFFF',
          text: '#1F2937'
        },
        status: 'draft',
        thumbnail: generateThumbnail([])
      };

      const docRef = doc(collection(db, COLLECTION_NAME));
      await setDoc(docRef, {
        ...newLanding,
        id: docRef.id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      console.log('Landing page creada con ID:', docRef.id);
      return {
        ...newLanding,
        id: docRef.id
      };
    } catch (error) {
      console.error('Error al crear landing page:', error);
      throw error;
    }
  },

  updateLandingPage,

  async deleteLandingPage(id: string): Promise<boolean> {
    try {
      const user = getCurrentUser();
      const landingPage = await getLandingPageById(id);

      if (!landingPage) {
        throw new LandingPageError('La landing page no existe', 'not-found');
      }

      if (landingPage.userId !== user.uid) {
        throw new LandingPageError('No tienes permiso para eliminar esta landing page', 'permission-denied');
      }

      if (landingPage.published) {
        await unpublishLandingPage(id);
      }

      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return true;
    } catch (error) {
      if (error instanceof LandingPageError) {
        throw error;
      }
      console.error('Error al eliminar la landing page:', error);
      throw new LandingPageError('Error al eliminar la landing page', 'unknown-error');
    }
  },

  publishLandingPage,
  unpublishLandingPage,
  validateDomain,
  getUserPlan,
  getPublishedPage
};
