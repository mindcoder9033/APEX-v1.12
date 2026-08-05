import React from 'react'
import { cn } from '../../lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  accentBorder?: boolean
  children: React.ReactNode
}

export const Card: React.FC<CardProps> = ({
  accentBorder = false,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-[#121216] border border-[#262630] rounded-xl p-5 shadow-lg relative overflow-hidden transition-all duration-200',
        accentBorder && 'border-l-4 border-l-[#E10600]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
