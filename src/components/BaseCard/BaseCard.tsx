import { type ReactNode } from 'react';

interface BaseCardProps {
  children: ReactNode;
  className?: string;
}

export const BaseCard = ({ children, className = '' }: BaseCardProps) => {
  return (
    <div className={`border border-neutral-300 rounded bg-white py-2 px-4 ${className}`}>
      {children}
    </div>
  );
};