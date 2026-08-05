import React from 'react'
import { cn } from '../../lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'telemetry' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#08080A] disabled:opacity-50 disabled:cursor-not-allowed select-none'
  
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-md',
    md: 'text-sm px-4 py-2 rounded-md',
    lg: 'text-base px-6 py-3 rounded-lg font-semibold',
  }

  const variantStyles = {
    primary: 'bg-[#E10600] text-white hover:bg-[#FF1E19] focus:ring-[#E10600] font-semibold shadow-[0_0_15px_rgba(225,6,0,0.35)]',
    secondary: 'bg-[#3B82F6] text-white hover:bg-blue-600 focus:ring-[#3B82F6]',
    telemetry: 'bg-[#121216] text-[#F3F4F6] border border-[#262630] hover:bg-[#1A1A20] hover:border-[#E10600]/50 focus:ring-[#E10600]',
    danger: 'bg-[#FFB800] text-[#08080A] hover:bg-amber-400 focus:ring-[#FFB800] font-semibold',
    ghost: 'bg-transparent text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#121216]',
  }

  return (
    <button
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
