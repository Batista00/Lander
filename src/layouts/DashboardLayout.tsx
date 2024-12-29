import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Toaster } from 'sonner';

export function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
