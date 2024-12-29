import React from 'react';
import { motion } from 'framer-motion';

interface Benefit {
  title: string;
  description: string;
  icon?: string;
}

export interface BenefitsProps {
  content: {
    title: string;
    description?: string;
    benefits: Benefit[];
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

export const Benefits: React.FC<BenefitsProps> = ({ content, styles = {} }) => {
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
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold mb-6 text-center"
        >
          {content.title || 'Beneficios'}
        </motion.h2>

        {content.description && (
          <motion.p
            variants={itemVariants}
            className="text-xl mb-12 text-center"
          >
            {content.description}
          </motion.p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {benefit.icon && (
                <div className="mb-4">
                  <span 
                    className="text-4xl inline-block"
                    style={{ color: themeColors.accent }}
                  >
                    {benefit.icon}
                  </span>
                </div>
              )}
              <h3 className="text-xl font-semibold mb-3 text-center">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-center">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
