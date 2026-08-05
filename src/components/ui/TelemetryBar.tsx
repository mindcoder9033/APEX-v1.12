import React from 'react'
import { cn } from '../../lib/utils'

export interface TelemetryBarProps {
  label: string
  value: number // 0 to 100
  target?: number // 0 to 100
  status?: 'optimal' | 'warning' | 'critical'
  unit?: string
  className?: string
}

export const TelemetryBar: React.FC<TelemetryBarProps> = ({
  label,
  value,
  target,
  status = 'optimal',
  unit = '%',
  className,
}) => {
  const statusColors = {
    optimal: 'bg-[#00E599]',
    warning: 'bg-[#FFB800]',
    critical: 'bg-[#FF3B30]',
  }

  return (
    <div className={cn('space-y-1.5 font-mono text-xs', className)}>
      <div className="flex justify-between items-center text-[#9CA3AF]">
        <span className="uppercase tracking-wider font-sans text-xs font-semibold text-[#F3F4F6]">{label}</span>
        <div className="flex items-center gap-2">
          {target !== undefined && (
            <span className="text-[#9CA3AF]">Target: {target}{unit}</span>
          )}
          <span className="text-[#F3F4F6] font-bold">{value}{unit}</span>
        </div>
      </div>
      <div className="h-3 w-full bg-[#1A1E2B] border border-[#262C3D] rounded relative overflow-hidden">
        {/* Target line indicator if set */}
        {target !== undefined && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white/70 z-10"
            style={{ left: `${Math.min(100, Math.max(0, target))}%` }}
          />
        )}
        {/* Active Telemetry Fill */}
        <div
          className={cn('h-full transition-all duration-300', statusColors[status])}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    </div>
  )
}
