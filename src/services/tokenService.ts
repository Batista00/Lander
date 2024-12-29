import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  addDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  increment,
  runTransaction
} from 'firebase/firestore';
import { TokenBalance, TokenTransaction, TokenPurchase, TOKEN_COSTS } from '@/types/token';

export class TokenService {
  private balanceCollection = 'token_balances';
  private transactionCollection = 'token_transactions';
  private purchaseCollection = 'token_purchases';

  // Obtener balance actual
  async getBalance(userId: string): Promise<TokenBalance> {
    const balanceRef = doc(db, this.balanceCollection, userId);
    const balanceDoc = await getDoc(balanceRef);
    
    if (!balanceDoc.exists()) {
      // Crear balance inicial con tokens gratuitos
      const initialBalance: TokenBalance = {
        available: 5, // Tokens gratuitos iniciales
        lifetime: 5,
        lastUpdated: new Date()
      };
      await setDoc(balanceRef, initialBalance);
      return initialBalance;
    }

    return balanceDoc.data() as TokenBalance;
  }

  // Verificar si hay suficientes tokens
  async hasEnoughTokens(userId: string, amount: number): Promise<boolean> {
    const balance = await this.getBalance(userId);
    return balance.available >= amount;
  }

  // Usar tokens (con transacción atómica)
  async useTokens(
    userId: string, 
    amount: number, 
    description: string, 
    relatedEntityId?: string
  ): Promise<boolean> {
    try {
      await runTransaction(db, async (transaction) => {
        const balanceRef = doc(db, this.balanceCollection, userId);
        const balanceDoc = await transaction.get(balanceRef);

        if (!balanceDoc.exists()) {
          throw new Error('No token balance found');
        }

        const balance = balanceDoc.data() as TokenBalance;
        if (balance.available < amount) {
          throw new Error('Insufficient tokens');
        }

        // Actualizar balance
        transaction.update(balanceRef, {
          available: increment(-amount),
          lastUpdated: new Date()
        });

        // Registrar transacción
        const transactionRef = doc(collection(db, this.transactionCollection));
        const tokenTransaction: TokenTransaction = {
          id: transactionRef.id,
          userId,
          amount: -amount,
          type: 'usage',
          description,
          timestamp: new Date(),
          relatedEntityId
        };
        transaction.set(transactionRef, tokenTransaction);
      });

      return true;
    } catch (error) {
      console.error('Error using tokens:', error);
      return false;
    }
  }

  // Crear una nueva compra de tokens
  async createPurchase(
    userId: string, 
    amount: number, 
    cost: number
  ): Promise<TokenPurchase> {
    const purchaseRef = doc(collection(db, this.purchaseCollection));
    const purchase: TokenPurchase = {
      id: purchaseRef.id,
      userId,
      amount,
      cost,
      status: 'pending',
      createdAt: new Date()
    };

    await setDoc(purchaseRef, purchase);
    return purchase;
  }

  // Completar una compra de tokens
  async completePurchase(purchaseId: string, paymentId: string): Promise<void> {
    const purchaseRef = doc(db, this.purchaseCollection, purchaseId);
    const purchaseDoc = await getDoc(purchaseRef);

    if (!purchaseDoc.exists()) {
      throw new Error('Purchase not found');
    }

    const purchase = purchaseDoc.data() as TokenPurchase;
    if (purchase.status !== 'pending') {
      throw new Error('Purchase already processed');
    }

    await runTransaction(db, async (transaction) => {
      // Actualizar la compra
      transaction.update(purchaseRef, {
        status: 'completed',
        paymentId,
        completedAt: new Date()
      });

      // Actualizar el balance
      const balanceRef = doc(db, this.balanceCollection, purchase.userId);
      transaction.update(balanceRef, {
        available: increment(purchase.amount),
        lifetime: increment(purchase.amount),
        lastUpdated: new Date()
      });

      // Registrar transacción
      const transactionRef = doc(collection(db, this.transactionCollection));
      const tokenTransaction: TokenTransaction = {
        id: transactionRef.id,
        userId: purchase.userId,
        amount: purchase.amount,
        type: 'purchase',
        description: `Compra de ${purchase.amount} tokens`,
        timestamp: new Date(),
        paymentId
      };
      transaction.set(transactionRef, tokenTransaction);
    });
  }

  // Obtener historial de transacciones
  async getTransactionHistory(
    userId: string, 
    limit: number = 10
  ): Promise<TokenTransaction[]> {
    const q = query(
      collection(db, this.transactionCollection),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(limit)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data() as TokenTransaction);
  }
}
