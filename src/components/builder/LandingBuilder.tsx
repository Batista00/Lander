import React from 'react';
import { useBuilder } from '@/contexts/LandingBuilderContext';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { TemplateSelector } from './screens/TemplateSelector';
import { Editor } from './screens/Editor';
import { Publisher } from './screens/Publisher';
import { AIAssistant } from './ai/AIAssistant';
import { BuilderNavbar } from './navigation/BuilderNavbar';
import { BuilderSidebar } from './navigation/BuilderSidebar';
import { motion, AnimatePresence } from 'framer-motion';

const screens: Record<string, React.FC> = {
  welcome: WelcomeScreen,
  templates: TemplateSelector,
  editor: Editor,
  publish: Publisher
};

export const LandingBuilder: React.FC = () => {
  const { currentStep, aiAssistant } = useBuilder();
  const CurrentScreen = screens[currentStep];

  return (
    <div className="h-screen flex flex-col bg-background">
      <BuilderNavbar />
      
      <div className="flex-1 flex overflow-hidden">
        <BuilderSidebar />
        
        <main className="flex-1 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full"
            >
              <CurrentScreen />
            </motion.div>
          </AnimatePresence>
        </main>

        {aiAssistant.isActive && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 380 }}
            exit={{ width: 0 }}
            className="border-l border-border bg-card"
          >
            <AIAssistant />
          </motion.div>
        )}
      </div>
    </div>
  );
};
