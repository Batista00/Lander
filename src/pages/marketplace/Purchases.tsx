import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Skeleton } from '@mui/material';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface Purchase {
  id: string;
  templateId: string;
  templateTitle: string;
  purchaseDate: Date;
  downloadUrl: string;
}

export const Purchases = () => {
  const { user } = useAuth();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user) return;

      try {
        const q = query(
          collection(db, 'orders'),
          where('buyerId', '==', user.uid),
          where('status', '==', 'completed')
        );

        const querySnapshot = await getDocs(q);
        const purchasesData: Purchase[] = [];

        for (const doc of querySnapshot.docs) {
          const data = doc.data();
          // Obtener los detalles del template
          const templateDoc = await db.collection('templates').doc(data.templateId).get();
          const templateData = templateDoc.data();

          if (templateData) {
            purchasesData.push({
              id: doc.id,
              templateId: data.templateId,
              templateTitle: templateData.title,
              purchaseDate: data.createdAt.toDate(),
              downloadUrl: templateData.downloadUrl,
            });
          }
        }

        setPurchases(purchasesData);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [user]);

  if (loading) {
    return (
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          My Purchases
        </Typography>
        <Grid container spacing={3}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={12} key={i}>
              <Card>
                <CardContent>
                  <Skeleton variant="text" width="60%" height={40} />
                  <Skeleton variant="text" width="40%" height={30} />
                  <Skeleton variant="rectangular" width={120} height={36} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (!purchases.length) {
    return (
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          My Purchases
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="body1" color="text.secondary" align="center">
              You haven't made any purchases yet.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        My Purchases
      </Typography>
      <Grid container spacing={3}>
        {purchases.map((purchase) => (
          <Grid item xs={12} key={purchase.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {purchase.templateTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Purchased on {purchase.purchaseDate.toLocaleDateString()}
                </Typography>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(purchase.downloadUrl, '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
