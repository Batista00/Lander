import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { urlCache } from './urlCache';

export async function uploadInvoicePDF(
  userId: string,
  invoiceNumber: string,
  pdfBuffer: Buffer
): Promise<string> {
  try {
    // Crear una referencia al archivo en Storage
    const invoicePath = `invoices/${userId}/${invoiceNumber}.pdf`;
    const storageRef = ref(storage, invoicePath);

    // Subir el archivo
    await uploadBytes(storageRef, pdfBuffer);

    // Obtener la URL de descarga
    const downloadURL = await getDownloadURL(storageRef);
    
    // Guardar en caché
    const cacheKey = `invoice_${userId}_${invoiceNumber}`;
    urlCache.set(cacheKey, downloadURL);

    return downloadURL;
  } catch (error) {
    console.error('Error al subir factura:', error);
    throw error;
  }
}

export async function getInvoiceDownloadUrl(
  userId: string,
  invoiceNumber: string
): Promise<string> {
  try {
    const cacheKey = `invoice_${userId}_${invoiceNumber}`;
    
    // Intentar obtener del caché
    const cachedUrl = urlCache.get(cacheKey);
    if (cachedUrl) {
      return cachedUrl;
    }

    // Si no está en caché, obtener de Firebase
    const invoicePath = `invoices/${userId}/${invoiceNumber}.pdf`;
    const storageRef = ref(storage, invoicePath);
    const downloadURL = await getDownloadURL(storageRef);
    
    // Guardar en caché
    urlCache.set(cacheKey, downloadURL);
    
    return downloadURL;
  } catch (error) {
    console.error('Error al obtener URL de descarga:', error);
    throw error;
  }
}
