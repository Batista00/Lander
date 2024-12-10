import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface PricingProps {
  id: string;
  data: {
    title?: string;
    subtitle?: string;
    plans?: Array<{
      name: string;
      price: string;
      period: string;
      description: string;
      features: string[];
      buttonText: string;
      popular?: boolean;
    }>;
    style?: {
      backgroundColor?: string;
      textColor?: string;
    };
  };
  onEdit?: () => void;
}

const defaultPlans = [
  {
    name: "Plan Básico",
    price: "9.99",
    period: "mes",
    description: "Todo lo que necesitas para empezar",
    features: ["Característica 1", "Característica 2"],
    buttonText: "Empezar",
    popular: false
  }
];

export function Pricing({ id, data, onEdit }: PricingProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const backgroundColor = data.style?.backgroundColor || 'bg-white';
  const textColor = data.style?.textColor || 'text-gray-900';
  const plans = Array.isArray(data.plans) ? data.plans : defaultPlans;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'relative w-full py-24 sm:py-32 cursor-move',
        backgroundColor,
        textColor
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {data.title || 'Precios'}
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {data.subtitle || 'Planes que se adaptan a tus necesidades'}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:gap-y-0 sm:grid-cols-2 lg:max-w-4xl lg:grid-cols-3 lg:gap-x-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                'relative flex flex-col rounded-2xl p-8 shadow-sm ring-1 ring-gray-200',
                plan.popular && 'scale-105 shadow-lg ring-2 ring-blue-600'
              )}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
                  Popular
                </span>
              )}
              <div className="mb-8">
                <h3 className="text-lg font-semibold leading-8">{plan.name}</h3>
                <p className="mt-4 text-sm leading-6 text-gray-600">
                  {plan.description}
                </p>
                <div className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight">
                    ${plan.price}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    /{plan.period}
                  </span>
                </div>
              </div>
              <ul role="list" className="mb-8 space-y-3 text-sm leading-6 text-gray-600">
                {plan.features?.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex gap-x-3">
                    <Check className="h-5 w-5 flex-none text-blue-600" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={cn(
                  'mt-auto block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus-visible:outline-gray-600'
                )}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="absolute top-4 right-4 p-2 rounded-md bg-gray-100 hover:bg-gray-200"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      )}
    </div>
  );
}
