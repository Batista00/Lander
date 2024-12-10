import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  buttonText?: string;
  buttonUrl?: string;
}

interface ProductsProps {
  id: string;
  content: {
    title: string;
    subtitle: string;
    products: Product[];
    columns?: number;
    backgroundColor?: string;
    textColor?: string;
    showPrices?: boolean;
    showButtons?: boolean;
    imageAspect?: 'square' | 'landscape' | 'portrait';
  };
  onEdit?: () => void;
}

export function Products({ id, content, onEdit }: ProductsProps) {
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

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[content.columns || 3];

  const getImageAspect = (aspect?: string) => {
    switch (aspect) {
      case 'landscape':
        return 'aspect-[4/3]';
      case 'portrait':
        return 'aspect-[3/4]';
      default: // square
        return 'aspect-square';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "relative py-24 sm:py-32 cursor-move",
        content.backgroundColor || "bg-white"
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className={cn(
            "text-3xl font-bold tracking-tight sm:text-4xl mb-4",
            content.textColor || "text-gray-900"
          )}>
            {content.title}
          </h2>
          {content.subtitle && (
            <p className={cn(
              "text-lg leading-8",
              content.textColor ? content.textColor.replace('text-', 'text-opacity-70 text-') : "text-gray-600"
            )}>
              {content.subtitle}
            </p>
          )}
        </div>

        <div className={cn(
          "grid gap-x-8 gap-y-10",
          gridCols
        )}>
          {content.products.map((product) => (
            <div key={product.id} className="group">
              <div className={cn(
                "relative overflow-hidden rounded-lg bg-gray-100 mb-4",
                getImageAspect(content.imageAspect)
              )}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                />
              </div>
              <div>
                <h3 className={cn(
                  "text-xl font-semibold mb-2",
                  content.textColor || "text-gray-900"
                )}>
                  {product.name}
                </h3>
                <p className={cn(
                  "text-base mb-4",
                  content.textColor ? content.textColor.replace('text-', 'text-opacity-70 text-') : "text-gray-600"
                )}>
                  {product.description}
                </p>
                {content.showPrices && (
                  <p className={cn(
                    "text-lg font-medium mb-4",
                    content.textColor || "text-gray-900"
                  )}>
                    {product.price}
                  </p>
                )}
                {content.showButtons && product.buttonText && (
                  <a
                    href={product.buttonUrl || '#'}
                    className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                  >
                    {product.buttonText}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {onEdit && (
        <button
          onClick={onEdit}
          className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Editar
        </button>
      )}
    </div>
  );
}
