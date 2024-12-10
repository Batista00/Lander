import { Outlet } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';

export function Dashboard() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}