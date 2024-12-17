import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { Button } from '@/components/ui/button';

interface ModernHeroProps {
  data: {
    title: string;
    subtitle: string;
    description: string;
    primaryCTA: {
      text: string;
      url: string;
    };
    secondaryCTA: {
      text: string;
      url: string;
    };
    backgroundImage?: string;
    illustration?: string;
  };
  onEdit?: (field: string, value: any) => void;
  isEditing?: boolean;
}

export const ModernHero: React.FC<ModernHeroProps> = ({ data, onEdit, isEditing }) => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900">
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </motion.div>

      {/* Content container */}
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              {isEditing ? (
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => onEdit?.('title', e.target.value)}
                  className="bg-transparent border-b border-white/20 w-full focus:outline-none focus:border-white/40"
                />
              ) : (
                <Typewriter
                  options={{
                    strings: [data.title],
                    autoStart: true,
                    loop: true,
                    deleteSpeed: 50,
                    delay: 50,
                  }}
                />
              )}
            </h1>
            
            <h2 className="text-2xl md:text-3xl text-blue-200">
              {isEditing ? (
                <input
                  type="text"
                  value={data.subtitle}
                  onChange={(e) => onEdit?.('subtitle', e.target.value)}
                  className="bg-transparent border-b border-white/20 w-full focus:outline-none focus:border-white/40"
                />
              ) : (
                data.subtitle
              )}
            </h2>
            
            <p className="text-lg text-gray-300">
              {isEditing ? (
                <textarea
                  value={data.description}
                  onChange={(e) => onEdit?.('description', e.target.value)}
                  className="bg-transparent border-b border-white/20 w-full focus:outline-none focus:border-white/40"
                  rows={3}
                />
              ) : (
                data.description
              )}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-8"
                onClick={() => window.open(data.primaryCTA.url, '_blank')}
              >
                {data.primaryCTA.text}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 rounded-full px-8"
                onClick={() => window.open(data.secondaryCTA.url, '_blank')}
              >
                {data.secondaryCTA.text}
              </Button>
            </div>
          </motion.div>

          {/* Illustration/Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {data.illustration && (
              <motion.img
                src={data.illustration}
                alt="Hero Illustration"
                className="w-full h-auto max-w-2xl mx-auto"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>
    </div>
  );
};

export default ModernHero;
