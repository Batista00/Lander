import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import paymentRoutes from './routes/payment';
import { handleMercadoPagoWebhook } from './webhooks/mercadoPago';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(json());

// Rutas
app.use('/api/payment', paymentRoutes);
app.post('/api/webhooks/mercadopago', handleMercadoPagoWebhook);

// Manejo de errores
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
