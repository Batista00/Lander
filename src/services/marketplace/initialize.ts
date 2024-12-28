import { collection, getDocs, writeBatch, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { sampleTemplates } from './sample-templates';

export const initializeMarketplace = async () => {
  try {
    // Primero limpiamos la colección existente
    const templatesRef = collection(db, 'marketplace_templates');
    const existingTemplates = await getDocs(templatesRef);
    
    const batch = writeBatch(db);
    existingTemplates.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Ahora añadimos los nuevos templates
    console.log('Añadiendo templates de ejemplo...');
    for (const template of sampleTemplates) {
      await addDoc(collection(db, 'marketplace_templates'), template);
    }
    
    console.log('Templates inicializados correctamente');
    return { success: true, message: 'Templates inicializados correctamente' };
  } catch (error) {
    console.error('Error inicializando templates:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
  }
};
