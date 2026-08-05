import React from 'react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { TelemetryBar } from '../ui/TelemetryBar'
import { CheckCircle2, Lock, Play } from 'lucide-react'
import { useCurriculum } from '../../context/CurriculumContext'
import { isModuleUnlocked, isSessionUnlocked, isSessionCompleted } from '../../lib/curriculumEngine'
import { Link } from 'react-router-dom'

export const ProgressBreakdown: React.FC = () => {
  const {
    activeLevel,
    progressMap,
    devUnlockMode,
    setActiveModuleId,
    setActiveSessionId
  } = useCurriculum()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#00E599]">
            Curriculum Progression Matrix
          </span>
          <h2 className="text-xl font-bold text-[#F3F4F6]">
            {activeLevel.title} — Detailed Modules & Sessions
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeLevel.modules.map((mod) => {
          const unlocked = isModuleUnlocked(mod, activeLevel, progressMap, devUnlockMode)

          let completedSessionsInModule = 0
          mod.sessions.forEach((s) => {
            if (isSessionCompleted(s, progressMap)) {
              completedSessionsInModule++
            }
          })

          const modulePercent = Math.round(
            (completedSessionsInModule / (mod.sessions.length || 1)) * 100
          )

          return (
            <Card
              key={mod.id}
              className={`space-y-4 bg-[#12151E] border-[#262C3D] ${
                !unlocked ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center justify-between border-b border-[#262C3D] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#00E599]">
                    M{mod.moduleNumber}
                  </span>
                  <h3 className="font-bold text-[#F3F4F6]">{mod.title}</h3>
                </div>
                {unlocked ? (
                  <Badge variant={modulePercent === 100 ? 'success' : 'info'}>
                    {modulePercent}%
                  </Badge>
                ) : (
                  <Badge variant="neutral">
                    <Lock className="w-3 h-3 inline mr-1" /> Locked
                  </Badge>
                )}
              </div>

              <p className="text-xs text-[#9CA3AF] line-clamp-2">{mod.summary}</p>

              <TelemetryBar label="Module Progress" value={modulePercent} />

              <div className="space-y-2 pt-2">
                <div className="text-[11px] font-mono text-[#9CA3AF] uppercase tracking-wider">
                  Sessions ({mod.sessions.length})
                </div>
                <div className="space-y-2">
                  {mod.sessions.map((sess) => {
                    const sessionIsUnlocked = isSessionUnlocked(
                      sess,
                      mod,
                      activeLevel,
                      progressMap,
                      devUnlockMode
                    )
                    const sessionIsCompleted = isSessionCompleted(sess, progressMap)

                    return (
                      <div
                        key={sess.id}
                        className={`p-2.5 rounded border text-xs flex items-center justify-between transition-colors ${
                          sessionIsCompleted
                            ? 'bg-[#00E599]/5 border-[#00E599]/30 text-[#F3F4F6]'
                            : sessionIsUnlocked
                            ? 'bg-[#1A1E2B] border-[#262C3D] text-[#F3F4F6]'
                            : 'bg-[#12151E] border-[#262C3D]/50 text-[#9CA3AF]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {sessionIsCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0" />
                          ) : sessionIsUnlocked ? (
                            <Play className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                          ) : (
                            <Lock className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
                          )}
                          <span className="font-semibold">
                            S{sess.sessionNumber}: {sess.title}
                          </span>
                        </div>

                        {sessionIsUnlocked && (
                          <Link
                            to={`/session/${sess.id}`}
                            onClick={() => {
                              setActiveModuleId(mod.id)
                              setActiveSessionId(sess.id)
                            }}
                          >
                            <Button variant="telemetry" size="sm" className="py-1 px-2.5 text-[11px]">
                              {sessionIsCompleted ? 'Replay' : 'Start'}
                            </Button>
                          </Link>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
