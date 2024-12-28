import React from 'react';
import { LandingPage } from '@/types/landing';
import { RenderLandingPage } from './RenderLandingPage';

interface PublishedLandingProps {
  landingPage: LandingPage;
  className?: string;
}

export const PublishedLanding: React.FC<PublishedLandingProps> = ({
  landingPage,
  className
}) => {
  return (
    <RenderLandingPage
      landingPage={landingPage}
      mode="published"
      className={className}
    />
  );
};
