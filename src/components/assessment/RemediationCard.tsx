import React from 'react'
import { AlertOctagon, Target, Sliders, MessageSquare, Play } from 'lucide-react'
import { RemediationPlan } from '../../types/assessment'

interface RemediationCardProps {
  plan: RemediationPlan
  onRetryDrill?: () => void
}

export const RemediationCard: React.FC<RemediationCardProps> = ({
  plan,
  onRetryDrill
}) => {
  const { title, focusArea, prescribedDrills, coachAdvice, recommendedAssists, recommendedSetup, weaknessCategory } = plan

  const weaknessTagLabel = {
    PACING: 'Diagnosed Weakness: Corner Exit Speed',
    CONSISTENCY: 'Diagnosed Weakness: Braking Point Fluctuation',
    CONTROL: 'Diagnosed Weakness: Track Limit Penalties'
  }[weaknessCategory]

  return (
    <div className="bg-[#12151E] border border-[#FFB800]/40 rounded-2xl p-6 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Background Accent Stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#FFB800]" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#262C3D]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFB800]/10 border border-[#FFB800]/30 flex items-center justify-center text-[#FFB800]">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-[#FFB800] font-bold">
              Adaptive Remediation Prescribed
            </span>
            <h3 className="text-lg font-bold text-[#F3F4F6] tracking-tight">{title}</h3>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] text-[11px] font-mono font-bold">
          {weaknessTagLabel}
        </span>
      </div>

      {/* Focus Area */}
      <div className="bg-[#090A0F] border border-[#262C3D] rounded-xl p-4 flex items-center gap-3">
        <Target className="w-5 h-5 text-[#FFB800] shrink-0" />
        <div>
          <span className="text-[10px] font-mono text-[#9CA3AF] uppercase block font-bold">
            Target Focus Area
          </span>
          <span className="text-sm font-bold text-[#F3F4F6]">{focusArea}</span>
        </div>
      </div>

      {/* Prescribed Drills List */}
      <div className="space-y-3">
        <h4 className="text-xs font-mono uppercase font-bold text-[#9CA3AF]">
          Prescribed Practice Sequence
        </h4>
        <div className="space-y-2.5">
          {prescribedDrills.map((drill, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#090A0F] border border-[#262C3D] flex items-start gap-3 text-xs text-[#F3F4F6]"
            >
              <span className="w-5 h-5 rounded-lg bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] font-mono font-bold flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{drill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Coach Advice & Hardware / Assist Recommendation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="bg-[#090A0F] border border-[#262C3D] rounded-xl p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00E599] font-bold">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Instructor Guidance</span>
          </div>
          <p className="text-xs text-[#9CA3AF] leading-relaxed">{coachAdvice}</p>
        </div>

        <div className="bg-[#090A0F] border border-[#262C3D] rounded-xl p-4 space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-[#3B82F6] font-bold">
            <Sliders className="w-3.5 h-3.5" />
            <span>Telemetry & Assist Adjustments</span>
          </div>
          <p className="text-xs text-[#9CA3AF] leading-relaxed">
            {recommendedAssists} {recommendedSetup}
          </p>
        </div>
      </div>

      {/* Action Footer */}
      {onRetryDrill && (
        <div className="pt-3 border-t border-[#262C3D] flex justify-end">
          <button
            onClick={onRetryDrill}
            className="px-5 py-2.5 rounded-xl bg-[#FFB800] text-[#090A0F] hover:bg-[#FFC72C] font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-[#FFB800]/20"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Remediation Stint</span>
          </button>
        </div>
      )}
    </div>
  )
}
