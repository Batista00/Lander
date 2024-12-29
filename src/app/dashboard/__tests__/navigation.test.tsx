import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DashboardLayout from '../layout';
import { MainNav } from '@/components/dashboard/main-nav';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: () => '/dashboard',
  useRouter: vi.fn(),
}));

describe('Dashboard Navigation Flow', () => {
  const mockRouter = {
    push: vi.fn(),
    pathname: '/dashboard',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue(mockRouter);
    render(
      <DashboardLayout>
        <MainNav />
      </DashboardLayout>
    );
  });

  it('should navigate to landing pages section', async () => {
    const user = userEvent.setup();
    
    await user.click(screen.getByText('Landing Pages'));
    await user.click(screen.getByText('Mis Landing Pages'));
    expect(mockRouter.push).toHaveBeenCalledWith('/dashboard/landing-pages/list');
  });

  it('should navigate to leads section', async () => {
    const user = userEvent.setup();
    
    await user.click(screen.getByText('Leads'));
    await user.click(screen.getByText('Todos los Leads'));
    expect(mockRouter.push).toHaveBeenCalledWith('/dashboard/leads/all');

    await user.click(screen.getByText('Campañas'));
    expect(mockRouter.push).toHaveBeenCalledWith('/dashboard/leads/campaigns');
  });

  it('should navigate to analytics', async () => {
    const user = userEvent.setup();
    
    await user.click(screen.getByText('Analytics'));
    expect(mockRouter.push).toHaveBeenCalledWith('/dashboard/analytics');
  });

  it('should navigate to settings', async () => {
    const user = userEvent.setup();
    
    await user.click(screen.getByText('Configuración'));
    expect(mockRouter.push).toHaveBeenCalledWith('/dashboard/settings');
  });
});
