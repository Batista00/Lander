import { NextApiRequest, NextApiResponse } from 'next';
import { generateInvoicePDF } from '@/services/pdfGenerator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const testInvoice = {
      number: 'TEST-001',
      date: new Date().toISOString(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      billingDetails: {
        name: 'Cliente de Prueba',
        email: 'test@example.com',
        address: 'Calle de Prueba 123'
      },
      items: [
        {
          description: 'Plan Premium',
          quantity: 1,
          price: 99.99
        },
        {
          description: 'Descuento Promocional',
          quantity: 1,
          price: -10.00
        }
      ],
      total: 89.99,
      status: 'paid',
      paymentMethod: 'card'
    };

    const pdfBuffer = await generateInvoicePDF(testInvoice);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=test-invoice.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Error generating PDF', error: String(error) });
  }
}
