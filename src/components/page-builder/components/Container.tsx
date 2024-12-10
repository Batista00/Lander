import { cn } from '@/lib/utils';

interface ContainerProps {
  content: {
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    [key: string]: any;
  };
  children?: React.ReactNode;
}

export function Container({ content, children }: ContainerProps) {
  const {
    backgroundColor = 'transparent',
    padding = '4',
    maxWidth = '7xl'
  } = content;

  return (
    <div className="relative group">
      <div
        className={cn(
          'w-full mx-auto',
          `max-w-${maxWidth}`,
          `p-${padding}`,
          'relative'
        )}
        style={{ backgroundColor }}
      >
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}
