import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
  DocumentData,
  Timestamp
} from 'firebase/firestore';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { getCurrentUser } from '@/lib/auth';
import { LandingPage } from '@/types/landing';
import { toast } from "@/components/ui/use-toast";

const COLLECTION_NAME = 'landing-pages';

class LandingPageError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'LandingPageError';
  }
}

function convertFirestoreTimestampsToDates(data: any): any {
  if (!data) return data;
  
  if (data instanceof Timestamp) {
    return data.toDate();
  }
  
  if (Array.isArray(data)) {
    return data.map(item => convertFirestoreTimestampsToDates(item));
  }
  
  if (typeof data === 'object') {
    const result: any = {};
    for (const key in data) {
      result[key] = convertFirestoreTimestampsToDates(data[key]);
    }
    return result;
  }
  
  return data;
}

class LandingPageService {
  async getLandingPages(): Promise<LandingPage[]> {
    try {
      const user = getCurrentUser();
      const landingPagesRef = collection(db, COLLECTION_NAME);
      const q = query(landingPagesRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          description: data.description,
          components: data.components,
          status: data.status as 'draft' | 'published',
          userId: data.userId,
          createdAt: convertFirestoreTimestampsToDates(data.createdAt),
          updatedAt: convertFirestoreTimestampsToDates(data.updatedAt),
          publishedAt: data.publishedAt ? convertFirestoreTimestampsToDates(data.publishedAt) : undefined,
          publishConfig: data.publishConfig
        };
      });
    } catch (error) {
      toast.error('Error al cargar', 'No se pudieron obtener las landing pages');
      throw new LandingPageError('Error al obtener las landing pages', 'fetch-failed');
    }
  }

  async getLandingPageById(id: string): Promise<LandingPage | null> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        toast.warning('Página no encontrada', 'La landing page solicitada no existe');
        return null;
      }

      const data = docSnap.data();
      if (!data.components) {
        data.components = [];
      }

      return {
        id: docSnap.id,
        name: data.name,
        description: data.description,
        components: data.components,
        status: data.status as 'draft' | 'published',
        userId: data.userId,
        createdAt: convertFirestoreTimestampsToDates(data.createdAt),
        updatedAt: convertFirestoreTimestampsToDates(data.updatedAt),
        publishedAt: data.publishedAt ? convertFirestoreTimestampsToDates(data.publishedAt) : undefined,
        publishConfig: data.publishConfig
      };
    } catch (error) {
      toast.error('Error al cargar', 'No se pudo obtener la landing page');
      throw new LandingPageError('Error al obtener la landing page', 'fetch-failed');
    }
  }

  async createLandingPage(data: Partial<LandingPage>): Promise<string> {
    try {
      const user = getCurrentUser();
      const landingPageData = {
        ...data,
        userId: user.uid,
        status: 'draft',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        components: data.components || []
      };

      const docRef = await addDoc(collection(db, COLLECTION_NAME), landingPageData);
      toast.success('Página creada', 'La landing page se ha creado correctamente');
      return docRef.id;
    } catch (error) {
      toast.error('Error al crear', 'No se pudo crear la landing page');
      throw new LandingPageError('Error al crear la landing page', 'create-failed');
    }
  }

  async updateLandingPage(id: string, data: Partial<LandingPage>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const updateData = {
        ...data,
        updatedAt: serverTimestamp()
      };

      await updateDoc(docRef, updateData);
    } catch (error) {
      toast.error('Error al actualizar', 'No se pudo actualizar la landing page');
      throw new LandingPageError('Error al actualizar la landing page', 'update-failed');
    }
  }

  async deleteLandingPage(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
      toast.success('Página eliminada', 'La landing page se ha eliminado correctamente');
    } catch (error) {
      toast.error('Error al eliminar', 'No se pudo eliminar la landing page');
      throw new LandingPageError('Error al eliminar la landing page', 'delete-failed');
    }
  }

  async publishLandingPage(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        status: 'published',
        publishedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      toast.success('Página publicada', 'La landing page se ha publicado correctamente');
    } catch (error) {
      toast.error('Error al publicar', 'No se pudo publicar la landing page');
      throw new LandingPageError('Error al publicar la landing page', 'publish-failed');
    }
  }

  async unpublishLandingPage(id: string): Promise<void> {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        status: 'draft',
        updatedAt: serverTimestamp()
      });
      toast.success('Página despublicada', 'La landing page se ha despublicado correctamente');
    } catch (error) {
      toast.error('Error al despublicar', 'No se pudo despublicar la landing page');
      throw new LandingPageError('Error al despublicar la landing page', 'unpublish-failed');
    }
  }

  async duplicateLandingPage(id: string): Promise<string> {
    try {
      const original = await this.getLandingPageById(id);
      if (!original) {
        toast.error('Error al duplicar', 'No se encontró la landing page original');
        throw new LandingPageError('Landing page original no encontrada', 'not-found');
      }

      const duplicateData = {
        name: `${original.name} (copia)`,
        description: original.description,
        components: original.components,
        publishConfig: original.publishConfig
      };

      const newId = await this.createLandingPage(duplicateData);
      toast.success('Página duplicada', 'La landing page se ha duplicado correctamente');
      return newId;
    } catch (error) {
      toast.error('Error al duplicar', 'No se pudo duplicar la landing page');
      throw new LandingPageError('Error al duplicar la landing page', 'duplicate-failed');
    }
  }

  async deleteAsset(assetPath: string): Promise<void> {
    try {
      const storage = getStorage();
      const assetRef = ref(storage, assetPath);
      await deleteObject(assetRef);
      toast.success('Archivo eliminado', 'El archivo se ha eliminado correctamente');
    } catch (error) {
      toast.error('Error al eliminar archivo', 'No se pudo eliminar el archivo');
      throw new LandingPageError('Error al eliminar el archivo', 'delete-asset-failed');
    }
  }

  async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async createFromTemplate(templateId: string): Promise<string> {
    try {
      const user = getCurrentUser();
      if (!user) {
        throw new LandingPageError('Usuario no autenticado', 'auth-required');
      }

      // Obtener el template
      const templateRef = doc(db, 'marketplace_templates', templateId);
      const templateSnap = await getDoc(templateRef);

      if (!templateSnap.exists()) {
        throw new LandingPageError('Template no encontrado', 'template-not-found');
      }

      const template = templateSnap.data();

      // Crear la landing page con los datos del template
      const landingData: Partial<LandingPage> = {
        title: template.title || 'Nueva Landing Page',
        description: template.description || '',
        sections: template.sections || [],
        components: template.components || [],
        status: 'draft',
        userId: user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        templateId: templateId,
        settings: {
          theme: template.theme || 'light',
          layout: template.layout || 'default',
          customCss: template.customCss || '',
          fonts: template.fonts || [],
          metadata: {
            title: template.title || '',
            description: template.description || '',
            keywords: template.keywords || []
          }
        }
      };

      // Crear el documento
      const docRef = await addDoc(collection(db, COLLECTION_NAME), landingData);

      return docRef.id;

    } catch (error) {
      console.error('Error en createFromTemplate:', error);
      if (error instanceof LandingPageError) {
        throw error;
      }
      throw new LandingPageError(
        error instanceof Error ? error.message : 'Error al crear desde template',
        'template-creation-failed'
      );
    }
  }

  async create(data: Partial<LandingPage>): Promise<LandingPage> {
    try {
      const user = getCurrentUser();
      if (!user) {
        throw new LandingPageError('Usuario no autenticado', 'auth-required');
      }

      const landingPagesRef = collection(db, COLLECTION_NAME);
      const landingData = {
        name: data.name || 'Nueva Landing Page',
        description: data.description || '',
        templateId: data.templateId,
        sections: data.sections || [],
        components: data.components || [],
        userId: user.uid,
        status: 'draft',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(landingPagesRef, landingData);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new LandingPageError('Error al crear la landing page', 'create-failed');
      }

      const createdData = docSnap.data();
      return {
        id: docRef.id,
        name: createdData.name,
        description: createdData.description,
        templateId: createdData.templateId,
        sections: createdData.sections || [],
        components: createdData.components || [],
        status: createdData.status,
        userId: createdData.userId,
        createdAt: convertFirestoreTimestampsToDates(createdData.createdAt),
        updatedAt: convertFirestoreTimestampsToDates(createdData.updatedAt),
        publishedAt: null,
        publishConfig: createdData.publishConfig
      };
    } catch (error) {
      console.error('Error en create:', error);
      if (error instanceof LandingPageError) {
        throw error;
      }
      throw new LandingPageError('Error al crear la landing page', 'create-failed');
    }
  }

  async update(id: string, data: Partial<LandingPage>): Promise<LandingPage> {
    // Aquí iría la lógica para actualizar en el backend
    const updatedLanding: LandingPage = {
      ...data,
      id,
      updatedAt: new Date().toISOString()
    } as LandingPage;

    await new Promise(resolve => setTimeout(resolve, 500));
    return updatedLanding;
  }

  async publish(id: string): Promise<LandingPage> {
    // Aquí iría la lógica para publicar en el backend
    const publishedLanding: LandingPage = {
      id,
      status: 'published',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    } as LandingPage;

    await new Promise(resolve => setTimeout(resolve, 500));
    return publishedLanding;
  }

  async get(id: string): Promise<LandingPage> {
    // Aquí iría la lógica para obtener del backend
    await new Promise(resolve => setTimeout(resolve, 500));
    throw new Error('Landing page not found');
  }
}

export const landingPageService = new LandingPageService();
