import { db } from '../lib/firebase';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

interface DomainConfig {
  pageId: string;
  domain: string;
  type: 'custom' | 'subdomain';
  createdAt: Date;
  status: 'active';
}

export const domainService = {
  async setCustomDomain(pageId: string, domain: string): Promise<string> {
    try {
      // Verificar si el dominio ya está en uso
      const domainsRef = collection(db, 'domains');
      const q = query(domainsRef, where('domain', '==', domain));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        throw new Error('Domain already in use');
      }

      // Guardar la configuración del dominio
      const domainRef = doc(db, 'domains', domain);
      await setDoc(domainRef, {
        pageId,
        domain,
        type: 'custom',
        createdAt: new Date(),
        status: 'active'
      });

      return domain;
    } catch (error) {
      console.error('Error setting custom domain:', error);
      throw error;
    }
  },

  async setSubdomain(pageId: string): Promise<string> {
    try {
      // Generar un subdominio único basado en el ID de la página
      const subdomain = `page-${pageId.substring(0, 8)}`;
      
      // Guardar la configuración del subdominio
      const domainRef = doc(db, 'domains', subdomain);
      await setDoc(domainRef, {
        pageId,
        domain: subdomain,
        type: 'subdomain',
        createdAt: new Date(),
        status: 'active'
      });

      return subdomain;
    } catch (error) {
      console.error('Error setting subdomain:', error);
      throw error;
    }
  },

  async getDomainConfig(pageId: string) {
    try {
      const domainsRef = collection(db, 'domains');
      const q = query(domainsRef, where('pageId', '==', pageId));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }

      return querySnapshot.docs[0].data();
    } catch (error) {
      console.error('Error getting domain config:', error);
      throw error;
    }
  }
};
