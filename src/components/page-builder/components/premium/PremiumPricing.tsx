import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Component } from "@/types/landing";

interface PricingProps {
  component: Component;
  onEdit?: (id: string, content: any) => void;
}

const PremiumPricing = ({ component, onEdit }: PricingProps) => {
  const content = component.content as {
    title: string;
    description: string;
    plans: Array<{
      name: string;
      price: string;
      period: string;
      description: string;
      features: string[];
      cta: {
        text: string;
        link: string;
      };
      highlighted?: boolean;
    }>;
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {content.description}
          </p>
        </div>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {content.plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 ring-1 ring-gray-200 ${
                plan.highlighted
                  ? 'bg-purple-600 text-white ring-purple-600'
                  : 'bg-white'
              }`}
            >
              <h3
                className={`text-lg font-semibold leading-8 ${
                  plan.highlighted ? 'text-white' : 'text-gray-900'
                }`}
              >
                {plan.name}
              </h3>
              <p
                className={`mt-4 text-sm leading-6 ${
                  plan.highlighted ? 'text-purple-100' : 'text-gray-600'
                }`}
              >
                {plan.description}
              </p>
              <div className="mt-6 flex items-baseline gap-x-1">
                <span
                  className={`text-4xl font-bold tracking-tight ${
                    plan.highlighted ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm font-semibold leading-6 ${
                    plan.highlighted ? 'text-purple-100' : 'text-gray-600'
                  }`}
                >
                  {plan.period}
                </span>
              </div>
              <Button
                className={`mt-6 w-full ${
                  plan.highlighted
                    ? 'bg-white text-purple-600 hover:bg-purple-50'
                    : ''
                }`}
                variant={plan.highlighted ? 'default' : 'outline'}
                onClick={() => window.open(plan.cta.link, '_blank')}
              >
                {plan.cta.text}
              </Button>
              <ul
                className={`mt-8 space-y-3 text-sm leading-6 ${
                  plan.highlighted ? 'text-purple-100' : 'text-gray-600'
                }`}
              >
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check
                      className={`h-6 w-5 flex-none ${
                        plan.highlighted ? 'text-white' : 'text-purple-600'
                      }`}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PremiumPricing;

export const defaultPricingContent = {
  title: "Planes que se Adaptan a tu Negocio",
  description: "Elige el plan perfecto para tus necesidades con nuestras opciones flexibles y escalables.",
  plans: [
    {
      name: "Básico",
      price: "$29",
      period: "/mes",
      description: "Todo lo necesario para empezar",
      features: [
        "5 productos",
        "Análisis básico",
        "Soporte por email",
        "Panel de control"
      ],
      cta: {
        text: "Comenzar Gratis",
        link: "#"
      }
    },
    {
      name: "Pro",
      price: "$99",
      period: "/mes",
      description: "Ideal para negocios en crecimiento",
      features: [
        "Productos ilimitados",
        "Análisis avanzado",
        "Soporte prioritario",
        "API access",
        "Integraciones premium"
      ],
      cta: {
        text: "Comenzar Prueba",
        link: "#"
      },
      highlighted: true
    },
    {
      name: "Empresa",
      price: "$299",
      period: "/mes",
      description: "Solución completa para grandes empresas",
      features: [
        "Todo de Pro",
        "SLA garantizado",
        "Cuenta dedicada",
        "Setup personalizado",
        "Seguridad avanzada"
      ],
      cta: {
        text: "Contactar Ventas",
        link: "#"
      }
    }
  ]
};
