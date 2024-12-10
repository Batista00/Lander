import React from 'react';
import { Laptop, Smartphone, Tablet } from 'lucide-react';
import { useLandingStore } from '../../store/landingStore';

interface DevicePreviewProps {
  className?: string;
}

export const DevicePreview: React.FC<DevicePreviewProps> = ({ className = '' }) => {
  const { devicePreview, setDevicePreview } = useLandingStore();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={() => setDevicePreview('desktop')}
        className={`p-2 rounded-lg transition-colors ${
          devicePreview === 'desktop'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
        title="Vista de Escritorio"
      >
        <Laptop className="w-5 h-5" />
      </button>
      <button
        onClick={() => setDevicePreview('tablet')}
        className={`p-2 rounded-lg transition-colors ${
          devicePreview === 'tablet'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
        title="Vista de Tablet"
      >
        <Tablet className="w-5 h-5" />
      </button>
      <button
        onClick={() => setDevicePreview('mobile')}
        className={`p-2 rounded-lg transition-colors ${
          devicePreview === 'mobile'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
        title="Vista de Móvil"
      >
        <Smartphone className="w-5 h-5" />
      </button>
    </div>
  );
};
