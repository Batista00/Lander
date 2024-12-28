import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Component } from '@/types/landing';
import { Check } from 'lucide-react';

interface PricingProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
}

export const Pricing: React.FC<PricingProps> = ({
  component,
  mode = 'preview'
}) => {
  const {
    title = 'Planes y Precios',
    description = 'Elige el plan que mejor se adapte a tus necesidades',
    plans = [
      {
        name: 'Básico',
        price: '9.99',
        period: 'mes',
        description: 'Perfecto para empezar',
        features: [
          'Característica 1',
          'Característica 2',
          'Característica 3'
        ],
        buttonText: 'Empezar Ahora',
        buttonLink: '#',
        highlighted: false
      },
      {
        name: 'Pro',
        price: '29.99',
        period: 'mes',
        description: 'Para negocios en crecimiento',
        features: [
          'Todo lo del plan Básico',
          'Característica Pro 1',
          'Característica Pro 2',
          'Característica Pro 3'
        ],
        buttonText: 'Comenzar',
        buttonLink: '#',
        highlighted: true
      },
      {
        name: 'Enterprise',
        price: '99.99',
        period: 'mes',
        description: 'Para grandes empresas',
        features: [
          'Todo lo del plan Pro',
          'Característica Enterprise 1',
          'Característica Enterprise 2',
          'Característica Enterprise 3',
          'Soporte 24/7'
        ],
        buttonText: 'Contactar',
        buttonLink: '#',
        highlighted: false
      }
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                'rounded-lg p-8 transition-all duration-200',
                'border border-border',
                plan.highlighted && 'border-primary shadow-lg scale-105'
              )}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground ml-2">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? 'default' : 'outline'}
                size="lg"
                className="w-full"
                onClick={() => {
                  if (mode === 'published') {
                    window.open(plan.buttonLink, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
