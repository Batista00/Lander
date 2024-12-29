import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export interface CTAProps {
  content: {
    title: string;
    description?: string;
    buttonText: string;
    buttonUrl?: string;
  };
  styles?: {
    colors?: {
      text?: string;
      background?: string;
      accent?: string;
    };
    spacing?: {
      padding?: string;
    };
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export const CTA: React.FC<CTAProps> = ({ content, styles = {} }) => {
  const themeColors = {
    text: styles.colors?.text || '#000000',
    background: styles.colors?.background || '#ffffff',
    accent: styles.colors?.accent || '#3b82f6'
  };

  const componentStyle = {
    backgroundColor: themeColors.background,
    color: themeColors.text,
    ...styles.spacing
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={componentStyle}
      className="py-16"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold mb-6"
          >
            {content.title}
          </motion.h2>

          {content.description && (
            <motion.p
              variants={itemVariants}
              className="text-xl mb-8"
            >
              {content.description}
            </motion.p>
          )}

          <motion.div variants={itemVariants}>
            <Button
              onClick={() => content.buttonUrl && window.open(content.buttonUrl, '_blank')}
              size="lg"
              style={{ backgroundColor: themeColors.accent }}
              className="text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              {content.buttonText}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
