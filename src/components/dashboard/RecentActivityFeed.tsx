import React from 'react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Clock, Award, FileText, CheckCircle2, AlertTriangle } from 'lucide-react'
import { ActivityLogItem } from '../../services/dashboardService'

interface RecentActivityFeedProps {
  activities: ActivityLogItem[]
}

export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ activities }) => {
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString)
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return isoString
    }
  }

  const getGradeBadge = (grade?: string) => {
    switch (grade) {
      case 'MASTERED':
        return <Badge variant="success">MASTERED</Badge>
      case 'SATISFACTORY':
        return <Badge variant="info">SATISFACTORY</Badge>
      case 'NEEDS_WORK':
        return <Badge variant="warning">NEEDS WORK</Badge>
      case 'UNSATISFACTORY':
        return <Badge variant="danger">UNSATISFACTORY</Badge>
      default:
        return <Badge variant="neutral">EVALUATED</Badge>
    }
  }

  return (
    <Card className="space-y-4 bg-[#12151E] border-[#262C3D]">
      <div className="flex items-center justify-between border-b border-[#262C3D] pb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#3B82F6]" />
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#F3F4F6]">
            Recent Academy Activity Log
          </h3>
        </div>
        <span className="text-xs font-mono text-[#9CA3AF]">
          {activities.length} Recorded Entries
        </span>
      </div>

      {activities.length > 0 ? (
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {activities.map((item) => (
            <div
              key={item.id}
              className="bg-[#1A1E2B] p-3 rounded-lg border border-[#262C3D] flex items-start justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {item.type === 'MODULE_EXAM' ? (
                    <Award className="w-4 h-4 text-[#FFB800] shrink-0" />
                  ) : item.remediationRequired ? (
                    <AlertTriangle className="w-4 h-4 text-[#FFB800] shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0" />
                  )}
                  <span className="font-bold text-[#F3F4F6]">{item.title}</span>
                </div>
                <div className="text-[#9CA3AF] pl-6 font-mono text-[11px]">
                  {item.subtitle}
                </div>
                <div className="text-[#9CA3AF] pl-6 font-mono text-[10px]">
                  {formatDate(item.timestamp)}
                </div>
              </div>

              <div className="shrink-0 flex flex-col items-end gap-1">
                {getGradeBadge(item.grade)}
                {typeof item.score === 'number' && (
                  <span className="text-[11px] font-mono text-[#00E599] font-bold">
                    {item.score}% Score
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#1A1E2B] p-6 rounded border border-[#262C3D] text-center space-y-2">
          <FileText className="w-8 h-8 text-[#9CA3AF] mx-auto opacity-50" />
          <div className="text-xs font-mono text-[#F3F4F6]">No Activity Records Found</div>
          <p className="text-xs text-[#9CA3AF]">
            Your session telemetry submissions and module exam attempts will be logged here in chronological order.
          </p>
        </div>
      )}
    </Card>
  )
}
