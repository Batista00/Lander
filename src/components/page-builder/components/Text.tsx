import { cn } from '@/lib/utils';

interface TextProps {
  id: string;
  content: {
    text: string;
    alignment?: 'left' | 'center' | 'right';
    size?: 'small' | 'medium' | 'large';
    color?: string;
    backgroundColor?: string;
    padding?: 'small' | 'medium' | 'large';
    fontWeight?: 'normal' | 'medium' | 'bold';
  };
  onEdit?: () => void;
}

export function Text({ id, content, onEdit }: TextProps) {
  const {
    text,
    alignment = 'left',
    size = 'medium',
    color = 'text-gray-700',
    backgroundColor = 'bg-transparent',
    padding = 'medium',
    fontWeight = 'normal'
  } = content;

  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const paddingClasses = {
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6'
  };

  const fontWeightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold'
  };

  return (
    <div
      className={cn(
        'relative group transition-all duration-200',
        backgroundColor,
        paddingClasses[padding]
      )}
    >
      <p
        className={cn(
          'whitespace-pre-wrap break-words',
          color,
          sizeClasses[size],
          fontWeightClasses[fontWeight],
          {
            'text-left': alignment === 'left',
            'text-center': alignment === 'center',
            'text-right': alignment === 'right'
          }
        )}
      >
        {text}
      </p>
      {onEdit && (
        <button
          onClick={onEdit}
          className="absolute hidden group-hover:flex items-center justify-center top-2 right-2 w-8 h-8 bg-blue-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
