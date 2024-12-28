interface EmailTemplate {
  to: string;
  template: string;
  data: Record<string, any>;
}

// Templates de correo
const emailTemplates = {
  'payment-success': {
    subject: 'Pago Confirmado - Lander',
    body: (data: any) => `
      ¡Gracias por tu pago!
      
      Hemos confirmado tu pago de $${data.amount} para el plan ${data.planName}.
      Tu factura está disponible en tu panel de facturación.
      
      Equipo Lander
    `
  },
  'trial-welcome': {
    subject: 'Bienvenido a tu Prueba Gratuita - Lander',
    body: (data: any) => `
      ¡Bienvenido a Lander!
      
      Tu período de prueba del plan ${data.planName} ha comenzado.
      Tienes hasta el ${new Date(data.trialEndDate).toLocaleDateString()} para probar todas las características premium.
      
      ¿Necesitas ayuda? Responde a este correo.
      
      Equipo Lander
    `
  },
  'trial-ending': {
    subject: 'Tu Prueba Gratuita está por Terminar - Lander',
    body: (data: any) => `
      Tu período de prueba termina en ${data.daysLeft} días.
      
      No pierdas acceso a las características premium:
      - Landing pages ilimitadas
      - Templates premium
      - Analíticas avanzadas
      
      Elige tu plan ahora:
      ${data.pricingUrl}
      
      Equipo Lander
    `
  },
  'subscription-cancelled': {
    subject: 'Suscripción Cancelada - Lander',
    body: (data: any) => `
      Hemos cancelado tu suscripción al plan ${data.planName}.
      
      Tu cuenta ha sido cambiada al plan gratuito.
      Puedes reactivar tu suscripción en cualquier momento desde tu panel.
      
      ¿Fue un error? Contáctanos respondiendo este correo.
      
      Equipo Lander
    `
  },
  'payment-reminder': {
    subject: 'Recordatorio de Pago Pendiente - Lander',
    body: (data: any) => `
      Tienes un pago pendiente de $${data.amount}.
      
      Tu cuenta tiene ${data.daysOverdue} días de retraso.
      Para evitar la suspensión del servicio, por favor actualiza tu método de pago.
      
      Actualizar pago:
      ${data.paymentUrl}
      
      Equipo Lander
    `
  },
  'invoice': {
    subject: 'Nueva Factura Disponible - Lander',
    body: (data: any) => `
      Tu factura #${data.invoiceNumber} está disponible.
      
      Monto: $${data.amount}
      Fecha: ${new Date(data.date).toLocaleDateString()}
      
      Puedes descargar tu factura desde tu panel de facturación.
      
      Equipo Lander
    `
  }
};

export async function sendEmail({ to, template, data }: EmailTemplate): Promise<void> {
  const templateConfig = emailTemplates[template as keyof typeof emailTemplates];
  
  if (!templateConfig) {
    throw new Error(`Template de correo "${template}" no encontrado`);
  }

  // TODO: Implementar el envío real de correos
  // Por ahora solo simulamos el envío
  console.log('Enviando correo:', {
    to,
    subject: templateConfig.subject,
    body: templateConfig.body(data)
  });
}

