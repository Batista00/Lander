import { HiOutlineStar } from 'react-icons/hi2';

interface PremiumBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function PremiumBadge({ className = '', size = 'sm' }: PremiumBadgeProps) {
  const sizes = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full bg-gradient-to-r from-amber-500 to-amber-600 ${sizes[size]} font-medium text-white ${className}`}
    >
      <HiOutlineStar className="mr-1 h-3 w-3" />
      Premium
    </span>
  );
}
