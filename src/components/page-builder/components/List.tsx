import { cn } from '@/lib/utils';

interface ListItem {
  id: string;
  text: string;
  icon?: string;
  subtext?: string;
}

interface ListProps {
  id: string;
  content: {
    items: ListItem[];
    type?: 'bullet' | 'number' | 'check' | 'custom';
    iconColor?: string;
    spacing?: 'tight' | 'normal' | 'relaxed';
    size?: 'small' | 'medium' | 'large';
    columns?: 1 | 2 | 3;
    backgroundColor?: string;
    textColor?: string;
  };
  onEdit?: () => void;
}

export function List({ id, content, onEdit }: ListProps) {
  const {
    items = [],
    type = 'bullet',
    iconColor = 'text-blue-500',
    spacing = 'normal',
    size = 'medium',
    columns = 1,
    backgroundColor = 'bg-transparent',
    textColor = 'text-gray-700'
  } = content;

  const spacingClasses = {
    tight: 'space-y-2',
    normal: 'space-y-4',
    relaxed: 'space-y-6'
  };

  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  };

  const getIcon = (type: string, index: number) => {
    switch (type) {
      case 'bullet':
        return (
          <span className={cn("inline-block w-2 h-2 rounded-full mr-3", iconColor)} />
        );
      case 'number':
        return (
          <span className={cn("mr-3 font-semibold", iconColor)}>
            {index + 1}.
          </span>
        );
      case 'check':
        return (
          <svg
            className={cn("w-5 h-5 mr-3", iconColor)}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        );
      case 'custom':
        return items[index].icon ? (
          <span className={cn("mr-3", iconColor)}>
            {items[index].icon}
          </span>
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "relative group p-6 rounded-lg",
      backgroundColor
    )}>
      <div className={cn(
        "grid gap-x-8",
        columnClasses[columns],
        spacingClasses[spacing]
      )}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "flex items-start",
              sizeClasses[size],
              textColor
            )}
          >
            {getIcon(type, index)}
            <div>
              <div className="font-medium">{item.text}</div>
              {item.subtext && (
                <p className={cn(
                  "mt-1 opacity-80",
                  sizeClasses[size === 'large' ? 'medium' : 'small']
                )}>
                  {item.subtext}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