export function scheduleTrialEmails(userId: string, trialEndDate: Date) {
  const now = new Date();
  const daysUntilEnd = Math.ceil((trialEndDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  // Programar recordatorios
  if (daysUntilEnd > 7) {
    scheduleEmail(userId, 'trial-ending', { daysLeft: 7 }, 7);
  }
  if (daysUntilEnd > 3) {
    scheduleEmail(userId, 'trial-ending', { daysLeft: 3 }, 3);
  }
  if (daysUntilEnd > 1) {
    scheduleEmail(userId, 'trial-ending', { daysLeft: 1 }, 1);
  }
}

function scheduleEmail(userId: string, template: string, data: any, daysBeforeEnd: number) {
  // TODO: Implementar sistema de colas para emails programados
  console.log(`Email programado para ${userId}: ${template} en ${daysBeforeEnd} días`);
}

// Templates de correo para campañas
export interface CampaignTemplate {
  subject: string;
  body: string;
  preheader?: string;
  from?: {
    name: string;
    email: string;
  };
}

// Función para enviar una campaña
export async function sendCampaign(campaignId: string): Promise<void> {
  try {
    // 1. Obtener la campaña
    const campaignDoc = await getDoc(doc(db, 'campaigns', campaignId));
    if (!campaignDoc.exists()) {
      throw new Error('Campaña no encontrada');
    }

    const campaign = campaignDoc.data() as Campaign;

    // 2. Actualizar estado
    await updateDoc(doc(db, 'campaigns', campaignId), {
      status: 'sending',
      updatedAt: new Date()
    });

    // 3. Obtener los leads del segmento
    const segmentDoc = await getDoc(doc(db, 'segments', campaign.segmentId));
    if (!segmentDoc.exists()) {
      throw new Error('Segmento no encontrado');
    }

    const segment = segmentDoc.data();
    const leadsQuery = query(
      collection(db, 'leads'),
      where('tags', 'array-contains-any', segment.tags || [])
    );

    const leadsSnapshot = await getDocs(leadsQuery);
    const leads = leadsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // 4. Crear batch de envíos
    const batch = writeBatch(db);
    const emailTasks: Promise<void>[] = [];
    let sentCount = 0;

    // 5. Procesar cada lead
    for (const lead of leads) {
      // Crear registro de envío
      const emailId = doc(collection(db, 'email_sends')).id;
      batch.set(doc(db, 'email_sends', emailId), {
        campaignId,
        leadId: lead.id,
        email: lead.formData.email,
        status: 'pending',
        createdAt: new Date(),
        trackingId: generateTrackingId(),
      });

      // Personalizar el contenido
      const personalizedContent = personalizeContent(
        campaign.emailTemplate.body,
        lead.formData
      );

      // Agregar a la cola de envío
      emailTasks.push(
        sendEmail({
          to: lead.formData.email,
          subject: campaign.emailTemplate.subject,
          body: personalizedContent,
          trackingId: emailId,
        })
      );

      sentCount++;
    }

    // 6. Guardar registros de envío
    await batch.commit();

    // 7. Enviar emails (en paralelo con límite)
    const chunkSize = 50; // Enviar de 50 en 50
    for (let i = 0; i < emailTasks.length; i += chunkSize) {
      const chunk = emailTasks.slice(i, i + chunkSize);
      await Promise.all(chunk);
      
      // Actualizar progreso
      await updateDoc(doc(db, 'campaigns', campaignId), {
        'stats.sent': increment(chunk.length)
      });

      // Esperar un poco entre chunks para no sobrecargar el servicio
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // 8. Actualizar estado final
    await updateDoc(doc(db, 'campaigns', campaignId), {
      status: 'completed',
      updatedAt: new Date(),
      'stats.sent': sentCount
    });

  } catch (error) {
    console.error('Error sending campaign:', error);
    
    // Actualizar estado a error
    await updateDoc(doc(db, 'campaigns', campaignId), {
      status: 'error',
      updatedAt: new Date(),
      error: error.message
    });

    throw error;
  }
}

// Función para personalizar el contenido
function personalizeContent(template: string, data: Record<string, any>): string {
  return template.replace(/\{\{(.*?)\}\}/g, (match, key) => {
    const field = key.trim();
    return data[field] || match;
  });
}

// Función para generar ID de tracking
function generateTrackingId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Función para registrar apertura de email
export async function trackEmailOpen(trackingId: string): Promise<void> {
  const emailDoc = doc(db, 'email_sends', trackingId);
  
  await updateDoc(emailDoc, {
    openedAt: new Date(),
    status: 'opened'
  });

  // Incrementar contador en la campaña
  const emailData = (await getDoc(emailDoc)).data();
  if (emailData?.campaignId) {
    await updateDoc(doc(db, 'campaigns', emailData.campaignId), {
      'stats.opened': increment(1)
    });
  }
}

// Función para registrar click en link
export async function trackEmailClick(trackingId: string, link: string): Promise<void> {
  const emailDoc = doc(db, 'email_sends', trackingId);
  
  await updateDoc(emailDoc, {
    clickedAt: new Date(),
    clickedLink: link,
    status: 'clicked'
  });

  // Incrementar contador en la campaña
  const emailData = (await getDoc(emailDoc)).data();
  if (emailData?.campaignId) {
    await updateDoc(doc(db, 'campaigns', emailData.campaignId), {
      'stats.clicked': increment(1)
    });
  }
}
