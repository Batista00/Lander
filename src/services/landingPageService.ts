import { db } from '@/firebase/config';
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
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { LandingPage } from '@/types/landing';

class LandingPageService {
  private collection = collection(db, 'landingPages');

  async getLandingPages(userId: string): Promise<LandingPage[]> {
    try {
      const q = query(
        this.collection,
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate()
      })) as LandingPage[];
    } catch (error) {
      console.error('Error getting landing pages:', error);
      throw error;
    }
  }

  async getLandingPage(id: string): Promise<LandingPage> {
    try {
      const docRef = doc(this.collection, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Landing page not found');
      }

      return {
        ...docSnap.data(),
        id: docSnap.id,
        createdAt: docSnap.data().createdAt?.toDate(),
        updatedAt: docSnap.data().updatedAt?.toDate()
      } as LandingPage;
    } catch (error) {
      console.error('Error getting landing page:', error);
      throw error;
    }
  }

  async createLandingPage(landingPage: Omit<LandingPage, 'id'>): Promise<LandingPage> {
    try {
      const docRef = await addDoc(this.collection, {
        ...landingPage,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      return {
        ...landingPage,
        id: docRef.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } catch (error) {
      console.error('Error creating landing page:', error);
      throw error;
    }
  }

  async updateLandingPage(id: string, landingPage: Partial<LandingPage>): Promise<void> {
    try {
      const docRef = doc(this.collection, id);
      await updateDoc(docRef, {
        ...landingPage,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating landing page:', error);
      throw error;
    }
  }

  async deleteLandingPage(id: string): Promise<void> {
    try {
      const docRef = doc(this.collection, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting landing page:', error);
      throw error;
    }
  }

  async publishLandingPage(id: string): Promise<void> {
    try {
      const docRef = doc(this.collection, id);
      await updateDoc(docRef, {
        status: 'published',
        publishedUrl: `${window.location.origin}/landing/${id}`,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error publishing landing page:', error);
      throw error;
    }
  }

  async duplicateLandingPage(id: string): Promise<LandingPage> {
    try {
      // 1. Obtener la landing page original
      const original = await this.getLandingPage(id);
      
      // 2. Preparar la nueva landing page
      const newLandingPage: Omit<LandingPage, 'id'> = {
        ...original,
        name: `${original.name} (Copia)`,
        status: 'draft',
        publishedAt: undefined,
        components: original.components.map(comp => ({
          ...comp,
          id: crypto.randomUUID() // Nuevos IDs para los componentes
        }))
      };

      // 3. Crear la nueva landing page
      return await this.createLandingPage(newLandingPage);
    } catch (error) {
      console.error('Error duplicating landing page:', error);
      throw error;
    }
  }
}

export const landingPageService = new LandingPageService();
