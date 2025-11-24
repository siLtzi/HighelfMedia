import { ReactNode } from 'react';

export default function Container({
  children,
  className = '',
  padVW = 10,  
  clamp = false 
}: {
  children: ReactNode;
  className?: string;
  padVW?: number;
  clamp?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full ${clamp ? 'max-w-6xl' : 'max-w-none'} ${className}`}
      style={{ paddingInline: `max(${padVW}vw, 1rem)` }}
    >
      {children}
    </div>
  );
}
