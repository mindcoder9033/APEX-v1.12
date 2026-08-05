import React from 'react'
import { Trophy, CheckCircle2, AlertTriangle, XCircle, Gauge, Activity, ShieldCheck, RefreshCw } from 'lucide-react'
import { AssessmentResult } from '../../types/assessment'
import { formatSecondsToLapTime } from '../../lib/assessmentEngine'

interface MasteryEvaluationCardProps {
  result: AssessmentResult
  onReevaluate?: () => void
}

export const MasteryEvaluationCard: React.FC<MasteryEvaluationCardProps> = ({
  result,
  onReevaluate
}) => {
  const { score, grade, metrics, feedback, evaluatedAt } = result

  // Badge Styling based on Mastery Grade
  const gradeStyles = {
    MASTERED: {
      bg: 'bg-[#00E599]/10 border-[#00E599]/40 text-[#00E599]',
      label: 'MASTERED',
      icon: Trophy
    },
    SATISFACTORY: {
      bg: 'bg-[#3B82F6]/10 border-[#3B82F6]/40 text-[#3B82F6]',
      label: 'SATISFACTORY (PASSED)',
      icon: CheckCircle2
    },
    NEEDS_WORK: {
      bg: 'bg-[#FFB800]/10 border-[#FFB800]/40 text-[#FFB800]',
      label: 'NEEDS WORK (REMEDIATION REQUIRED)',
      icon: AlertTriangle
    },
    UNSATISFACTORY: {
      bg: 'bg-[#FF3B30]/10 border-[#FF3B30]/40 text-[#FF3B30]',
      label: 'UNSATISFACTORY',
      icon: XCircle
    }
  }[grade]

  const GradeIcon = gradeStyles.icon

  return (
    <div className="bg-[#12151E] border border-[#262C3D] rounded-2xl p-6 space-y-6 shadow-xl">
      {/* Header & Overall Grade */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#262C3D]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#9CA3AF] uppercase">
              Evaluation Completed • {new Date(evaluatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <h3 className="text-xl font-bold text-[#F3F4F6] tracking-tight">Mastery Evaluation Report</h3>
        </div>

        {/* Grade Badge */}
        <div className={`px-3.5 py-1.5 rounded-xl border flex items-center gap-2 text-xs font-mono font-bold ${gradeStyles.bg}`}>
          <GradeIcon className="w-4 h-4" />
          <span>{gradeStyles.label}</span>
        </div>
      </div>

      {/* Score Meter */}
      <div className="bg-[#090A0F] border border-[#262C3D] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full border-4 border-[#262C3D] flex items-center justify-center bg-[#12151E]">
            <span className="text-xl font-mono font-bold text-[#F3F4F6]">{score}</span>
            <span className="text-[9px] font-mono text-[#9CA3AF] absolute bottom-1">/100</span>
          </div>
          <div>
            <span className="text-xs font-mono text-[#9CA3AF] block">Overall Competency Score</span>
            <span className="text-sm font-bold text-[#F3F4F6]">
              {score >= 88 ? 'Exceptional Speed & Precision' : score >= 70 ? 'Competent Driver Execution' : 'Sub-Optimal Stint Execution'}
            </span>
          </div>
        </div>

        {/* Score Progress Bar */}
        <div className="w-full md:w-64 space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono text-[#9CA3AF]">
            <span>Mastery Threshold: 70</span>
            <span className="text-[#00E599] font-bold">{score}%</span>
          </div>
          <div className="w-full bg-[#12151E] h-2 rounded-full overflow-hidden border border-[#262C3D]">
            <div
              className={`h-full transition-all duration-500 ${
                score >= 88 ? 'bg-[#00E599]' : score >= 70 ? 'bg-[#3B82F6]' : 'bg-[#FFB800]'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Metrics Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Best Lap Metric */}
        <div className="bg-[#090A0F] border border-[#262C3D] rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF]">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#00E599]" />
              Best Lap
            </span>
            <span className={metrics.bestLapDelta <= 0 ? 'text-[#00E599]' : 'text-[#FFB800]'}>
              {metrics.bestLapDelta <= 0 ? `${metrics.bestLapDelta.toFixed(3)}s` : `+${metrics.bestLapDelta.toFixed(3)}s`}
            </span>
          </div>
          <div className="text-lg font-mono font-bold text-[#F3F4F6]">
            {formatSecondsToLapTime(metrics.bestLapSeconds)}
          </div>
          <p className="text-[10px] font-mono text-[#9CA3AF]">
            Target Pace: &le; benchmark
          </p>
        </div>

        {/* Consistency Metric */}
        <div className="bg-[#090A0F] border border-[#262C3D] rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF]">
            <span className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-[#3B82F6]" />
              Consistency Delta
            </span>
            <span className={metrics.consistencyDelta <= 1.8 ? 'text-[#00E599]' : 'text-[#FFB800]'}>
              +{metrics.consistencyDelta.toFixed(3)}s
            </span>
          </div>
          <div className="text-lg font-mono font-bold text-[#F3F4F6]">
            {metrics.consistencyDelta.toFixed(3)}s
          </div>
          <p className="text-[10px] font-mono text-[#9CA3AF]">
            Lap-to-Lap Variance
          </p>
        </div>

        {/* Clean Laps Metric */}
        <div className="bg-[#090A0F] border border-[#262C3D] rounded-xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00E599]" />
              Clean Lap Ratio
            </span>
            <span className={metrics.cleanLapRatio >= 0.75 ? 'text-[#00E599]' : 'text-[#FF3B30]'}>
              {(metrics.cleanLapRatio * 100).toFixed(0)}%
            </span>
          </div>
          <div className="text-lg font-mono font-bold text-[#F3F4F6]">
            {(metrics.cleanLapRatio * 100).toFixed(0)}% Clean
          </div>
          <p className="text-[10px] font-mono text-[#9CA3AF]">
            Min Requirement: 75%
          </p>
        </div>
      </div>

      {/* Granular Feedback Notes */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono uppercase font-bold text-[#9CA3AF]">
          Assessment Feedback & Telemetry Insights
        </h4>
        <div className="space-y-2">
          {feedback.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-[#090A0F] border border-[#262C3D] text-xs text-[#F3F4F6] flex items-start gap-2.5"
            >
              <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
              <span className="leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      {onReevaluate && (
        <div className="pt-3 border-t border-[#262C3D] flex justify-end">
          <button
            onClick={onReevaluate}
            className="px-4 py-2 rounded-lg bg-[#090A0F] hover:bg-[#1A1E2B] border border-[#262C3D] text-xs font-mono font-bold text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Re-Enter Telemetry Data</span>
          </button>
        </div>
      )}
    </div>
  )
}
