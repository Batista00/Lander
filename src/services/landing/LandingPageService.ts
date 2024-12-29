import { db } from '@/firebase/config';
import { collection, doc, getDoc, setDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { LandingPage } from '@/types/landing';

class LandingPageService {
  private collection = collection(db, 'landingPages');

  async getLandingPages(userId: string): Promise<LandingPage[]> {
    const q = query(this.collection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data() as LandingPage;
      // Convertir los timestamps de Firestore a Date
      return {
        ...data,
        createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt),
        updatedAt: data.updatedAt instanceof Date ? data.updatedAt : new Date(data.updatedAt),
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined
      };
    });
  }

  async getLandingPage(id: string): Promise<LandingPage> {
    const docRef = doc(this.collection, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      throw new Error('Landing page not found');
    }

    const data = docSnap.data() as LandingPage;
    return {
      ...data,
      createdAt: data.createdAt instanceof Date ? data.createdAt : new Date(data.createdAt),
      updatedAt: data.updatedAt instanceof Date ? data.updatedAt : new Date(data.updatedAt),
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined
    };
  }

  async createLandingPage(landingPage: LandingPage): Promise<void> {
    const docRef = doc(this.collection, landingPage.id);
    await setDoc(docRef, {
      ...landingPage,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  async updateLandingPage(id: string, updates: Partial<LandingPage>): Promise<void> {
    const docRef = doc(this.collection, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date()
    });
  }
}

export const landingPageService = new LandingPageService();
