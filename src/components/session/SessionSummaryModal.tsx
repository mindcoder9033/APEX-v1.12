import React from 'react'
import { Award, CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react'
import { Session } from '../../types/curriculum'

interface SessionSummaryModalProps {
  session: Session
  totalSteps: number
  reflectionsCount: number
  onReturnToCurriculum: () => void
  onNextPrescribedSession?: () => void
  onRestartSession: () => void
}

export const SessionSummaryModal: React.FC<SessionSummaryModalProps> = ({
  session,
  totalSteps,
  reflectionsCount,
  onReturnToCurriculum,
  onNextPrescribedSession,
  onRestartSession
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090A0F]/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#12151E] border border-[#00E599]/40 rounded-2xl p-6 lg:p-8 max-w-lg w-full shadow-2xl shadow-[#00E599]/10 relative overflow-hidden text-center space-y-6">
        {/* Glow backdrop */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#00E599]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Icon & Title */}
        <div className="w-16 h-16 rounded-full bg-[#00E599]/10 border-2 border-[#00E599] flex items-center justify-center mx-auto text-[#00E599] shadow-lg shadow-[#00E599]/20">
          <Award className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-mono uppercase text-[#00E599] tracking-wider font-bold block mb-1">
            Session Completed & Validated
          </span>
          <h2 className="text-2xl font-bold text-[#F3F4F6] tracking-tight">{session.title}</h2>
          <p className="text-xs text-[#9CA3AF] mt-1 font-mono">{session.track}</p>
        </div>

        {/* Summary Metrics Grid */}
        <div className="grid grid-cols-2 gap-3 bg-[#090A0F] border border-[#262C3D] p-4 rounded-xl text-left">
          <div>
            <span className="text-[10px] font-mono text-[#9CA3AF] uppercase block">Steps Passed</span>
            <div className="flex items-center gap-1.5 text-sm font-mono font-bold text-[#00E599] mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
              <span>
                {totalSteps} / {totalSteps} Steps
              </span>
            </div>
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#9CA3AF] uppercase block">
              Reflections Recorded
            </span>
            <span className="text-sm font-mono font-bold text-[#F3F4F6] mt-0.5 block">
              {reflectionsCount} Entries
            </span>
          </div>
        </div>

        {/* Next Step / Action Buttons */}
        <div className="space-y-3 pt-2">
          {onNextPrescribedSession && (
            <button
              onClick={onNextPrescribedSession}
              className="w-full py-3 px-4 rounded-xl bg-[#00E599] hover:bg-[#00FFAB] text-[#090A0F] font-mono text-sm font-bold transition-all shadow-lg shadow-[#00E599]/20 flex items-center justify-center gap-2"
            >
              <span>Continue to Next Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={onReturnToCurriculum}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#090A0F] hover:bg-[#1A1E2B] border border-[#262C3D] text-[#F3F4F6] font-mono text-xs font-medium transition-colors"
            >
              Back to Overview
            </button>
            <button
              onClick={onRestartSession}
              className="py-2.5 px-4 rounded-xl bg-[#090A0F] hover:bg-[#1A1E2B] border border-[#262C3D] text-[#9CA3AF] hover:text-[#F3F4F6] font-mono text-xs transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
