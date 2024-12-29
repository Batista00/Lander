import React from 'react';
import { useAIWorkflow } from '@/contexts/AIWorkflowContext';
import { AITemplateAdvisor } from './AITemplateAdvisor';
import { AIWelcomeScreen } from './AIWelcomeScreen';
import { AIWorkflowLayout } from './AIWorkflowLayout';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const AILandingBuilder: React.FC = () => {
  const { 
    workflowState, 
    setWorkflowState,
    setCurrentLandingId 
  } = useAIWorkflow();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleTemplateSelect = async (templateId: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a landing page",
        variant: "destructive",
      });
      return;
    }

    try {
      // Crear nuevo documento de landing page
      const landingPageRef = doc(db, 'landingPages', crypto.randomUUID());
      await setDoc(landingPageRef, {
        userId: user.uid,
        templateId,
        status: 'draft',
        components: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      setCurrentLandingId(landingPageRef.id);
      setWorkflowState('editing');

      toast({
        title: "Success",
        description: "Landing page created successfully",
      });
    } catch (error) {
      console.error('Error creating landing page:', error);
      toast({
        title: "Error",
        description: "Failed to create landing page",
        variant: "destructive",
      });
    }
  };

  return (
    <AIWorkflowLayout>
      {workflowState === 'initial' && <AIWelcomeScreen />}

      {workflowState === 'template_selection' && (
        <AITemplateAdvisor onTemplateSelect={handleTemplateSelect} />
      )}

      {/* Aquí irán los demás estados del flujo */}
      {workflowState === 'editing' && (
        <div>Editor Component (To be implemented)</div>
      )}

      {workflowState === 'content_generation' && (
        <div>Content Generator Component (To be implemented)</div>
      )}

      {workflowState === 'design_assistance' && (
        <div>Design Assistant Component (To be implemented)</div>
      )}

      {workflowState === 'preview' && (
        <div>Preview Component (To be implemented)</div>
      )}

      {workflowState === 'optimization' && (
        <div>Optimization Component (To be implemented)</div>
      )}
    </AIWorkflowLayout>
  );
};
