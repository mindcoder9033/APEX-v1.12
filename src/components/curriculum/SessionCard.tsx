import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Session, Module } from '../../types/curriculum'
import { useCurriculum } from '../../context/CurriculumContext'
import { isSessionUnlocked, isSessionCompleted, isStepCompleted } from '../../lib/curriculumEngine'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Lock, Target, Play, Flag, CheckCircle2, Clock, Car, MapPin, PlayCircle } from 'lucide-react'

interface SessionCardProps {
  session: Session
  module: Module
}

export const SessionCard: React.FC<SessionCardProps> = ({ session, module }) => {
  const navigate = useNavigate()
  const {
    activeLevel,
    activeSessionId,
    setActiveSessionId,
    progressMap,
    devUnlockMode,
    toggleStepCompletion
  } = useCurriculum()

  const unlocked = isSessionUnlocked(session, module, activeLevel, progressMap, devUnlockMode)
  const sessionPassed = isSessionCompleted(session, progressMap)
  const isSelected = activeSessionId === session.id

  const handleLaunchPlayer = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (unlocked) {
      navigate(`/session/${session.id}`)
    }
  }

  return (
    <Card
      accentBorder={isSelected}
      className={`space-y-5 transition-all duration-200 ${
        !unlocked ? 'opacity-60 bg-[#121216]/40 border-[#262630]' : 'bg-[#121216]'
      }`}
      onClick={() => {
        if (unlocked) {
          setActiveSessionId(session.id)
        }
      }}
    >
      {/* Session Top Bar */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#E10600] font-bold">
              Session 0{module.moduleNumber}.0{session.sessionNumber}
            </span>
            {!unlocked && (
              <Badge variant="neutral">
                <Lock className="w-3 h-3 text-[#FFB800]" /> Locked Session
              </Badge>
            )}
            {sessionPassed && (
              <Badge variant="success">
                <CheckCircle2 className="w-3 h-3" /> Mastered
              </Badge>
            )}
          </div>
          <h3 className="text-xl font-bold text-[#F3F4F6] mt-1">{session.title}</h3>
        </div>

        <div className="flex items-center gap-2">
          {unlocked && (
            <button
              onClick={handleLaunchPlayer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E10600] text-white font-mono text-xs font-bold hover:bg-[#FF1E19] transition-all shadow-md shadow-[#E10600]/30"
            >
              <PlayCircle className="w-4 h-4" />
              <span>{sessionPassed ? 'Review Session' : 'Start Session'}</span>
            </button>
          )}
          <Badge variant="info">
            <Clock className="w-3 h-3 mr-1" />
            {session.estimatedMinutes} Mins Practice
          </Badge>
        </div>
      </div>

      <p className="text-sm text-[#9CA3AF] font-learning leading-relaxed">{session.description}</p>

      {/* Setup Config Hardware / Car / Track */}
      <div className="flex flex-wrap items-center gap-4 text-xs font-mono p-3 bg-[#1A1A20] rounded-lg border border-[#262630]">
        <div className="flex items-center gap-1.5 text-[#F3F4F6]">
          <Car className="w-4 h-4 text-[#3B82F6]" />
          <span>Vehicle: {session.car}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#F3F4F6]">
          <MapPin className="w-4 h-4 text-[#E10600]" />
          <span>Circuit: {session.track}</span>
        </div>
      </div>

      {/* Step Checklist Engine */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-mono uppercase tracking-widest text-[#9CA3AF]">
          Prescribed Step Checklist
        </h4>

        <div className="space-y-3">
          {session.steps.map((step) => {
            const stepPassed = isStepCompleted(step.id, progressMap)

            return (
              <div
                key={step.id}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  stepPassed
                    ? 'bg-[#121216] border-[#E10600]/40'
                    : 'bg-[#1A1A20] border-[#262630]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`p-2 rounded-lg ${
                        step.type === 'LESSON'
                          ? 'bg-[#3B82F6]/20 text-[#3B82F6]'
                          : step.type === 'DRILL'
                          ? 'bg-[#E10600]/20 text-[#E10600]'
                          : 'bg-[#FFB800]/20 text-[#FFB800]'
                      }`}
                    >
                      {step.type === 'LESSON' && <Target className="w-4 h-4" />}
                      {step.type === 'DRILL' && <Play className="w-4 h-4" />}
                      {step.type === 'ASSESSMENT' && <Flag className="w-4 h-4" />}
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-[#9CA3AF] uppercase">
                          Step 0{step.stepNumber} &bull; {step.type}
                        </span>
                      </div>
                      <h5 className="font-bold text-sm text-[#F3F4F6]">{step.title}</h5>
                    </div>
                  </div>

                  {/* Interactive Toggle for Step Pass/Pending */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleStepCompletion(step.id, module.id, session.id)
                    }}
                    disabled={!unlocked}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all duration-200 ${
                      stepPassed
                        ? 'bg-[#E10600] text-white shadow-[0_0_10px_rgba(225,6,0,0.35)] hover:bg-[#FF1E19]'
                        : 'bg-[#262630] text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-gray-600'
                    }`}
                  >
                    {stepPassed ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" /> Passed
                      </>
                    ) : (
                      'Mark Step Passed'
                    )}
                  </button>
                </div>

                <p className="text-xs text-[#9CA3AF] font-learning mt-2.5 pl-11">{step.objective}</p>

                {/* Instructions & Telemetry Threshold Target */}
                <div className="mt-3 pl-11 space-y-2">
                  <div className="text-xs text-[#F3F4F6] space-y-1">
                    <span className="text-[11px] font-mono text-[#9CA3AF] block">Instructions:</span>
                    <ul className="list-disc list-inside space-y-0.5 text-[#9CA3AF] font-learning">
                      {step.instructions.map((inst, i) => (
                        <li key={i}>{inst}</li>
                      ))}
                    </ul>
                  </div>

                  {step.telemetryThreshold && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#121216] border border-[#E10600]/30 text-xs font-mono">
                      <span className="text-[#9CA3AF]">{step.telemetryThreshold.metric}:</span>
                      <span className="text-[#E10600] font-bold">
                        Target: {step.telemetryThreshold.targetValue}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
