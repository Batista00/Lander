import axios from 'axios';
import { db } from '../config/firebase-admin';

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(payload: EmailPayload) {
  try {
    const formData = new FormData();
    formData.append('form-name', 'contact');
    formData.append('to', payload.to);
    formData.append('subject', payload.subject);
    formData.append('html', payload.html);

    await axios.post(process.env.NETLIFY_FORMS_ENDPOINT || '', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

interface PaymentConfirmation {
  planId: string;
  amount: number;
  date: string;
}

export async function sendPaymentConfirmationEmail(userId: string, payment: PaymentConfirmation) {
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    const user = userDoc.data();
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #6366F1 0%, #4F46E5 100%);
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: #fff;
              padding: 20px;
              border: 1px solid #e5e7eb;
              border-radius: 0 0 8px 8px;
            }
            .details {
              background: #f9fafb;
              padding: 15px;
              border-radius: 6px;
              margin: 15px 0;
            }
            .button {
              display: inline-block;
              background: #4F46E5;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 6px;
              margin: 15px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Pago Confirmado!</h1>
            </div>
            <div class="content">
              <p>Hola ${user?.name},</p>
              <p>Tu pago ha sido procesado exitosamente. Aquí están los detalles:</p>
              
              <div class="details">
                <p><strong>Plan:</strong> ${payment.planId}</p>
                <p><strong>Monto:</strong> $${payment.amount}</p>
                <p><strong>Fecha:</strong> ${new Date(payment.date).toLocaleDateString()}</p>
              </div>

              <p>Ya puedes comenzar a disfrutar de todos los beneficios de tu plan.</p>
              
              <a href="${process.env.FRONTEND_URL}/dashboard" class="button">
                Ir al Dashboard
              </a>

              <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
              
              <p>¡Gracias por confiar en nosotros!</p>
              <p>El equipo de Landing</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await sendEmail({
      to: user?.email,
      subject: '¡Pago Confirmado! - Landing',
      html,
    });
  } catch (error) {
    console.error('Error sending payment confirmation email:', error);
    throw new Error('Failed to send payment confirmation email');
  }
}
