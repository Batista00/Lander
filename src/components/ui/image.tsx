import React from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function Image({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  ...props
}: ImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('max-w-full h-auto', className)}
      loading={priority ? 'eager' : 'lazy'}
      {...props}
    />
  );
}
