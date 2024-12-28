import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Invoice, BillingSettings } from '@/types/billing';
import { generateInvoicePDF } from './pdfGenerator';
import { uploadInvoicePDF, getInvoiceDownloadUrl } from './storage';

export async function getBillingSettings(userId: string): Promise<BillingSettings | null> {
  try {
    const settingsRef = doc(db, 'users', userId, 'billing', 'settings');
    const settingsDoc = await getDocs(settingsRef);
    return settingsDoc.data() as BillingSettings;
  } catch (error) {
    console.error('Error al obtener configuración de facturación:', error);
    return null;
  }
}

export async function updateBillingSettings(
  userId: string,
  settings: Partial<BillingSettings>
): Promise<void> {
  try {
    const settingsRef = doc(db, 'users', userId, 'billing', 'settings');
    await updateDoc(settingsRef, settings);
  } catch (error) {
    console.error('Error al actualizar configuración de facturación:', error);
    throw error;
  }
}

export async function getInvoices(
  userId: string,
  filters?: {
    startDate?: Date;
    endDate?: Date;
    status?: string;
  }
): Promise<Invoice[]> {
  try {
    let invoicesQuery = query(collection(db, 'users', userId, 'invoices'));

    if (filters?.startDate) {
      invoicesQuery = query(invoicesQuery, where('date', '>=', filters.startDate));
    }
    if (filters?.endDate) {
      invoicesQuery = query(invoicesQuery, where('date', '<=', filters.endDate));
    }
    if (filters?.status) {
      invoicesQuery = query(invoicesQuery, where('status', '==', filters.status));
    }

    const querySnapshot = await getDocs(invoicesQuery);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Invoice[];
  } catch (error) {
    console.error('Error al obtener facturas:', error);
    return [];
  }
}

export async function generateInvoice(userId: string, data: Omit<Invoice, 'id'>): Promise<string> {
  try {
    // 1. Crear la factura en Firebase
    const invoiceRef = await addDoc(collection(db, 'users', userId, 'invoices'), {
      ...data,
      createdAt: new Date(),
    });

    // 2. Generar PDF de la factura
    const invoice = { id: invoiceRef.id, ...data };
    const pdfBuffer = await generateInvoicePDF(invoice);

    // 3. Subir PDF a Storage y obtener URL
    const downloadUrl = await uploadInvoicePDF(userId, invoice.number, pdfBuffer);

    // 4. Actualizar factura con URL de descarga
    await updateDoc(invoiceRef, { downloadUrl });

    return invoiceRef.id;
  } catch (error) {
    console.error('Error al generar factura:', error);
    throw error;
  }
}

export async function downloadInvoice(userId: string, invoiceNumber: string): Promise<string> {
  try {
    const downloadUrl = await getInvoiceDownloadUrl(userId, invoiceNumber);
    return downloadUrl;
  } catch (error) {
    console.error('Error al descargar factura:', error);
    throw error;
  }
}
