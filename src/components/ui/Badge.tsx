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
    success: 'bg-[#00E599]/10 text-[#00E599] border-[#00E599]/30',
    warning: 'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30',
    danger: 'bg-[#FF3B30]/10 text-[#FF3B30] border-[#FF3B30]/30',
    info: 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30',
    neutral: 'bg-[#1A1E2B] text-[#9CA3AF] border-[#262C3D]',
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
