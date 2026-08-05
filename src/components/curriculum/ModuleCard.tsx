import React from 'react'
import { Module } from '../../types/curriculum'
import { useCurriculum } from '../../context/CurriculumContext'
import { isModuleUnlocked, isModuleCompleted } from '../../lib/curriculumEngine'
import { Lock, CheckCircle2, ChevronRight, Layers } from 'lucide-react'
import { Badge } from '../ui/Badge'

interface ModuleCardProps {
  module: Module
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const {
    activeLevel,
    activeModuleId,
    setActiveModuleId,
    setActiveSessionId,
    progressMap,
    devUnlockMode
  } = useCurriculum()

  const unlocked = isModuleUnlocked(module, activeLevel, progressMap, devUnlockMode)
  const completed = isModuleCompleted(module, progressMap)
  const isActive = activeModuleId === module.id

  const handleClick = () => {
    if (unlocked) {
      setActiveModuleId(module.id)
      if (module.sessions.length > 0) {
        setActiveSessionId(module.sessions[0].id)
      }
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={!unlocked}
      className={`w-full text-left p-5 rounded-xl border transition-all duration-200 ${
        isActive
          ? 'bg-[#12151E] border-[#00E599] shadow-[0_0_20px_rgba(0,229,153,0.15)] ring-1 ring-[#00E599]'
          : !unlocked
          ? 'bg-[#12151E]/40 border-[#262C3D] opacity-60 cursor-not-allowed'
          : 'bg-[#12151E] border-[#262C3D] hover:bg-[#1A1E2B] hover:border-gray-500'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-[#9CA3AF]">
          Module 0{module.moduleNumber}
        </span>

        {completed ? (
          <Badge variant="success">
            <CheckCircle2 className="w-3 h-3" /> Mastered
          </Badge>
        ) : !unlocked ? (
          <Badge variant="neutral">
            <Lock className="w-3 h-3 text-[#FFB800]" /> Locked
          </Badge>
        ) : (
          <Badge variant="info">In Progress</Badge>
        )}
      </div>

      <h4 className="font-bold text-base text-[#F3F4F6] mt-2.5 group-hover:text-[#00E599] transition-colors">
        {module.title}
      </h4>

      <span className="inline-block text-[11px] font-mono text-[#00E599] mt-1 bg-[#00E599]/10 px-2 py-0.5 rounded">
        Focus: {module.focusArea}
      </span>

      <p className="text-xs text-[#9CA3AF] mt-2 line-clamp-2 leading-relaxed">{module.summary}</p>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#262C3D]/60 text-xs font-mono text-[#9CA3AF]">
        <span className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
          {module.sessions.length} Prescribed {module.sessions.length === 1 ? 'Session' : 'Sessions'}
        </span>

        {unlocked && (
          <span className="flex items-center text-[#00E599] font-semibold">
            View Details <ChevronRight className="w-4 h-4 ml-0.5" />
          </span>
        )}
      </div>
    </button>
  )
}
