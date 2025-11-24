import { ReactNode } from 'react';

export default function Container({
  children,
  className = '',
  padVW = 10,   // side padding in viewport width
  clamp = false // set true when you WANT a readable max width for long text
}: {
  children: ReactNode;
  className?: string;
  padVW?: number;
  clamp?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full ${clamp ? 'max-w-6xl' : 'max-w-none'} ${className}`}
      style={{ paddingInline: `max(${padVW}vw, 1rem)` }} // never smaller than 16px
    >
      {children}
    </div>
  );
}
