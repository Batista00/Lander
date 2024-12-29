import React from 'react';
import { useAIWorkflow } from '@/contexts/AIWorkflowContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from "@/components/ui/progress";

const workflowSteps = [
  { state: 'initial', label: 'Start' },
  { state: 'template_selection', label: 'Template' },
  { state: 'editing', label: 'Editor' },
  { state: 'content_generation', label: 'Content' },
  { state: 'design_assistance', label: 'Design' },
  { state: 'preview', label: 'Preview' },
  { state: 'optimization', label: 'Optimize' }
] as const;

interface AIWorkflowLayoutProps {
  children: React.ReactNode;
}

export const AIWorkflowLayout: React.FC<AIWorkflowLayoutProps> = ({ children }) => {
  const { workflowState } = useAIWorkflow();
  
  const currentStepIndex = workflowSteps.findIndex(step => step.state === workflowState);
  const progress = ((currentStepIndex + 1) / workflowSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Header con Progress */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">AI Landing Page Builder</h1>
              <div className="text-sm text-muted-foreground">
                Step {currentStepIndex + 1} of {workflowSteps.length}
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="relative">
              <Progress value={progress} className="h-2" />
              <div className="absolute top-4 left-0 right-0">
                <div className="flex justify-between">
                  {workflowSteps.map((step, index) => {
                    const isActive = index <= currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    
                    return (
                      <div key={step.state} className="flex flex-col items-center">
                        <div
                          className={`
                            w-4 h-4 rounded-full transition-all duration-200
                            ${isActive ? 'bg-primary' : 'bg-muted'}
                            ${isCurrent ? 'ring-4 ring-primary/20' : ''}
                          `}
                        />
                        <span className={`
                          text-xs mt-2 transition-colors duration-200
                          ${isActive ? 'text-primary font-medium' : 'text-muted-foreground'}
                        `}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-32 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={workflowState}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* AI Assistant Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
          />
        </svg>
      </motion.button>
    </div>
  );
};
