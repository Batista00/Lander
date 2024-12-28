import { collection, query, where, getDocs, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { sendCampaign } from './email';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// Función para autenticar como servicio
async function authenticateAsService() {
  try {
    console.log('Intentando autenticar como servicio...');
    const result = await signInWithEmailAndPassword(
      auth, 
      'service@lander.com', 
      import.meta.env.VITE_SERVICE_PASSWORD || ''
    );
    console.log('Autenticación exitosa como servicio:', result.user.email);
    return result.user;
  } catch (error) {
    console.error('Error authenticating as service:', error);
    throw error;
  }
}

// Función para procesar la cola de emails
export async function processEmailQueue() {
  let serviceUser;
  try {
    console.log('Iniciando procesamiento de cola de emails...');
    
    // Autenticar como servicio
    serviceUser = await authenticateAsService();
    console.log('Servicio autenticado como:', serviceUser.email);

    // Esperar un momento para asegurar que la autenticación se propague
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Obtener campañas programadas que deben enviarse
    const now = new Date();
    console.log('Buscando campañas programadas antes de:', now);
    
    const campaignsQuery = query(
      collection(db, 'campaigns'),
      where('status', '==', 'scheduled'),
      where('schedule.type', '==', 'scheduled'),
      where('schedule.date', '<=', now)
    );

    const snapshot = await getDocs(campaignsQuery);
    console.log('Campañas encontradas:', snapshot.size);
    
    // Procesar cada campaña
    const sendPromises = snapshot.docs.map(async (campaignDoc) => {
      const campaignId = campaignDoc.id;
      const campaign = campaignDoc.data();
      console.log('Procesando campaña:', campaignId, campaign.name);
      
      try {
        await sendCampaign(campaignId);
        console.log('Campaña enviada exitosamente:', campaignId);
      } catch (error) {
        console.error(`Error processing campaign ${campaignId}:`, error);
        
        // Actualizar estado a error
        await updateDoc(doc(db, 'campaigns', campaignId), {
          status: 'error',
          error: error.message,
          updatedAt: new Date()
        });
      }
    });

    await Promise.all(sendPromises);
    console.log('Procesamiento de cola completado');

  } catch (error) {
    console.error('Error processing email queue:', error);
  }
}

// Función para programar una campaña
export async function scheduleCampaign(campaignId: string, date: Date) {
  console.log('Programando campaña:', campaignId, 'para:', date);
  await updateDoc(doc(db, 'campaigns', campaignId), {
    status: 'scheduled',
    'schedule.type': 'scheduled',
    'schedule.date': date,
    updatedAt: new Date()
  });
  console.log('Campaña programada exitosamente');
}

// Función para cancelar una campaña programada
export async function cancelScheduledCampaign(campaignId: string) {
  console.log('Cancelando campaña programada:', campaignId);
  await updateDoc(doc(db, 'campaigns', campaignId), {
    status: 'draft',
    'schedule.type': 'immediate',
    'schedule.date': null,
    updatedAt: new Date()
  });
  console.log('Campaña cancelada exitosamente');
}

// Configurar el intervalo para procesar la cola
export function startEmailQueueProcessor(intervalMinutes = 1) {
  console.log('Iniciando procesador de cola con intervalo de', intervalMinutes, 'minutos');
  
  // Procesar la cola cada X minutos
  const interval = setInterval(processEmailQueue, intervalMinutes * 60 * 1000);
  
  // Procesar inmediatamente al iniciar
  processEmailQueue();
  
  // Retornar función para limpiar el intervalo
  return () => {
    console.log('Deteniendo procesador de cola');
    clearInterval(interval);
  };
}
