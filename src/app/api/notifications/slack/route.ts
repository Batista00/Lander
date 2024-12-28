import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const { webhook, leadId, formData } = await req.json();

    // Obtener los detalles del lead
    const leadDoc = await getDoc(doc(db, 'leads', leadId));
    if (!leadDoc.exists()) {
      return NextResponse.json(
        { error: 'Lead no encontrado' },
        { status: 404 }
      );
    }

    const lead = leadDoc.data();

    // Crear el mensaje para Slack
    const message = {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🎯 Nuevo Lead Capturado",
            emoji: true
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*ID:*\n${leadId}`
            },
            {
              type: "mrkdwn",
              text: `*Fuente:*\n${lead.metadata.source.url}`
            }
          ]
        },
        {
          type: "section",
          fields: Object.entries(formData).map(([key, value]) => ({
            type: "mrkdwn",
            text: `*${key}:*\n${value}`
          }))
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Ver en Dashboard",
                emoji: true
              },
              url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/leads/${leadId}`,
              style: "primary"
            }
          ]
        }
      ]
    };

    // Enviar a Slack
    const response = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    });

    if (!response.ok) {
      throw new Error('Error al enviar notificación a Slack');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending Slack notification:', error);
    return NextResponse.json(
      { error: 'Error al enviar la notificación a Slack' },
      { status: 500 }
    );
  }
}
