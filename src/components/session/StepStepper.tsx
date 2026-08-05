import React from 'react'
import { CheckCircle, Lock, Play, BookOpen, Target, Award } from 'lucide-react'
import { Step } from '../../types/curriculum'
import { ProgressMap } from '../../lib/curriculumEngine'
import { isStepLocked } from '../../lib/sessionPlayerEngine'

interface StepStepperProps {
  steps: Step[]
  currentStepIndex: number
  onSelectStep: (index: number) => void
  progressMap: ProgressMap
  session: any
  devUnlockMode: boolean
}

export const StepStepper: React.FC<StepStepperProps> = ({
  steps,
  currentStepIndex,
  onSelectStep,
  progressMap,
  session,
  devUnlockMode
}) => {
  const getStepIcon = (type: Step['type']) => {
    switch (type) {
      case 'LESSON':
        return <BookOpen className="w-4 h-4" />
      case 'DRILL':
        return <Target className="w-4 h-4" />
      case 'ASSESSMENT':
        return <Award className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  return (
    <nav aria-label="Session Steps Stepper" className="bg-[#12151E] border border-[#262C3D] rounded-xl p-4">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#262C3D]">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#9CA3AF]">
          Session Steps ({steps.length})
        </h3>
        <span className="text-[11px] font-mono text-[#00E599]">Sequential Execution</span>
      </div>

      <ul className="space-y-2">
        {steps.map((step, idx) => {
          const isCompleted = Boolean(progressMap[step.id])
          const isActive = idx === currentStepIndex
          const locked = isStepLocked(idx, session, progressMap, devUnlockMode)

          let statusBadgeClass = 'border-[#262C3D] bg-[#090A0F] text-[#9CA3AF]'
          if (isActive) {
            statusBadgeClass = 'border-[#00E599] bg-[#00E599]/10 text-[#00E599] shadow-sm shadow-[#00E599]/20'
          } else if (isCompleted) {
            statusBadgeClass = 'border-[#00E599]/40 bg-[#12151E] text-[#00E599]'
          } else if (locked) {
            statusBadgeClass = 'border-[#262C3D] bg-[#090A0F]/50 text-[#4B5563]'
          }

          return (
            <li key={step.id}>
              <button
                disabled={locked}
                onClick={() => !locked && onSelectStep(idx)}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between gap-3 ${
                  isActive
                    ? 'border-[#00E599] bg-[#1A1E2B] ring-1 ring-[#00E599]'
                    : locked
                    ? 'border-[#262C3D]/50 bg-[#090A0F]/40 cursor-not-allowed opacity-60'
                    : isCompleted
                    ? 'border-[#262C3D] bg-[#12151E] hover:border-[#00E599]/40'
                    : 'border-[#262C3D] bg-[#090A0F] hover:border-[#262C3D] hover:bg-[#12151E]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Step Status Icon Indicator */}
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center border font-mono text-xs ${statusBadgeClass}`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-[#00E599]" />
                    ) : locked ? (
                      <Lock className="w-3.5 h-3.5 text-[#4B5563]" />
                    ) : isActive ? (
                      <Play className="w-3.5 h-3.5 text-[#00E599] fill-[#00E599]" />
                    ) : (
                      <span>{step.stepNumber}</span>
                    )}
                  </div>

                  {/* Step Title & Metadata */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#090A0F] border border-[#262C3D] text-[#9CA3AF] flex items-center gap-1">
                        {getStepIcon(step.type)}
                        {step.type}
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-mono text-[#00E599] uppercase font-bold tracking-wider animate-pulse">
                          Current
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-xs font-semibold truncate ${
                        isActive
                          ? 'text-[#00E599]'
                          : locked
                          ? 'text-[#4B5563]'
                          : 'text-[#F3F4F6]'
                      }`}
                    >
                      Step {step.stepNumber}: {step.title}
                    </p>
                  </div>
                </div>

                {/* Right Arrow indicator if active */}
                {isActive && <div className="w-2 h-2 rounded-full bg-[#00E599] animate-ping" />}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
