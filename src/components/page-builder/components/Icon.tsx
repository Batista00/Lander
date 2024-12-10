import { forwardRef } from 'react';
import { IconType } from 'react-icons';

interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  icon: IconType;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(({ icon: IconComponent, ...props }, ref) => {
  const Component = IconComponent as React.ComponentType<any>;
  return <Component {...props} />;
});
