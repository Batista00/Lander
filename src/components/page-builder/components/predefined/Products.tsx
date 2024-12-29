import { Component } from '@/types/landing';
import { componentStyles } from '@/services/componentStyles';
import { cn } from '@/lib/utils';

interface ProductsProps {
  component: Component;
  className?: string;
}

export function Products({ component, className }: ProductsProps) {
  const style = componentStyles.PRODUCTS[component.style || 'free'];
  const content = component.content;

  const defaultProducts = [
    {
      title: 'Producto 1',
      description: 'Descripción breve del producto 1',
      price: '$99.99',
      image: 'https://via.placeholder.com/400x300'
    },
    {
      title: 'Producto 2',
      description: 'Descripción breve del producto 2',
      price: '$149.99',
      image: 'https://via.placeholder.com/400x300'
    },
    {
      title: 'Producto 3',
      description: 'Descripción breve del producto 3',
      price: '$199.99',
      image: 'https://via.placeholder.com/400x300'
    }
  ];

  const products = content.products || defaultProducts;

  return (
    <div className={cn(style.container, className)}>
      <div className={style.content}>
        <h2 className={style.title}>
          {content.title || 'Nuestros Productos'}
        </h2>
        {content.subtitle && (
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        )}
        
        <div className={style.grid}>
          {products.map((product, index) => (
            <div key={index} className={style.card}>
              <img
                src={product.image}
                alt={product.title}
                className={style.image}
              />
              <h3 className={style.productTitle}>{product.title}</h3>
              {component.style === 'premium' && (
                <p className="px-6 text-gray-600">{product.description}</p>
              )}
              <p className={style.price}>{product.price}</p>
              {component.style === 'premium' && (
                <button className={style.button}>
                  {content.buttonText || 'Comprar Ahora'}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
