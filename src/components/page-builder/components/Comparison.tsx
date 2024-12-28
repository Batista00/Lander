import React from 'react';
import { cn } from '@/lib/utils';
import { Component } from '@/types/landing';
import { Check, X } from 'lucide-react';

interface ComparisonProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
}

export const Comparison: React.FC<ComparisonProps> = ({
  component,
  mode = 'preview'
}) => {
  const {
    title = 'Comparación de Productos',
    description = 'Encuentra el producto que mejor se adapte a tus necesidades',
    products = [
      {
        name: 'Producto A',
        description: 'Versión básica con características esenciales',
        price: '$9.99',
        features: {
          'Característica 1': true,
          'Característica 2': true,
          'Característica 3': false,
          'Característica 4': false,
          'Característica 5': false
        }
      },
      {
        name: 'Producto B',
        description: 'Versión profesional con características avanzadas',
        price: '$29.99',
        features: {
          'Característica 1': true,
          'Característica 2': true,
          'Característica 3': true,
          'Característica 4': true,
          'Característica 5': false
        },
        highlighted: true
      },
      {
        name: 'Producto C',
        description: 'Versión enterprise con todas las características',
        price: '$99.99',
        features: {
          'Característica 1': true,
          'Característica 2': true,
          'Característica 3': true,
          'Característica 4': true,
          'Característica 5': true
        }
      }
    ],
    features = [
      'Característica 1',
      'Característica 2',
      'Característica 3',
      'Característica 4',
      'Característica 5'
    ]
  } = component.content;

  return (
    <div
      className={cn(
        'w-full py-16',
        component.styles?.spacing
      )}
      style={{
        backgroundColor: component.styles?.colors?.background,
        color: component.styles?.colors?.text
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left border-b"></th>
                {products.map((product, index) => (
                  <th
                    key={index}
                    className={cn(
                      'p-4 text-center border-b min-w-[200px]',
                      product.highlighted && 'bg-primary/5'
                    )}
                  >
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                      <p className="text-2xl font-bold">{product.price}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, featureIndex) => (
                <tr key={featureIndex}>
                  <td className="p-4 border-b font-medium">{feature}</td>
                  {products.map((product, productIndex) => (
                    <td
                      key={productIndex}
                      className={cn(
                        'p-4 text-center border-b',
                        product.highlighted && 'bg-primary/5'
                      )}
                    >
                      {product.features[feature] ? (
                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
