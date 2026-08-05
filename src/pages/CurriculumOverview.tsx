import React, { useState } from 'react'
import { beginnerCurriculum } from '../data/beginnerCurriculum'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { LessonHeader } from '../components/coaching/LessonHeader'
import { ObjectiveFeedbackCard } from '../components/coaching/ObjectiveFeedbackCard'
import { Lock, CheckCircle2, Play, Flag, Target } from 'lucide-react'

export const CurriculumOverview: React.FC = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('mod-1')
  const [selectedSessionId, setSelectedSessionId] = useState<string>('sess-1-1')

  const activeModule = beginnerCurriculum.modules.find((m) => m.id === selectedModuleId) || beginnerCurriculum.modules[0]

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <LessonHeader
        levelTitle={beginnerCurriculum.title}
        moduleTitle={activeModule.title}
        car="2021 Hyundai Elantra N"
        track="Lime Rock Park — Classic Circuit"
        hardware="Moza R3 Wheel Base"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Module Sidebar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono uppercase tracking-widest text-[#9CA3AF]">
              Level 1 Modules
            </h3>
            <span className="text-xs font-mono text-[#00E599]">2 / 4 Unlocked</span>
          </div>

          <div className="space-y-3">
            {beginnerCurriculum.modules.map((module) => (
              <button
                key={module.id}
                onClick={() => {
                  if (!module.isLocked) {
                    setSelectedModuleId(module.id)
                    if (module.sessions.length > 0) {
                      setSelectedSessionId(module.sessions[0].id)
                    }
                  }
                }}
                disabled={module.isLocked}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  module.id === selectedModuleId
                    ? 'bg-[#12151E] border-[#00E599] shadow-[0_0_15px_rgba(0,229,153,0.15)]'
                    : module.isLocked
                    ? 'bg-[#12151E]/40 border-[#262C3D] opacity-60 cursor-not-allowed'
                    : 'bg-[#12151E] border-[#262C3D] hover:bg-[#1A1E2B] hover:border-gray-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#9CA3AF]">Module 0{module.moduleNumber}</span>
                  {module.isCompleted ? (
                    <Badge variant="success"><CheckCircle2 className="w-3 h-3" /> Mastered</Badge>
                  ) : module.isLocked ? (
                    <Badge variant="neutral"><Lock className="w-3 h-3" /> Locked</Badge>
                  ) : (
                    <Badge variant="info">In Progress</Badge>
                  )}
                </div>
                <h4 className="font-bold text-sm text-[#F3F4F6] mt-2">{module.title}</h4>
                <p className="text-xs text-[#9CA3AF] mt-1 line-clamp-2">{module.summary}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Module Sessions List */}
          {activeModule.sessions.length === 0 ? (
            <Card className="p-8 text-center space-y-4">
              <Lock className="w-12 h-12 text-[#FFB800] mx-auto" />
              <h3 className="text-xl font-bold text-[#F3F4F6]">Module Locked</h3>
              <p className="text-sm text-[#9CA3AF]">
                Pass Module 2 assessment drills to unlock Module {activeModule.moduleNumber}.
              </p>
            </Card>
          ) : (
            <>
              <div className="space-y-4">
                <h3 className="text-sm font-mono uppercase tracking-widest text-[#9CA3AF]">
                  Prescribed Sessions
                </h3>

                {activeModule.sessions.map((session) => (
                  <Card
                    key={session.id}
                    accentBorder={session.id === selectedSessionId}
                    className="space-y-4 cursor-pointer"
                    onClick={() => setSelectedSessionId(session.id)}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-mono text-[#00E599]">Session 1.{session.sessionNumber}</span>
                        <h4 className="text-lg font-bold text-[#F3F4F6]">{session.title}</h4>
                      </div>
                      <Badge variant={session.isCompleted ? 'success' : 'info'}>
                        {session.estimatedMinutes} Mins Practice
                      </Badge>
                    </div>

                    <p className="text-sm text-[#9CA3AF]">{session.description}</p>

                    {/* Steps breakdown */}
                    <div className="space-y-2 pt-2 border-t border-[#262C3D]">
                      <span className="text-xs font-mono uppercase text-[#9CA3AF]">Drill Checklist</span>
                      {session.steps.map((step) => (
                        <div
                          key={step.id}
                          className="flex items-center justify-between p-2.5 bg-[#1A1E2B] rounded border border-[#262C3D] text-xs font-mono"
                        >
                          <div className="flex items-center gap-2">
                            {step.type === 'LESSON' && <Target className="w-4 h-4 text-[#3B82F6]" />}
                            {step.type === 'DRILL' && <Play className="w-4 h-4 text-[#00E599]" />}
                            {step.type === 'ASSESSMENT' && <Flag className="w-4 h-4 text-[#FFB800]" />}
                            <span className="text-[#F3F4F6] font-semibold">{step.title}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {step.telemetryThreshold && (
                              <span className="text-[#9CA3AF] hidden sm:inline">
                                Criteria: {step.telemetryThreshold.targetValue}
                              </span>
                            )}
                            <Badge variant={step.isCompleted ? 'success' : 'warning'}>
                              {step.isCompleted ? 'Passed' : 'Pending'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Real-time Telemetry Coaching Demonstration */}
              <ObjectiveFeedbackCard
                sessionTitle="Telemetry Audit — Geometric Apex & Linearity"
                lapDeltaSeconds={0.428}
                brakeReleaseVariance={4.2}
                apexDeviationCm={24}
                passed={true}
                recommendedAction="Average lap delta within 0.500s tolerance. Brake release linearity verified. Repeat Session 2.1 Drill 2 to consolidate apex muscle memory."
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
