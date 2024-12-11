import React, { useState } from 'react';
import { Box, Container, Tabs, Tab, Typography, Button } from '@mui/material';
import { MembershipTiers } from '../../components/marketplace/membership/MembershipTiers';
import { RewardsSystem } from '../../components/marketplace/rewards/RewardsSystem';
import { SellerDashboard } from '../../components/marketplace/analytics/SellerDashboard';
import { ProductGrid } from '../../components/marketplace/product-grid';
import { QuickPreview } from '../../components/marketplace/preview/QuickPreview';
import { AchievementSystem } from '../../components/marketplace/rewards/AchievementSystem';
import { AdvancedAnalytics } from '../../components/marketplace/analytics/AdvancedAnalytics';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export const Marketplace: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [previewTemplate, setPreviewTemplate] = useState<any>(null);
  const [mockUserStats] = useState({
    currentPoints: 350,
    totalEarned: 1250,
    salesCount: 42
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleQuickPreview = (template: any) => {
    setPreviewTemplate(template);
  };

  const handleClosePreview = () => {
    setPreviewTemplate(null);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Marketplace
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Descubre, compra y vende templates increíbles
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Templates" />
          <Tab label="Membresías" />
          <Tab label="Recompensas" />
          <Tab label="Logros" />
          <Tab label="Analytics" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <ProductGrid onQuickPreview={handleQuickPreview} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <MembershipTiers />
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <RewardsSystem
          currentPoints={mockUserStats.currentPoints}
          totalEarned={mockUserStats.totalEarned}
          salesCount={mockUserStats.salesCount}
        />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <AchievementSystem />
      </TabPanel>

      <TabPanel value={tabValue} index={4}>
        <AdvancedAnalytics />
      </TabPanel>

      {previewTemplate && (
        <QuickPreview
          template={previewTemplate}
          isOpen={!!previewTemplate}
          onClose={handleClosePreview}
          onAddToCart={() => {
            // Implementar lógica de carrito
            handleClosePreview();
          }}
        />
      )}
    </Container>
  );
};