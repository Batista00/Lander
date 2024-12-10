import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}