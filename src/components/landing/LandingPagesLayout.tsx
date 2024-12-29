import { Outlet } from 'react-router-dom';

export const LandingPagesLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  );
};
