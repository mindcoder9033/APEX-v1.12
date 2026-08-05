import React from 'react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { TelemetryBar } from '../ui/TelemetryBar'
import { Target, Award, Cpu, ShieldCheck, Activity } from 'lucide-react'

export interface CoachConsoleProps {
  currentObjective?: string
  prescription?: {
    track: string
    car: string
    assists: string
    weather: string
  }
  telemetryMetrics?: Array<{
    label: string
    value: number
    target: number
    unit?: string
    status?: 'optimal' | 'warning' | 'critical'
  }>
  coachAdvice?: string
  className?: string
}

export const CoachConsole: React.FC<CoachConsoleProps> = ({
  currentObjective = 'Achieve trail braking control into Turn 1 with <5% pedal variance.',
  prescription = {
    track: 'Catalunya National',
    car: 'Subaru BRZ / Toyota GR86 (D Class)',
    assists: 'ABS On, TCS Off, Manual',
    weather: 'Clear / Dry Surface',
  },
  telemetryMetrics = [
    { label: 'Brake Release Smoothness', value: 92, target: 90, status: 'optimal' },
    { label: 'Apex Speed Variance', value: 84, target: 88, status: 'warning' },
    { label: 'Throttle Application Point', value: 96, target: 95, status: 'optimal' },
  ],
  coachAdvice = 'Focus on releasing the brake pedal progressively before reaching turn-in. Abrupt release unloads the front axle and creates understeer.',
  className,
}) => {
  return (
    <aside className={`w-80 flex-shrink-0 flex flex-col gap-4 ${className || ''}`}>
      {/* Coach Console Panel Header */}
      <div className="bg-[#12151E] border border-[#262C3D] rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/30">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sans font-semibold text-sm text-[#F3F4F6]">Coach Console</h3>
            <p className="font-mono text-[11px] text-[#9CA3AF]">Moza R3 Telemetry Engine</p>
          </div>
        </div>
        <Badge variant="success" className="animate-pulse">Active</Badge>
      </div>

      {/* Today's Training Objective */}
      <Card accentBorder className="space-y-3">
        <div className="flex items-center gap-2 text-[#00E599]">
          <Target className="w-4 h-4" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider">Active Objective</span>
        </div>
        <p className="font-learning text-sm text-[#F3F4F6] leading-relaxed">
          {currentObjective}
        </p>
      </Card>

      {/* Live Telemetry Target Benchmarks */}
      {telemetryMetrics && telemetryMetrics.length > 0 && (
        <Card className="space-y-3">
          <div className="flex items-center gap-2 text-[#3B82F6]">
            <Activity className="w-4 h-4" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider">Telemetry Targets</span>
          </div>
          <div className="space-y-3 pt-1">
            {telemetryMetrics.map((metric, index) => (
              <TelemetryBar
                key={index}
                label={metric.label}
                value={metric.value}
                target={metric.target}
                unit={metric.unit || '%'}
                status={metric.status || 'optimal'}
              />
            ))}
          </div>
        </Card>
      )}

      {/* Prescribed Session Parameters */}
      <Card className="space-y-2.5">
        <div className="flex items-center gap-2 text-[#FFB800]">
          <ShieldCheck className="w-4 h-4" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider">Prescribed Config</span>
        </div>
        <div className="space-y-1.5 font-mono text-xs text-[#9CA3AF]">
          <div className="flex justify-between border-b border-[#262C3D]/50 pb-1">
            <span>Track:</span>
            <span className="text-[#F3F4F6] font-medium">{prescription.track}</span>
          </div>
          <div className="flex justify-between border-b border-[#262C3D]/50 pb-1">
            <span>Vehicle:</span>
            <span className="text-[#F3F4F6] font-medium">{prescription.car}</span>
          </div>
          <div className="flex justify-between border-b border-[#262C3D]/50 pb-1">
            <span>Assists:</span>
            <span className="text-[#F3F4F6] font-medium">{prescription.assists}</span>
          </div>
          <div className="flex justify-between">
            <span>Weather:</span>
            <span className="text-[#F3F4F6] font-medium">{prescription.weather}</span>
          </div>
        </div>
      </Card>

      {/* Coach Note / Guidance */}
      {coachAdvice && (
        <Card className="space-y-2 bg-[#161B26] border-[#3B82F6]/30">
          <div className="flex items-center gap-2 text-[#3B82F6]">
            <Award className="w-4 h-4" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider">Coach Guidance</span>
          </div>
          <p className="font-learning text-xs text-[#F3F4F6] leading-relaxed italic">
            "{coachAdvice}"
          </p>
        </Card>
      )}
    </aside>
  )
}
