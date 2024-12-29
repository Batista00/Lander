import { Outlet } from 'react-router-dom';

export function Leads() {
  return (
    <div className="container mx-auto p-4">
      <Outlet />
    </div>
  );
}
