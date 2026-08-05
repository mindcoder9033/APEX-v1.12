import React from 'react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { AlertTriangle, Award, CheckCircle, FileText } from 'lucide-react'
import { InstructorFeedbackSummary } from '../../services/dashboardService'

interface InstructorFeedbackCardProps {
  feedback: InstructorFeedbackSummary
}

export const InstructorFeedbackCard: React.FC<InstructorFeedbackCardProps> = ({ feedback }) => {
  const { latestAssessment, activeRemediationCount } = feedback

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
        return <Badge variant="neutral">EVALUATION PENDING</Badge>
    }
  }

  return (
    <Card className="space-y-4 bg-[#121216] border-[#262630]">
      <div className="flex items-center justify-between border-b border-[#262630] pb-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#E10600]" />
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#F3F4F6]">
            AI Instructor Feedback
          </h3>
        </div>
        {activeRemediationCount > 0 ? (
          <span className="flex items-center gap-1 text-xs font-mono text-[#FFB800]">
            <AlertTriangle className="w-3.5 h-3.5" />
            {activeRemediationCount} Remediation Required
          </span>
        ) : (
          <span className="text-xs font-mono text-[#E10600] flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Objective Mastery On Track
          </span>
        )}
      </div>

      {latestAssessment ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-mono text-[#9CA3AF]">
              Latest Session: <strong className="text-[#F3F4F6]">{latestAssessment.sessionId}</strong>
            </div>
            {getGradeBadge(latestAssessment.result?.grade)}
          </div>

          {/* Assessment Score & Lap Stats Pill */}
          <div className="grid grid-cols-3 gap-2 bg-[#1A1A20] p-2.5 rounded border border-[#262630] text-center font-mono">
            <div>
              <div className="text-[10px] text-[#9CA3AF]">OVERALL SCORE</div>
              <div className="text-base font-bold text-[#E10600]">
                {latestAssessment.result?.score || 0}%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#9CA3AF]">BEST LAP</div>
              <div className="text-xs font-semibold text-[#F3F4F6] mt-1">
                {latestAssessment.entry.bestLap}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#9CA3AF]">CLEAN LAPS</div>
              <div className="text-xs font-semibold text-[#3B82F6] mt-1">
                {latestAssessment.entry.cleanLaps} / {latestAssessment.entry.totalLaps}
              </div>
            </div>
          </div>

          {/* Remediation Callout if needed */}
          {latestAssessment.remediationPlan && (
            <div className="bg-[#FFB800]/10 border border-[#FFB800]/30 rounded p-3 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#FFB800]">
                <AlertTriangle className="w-4 h-4" />
                Remediation: {latestAssessment.remediationPlan.title}
              </div>
              <p className="text-[#9CA3AF] font-learning">
                {latestAssessment.remediationPlan.coachAdvice}
              </p>
            </div>
          )}

          {/* Feedback Bullet Points */}
          {latestAssessment.result?.feedback && latestAssessment.result.feedback.length > 0 && (
            <div className="space-y-1.5 text-xs text-[#9CA3AF]">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[#F3F4F6]">
                Instructor Critique:
              </div>
              <ul className="space-y-1 list-disc list-inside font-learning">
                {latestAssessment.result.feedback.slice(0, 3).map((fb, idx) => (
                  <li key={idx} className="text-[#9CA3AF]">
                    {fb}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-[#1A1A20] p-4 rounded border border-[#262630] text-center space-y-2">
          <FileText className="w-8 h-8 text-[#9CA3AF] mx-auto opacity-50" />
          <div className="text-xs font-mono text-[#F3F4F6]">No Assessment Telemetry Submitted Yet</div>
          <p className="text-xs text-[#9CA3AF] font-learning">
            Complete a prescribed training session and submit your lap telemetry to receive objective AI coach evaluations.
          </p>
        </div>
      )}
    </Card>
  )
}
