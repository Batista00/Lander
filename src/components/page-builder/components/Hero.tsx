import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export interface HeroProps {
  content: {
    title: string;
    subtitle?: string;
    buttonText?: string;
    buttonUrl?: string;
    imageUrl?: string;
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

export const Hero: React.FC<HeroProps> = ({ content, styles = {} }) => {
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
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div 
            variants={itemVariants}
            className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-5xl font-bold mb-6"
            >
              {content.title}
            </motion.h1>
            
            {content.subtitle && (
              <motion.p
                variants={itemVariants}
                className="text-xl mb-8"
              >
                {content.subtitle}
              </motion.p>
            )}

            {content.buttonText && (
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
            )}
          </motion.div>

          {content.imageUrl && (
            <motion.div
              variants={itemVariants}
              className="lg:w-1/2"
            >
              <img
                src={content.imageUrl}
                alt="Hero"
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
