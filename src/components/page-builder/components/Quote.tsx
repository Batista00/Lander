import { cn } from '@/lib/utils';

interface QuoteProps {
  id: string;
  content: {
    quote: string;
    author?: string;
    role?: string;
    avatarUrl?: string;
    style?: 'simple' | 'modern' | 'elegant';
    backgroundColor?: string;
    textColor?: string;
    accentColor?: string;
    alignment?: 'left' | 'center' | 'right';
    size?: 'small' | 'medium' | 'large';
  };
  onEdit?: () => void;
}

export function Quote({ id, content, onEdit }: QuoteProps) {
  const {
    quote,
    author,
    role,
    avatarUrl,
    style = 'modern',
    backgroundColor = 'bg-white',
    textColor = 'text-gray-900',
    accentColor = 'text-blue-500',
    alignment = 'left',
    size = 'medium'
  } = content;

  const sizeClasses = {
    small: 'text-lg',
    medium: 'text-xl',
    large: 'text-2xl'
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const renderQuoteIcon = () => (
    <svg
      className={cn(
        "w-8 h-8 mb-4",
        accentColor,
        {
          'mx-auto': alignment === 'center',
          'ml-auto': alignment === 'right'
        }
      )}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );

  const renderSimpleQuote = () => (
    <div className={cn(
      "relative p-6 rounded-lg",
      backgroundColor,
      textColor,
      alignmentClasses[alignment]
    )}>
      <blockquote className={cn(
        "font-medium italic",
        sizeClasses[size]
      )}>
        "{quote}"
      </blockquote>
      {(author || role) && (
        <div className="mt-4">
          {author && (
            <cite className="font-semibold not-italic">
              {author}
            </cite>
          )}
          {role && (
            <p className="mt-1 text-sm opacity-80">
              {role}
            </p>
          )}
        </div>
      )}
    </div>
  );

  const renderModernQuote = () => (
    <div className={cn(
      "relative p-8 rounded-xl shadow-lg",
      backgroundColor,
      textColor,
      alignmentClasses[alignment]
    )}>
      {renderQuoteIcon()}
      <blockquote className={cn(
        "font-medium",
        sizeClasses[size]
      )}>
        {quote}
      </blockquote>
      {(author || role || avatarUrl) && (
        <div className={cn(
          "mt-6 flex items-center gap-4",
          {
            'justify-center': alignment === 'center',
            'justify-end': alignment === 'right'
          }
        )}>
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt={author}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            {author && (
              <cite className="font-semibold not-italic">
                {author}
              </cite>
            )}
            {role && (
              <p className="mt-1 text-sm opacity-80">
                {role}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderElegantQuote = () => (
    <div className={cn(
      "relative p-10",
      backgroundColor,
      textColor,
      alignmentClasses[alignment]
    )}>
      <div className={cn(
        "absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 -mt-3 -ml-3",
        accentColor
      )} />
      <blockquote className={cn(
        "relative font-serif",
        sizeClasses[size]
      )}>
        {quote}
      </blockquote>
      {(author || role) && (
        <div className="mt-6">
          <div className={cn(
            "w-12 h-0.5 mb-4",
            accentColor,
            {
              'mx-auto': alignment === 'center',
              'ml-auto': alignment === 'right'
            }
          )} />
          {author && (
            <cite className="font-semibold not-italic">
              {author}
            </cite>
          )}
          {role && (
            <p className="mt-1 text-sm opacity-80">
              {role}
            </p>
          )}
        </div>
      )}
    </div>
  );

  const renderQuoteByStyle = () => {
    switch (style) {
      case 'simple':
        return renderSimpleQuote();
      case 'modern':
        return renderModernQuote();
      case 'elegant':
        return renderElegantQuote();
      default:
        return renderSimpleQuote();
    }
  };

  return (
    <div className="relative group">
      {renderQuoteByStyle()}
    </div>
  );
}
