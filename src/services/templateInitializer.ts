import { db } from '../lib/firebase';
import { collection, doc, setDoc, getDocs, getDoc } from 'firebase/firestore';
import { FREE_TEMPLATES, PREMIUM_TEMPLATES } from '../data/templates';

export const initializeTemplates = async () => {
  try {
    // Verificar si los templates existen en Firestore
    const templatesCollection = collection(db, 'marketplace_templates');
    
    // Verificar si al menos un template de cada tipo existe
    const sampleFreeTemplate = doc(templatesCollection, FREE_TEMPLATES[0].id);
    const samplePremiumTemplate = doc(templatesCollection, PREMIUM_TEMPLATES[0].id);
    
    const [freeDoc, premiumDoc] = await Promise.all([
      getDoc(sampleFreeTemplate),
      getDoc(samplePremiumTemplate)
    ]);
    
    if (!freeDoc.exists() || !premiumDoc.exists()) {
      // Si faltan templates, inicializar con los templates predefinidos
      const allTemplates = [...FREE_TEMPLATES, ...PREMIUM_TEMPLATES];
      
      // Crear un batch de promesas para subir todos los templates
      const uploadPromises = allTemplates.map(template => {
        const docRef = doc(templatesCollection, template.id);
        return setDoc(docRef, {
          ...template,
          components: template.components || [], // Asegurarnos que components existe
          createdAt: new Date(),
          updatedAt: new Date()
        });
      });
      
      // Esperar a que todos los templates se suban
      await Promise.all(uploadPromises);
      
      console.log('Templates inicializados correctamente');
      return true;
    } else {
      console.log('Los templates ya están inicializados');
      return false;
    }
  } catch (error) {
    console.error('Error inicializando templates:', error);
    throw error;
  }
};
