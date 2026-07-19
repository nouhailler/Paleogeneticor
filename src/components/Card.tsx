import type { PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <article className={`rounded-lg border border-black/10 bg-paper p-5 shadow-soft ${className}`}>
      {children}
    </article>
  );
}
