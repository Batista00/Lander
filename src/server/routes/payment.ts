import express, { Request, Response, Router } from 'express';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { getUserById, updateUserPlan } from '../services/user';
import { createPayment, getPaymentById, updatePayment } from '../services/payment';
import { createSubscription, updateSubscription, getSubscriptionByPaymentId } from '../services/subscription';
import { auth } from '../middleware/auth';

const router = Router();
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || '' 
});

const preference = new Preference(client);
const payment = new Payment(client);

// Middleware de autenticación para proteger las rutas
router.use(auth);

// Crear preferencia de pago
router.post('/create-preference', async (req: Request, res: Response) => {
  try {
    const { planId, billingPeriod } = req.body;
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Crear preferencia de pago en MercadoPago
    const preferenceData = {
      items: [
        {
          title: `Plan ${planId}`,
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 100 // Precio ejemplo
        }
      ],
      payer: {
        email: user.email
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL}/payment/success`,
        failure: `${process.env.FRONTEND_URL}/payment/failure`,
        pending: `${process.env.FRONTEND_URL}/payment/pending`
      },
      auto_return: 'approved'
    };

    const response = await preference.create({ body: preferenceData });
    res.json(response);
  } catch (error) {
    console.error('Error al crear preferencia:', error);
    res.status(500).json({ error: 'Error al crear preferencia de pago' });
  }
});

// Procesar pago exitoso
router.post('/success', async (req: Request, res: Response) => {
  try {
    const { payment_id, metadata } = req.body;
    const { userId, planId, billingPeriod } = metadata;

    // Obtener detalles del pago
    const paymentInfo = await payment.get({ id: payment_id.toString() });
    
    // Crear registro de pago
    const paymentData = {
      id: payment_id,
      status: paymentInfo.status,
      amount: paymentInfo.transaction_amount,
      userId,
      planId,
      billingPeriod,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await createPayment(paymentData);

    // Actualizar plan del usuario
    const userPlanUpdate = {
      planId,
      billingPeriod,
      startDate: new Date().toISOString(),
      endDate: null, // Plan gratuito no tiene fecha de finalización
      status: 'active'
    };
    await updateUserPlan(userId, userPlanUpdate);

    res.json({ success: true });
  } catch (error) {
    console.error('Error al procesar pago:', error);
    res.status(500).json({ error: 'Error al procesar pago' });
  }
});

// Webhook para notificaciones de pago
router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const paymentId = data.id;
      const paymentInfo = await payment.get({ id: paymentId.toString() });

      if (paymentInfo.status === 'approved') {
        // Actualizar plan del usuario
        // Implementar lógica según necesidades
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Error en webhook:', error);
    res.sendStatus(500);
  }
});

// Rutas para manejar el retorno del pago
router.get('/success', async (req: Request, res: Response) => {
  const { payment_id } = req.query;
  try {
    if (!payment_id) {
      return res.status(400).json({ error: 'ID de pago no proporcionado' });
    }

    const paymentInfo = await payment.get({ id: payment_id.toString() });
    res.json({ status: 'success', payment: paymentInfo });
  } catch (error) {
    console.error('Error al procesar pago:', error);
    res.status(500).json({ error: 'Error al procesar el pago' });
  }
});

router.get('/failure', async (req: Request, res: Response) => {
  res.redirect(`${process.env.FRONTEND_URL}/payment/failure`);
});

router.get('/pending', async (req: Request, res: Response) => {
  res.redirect(`${process.env.FRONTEND_URL}/payment/pending`);
});

// Ruta para actualizar al plan gratuito
router.post('/upgrade-free', async (req: Request, res: Response) => {
  try {
    const userId = req.user?.uid;
    if (!userId) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    // Actualizar el plan del usuario a gratuito
    await updateUserPlan(userId, {
      planId: 'free',
      startDate: new Date().toISOString(),
      endDate: null, // Plan gratuito no tiene fecha de finalización
      status: 'active'
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error upgrading to free plan:', error);
    res.status(500).json({ error: 'Error al actualizar al plan gratuito' });
  }
});

export default router;
