import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  describe('Marketplace Navigation', () => {
    it('should show marketplace menu when clicked', async () => {
      const user = userEvent.setup();
      
      const marketplaceMenu = screen.getByText('Marketplace');
      await user.click(marketplaceMenu);

      expect(screen.getByText('Explorar')).toBeInTheDocument();
      expect(screen.getByText('Mis Compras')).toBeInTheDocument();
      expect(screen.getByText('Favoritos')).toBeInTheDocument();
      expect(screen.getByText('Vender')).toBeInTheDocument();
    });

    it('should navigate to correct pages', async () => {
      const user = userEvent.setup();
      
      // Explorar
      await user.click(screen.getByText('Marketplace'));
      await user.click(screen.getByText('Explorar'));
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard/marketplace');

      // Mis Compras
      await user.click(screen.getByText('Mis Compras'));
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard/marketplace/purchases');

      // Favoritos
      await user.click(screen.getByText('Favoritos'));
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard/marketplace/favorites');

      // Vender
      await user.click(screen.getByText('Vender'));
      expect(mockRouter.push).toHaveBeenCalledWith('/dashboard/marketplace/seller');
    });
  });

  describe('Marketplace Interaction Flow', () => {
    it('should handle product exploration flow', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByText('Marketplace'));
      await user.click(screen.getByText('Explorar'));

      const searchInput = screen.getByPlaceholderText('Buscar productos...');
      await user.type(searchInput, 'landing page');

      const filterSelect = screen.getByLabelText('Ordenar por');
      await user.selectOptions(filterSelect, 'price_low_to_high');

      const products = screen.getAllByTestId('product-card');
      expect(products.length).toBeGreaterThan(0);
    });

    it('should handle error states', async () => {
      const user = userEvent.setup();
      
      // Simular error de red
      vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

      await user.click(screen.getByText('Marketplace'));
      await user.click(screen.getByText('Explorar'));

      expect(screen.getByText('Error al cargar productos')).toBeInTheDocument();
    });
  });

  describe('Marketplace Interaction Flow', () => {
    it('should follow complete purchase flow', async () => {
      const user = userEvent.setup();
      
      // 1. Ir a un producto
      await user.click(screen.getByText('Marketplace'));
      await user.click(screen.getByText('Explorar'));
      
      // 2. Seleccionar un producto
      const firstProduct = screen.getAllByTestId('product-card')[0];
      await user.click(firstProduct);

      // 3. Ver detalles y agregar al carrito
      const addToCartButton = screen.getByText('Agregar al Carrito');
      await user.click(addToCartButton);

      // 4. Verificar que se agregó al carrito
      const cartCount = screen.getByTestId('cart-count');
      expect(cartCount.textContent).toBe('1');
    });

    it('should follow complete wishlist flow', async () => {
      const user = userEvent.setup();
      
      // 1. Ir a Explorar
      await user.click(screen.getByText('Marketplace'));
      await user.click(screen.getByText('Explorar'));

      // 2. Agregar a favoritos
      const firstProduct = screen.getAllByTestId('product-card')[0];
      const wishlistButton = within(firstProduct).getByTestId('wishlist-button');
      await user.click(wishlistButton);

      // 3. Ir a Favoritos y verificar
      await user.click(screen.getByText('Favoritos'));
      const savedProducts = screen.getAllByTestId('product-card');
      expect(savedProducts.length).toBe(1);
    });

    it('should follow complete seller flow', async () => {
      const user = userEvent.setup();
      
      // 1. Ir a Vender
      await user.click(screen.getByText('Marketplace'));
      await user.click(screen.getByText('Vender'));

      // 2. Verificar panel de vendedor
      expect(screen.getByText('Panel de Vendedor')).toBeVisible();
      expect(screen.getByText('Subir Producto')).toBeVisible();

      // 3. Intentar subir un producto
      await user.click(screen.getByText('Subir Producto'));
      expect(screen.getByText('Crear Nuevo Producto')).toBeVisible();
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors gracefully', async () => {
      const user = userEvent.setup();
      
      // Simular error de red
      vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Network error'));

      await user.click(screen.getByText('Marketplace'));
      await user.click(screen.getByText('Explorar'));

      expect(screen.getByText('Error al cargar productos')).toBeVisible();
    });

    it('should handle empty search results', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByText('Marketplace'));
      await user.click(screen.getByText('Explorar'));

      const searchInput = screen.getByPlaceholderText('Buscar productos...');
      await user.type(searchInput, 'producto inexistente xyz123');

      expect(screen.getByText('No se encontraron resultados')).toBeVisible();
    });
  });
});
