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
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#090A0F] disabled:opacity-50 disabled:cursor-not-allowed select-none'
  
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded',
    md: 'text-sm px-4 py-2 rounded-md',
    lg: 'text-base px-6 py-3 rounded-lg font-semibold',
  }

  const variantStyles = {
    primary: 'bg-[#00E599] text-[#090A0F] hover:bg-[#00FFAB] focus:ring-[#00E599] font-semibold shadow-[0_0_15px_rgba(0,229,153,0.2)]',
    secondary: 'bg-[#3B82F6] text-white hover:bg-blue-600 focus:ring-[#3B82F6]',
    telemetry: 'bg-[#12151E] text-[#F3F4F6] border border-[#262C3D] hover:bg-[#1A1E2B] hover:border-[#00E599]/50 focus:ring-[#00E599]',
    danger: 'bg-[#FF3B30] text-white hover:bg-red-600 focus:ring-[#FF3B30]',
    ghost: 'bg-transparent text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#12151E]',
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
