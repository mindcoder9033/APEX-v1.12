import React from 'react'
import { useCurriculum, CurriculumFlowStep } from '../../context/CurriculumContext'
import { ChevronRight, Layers, BookOpen, PlayCircle, Sparkles } from 'lucide-react'

export const CurriculumStepper: React.FC = () => {
  const {
    flowStep,
    setFlowStep,
    activeLevel,
    activeModule,
    devUnlockMode,
    toggleDevUnlockMode
  } = useCurriculum()

  const steps: {
    id: CurriculumFlowStep
    num: string
    title: string
    subtitle: string
    icon: React.ReactNode
  }[] = [
    {
      id: 'level',
      num: '01',
      title: 'Select Level',
      subtitle: activeLevel.title,
      icon: <Layers className="w-4 h-4" />
    },
    {
      id: 'module',
      num: '02',
      title: 'Select Module',
      subtitle: flowStep === 'level' ? 'Choose Module' : `Module 0${activeModule?.moduleNumber}: ${activeModule?.title || ''}`,
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      id: 'session',
      num: '03',
      title: 'Select Session',
      subtitle: flowStep !== 'session' ? 'Pick Session' : `${activeModule?.sessions.length || 0} Sessions Ready`,
      icon: <PlayCircle className="w-4 h-4" />
    }
  ]

  const getStepStatus = (stepId: CurriculumFlowStep) => {
    const order: CurriculumFlowStep[] = ['level', 'module', 'session']
    const currentIndex = order.indexOf(flowStep)
    const stepIndex = order.indexOf(stepId)

    if (stepIndex === currentIndex) return 'active'
    if (stepIndex < currentIndex) return 'completed'
    return 'upcoming'
  }

  return (
    <div className="bg-[#121216] border border-[#262630] rounded-xl p-4 sm:p-5 shadow-lg space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#262630]/60">
        <div>
          <h2 className="text-[11px] font-mono uppercase tracking-widest text-[#9CA3AF]">
            Curriculum Navigation Flow
          </h2>
          <p className="text-xs text-[#F3F4F6] font-medium mt-0.5">
            Follow the 3-step sequence to select your level, module, and session
          </p>
        </div>

        {/* Dev Unlock Toggle */}
        <button
          onClick={toggleDevUnlockMode}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono border transition-all duration-200 ${
            devUnlockMode
              ? 'bg-[#FFB800]/15 text-[#FFB800] border-[#FFB800]'
              : 'bg-[#1A1A20] text-[#9CA3AF] border-[#262630] hover:text-[#F3F4F6]'
          }`}
          title="Toggle developer bypass to test locked modules"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Dev Bypass: {devUnlockMode ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Stepper Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {steps.map((step, idx) => {
          const status = getStepStatus(step.id)
          const isClickable = status === 'completed' || status === 'active'

          return (
            <div key={step.id} className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (isClickable) {
                    setFlowStep(step.id)
                  }
                }}
                disabled={!isClickable}
                className={`flex-1 flex items-center gap-3 p-3 rounded-lg border text-left transition-all duration-200 ${
                  status === 'active'
                    ? 'bg-[#E10600]/10 border-[#E10600] text-[#F3F4F6] ring-1 ring-[#E10600]/40'
                    : status === 'completed'
                    ? 'bg-[#1A1A20] border-[#3B82F6]/40 text-[#F3F4F6] hover:border-[#3B82F6] cursor-pointer'
                    : 'bg-[#1A1A20]/40 border-[#262630] text-[#9CA3AF] opacity-60 cursor-not-allowed'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold transition-colors ${
                    status === 'active'
                      ? 'bg-[#E10600] text-white shadow-md shadow-[#E10600]/30'
                      : status === 'completed'
                      ? 'bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/40'
                      : 'bg-[#262630] text-[#9CA3AF]'
                  }`}
                >
                  {step.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#E10600]">
                      Step {step.num}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold truncate">{step.title}</h4>
                  <p className="text-[11px] text-[#9CA3AF] truncate font-learning">
                    {step.subtitle}
                  </p>
                </div>
              </button>

              {idx < steps.length - 1 && (
                <ChevronRight className="hidden sm:block w-4 h-4 text-[#262630] shrink-0" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
