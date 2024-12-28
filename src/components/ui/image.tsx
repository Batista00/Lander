import React from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}

export function Image({
  src,
  alt,
  width,
  height,
  className,
  fill,
  priority = false,
  ...props
}: ImageProps) {
  const imageStyle = fill ? {
    position: 'absolute',
    height: '100%',
    width: '100%',
    inset: '0px',
    objectFit: 'cover',
  } : {};

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn('max-w-full h-auto', className)}
      loading={priority ? 'eager' : 'lazy'}
      style={imageStyle}
      {...props}
    />
  );
}
