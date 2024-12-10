import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MarketplacePage from '../page';
import { ProductGrid } from '@/components/marketplace/product-grid';
import { ProductDetail } from '@/components/marketplace/product-detail';
import { CartButton } from '@/components/marketplace/cart-button';
import type { Product } from '@/types/marketplace';

// Mock de datos para pruebas
const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Landing Page Template',
    description: 'A professional landing page template',
    price: 49.99,
    seller: {
      name: 'Digital Studio',
      rating: 4.8,
      tier: 'Elite'
    },
    rating: 4.5,
    reviews: 25,
    sales: 120,
    preview: '/images/products/landing-template.jpg',
    features: ['Responsive Design', 'SEO Optimized'],
    components: ['Header', 'Hero Section', 'Features']
  },
  {
    id: '2',
    title: 'E-commerce Template',
    description: 'Complete e-commerce solution',
    price: 79.99,
    seller: {
      name: 'Web Solutions',
      rating: 4.9,
      tier: 'Pro'
    },
    rating: 4.8,
    reviews: 32,
    sales: 85,
    preview: '/images/products/ecommerce-template.jpg',
    features: ['Shopping Cart', 'Payment Integration'],
    components: ['Product Grid', 'Cart', 'Checkout']
  }
];

describe('Marketplace Module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('MarketplacePage', () => {
    it('renders marketplace page correctly', () => {
      render(<MarketplacePage />);
      
      expect(screen.getByText(/Marketplace/i)).toBeInTheDocument();
      expect(screen.getByRole('searchbox')).toBeInTheDocument();
      expect(screen.getByText(/Featured Sellers/i)).toBeInTheDocument();
    });

    it('handles search functionality', async () => {
      render(<MarketplacePage />);
      
      const searchInput = screen.getByRole('searchbox');
      fireEvent.change(searchInput, { target: { value: 'landing page' } });
      
      expect(await screen.findByText(/Landing Page Template/i)).toBeInTheDocument();
    });
  });

  describe('ProductGrid', () => {
    const handleSort = vi.fn();
    const handleFilter = vi.fn();

    it('renders products correctly', () => {
      render(
        <ProductGrid 
          products={mockProducts} 
          onSort={handleSort} 
          onFilter={handleFilter} 
        />
      );
      
      mockProducts.forEach(product => {
        expect(screen.getByText(product.title)).toBeInTheDocument();
        expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
      });
    });

    it('handles product filtering', () => {
      render(
        <ProductGrid 
          products={mockProducts} 
          onSort={handleSort} 
          onFilter={handleFilter} 
        />
      );
      
      const filterInput = screen.getByRole('combobox');
      fireEvent.change(filterInput, { target: { value: 'price_high_to_low' } });
      
      expect(handleSort).toHaveBeenCalledWith('price_high_to_low');
    });
  });

  describe('ProductDetail', () => {
    const mockProduct = mockProducts[0];
    const handleAddToCart = vi.fn();

    it('renders product details correctly', () => {
      render(
        <ProductDetail 
          product={mockProduct} 
          onAddToCart={handleAddToCart} 
        />
      );
      
      expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
      expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.seller.name)).toBeInTheDocument();
    });

    it('handles add to cart action', () => {
      render(
        <ProductDetail 
          product={mockProduct} 
          onAddToCart={handleAddToCart} 
        />
      );
      
      const addToCartButton = screen.getByText(/Add to Cart/i);
      fireEvent.click(addToCartButton);
      
      expect(handleAddToCart).toHaveBeenCalledWith(mockProduct);
    });
  });

  describe('CartButton', () => {
    const handleClick = vi.fn();

    it('shows correct cart count', () => {
      render(<CartButton count={2} onClick={handleClick} />);
      expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('handles click event', () => {
      render(<CartButton count={1} onClick={handleClick} />);
      
      const cartButton = screen.getByRole('button');
      fireEvent.click(cartButton);
      
      expect(handleClick).toHaveBeenCalled();
    });
  });
});
