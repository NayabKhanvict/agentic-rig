import React from "react";

interface MockImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  [key: string]: unknown;
}

export default function MockImage({ src, alt, width, height, className, ...rest }: MockImageProps) {
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  return <img src={src} alt={alt} width={width} height={height} className={className} {...rest} />;
}
