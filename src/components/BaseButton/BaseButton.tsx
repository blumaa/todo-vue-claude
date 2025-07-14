import { type ReactNode } from 'react';

interface BaseButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export const BaseButton = ({ children, type = 'button', onClick }: BaseButtonProps) => {
  return (
    <button 
      type={type}
      onClick={onClick}
      className="border border-neutral-300 hover:bg-neutral-100 rounded px-2 py-1"
    >
      {children}
    </button>
  );
};