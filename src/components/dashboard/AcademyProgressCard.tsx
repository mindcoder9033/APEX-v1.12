import React from 'react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { TelemetryBar } from '../ui/TelemetryBar'
import { ShieldCheck, Lock, Unlock, RefreshCw } from 'lucide-react'
import { useCurriculum } from '../../context/CurriculumContext'

export const AcademyProgressCard: React.FC = () => {
  const { levelSummary, activeLevelName, devUnlockMode, toggleDevUnlockMode, resetAllProgress } =
    useCurriculum()

  return (
    <Card className="space-y-4 bg-[#12151E] border-[#262C3D]">
      <div className="flex items-center justify-between border-b border-[#262C3D] pb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#00E599]" />
          <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#F3F4F6]">
            Academy Progression: {activeLevelName}
          </h3>
        </div>
        <Badge variant={levelSummary.isCompleted ? 'success' : 'info'}>
          {levelSummary.percentComplete}% COMPLETE
        </Badge>
      </div>

      <div className="space-y-3">
        <TelemetryBar
          value={levelSummary.percentComplete}
          label="Level Completion Progress"
        />

        <div className="grid grid-cols-3 gap-3 pt-2 text-center font-mono">
          <div className="bg-[#1A1E2B] p-2.5 rounded border border-[#262C3D]">
            <div className="text-[10px] text-[#9CA3AF] uppercase">Modules</div>
            <div className="text-base font-bold text-[#F3F4F6] mt-0.5">
              {levelSummary.completedModules} / {levelSummary.totalModules}
            </div>
          </div>
          <div className="bg-[#1A1E2B] p-2.5 rounded border border-[#262C3D]">
            <div className="text-[10px] text-[#9CA3AF] uppercase">Sessions</div>
            <div className="text-base font-bold text-[#F3F4F6] mt-0.5">
              {levelSummary.completedSessions} / {levelSummary.totalSessions}
            </div>
          </div>
          <div className="bg-[#1A1E2B] p-2.5 rounded border border-[#262C3D]">
            <div className="text-[10px] text-[#9CA3AF] uppercase">Drill Steps</div>
            <div className="text-base font-bold text-[#00E599] mt-0.5">
              {levelSummary.completedSteps} / {levelSummary.totalSteps}
            </div>
          </div>
        </div>

        {/* Developer Override & Reset Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs border-t border-[#262C3D]/60 font-mono">
          <button
            onClick={toggleDevUnlockMode}
            className="flex items-center gap-1.5 text-[#9CA3AF] hover:text-[#F3F4F6] transition-colors"
          >
            {devUnlockMode ? (
              <Unlock className="w-3.5 h-3.5 text-[#FFB800]" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-[#9CA3AF]" />
            )}
            <span>Dev Bypass: {devUnlockMode ? 'ACTIVE' : 'OFF'}</span>
          </button>

          <button
            onClick={resetAllProgress}
            className="flex items-center gap-1 text-[#9CA3AF] hover:text-red-400 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Demo Progress</span>
          </button>
        </div>
      </div>
    </Card>
  )
}
