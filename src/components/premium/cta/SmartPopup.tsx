import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Analytics } from '@/lib/analytics';

interface SmartPopupProps {
  trigger: 'time' | 'scroll' | 'exit-intent';
  animation?: 'fade' | 'slide' | 'zoom';
  delay?: number; // en milisegundos
  scrollThreshold?: number; // porcentaje de scroll
  children: React.ReactNode;
  onClose?: () => void;
  trackingId?: string;
}

const animations = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
  },
  zoom: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  },
};

export function SmartPopup({
  trigger,
  animation = 'fade',
  delay = 3000,
  scrollThreshold = 50,
  children,
  onClose,
  trackingId,
}: SmartPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (hasTriggered) return;

    const handleTrigger = () => {
      if (!hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
        if (trackingId) {
          Analytics.trackEvent('popup_triggered', {
            trigger,
            trackingId,
          });
        }
      }
    };

    switch (trigger) {
      case 'time':
        const timer = setTimeout(handleTrigger, delay);
        return () => clearTimeout(timer);

      case 'scroll':
        const handleScroll = () => {
          const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
          if (scrolled >= scrollThreshold) {
            handleTrigger();
          }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

      case 'exit-intent':
        const handleMouseLeave = (e: MouseEvent) => {
          if (e.clientY <= 0) {
            handleTrigger();
          }
        };
        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [trigger, delay, scrollThreshold, hasTriggered, trackingId]);

  const handleClose = () => {
    setIsVisible(false);
    if (trackingId) {
      Analytics.trackEvent('popup_closed', {
        trigger,
        trackingId,
      });
    }
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-white rounded-lg shadow-xl max-w-lg w-full"
            {...animations[animation]}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
