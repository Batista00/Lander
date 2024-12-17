import { db, auth } from '../lib/firebase';
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
import { v4 as uuidv4 } from 'uuid';
import { domainService } from './domainService';

const COLLECTION_NAME = 'landing_pages';
const COLLECTION_DOMAINS = 'domains';

interface LandingPage {
  id: string;
  name: string;
  components: any[];
  status: 'draft' | 'published' | 'archived';
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  publishConfig?: {
    domain?: string;
    subdomain?: string;
    url: string;
  };
}

class LandingPageError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'LandingPageError';
  }
}

function getCurrentUser() {
  const user = auth.currentUser;
  if (!user) {
    throw new LandingPageError('Usuario no autenticado', 'auth/not-authenticated');
  }
  return user;
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

const generateThumbnail = (components: any[]): string => {
  return '/placeholder-landing.jpg';
};

const generatePublicUrl = (pageId: string, customDomain?: string): string => {
  if (customDomain) {
    return `https://${customDomain}`;
  }
  return `${window.location.origin}/p/${pageId}`;
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

const sanitizeComponent = (component: any) => {
  const sanitized: any = {};
  
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

export const landingPageService = {
  async getAllLandingPages() {
    try {
      const user = getCurrentUser();
      const landingsRef = collection(db, COLLECTION_NAME);
      
      const q = query(
        landingsRef, 
        where('userId', '==', user.uid)
      );
      
      console.log('Buscando landings para usuario:', user.uid);
      const querySnapshot = await getDocs(q);
      console.log('Landings encontradas:', querySnapshot.size);
      
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

      return landings.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
    } catch (error) {
      console.error('Error al obtener landing pages:', error);
      throw error;
    }
  },

  async createLandingPage(name: string, template?: any) {
    try {
      const user = getCurrentUser();
      console.log('Creando landing page para usuario:', user.uid);

      const newLanding = {
        name,
        title: name,
        components: template?.components ? template.components.map((comp: any) => ({
          ...comp,
          id: uuidv4() // Asegurarnos de que cada componente tenga un ID único
        })) : [],
        published: false,
        userId: user.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        theme: {
          primary: '#3B82F6',
          secondary: '#10B981',
          background: '#FFFFFF',
          text: '#1F2937'
        },
        status: 'draft',
        template: template?.id || null,
        thumbnail: generateThumbnail(template?.components || [])
      };

      const docRef = doc(collection(db, COLLECTION_NAME));
      await setDoc(docRef, {
        ...newLanding,
        id: docRef.id
      });

      console.log('Landing page creada con ID:', docRef.id);
      return {
        ...newLanding,
        id: docRef.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } catch (error) {
      console.error('Error al crear landing page:', error);
      throw error;
    }
  },

  async getLandingPageById(id: string) {
    try {
      const user = getCurrentUser();
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new LandingPageError('Landing page no encontrada', 'not-found');
      }

      const data = docSnap.data();
      if (!data) {
        throw new LandingPageError('Datos de landing page no válidos', 'invalid-data');
      }

      if (data.userId !== user.uid) {
        throw new LandingPageError('No tienes permiso para acceder a esta landing page', 'permission-denied');
      }

      return {
        ...data,
        id: docSnap.id,
        createdAt: convertTimestampToDate(data.createdAt),
        updatedAt: convertTimestampToDate(data.updatedAt)
      };
    } catch (error) {
      console.error('Error al obtener landing page:', error);
      throw error;
    }
  },

  async updateLandingPage(id: string, data: any) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new LandingPageError('Landing page no encontrada', 'not-found');
      }

      const updateData = {
        ...sanitizeData(data),
        updatedAt: serverTimestamp()
      };

      await updateDoc(docRef, updateData);

      const updatedDoc = await getDoc(docRef);
      const updatedData = updatedDoc.data();

      return {
        ...updatedData,
        id,
        createdAt: convertTimestampToDate(updatedData.createdAt),
        updatedAt: convertTimestampToDate(updatedData.updatedAt)
      };
    } catch (error) {
      console.error('Error al actualizar landing page:', error);
      throw error;
    }
  },

  async deleteLandingPage(id: string) {
    try {
      const user = getCurrentUser();
      const landingPage = await this.getLandingPageById(id);

      if (!landingPage) {
        throw new LandingPageError('La landing page no existe', 'not-found');
      }

      if (landingPage.userId !== user.uid) {
        throw new LandingPageError('No tienes permiso para eliminar esta landing page', 'permission-denied');
      }

      if (landingPage.published) {
        await this.unpublishLandingPage(id);
      }

      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return true;
    } catch (error) {
      console.error('Error al eliminar landing page:', error);
      throw error;
    }
  },

  async publishLandingPage(id: string, customDomain?: string): Promise<string> {
    const page = await this.getLandingPage(id);
    if (!page) {
      throw new Error('Page not found');
    }

    let domain: string;
    let url: string;

    if (customDomain) {
      // Configurar dominio personalizado
      const domainResult = await domainService.setCustomDomain(id, customDomain);
      domain = customDomain;
      url = `https://${customDomain}`;
    } else {
      // Generar subdominio automático
      const subdomain = await domainService.setSubdomain(id);
      domain = subdomain;
      url = `https://${subdomain}.tudominio.com`;
    }

    // Actualizar la landing page con la información de publicación
    await this.updateLandingPage(id, {
      status: 'published',
      publishedAt: new Date(),
      publishConfig: {
        domain,
        url
      }
    });

    return url;
  },

  async unpublishLandingPage(id: string) {
    try {
      const user = getCurrentUser();
      const landingPage = await this.getLandingPageById(id);

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

      return this.updateLandingPage(id, updateData);
    } catch (error) {
      console.error('Error al despublicar landing page:', error);
      throw error;
    }
  },

  async validateDomain(domain: string) {
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
      const userPlan = await this.getUserPlan(user.uid);

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
  },

  async getUserPlan(userId: string) {
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
  },

  async getPublishedPage(id: string) {
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
  },

  async getLandingPageByDomain(domain: string) {
    try {
      const domainsRef = collection(db, COLLECTION_DOMAINS);
      const q = query(domainsRef, where('domain', '==', domain));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        return null;
      }

      const domainDoc = querySnapshot.docs[0];
      const { landingPageId } = domainDoc.data();

      return this.getLandingPageById(landingPageId);
    } catch (error) {
      console.error('Error al obtener la landing page por dominio:', error);
      throw error;
    }
  },

  async createLandingPageNew(userId: string, template?: any): Promise<string> {
    const pageId = uuidv4();
    const landingPage: LandingPage = {
      id: pageId,
      name: 'Nueva Landing Page',
      components: template?.components || [],
      status: 'draft',
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await setDoc(doc(db, COLLECTION_NAME, pageId), landingPage);
    return pageId;
  },

  async getLandingPageNew(id: string): Promise<LandingPage | null> {
    const pageRef = doc(db, COLLECTION_NAME, id);
    const pageSnap = await getDoc(pageRef);
    
    if (!pageSnap.exists()) {
      return null;
    }

    return pageSnap.data() as LandingPage;
  },

  async updateLandingPageNew(id: string, data: Partial<LandingPage>): Promise<void> {
    const pageRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(pageRef, {
      ...data,
      updatedAt: new Date()
    });
  },

  async publishLandingPageNew(id: string, customDomain?: string): Promise<string> {
    const page = await this.getLandingPageNew(id);
    if (!page) {
      throw new Error('Page not found');
    }

    let domain: string;
    let url: string;

    if (customDomain) {
      // Configurar dominio personalizado
      await domainService.setCustomDomain(id, customDomain, page.userId);
      domain = customDomain;
      url = `https://${customDomain}`;
    } else {
      // Generar subdominio automático
      const subdomain = await domainService.setSubdomain(id, page.userId);
      domain = subdomain;
      url = `https://${subdomain}.tudominio.com`;
    }

    // Actualizar la landing page con la información de publicación
    await this.updateLandingPageNew(id, {
      status: 'published',
      publishedAt: new Date(),
      publishConfig: {
        domain,
        url
      }
    });

    return url;
  },

  async getUserLandingPagesNew(userId: string): Promise<LandingPage[]> {
    const pagesRef = collection(db, COLLECTION_NAME);
    const q = query(pagesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => doc.data() as LandingPage);
  },

  async archiveLandingPageNew(id: string): Promise<void> {
    await this.updateLandingPageNew(id, { status: 'archived' });
  }
};
