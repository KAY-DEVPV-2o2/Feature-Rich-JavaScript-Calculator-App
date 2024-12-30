import React from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'operator' | 'equals' | 'function';
}

export default function Button({
  children,
  variant = 'default',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'h-14 rounded-lg text-xl font-medium transition-all duration-200',
        'shadow-[0_0_15px_rgba(0,0,0,0.2)] active:scale-95',
        'hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]',
        {
          'bg-gray-700 text-blue-100 hover:bg-gray-600': variant === 'default',
          'bg-blue-600 text-white hover:bg-blue-500': variant === 'operator',
          'bg-blue-500 text-white hover:bg-blue-400 row-span-2': variant === 'equals',
          'bg-red-600 text-white hover:bg-red-500': variant === 'function',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
