import React, { Suspense, useState } from 'react';
import { Component, ComponentType } from '@/types/landing';
import { cn } from '@/lib/utils';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { Slider } from '@/components/ui/slider';

interface ThreeDViewerProps {
  component: Component & { type: ComponentType.ThreeDViewer };
  mode?: 'preview' | 'published' | 'edit';
}

const Model = ({ url, scale = 1 }: { url: string; scale?: number }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={scale} />;
};

export const ThreeDViewer: React.FC<ThreeDViewerProps> = ({
  component,
  mode = 'preview'
}) => {
  const {
    url = '',
    autoRotate = false,
    initialScale = 1,
  } = component.content;

  const [scale, setScale] = useState(initialScale);

  return (
    <div
      className={cn(
        'relative group min-h-[400px]',
        component.styles?.spacing,
      )}
    >
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          {url && <Model url={url} scale={scale} />}
          <OrbitControls autoRotate={autoRotate} />
        </Suspense>
      </Canvas>

      <div className="absolute bottom-4 left-4 right-4 bg-white/80 p-4 rounded-lg">
        <Slider
          defaultValue={[scale]}
          min={0.1}
          max={5}
          step={0.1}
          onValueChange={setScale}
        />
      </div>

      {mode === 'edit' && (
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute hidden group-hover:flex items-center justify-center top-2 right-2 w-8 h-8 bg-blue-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
