import React from 'react'
import { DriverLevel } from '../../types/curriculum'
import { useCurriculum } from '../../context/CurriculumContext'
import { isLevelUnlocked, getLevelProgressSummary } from '../../lib/curriculumEngine'
import { ShieldCheck, Lock, Award, Sparkles, ChevronRight } from 'lucide-react'

const LEVELS: { id: DriverLevel; label: string; badge: string; desc: string }[] = [
  {
    id: 'BEGINNER',
    label: 'Level 1: Beginner',
    badge: 'Driver Control',
    desc: 'Pedal Linearity, Apex Consistency & Lap Repeatability'
  },
  {
    id: 'INTERMEDIATE',
    label: 'Level 2: Intermediate',
    badge: 'Vehicle Dynamics',
    desc: 'Yaw Rotation, Lift-Off Steering & Friction Boundary'
  },
  {
    id: 'EXPERT',
    label: 'Level 3: Expert',
    badge: 'Racecraft & Telemetry',
    desc: 'Data Diagnostics, Overtaking & Race Pace Management'
  }
]

export const LevelSelector: React.FC = () => {
  const {
    activeLevelName,
    selectLevelAndAdvance,
    progressMap,
    devUnlockMode,
    toggleDevUnlockMode
  } = useCurriculum()

  return (
    <div className="space-y-4">
      {/* Dev Mode & Level Selection Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-[#262630]">
        <div>
          <h2 className="text-xs font-mono uppercase tracking-widest text-[#9CA3AF]">
            Academy Progression Tiers
          </h2>
          <p className="text-sm font-semibold text-[#F3F4F6]">
            Select Level to Begin (Beginner, Intermediate, Expert)
          </p>
        </div>

        {/* Dev Unlock Toggle */}
        <button
          onClick={toggleDevUnlockMode}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono border transition-all duration-200 ${
            devUnlockMode
              ? 'bg-[#FFB800]/15 text-[#FFB800] border-[#FFB800]'
              : 'bg-[#1A1A20] text-[#9CA3AF] border-[#262630] hover:text-[#F3F4F6]'
          }`}
          title="Toggle developer bypass to test locked modules"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Dev Bypass: {devUnlockMode ? 'ON (Unlocked)' : 'OFF (Strict Rules)'}</span>
        </button>
      </div>

      {/* Level Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {LEVELS.map((lvl) => {
          const unlocked = isLevelUnlocked(lvl.id, progressMap, devUnlockMode)
          const summary = getLevelProgressSummary(lvl.id, progressMap, devUnlockMode)
          const isActive = activeLevelName === lvl.id

          return (
            <button
              key={lvl.id}
              onClick={() => {
                if (unlocked) {
                  selectLevelAndAdvance(lvl.id)
                }
              }}
              disabled={!unlocked}
              className={`relative text-left p-5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                isActive
                  ? 'bg-[#121216] border-[#E10600] shadow-[0_0_20px_rgba(225,6,0,0.2)] ring-1 ring-[#E10600]'
                  : unlocked
                  ? 'bg-[#121216] border-[#262630] hover:border-[#3B82F6] hover:bg-[#1A1A20]'
                  : 'bg-[#121216]/40 border-[#262630]/50 opacity-60 cursor-not-allowed'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded ${
                      isActive
                        ? 'bg-[#E10600]/20 text-[#E10600]'
                        : 'bg-[#1A1A20] text-[#9CA3AF]'
                    }`}
                  >
                    {lvl.badge}
                  </span>

                  {summary.isCompleted ? (
                    <span className="flex items-center gap-1 text-xs font-mono text-[#E10600]">
                      <Award className="w-4 h-4" /> Certified
                    </span>
                  ) : unlocked ? (
                    <span className="flex items-center gap-1 text-xs font-mono text-[#3B82F6]">
                      <ShieldCheck className="w-4 h-4" /> {summary.percentComplete}%
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-mono text-[#FFB800]">
                      <Lock className="w-4 h-4" /> Locked
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-lg text-[#F3F4F6] mt-3">{lvl.label}</h3>
                <p className="text-xs text-[#9CA3AF] font-learning mt-1 line-clamp-2 leading-relaxed">
                  {lvl.desc}
                </p>

                {/* Progress bar inside card */}
                <div className="mt-4 w-full bg-[#1A1A20] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-[#E10600] h-full transition-all duration-300"
                    style={{ width: `${summary.percentComplete}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#262630]/60 flex items-center justify-between text-xs font-mono">
                <span className="text-[#9CA3AF]">
                  {summary.completedModules} / {summary.totalModules} Modules Mastered
                </span>

                {unlocked && (
                  <span className="flex items-center text-[#E10600] font-bold group-hover:translate-x-1 transition-transform">
                    Select {lvl.id.charAt(0) + lvl.id.slice(1).toLowerCase()} <ChevronRight className="w-4 h-4 ml-0.5" />
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

