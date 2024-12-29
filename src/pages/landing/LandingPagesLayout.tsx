import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AIQuickStart } from '@/components/ai/AIQuickStart';
import { landingPageService } from '@/services/landingPageService';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export const LandingPagesLayout = () => {
  const [showQuickStart, setShowQuickStart] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleQuickStartComplete = async (templateId: string, context: any) => {
    if (!user) {
      toast.error('Debes iniciar sesión para crear una landing page');
      return;
    }

    try {
      // Crear la landing page
      const pageId = await landingPageService.createPage({
        name: 'Nueva Landing Page',
        description: '',
        components: [],
        status: 'draft',
        templateId,
        userId: user.uid,
      }, user.uid);

      // Navegar al editor
      navigate(`/dashboard/landing-pages/editor/${pageId}`);
    } catch (error) {
      console.error('Error creating landing page:', error);
      toast.error('Error al crear la landing page');
    }
  };

  return (
    <>
      <Outlet />
      {showQuickStart && (
        <AIQuickStart
          onClose={() => setShowQuickStart(false)}
          onComplete={handleQuickStartComplete}
        />
      )}
    </>
  );
};
