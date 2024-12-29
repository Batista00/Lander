import { useEffect, useState } from 'react';
import { Hero, Features, Benefits, CTA } from '../components/base';
import { BaseComponent } from '@/types/components';
import { LandingPage } from '@/types/landing';

interface PreviewProps {
  landingPage: LandingPage;
  isEditing?: boolean;
  onEdit?: (componentId: string, field: string, value: string) => void;
}

export function LandingPreview({ landingPage, isEditing = false, onEdit }: PreviewProps) {
  const [deviceWidth, setDeviceWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderComponent = (component: BaseComponent) => {
    const handleEdit = isEditing && onEdit ? 
      (field: string, value: string) => onEdit(component.id, field, value) 
      : undefined;

    switch (component.type) {
      case 'hero':
        return <Hero key={component.id} {...component.props} onEdit={handleEdit} />;
      case 'features':
        return <Features key={component.id} {...component.props} onEdit={handleEdit} />;
      case 'benefits':
        return <Benefits key={component.id} {...component.props} onEdit={handleEdit} />;
      case 'cta':
        return <CTA key={component.id} {...component.props} onEdit={handleEdit} />;
      default:
        return null;
    }
  };

  const getPreviewWidth = () => {
    if (deviceWidth >= 1280) return 'w-full'; // Desktop
    if (deviceWidth >= 768) return 'max-w-[768px]'; // Tablet
    return 'max-w-[375px]'; // Mobile
  };

  return (
    <div className={`mx-auto transition-all duration-300 ${getPreviewWidth()}`}>
      {landingPage.components.map(renderComponent)}
    </div>
  );
}
