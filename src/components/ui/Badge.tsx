import React from 'react'
import { cn } from '../../lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  children: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    success: 'bg-[#E10600]/10 text-[#E10600] border-[#E10600]/30 font-semibold',
    warning: 'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30 font-semibold',
    danger: 'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30 font-semibold',
    info: 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30',
    neutral: 'bg-[#1A1A20] text-[#9CA3AF] border-[#262630]',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-medium border uppercase tracking-wider',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
