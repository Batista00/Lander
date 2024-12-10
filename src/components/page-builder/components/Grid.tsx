import { cn } from '@/lib/utils';

interface GridProps {
  content: {
    columns?: number;
    gap?: number;
    backgroundColor?: string;
    [key: string]: any;
  };
  children?: React.ReactNode;
}

export function Grid({ content, children }: GridProps) {
  const {
    columns = 3,
    gap = 8,
    backgroundColor = 'transparent'
  } = content;

  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
  };

  const gapClasses = {
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
    12: 'gap-12'
  };

  return (
    <div className={cn('relative group', backgroundColor)}>
      <div
        className={cn(
          'grid',
          columnClasses[columns as keyof typeof columnClasses],
          gapClasses[gap as keyof typeof gapClasses]
        )}
        style={{ backgroundColor }}
      >
        {children}
      </div>
    </div>
  );
}
