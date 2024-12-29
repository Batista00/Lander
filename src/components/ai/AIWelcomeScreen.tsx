import React from 'react';
import { motion } from 'framer-motion';
import { useAIWorkflow } from '@/contexts/AIWorkflowContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: '🎯',
    title: 'Smart Template Selection',
    description: 'AI analyzes your needs and recommends the perfect template'
  },
  {
    icon: '✍️',
    title: 'AI Content Generation',
    description: 'Generate engaging copy and headlines optimized for conversion'
  },
  {
    icon: '🎨',
    title: 'Design Assistance',
    description: 'Get real-time design suggestions and improvements'
  },
  {
    icon: '📊',
    title: 'Performance Optimization',
    description: 'AI-powered recommendations to maximize conversions'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const AIWelcomeScreen: React.FC = () => {
  const { setWorkflowState } = useAIWorkflow();

  return (
    <div className="max-w-5xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6 mb-16"
      >
        <motion.h1 
          className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Create Amazing Landing Pages with AI
        </motion.h1>
        <motion.p 
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Let our AI assistant guide you through creating high-converting landing pages
          tailored to your business needs.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            size="lg"
            onClick={() => setWorkflowState('template_selection')}
            className="text-lg px-8 py-6"
          >
            Start Creating with AI
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
      >
        {features.map((feature, index) => (
          <motion.div key={feature.title} variants={item}>
            <Card className="p-6 h-full hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{feature.icon}</div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating Particles Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 50%)',
          }}
        />
      </div>
    </div>
  );
};
