import React from 'react'
import { useCurriculum } from '../../context/CurriculumContext'
import { Play, CheckCircle2, RotateCcw, Target, Award } from 'lucide-react'

export const CurriculumProgressBanner: React.FC = () => {
  const {
    activeLevel,
    levelSummary,
    prescribedTarget,
    resumeLearning,
    resetAllProgress
  } = useCurriculum()

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#12151E] via-[#1A1E2B] to-[#12151E] border border-[#262C3D] p-6 lg:p-8 shadow-xl">
      {/* Decorative accent glow */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00E599]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Info Column */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00E599]/15 text-[#00E599] border border-[#00E599]/30">
              {activeLevel.title}
            </span>
            <span className="text-xs font-mono text-[#9CA3AF]">{activeLevel.subtitle}</span>
          </div>

          <h1 className="text-2xl lg:text-3xl font-black tracking-tight text-[#F3F4F6]">
            {activeLevel.graduateProfile}
          </h1>

          <p className="text-sm text-[#9CA3AF] leading-relaxed">{activeLevel.objective}</p>

          {/* Level Progress Stats */}
          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-[#9CA3AF]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00E599]" />
              <span>
                Modules:{' '}
                <strong className="text-[#F3F4F6]">
                  {levelSummary.completedModules}/{levelSummary.totalModules}
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#3B82F6]" />
              <span>
                Sessions:{' '}
                <strong className="text-[#F3F4F6]">
                  {levelSummary.completedSessions}/{levelSummary.totalSessions}
                </strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#FFB800]" />
              <span>
                Overall Mastery:{' '}
                <strong className="text-[#00E599]">{levelSummary.percentComplete}%</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right CTA Actions Column */}
        <div className="flex flex-col items-stretch sm:items-end gap-3 min-w-[240px]">
          {/* Main Resume CTA */}
          <button
            onClick={resumeLearning}
            className="flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl font-mono font-bold text-sm bg-[#00E599] text-[#0B0E14] shadow-[0_0_25px_rgba(0,229,153,0.3)] hover:bg-[#00CC88] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Resume Learning</span>
          </button>

          {prescribedTarget && (
            <div className="text-right sm:text-right">
              <span className="text-[11px] font-mono text-[#9CA3AF]">Next Prescribed Drill:</span>
              <p className="text-xs font-mono font-semibold text-[#00E599] truncate max-w-[260px]">
                {prescribedTarget.session.title} &bull; {prescribedTarget.step.title}
              </p>
            </div>
          )}

          {/* Reset Demo Button */}
          <button
            onClick={resetAllProgress}
            className="flex items-center justify-end gap-1.5 text-xs font-mono text-[#9CA3AF] hover:text-[#FFB800] transition-colors mt-1"
            title="Reset local progress map to zero"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Progress</span>
          </button>
        </div>
      </div>

      {/* Progress Line Bar at Bottom */}
      <div className="mt-6 w-full bg-[#12151E] rounded-full h-2 overflow-hidden border border-[#262C3D]">
        <div
          className="bg-gradient-to-r from-[#3B82F6] to-[#00E599] h-full transition-all duration-500"
          style={{ width: `${levelSummary.percentComplete}%` }}
        />
      </div>
    </div>
  )
}
