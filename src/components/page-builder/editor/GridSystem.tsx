import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface GridSystemProps {
  enabled: boolean;
  snapToGrid?: boolean;
  gridSize?: number;
  showGuides?: boolean;
  onSnap?: (position: { x: number; y: number }) => void;
}

interface GuideLines {
  vertical: number[];
  horizontal: number[];
}

export const GridSystem: React.FC<GridSystemProps> = ({
  enabled = true,
  snapToGrid = true,
  gridSize = 8,
  showGuides = true,
  onSnap
}) => {
  const [guides, setGuides] = useState<GuideLines>({ vertical: [], horizontal: [] });
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
  const [nearestGuides, setNearestGuides] = useState<GuideLines>({ vertical: [], horizontal: [] });

  const calculateGuides = useCallback(() => {
    if (!enabled || !showGuides) return;

    const container = document.querySelector('.editor-container');
    if (!container) return;

    const elements = container.querySelectorAll('.draggable-component');
    const verticalGuides: number[] = [];
    const horizontalGuides: number[] = [];

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      // Añadir guías para bordes y centro
      verticalGuides.push(rect.left, rect.right, rect.left + rect.width / 2);
      horizontalGuides.push(rect.top, rect.bottom, rect.top + rect.height / 2);
    });

    setGuides({
      vertical: [...new Set(verticalGuides)],
      horizontal: [...new Set(horizontalGuides)]
    });
  }, [enabled, showGuides]);

  const findNearestGuides = useCallback((element: HTMLElement) => {
    if (!enabled || !showGuides) return;

    const rect = element.getBoundingClientRect();
    const threshold = 5; // píxeles de distancia para snap

    const nearestVertical = guides.vertical.filter(guide => 
      Math.abs(guide - rect.left) < threshold ||
      Math.abs(guide - rect.right) < threshold ||
      Math.abs(guide - (rect.left + rect.width / 2)) < threshold
    );

    const nearestHorizontal = guides.horizontal.filter(guide =>
      Math.abs(guide - rect.top) < threshold ||
      Math.abs(guide - rect.bottom) < threshold ||
      Math.abs(guide - (rect.top + rect.height / 2)) < threshold
    );

    setNearestGuides({ vertical: nearestVertical, horizontal: nearestHorizontal });
  }, [enabled, showGuides, guides]);

  useEffect(() => {
    calculateGuides();
    window.addEventListener('resize', calculateGuides);
    return () => window.removeEventListener('resize', calculateGuides);
  }, [calculateGuides]);

  const renderGrid = () => {
    if (!enabled) return null;

    return (
      <div className="grid-overlay">
        {/* Grid lines */}
        {Array.from({ length: Math.ceil(window.innerWidth / gridSize) }).map((_, i) => (
          <div
            key={`vertical-${i}`}
            className="grid-line vertical"
            style={{ left: i * gridSize }}
          />
        ))}
        {Array.from({ length: Math.ceil(window.innerHeight / gridSize) }).map((_, i) => (
          <div
            key={`horizontal-${i}`}
            className="grid-line horizontal"
            style={{ top: i * gridSize }}
          />
        ))}
      </div>
    );
  };

  const renderGuides = () => {
    if (!enabled || !showGuides) return null;

    return (
      <>
        {nearestGuides.vertical.map((guide, i) => (
          <motion.div
            key={`guide-v-${i}`}
            className="alignment-guide vertical"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ left: guide }}
          />
        ))}
        {nearestGuides.horizontal.map((guide, i) => (
          <motion.div
            key={`guide-h-${i}`}
            className="alignment-guide horizontal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ top: guide }}
          />
        ))}
      </>
    );
  };

  return (
    <div className="grid-system">
      {renderGrid()}
      {renderGuides()}
      <style jsx>{`
        .grid-system {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }
        .grid-line {
          position: absolute;
          background-color: rgba(0, 0, 0, 0.1);
        }
        .grid-line.vertical {
          width: 1px;
          height: 100%;
        }
        .grid-line.horizontal {
          height: 1px;
          width: 100%;
        }
        .alignment-guide {
          position: absolute;
          background-color: #0066ff;
          z-index: 1000;
        }
        .alignment-guide.vertical {
          width: 1px;
          height: 100%;
        }
        .alignment-guide.horizontal {
          height: 1px;
          width: 100%;
        }
      `}</style>
    </div>
  );
};
