import React from 'react'
import { Card } from '../ui/Card'
import { Clock, CheckSquare, Target, Activity } from 'lucide-react'
import { DashboardMetrics } from '../../services/dashboardService'

interface AnalyticsGridProps {
  metrics: DashboardMetrics
}

export const AnalyticsGrid: React.FC<AnalyticsGridProps> = ({ metrics }) => {
  const hours = (metrics.totalPracticeMinutes / 60).toFixed(1)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Practice Hours */}
      <Card className="bg-[#12151E] border-[#262C3D] space-y-2 p-4">
        <div className="flex items-center justify-between text-[#9CA3AF]">
          <span className="text-xs font-mono uppercase tracking-wider">Practice Time</span>
          <Clock className="w-4 h-4 text-[#3B82F6]" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold font-mono text-[#F3F4F6]">{hours}</span>
          <span className="text-xs font-mono text-[#9CA3AF]">HRS</span>
        </div>
        <div className="text-[11px] text-[#9CA3AF]">Total cockpit time logged</div>
      </Card>

      {/* Completion Rate */}
      <Card className="bg-[#12151E] border-[#262C3D] space-y-2 p-4">
        <div className="flex items-center justify-between text-[#9CA3AF]">
          <span className="text-xs font-mono uppercase tracking-wider">Completion</span>
          <CheckSquare className="w-4 h-4 text-[#00E599]" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold font-mono text-[#00E599]">
            {metrics.completionRatePercent}%
          </span>
        </div>
        <div className="text-[11px] text-[#9CA3AF]">
          {metrics.totalSessionsCompleted} sessions completed
        </div>
      </Card>

      {/* Mastery Rate */}
      <Card className="bg-[#12151E] border-[#262C3D] space-y-2 p-4">
        <div className="flex items-center justify-between text-[#9CA3AF]">
          <span className="text-xs font-mono uppercase tracking-wider">Mastery Rate</span>
          <Target className="w-4 h-4 text-[#FFB800]" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold font-mono text-[#FFB800]">
            {metrics.masteryRatePercent}%
          </span>
        </div>
        <div className="text-[11px] text-[#9CA3AF]">
          {metrics.totalEvaluatedSessions} sessions evaluated
        </div>
      </Card>

      {/* Clean Laps Ratio */}
      <Card className="bg-[#12151E] border-[#262C3D] space-y-2 p-4">
        <div className="flex items-center justify-between text-[#9CA3AF]">
          <span className="text-xs font-mono uppercase tracking-wider">Consistency</span>
          <Activity className="w-4 h-4 text-[#00E599]" />
        </div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-bold font-mono text-[#F3F4F6]">
            {metrics.cleanLapRatioPercent}%
          </span>
          <span className="text-xs font-mono text-[#9CA3AF]">CLEAN</span>
        </div>
        <div className="text-[11px] text-[#9CA3AF]">
          Avg Delta: {metrics.avgConsistencyDeltaSeconds}s
        </div>
      </Card>
    </div>
  )
}
