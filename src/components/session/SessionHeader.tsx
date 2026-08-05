import React from 'react'
import { ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react'
import { Session } from '../../types/curriculum'

interface SessionHeaderProps {
  session: Session
  currentStepIndex: number
  totalSteps: number
  completedStepsCount: number
  onExit: () => void
  devUnlockMode: boolean
  onToggleDevUnlock: () => void
  lastSavedText?: string
}

export const SessionHeader: React.FC<SessionHeaderProps> = ({
  session,
  currentStepIndex,
  totalSteps,
  completedStepsCount,
  onExit,
  devUnlockMode,
  onToggleDevUnlock,
  lastSavedText
}) => {
  const percent = Math.round((completedStepsCount / totalSteps) * 100)

  return (
    <header className="sticky top-0 z-30 bg-[#090A0F]/95 backdrop-blur border-b border-[#262C3D] px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Navigation Exit & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={onExit}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#12151E] border border-[#262C3D] text-[#F3F4F6] hover:bg-[#1A1E2B] hover:border-[#00E599]/50 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 text-[#00E599]" />
            <span>Exit Player</span>
          </button>

          <div className="h-6 w-[1px] bg-[#262C3D] hidden md:block" />

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/30">
                Session {session.sessionNumber}
              </span>
              <span className="text-xs font-mono text-[#9CA3AF]">{session.track}</span>
            </div>
            <h1 className="text-lg font-bold text-[#F3F4F6] tracking-tight">{session.title}</h1>
          </div>
        </div>

        {/* Right: Telemetry Progress, Dev Mode & Autosave */}
        <div className="flex items-center gap-4">
          {lastSavedText && (
            <span className="text-xs font-mono text-[#9CA3AF] hidden lg:inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" />
              Autosaved {lastSavedText}
            </span>
          )}

          {/* Dev Unlock Toggle */}
          <button
            onClick={onToggleDevUnlock}
            title="Toggle Dev Unlock Mode"
            className={`text-xs font-mono px-2.5 py-1 rounded border transition-colors flex items-center gap-1.5 ${
              devUnlockMode
                ? 'bg-[#FFB800]/20 text-[#FFB800] border-[#FFB800]'
                : 'bg-[#12151E] text-[#9CA3AF] border-[#262C3D] hover:text-[#F3F4F6]'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>DEV UNLOCK</span>
          </button>

          {/* Progress Pill */}
          <div className="flex items-center gap-3 bg-[#12151E] px-3 py-1.5 rounded-md border border-[#262C3D]">
            <div className="flex flex-col items-end">
              <span className="text-xs font-mono text-[#9CA3AF]">
                Step <strong className="text-[#F3F4F6]">{currentStepIndex + 1}</strong> of{' '}
                <strong className="text-[#F3F4F6]">{totalSteps}</strong>
              </span>
              <span className="text-[10px] font-mono text-[#00E599]">{percent}% Complete</span>
            </div>
            {percent === 100 ? (
              <CheckCircle2 className="w-5 h-5 text-[#00E599]" />
            ) : (
              <div className="w-8 h-8 rounded-full border-2 border-[#262C3D] border-t-[#00E599] flex items-center justify-center text-[10px] font-mono font-bold text-[#00E599]">
                {percent}%
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top Progress Bar Line */}
      <div className="w-full bg-[#12151E] h-1 mt-3 rounded-full overflow-hidden">
        <div
          className="bg-[#00E599] h-full transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </header>
  )
}
