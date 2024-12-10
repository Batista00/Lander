import { cn } from '@/lib/utils';

interface SectionProps {
  content: {
    backgroundColor?: string;
    padding?: 'none' | 'small' | 'medium' | 'large';
    width?: 'full' | 'container';
    [key: string]: any;
  };
  children?: React.ReactNode;
}

export function Section({ content, children }: SectionProps) {
  const {
    backgroundColor = 'transparent',
    padding = 'medium',
    width = 'container'
  } = content;

  const paddingClasses = {
    none: '',
    small: 'py-4',
    medium: 'py-8',
    large: 'py-16'
  };

  const widthClasses = {
    full: 'w-full',
    container: 'container mx-auto'
  };

  return (
    <section
      className={cn(
        'relative group',
        paddingClasses[padding],
      )}
      style={{ backgroundColor }}
    >
      <div className={cn(widthClasses[width], 'px-4')}>
        {children}
      </div>
    </section>
  );
}
