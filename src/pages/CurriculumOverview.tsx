import React, { useState } from 'react'
import { useCurriculum } from '../context/CurriculumContext'
import { LevelSelector } from '../components/curriculum/LevelSelector'
import { CurriculumProgressBanner } from '../components/curriculum/CurriculumProgressBanner'
import { ModuleCard } from '../components/curriculum/ModuleCard'
import { SessionCard } from '../components/curriculum/SessionCard'
import { LessonHeader } from '../components/coaching/LessonHeader'
import { ObjectiveFeedbackCard } from '../components/coaching/ObjectiveFeedbackCard'
import { ModuleExamModal } from '../components/assessment/ModuleExamModal'
import { isModuleCompleted } from '../lib/curriculumEngine'
import { Card } from '../components/ui/Card'
import { Lock, ShieldAlert, Award, CheckCircle2 } from 'lucide-react'
import { Module } from '../types/curriculum'

export const CurriculumOverview: React.FC = () => {
  const {
    activeLevel,
    activeModule,
    levelSummary,
    devUnlockMode,
    progressMap
  } = useCurriculum()

  const [examModalModule, setExamModalModule] = useState<Module | null>(null)

  const activeModuleIsCompleted = activeModule ? isModuleCompleted(activeModule, progressMap) : false

  return (
    <div className="space-y-8 pb-12">
      {/* Top Context Header */}
      <LessonHeader
        levelTitle={activeLevel.title}
        moduleTitle={activeModule ? activeModule.title : 'Curriculum Engine'}
        car={activeModule?.sessions[0]?.car || '2021 Hyundai Elantra N'}
        track={activeModule?.sessions[0]?.track || 'Lime Rock Park — Classic Circuit'}
        hardware="Moza R3 Wheel Base"
      />

      {/* Curriculum Hero Banner */}
      <CurriculumProgressBanner />

      {/* Level Tier Selector Tabs */}
      <LevelSelector />

      {/* Main Academy Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar: Modules List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#9CA3AF]">
              {activeLevel.title} Modules
            </h3>
            <span className="text-xs font-mono text-[#E10600]">
              {levelSummary.completedModules} / {levelSummary.totalModules} Mastered
            </span>
          </div>

          <div className="space-y-3">
            {activeLevel.modules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </div>

        {/* Right Main Content: Active Module Sessions */}
        <div className="lg:col-span-2 space-y-6">
          {!levelSummary.isUnlocked && !devUnlockMode ? (
            <Card className="p-10 text-center space-y-4 bg-[#121216] border-[#262630]">
              <Lock className="w-14 h-14 text-[#FFB800] mx-auto" />
              <h3 className="text-2xl font-bold text-[#F3F4F6]">Level Locked</h3>
              <p className="text-sm text-[#9CA3AF] font-learning max-w-md mx-auto">
                Complete all modules and pass the graduation exam in the previous level to unlock{' '}
                <strong className="text-[#F3F4F6]">{activeLevel.title}</strong>.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#9CA3AF] bg-[#1A1A20] px-3 py-1.5 rounded border border-[#262630]">
                  <ShieldAlert className="w-4 h-4 text-[#FFB800]" />
                  Or enable "Dev Bypass" at the top to preview content.
                </span>
              </div>
            </Card>
          ) : !activeModule ? (
            <Card className="p-8 text-center bg-[#121216] border-[#262630]">
              <p className="text-sm text-[#9CA3AF]">No module selected.</p>
            </Card>
          ) : activeModule.sessions.length === 0 ? (
            <Card className="p-10 text-center space-y-4 bg-[#121216] border-[#262630]">
              <Lock className="w-12 h-12 text-[#FFB800] mx-auto" />
              <h3 className="text-xl font-bold text-[#F3F4F6]">Module Content Locked</h3>
              <p className="text-sm text-[#9CA3AF] font-learning">
                Complete prerequisite module drills to unlock {activeModule.title}.
              </p>
            </Card>
          ) : (
            <>
              {/* Module Mastered Banner & Exam Button */}
              {activeModuleIsCompleted && (
                <div className="bg-[#121216] border border-[#E10600]/40 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E10600]/10 border border-[#E10600]/30 flex items-center justify-center text-[#E10600]">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#E10600] uppercase font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Module Sessions Completed
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#F3F4F6]">
                        {activeModule.title} Examination Ready
                      </h4>
                    </div>
                  </div>
                  <button
                    onClick={() => setExamModalModule(activeModule)}
                    className="px-4 py-2 rounded-lg bg-[#E10600] text-white hover:bg-[#FF1E19] font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-[#E10600]/30"
                  >
                    <Award className="w-4 h-4" />
                    <span>Take Module Examination</span>
                  </button>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#9CA3AF]">
                    Prescribed Sessions & Checklists
                  </h3>
                  <span className="text-xs font-mono text-[#3B82F6]">
                    {activeModule.sessions.length} Prescribed{' '}
                    {activeModule.sessions.length === 1 ? 'Session' : 'Sessions'}
                  </span>
                </div>

                {activeModule.sessions.map((session) => (
                  <SessionCard key={session.id} session={session} module={activeModule} />
                ))}
              </div>

              {/* Telemetry Coaching Audit Demo Card */}
              <ObjectiveFeedbackCard
                sessionTitle="Telemetry Engine Audit — Inputs & Linearity"
                lapDeltaSeconds={0.428}
                brakeReleaseVariance={4.2}
                apexDeviationCm={24}
                passed={true}
                recommendedAction="Average lap delta within 0.500s tolerance. Brake release linearity verified. Sequential unlock engine updated driver progress."
              />
            </>
          )}
        </div>
      </div>

      {/* Module Examination Modal */}
      {examModalModule && (
        <ModuleExamModal
          module={examModalModule}
          isOpen={Boolean(examModalModule)}
          onClose={() => setExamModalModule(null)}
          onCompleteExam={() => {
            // Keep open or let user confirm completion
          }}
        />
      )}
    </div>
  )
}
