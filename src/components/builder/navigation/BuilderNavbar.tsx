import React from 'react';
import { useBuilder } from '@/contexts/LandingBuilderContext';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const steps = [
  { id: 'welcome', label: 'Start' },
  { id: 'templates', label: 'Template' },
  { id: 'editor', label: 'Editor' },
  { id: 'publish', label: 'Publish' }
];

export const BuilderNavbar: React.FC = () => {
  const { 
    currentStep, 
    setCurrentStep,
    mode,
    setMode,
    aiAssistant,
    toggleAI,
    savePage,
    publishPage,
    previewPage
  } = useBuilder();

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Landing Builder</h1>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant={mode === 'ai' ? 'default' : 'outline'}
              onClick={() => setMode('ai')}
            >
              AI Mode
            </Button>
            <Button
              size="sm"
              variant={mode === 'manual' ? 'default' : 'outline'}
              onClick={() => setMode('manual')}
            >
              Manual Mode
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {currentStep !== 'welcome' && (
            <>
              <Button variant="outline" size="sm" onClick={savePage}>
                Save
              </Button>
              <Button variant="outline" size="sm" onClick={previewPage}>
                Preview
              </Button>
              {currentStep === 'editor' && (
                <Button onClick={() => setCurrentStep('publish')}>
                  Continue to Publish
                </Button>
              )}
              {currentStep === 'publish' && (
                <Button onClick={publishPage}>
                  Publish Landing Page
                </Button>
              )}
            </>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={toggleAI}>
                {aiAssistant.isActive ? 'Disable AI Assistant' : 'Enable AI Assistant'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={savePage}>
                Save as Template
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                Export
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Progress value={progress} className="h-1" />
    </div>
  );
};
