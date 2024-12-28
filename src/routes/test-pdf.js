import express from 'express';
import { generatePDF } from '../services/pdfGenerator.js';

const router = express.Router();

router.get('/test-pdf', async (_req, res) => {
  try {
    // Datos de prueba para la factura
    const testInvoice = {
      invoiceNumber: 'INV-001',
      date: new Date().toISOString(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      customerDetails: {
        name: 'Cliente de Prueba',
        address: 'Calle Ejemplo 123',
        email: 'cliente@ejemplo.com',
        phone: '+1234567890'
      },
      items: [
        {
          description: 'Producto 1',
          quantity: 2,
          unitPrice: 100,
          total: 200
        },
        {
          description: 'Producto 2',
          quantity: 1,
          unitPrice: 150,
          total: 150
        }
      ],
      subtotal: 350,
      tax: 35,
      total: 385,
      notes: 'Gracias por su compra'
    };

    const pdfBuffer = await generatePDF(testInvoice);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=test-invoice.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generando PDF:', error);
    res.status(500).json({ 
      message: 'Error generando PDF',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
