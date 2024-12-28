import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { sendEmail } from '@/lib/email'; // Necesitaremos implementar esta función

export async function POST(req: Request) {
  try {
    const { to, leadId, formData } = await req.json();

    // Obtener los detalles del lead
    const leadDoc = await getDoc(doc(db, 'leads', leadId));
    if (!leadDoc.exists()) {
      return NextResponse.json(
        { error: 'Lead no encontrado' },
        { status: 404 }
      );
    }

    const lead = leadDoc.data();

    // Enviar email de notificación
    await sendEmail({
      to,
      subject: 'Nuevo Lead Capturado',
      template: 'lead-notification',
      data: {
        leadId,
        formData,
        leadDetails: lead,
        dashboardUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/leads/${leadId}`
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email notification:', error);
    return NextResponse.json(
      { error: 'Error al enviar la notificación por email' },
      { status: 500 }
    );
  }
}
