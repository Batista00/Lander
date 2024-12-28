import { useState, useEffect } from 'react';
import { Button } from '../../ui/Button';
import { motion } from 'framer-motion';
import { Analytics } from '@/lib/analytics';

interface PremiumButtonProps {
  variant?: 'primary' | 'secondary' | 'gradient';
  animation?: 'pulse' | 'bounce' | 'shake';
  text: string;
  action: () => void;
  trackingId?: string;
}

const animations = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
    },
  },
  bounce: {
    y: [0, -10, 0],
    transition: {
      duration: 1,
      repeat: Infinity,
    },
  },
  shake: {
    x: [-2, 2, -2, 2, 0],
    transition: {
      duration: 0.4,
      repeat: Infinity,
    },
  },
};

const gradients = {
  primary: 'bg-gradient-to-r from-blue-500 to-indigo-600',
  secondary: 'bg-gradient-to-r from-purple-500 to-pink-600',
  success: 'bg-gradient-to-r from-green-500 to-emerald-600',
};

export function PremiumButton({ 
  variant = 'primary',
  animation,
  text,
  action,
  trackingId
}: PremiumButtonProps) {
  const [interactions, setInteractions] = useState(0);

  useEffect(() => {
    if (trackingId) {
      Analytics.trackView(trackingId);
    }
  }, [trackingId]);

  const handleClick = () => {
    setInteractions(prev => prev + 1);
    if (trackingId) {
      Analytics.trackClick(trackingId, { interactions });
    }
    action();
  };

  return (
    <motion.div
      animate={animation ? animations[animation] : undefined}
      className="inline-block"
    >
      <Button
        onClick={handleClick}
        className={`
          relative overflow-hidden
          ${variant === 'gradient' ? gradients.primary : ''}
          transition-all duration-300
          hover:shadow-lg hover:scale-105
          active:scale-95
        `}
        variant={variant === 'gradient' ? 'ghost' : variant}
      >
        {text}
        {variant === 'gradient' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        )}
      </Button>
    </motion.div>
  );
}
