import React from 'react'
import { Target, CheckCircle2, ChevronRight, ChevronLeft, Activity, ShieldCheck } from 'lucide-react'
import { Step } from '../../types/curriculum'

interface StepExecutionCardProps {
  step: Step
  stepIndex: number
  totalSteps: number
  isCompleted: boolean
  onToggleComplete: () => Promise<void>
  onNextStep: () => void
  onPrevStep: () => void
  hasNextStep: boolean
  hasPrevStep: boolean
}

export const StepExecutionCard: React.FC<StepExecutionCardProps> = ({
  step,
  stepIndex: _stepIndex,
  totalSteps,
  isCompleted,
  onToggleComplete,
  onNextStep,
  onPrevStep,
  hasNextStep,
  hasPrevStep
}) => {
  return (
    <div className="bg-[#12151E] border border-[#262C3D] rounded-xl p-6 space-y-6">
      {/* Header Badge & Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#262C3D]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/30 font-bold">
              Step {step.stepNumber} of {totalSteps} • {step.type}
            </span>
            {isCompleted && (
              <span className="text-[11px] font-mono text-[#00E599] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                PASSED
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-[#F3F4F6] tracking-tight">{step.title}</h2>
        </div>

        {/* Action Toggle Button */}
        <button
          onClick={onToggleComplete}
          className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-2 ${
            isCompleted
              ? 'bg-[#00E599]/20 text-[#00E599] border border-[#00E599]/50 hover:bg-[#00E599]/30'
              : 'bg-[#00E599] text-[#090A0F] hover:bg-[#00FFAB] shadow-md shadow-[#00E599]/20'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isCompleted ? 'Mark Incomplete' : 'Complete & Pass Step'}</span>
        </button>
      </div>

      {/* Objective Card */}
      <div className="bg-[#090A0F] border border-[#262C3D] rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-[#00E599]" />
          <span className="text-xs font-mono text-[#9CA3AF] uppercase font-bold">Step Objective</span>
        </div>
        <p className="text-sm text-[#F3F4F6] leading-relaxed font-medium">{step.objective}</p>
      </div>

      {/* Telemetry Benchmark Target (if drill/assessment) */}
      {step.telemetryThreshold && (
        <div className="bg-[#090A0F] border border-[#00E599]/40 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#00E599]/10 border border-[#00E599]/30 flex items-center justify-center">
              <Activity className="w-5 h-5 text-[#00E599]" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#9CA3AF] uppercase block">
                Target Telemetry Metric
              </span>
              <span className="text-sm font-bold text-[#F3F4F6]">
                {step.telemetryThreshold.metric}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-[#00E599] uppercase block font-bold">
              Passing Threshold
            </span>
            <span className="text-lg font-mono font-bold text-[#00E599]">
              {step.telemetryThreshold.targetValue}
            </span>
          </div>
        </div>
      )}

      {/* Passing Criteria & Instructions */}
      <div className="space-y-4">
        <div className="bg-[#090A0F] border border-[#262C3D] rounded-lg p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <ShieldCheck className="w-4 h-4 text-[#FFB800]" />
            <span className="text-xs font-mono text-[#FFB800] uppercase font-bold">
              Passing Criteria
            </span>
          </div>
          <p className="text-xs text-[#9CA3AF]">{step.passingCriteria}</p>
        </div>

        <div>
          <h4 className="text-xs font-mono uppercase font-bold text-[#9CA3AF] mb-3">
            Execution Instructions
          </h4>
          <ol className="space-y-2.5">
            {step.instructions.map((inst, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-[#090A0F] border border-[#262C3D] text-xs text-[#F3F4F6] leading-relaxed"
              >
                <span className="w-5 h-5 rounded bg-[#12151E] border border-[#262C3D] flex items-center justify-center text-[11px] font-mono text-[#00E599] font-bold shrink-0">
                  {idx + 1}
                </span>
                <span>{inst}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="pt-4 border-t border-[#262C3D] flex items-center justify-between">
        <button
          onClick={onPrevStep}
          disabled={!hasPrevStep}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-medium border transition-colors ${
            hasPrevStep
              ? 'bg-[#090A0F] text-[#F3F4F6] border-[#262C3D] hover:bg-[#1A1E2B] hover:border-[#00E599]/50'
              : 'bg-[#090A0F]/50 text-[#4B5563] border-[#262C3D]/50 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        <button
          onClick={onNextStep}
          disabled={!hasNextStep}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold border transition-colors ${
            hasNextStep
              ? 'bg-[#00E599] text-[#090A0F] border-[#00E599] hover:bg-[#00FFAB]'
              : 'bg-[#090A0F]/50 text-[#4B5563] border-[#262C3D]/50 cursor-not-allowed'
          }`}
        >
          <span>Next Step</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
