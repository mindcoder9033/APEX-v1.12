import React, { useState } from 'react'
import { X, Award, CheckCircle2, Trophy, ArrowRight, ShieldCheck } from 'lucide-react'
import { Module } from '../../types/curriculum'
import { ModuleExamResult, MasteryGrade } from '../../types/assessment'
import { assessmentService } from '../../services/assessmentService'

interface ModuleExamModalProps {
  module: Module
  isOpen: boolean
  onClose: () => void
  onCompleteExam: (result: ModuleExamResult) => void
  profileId?: string
}

export const ModuleExamModal: React.FC<ModuleExamModalProps> = ({
  module,
  isOpen,
  onClose,
  onCompleteExam,
  profileId
}) => {
  const existingExam = assessmentService.getModuleExam(module.id)

  const [examResult, setExamResult] = useState<ModuleExamResult | null>(existingExam)
  const [isEvaluating, setIsEvaluating] = useState(false)

  if (!isOpen) return null

  const handleRunEvaluation = async () => {
    setIsEvaluating(true)

    // Collect session assessment scores for all sessions in this module
    const sessionScores = module.sessions.map((sess) => {
      const record = assessmentService.getAssessmentRecord(sess.id)
      if (record) {
        return {
          sessionId: sess.id,
          sessionTitle: sess.title,
          score: record.result.score,
          grade: record.result.grade
        }
      }
      // Default baseline score if session was completed via step checkboxes without formal assessment entry
      return {
        sessionId: sess.id,
        sessionTitle: sess.title,
        score: 85,
        grade: 'SATISFACTORY' as MasteryGrade
      }
    })

    const avgScore = Math.round(
      sessionScores.reduce((sum, s) => sum + s.score, 0) / (sessionScores.length || 1)
    )

    let grade: MasteryGrade = 'SATISFACTORY'
    let passed = true
    if (avgScore >= 88) {
      grade = 'MASTERED'
    } else if (avgScore >= 70) {
      grade = 'SATISFACTORY'
    } else {
      grade = 'NEEDS_WORK'
      passed = false
    }

    const feedback: string[] = [
      `Integrated competency evaluated across ${sessionScores.length} curriculum sessions.`,
      passed
        ? `Demonstrated mastery of module objectives: ${module.focusArea}.`
        : 'Additional practice required on session telemetry benchmarks before module completion.'
    ]

    const result: ModuleExamResult = {
      moduleId: module.id,
      moduleTitle: module.title,
      completedAt: new Date().toISOString(),
      overallScore: avgScore,
      passed,
      grade,
      sessionScores,
      feedback
    }

    await assessmentService.saveModuleExam(result, profileId)
    setExamResult(result)
    setIsEvaluating(false)
    onCompleteExam(result)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#12151E] border border-[#262C3D] rounded-2xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#262C3D]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00E599]/10 border border-[#00E599]/30 flex items-center justify-center text-[#00E599]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#00E599] font-bold">
                Module {module.moduleNumber} Examination
              </span>
              <h3 className="text-xl font-bold text-[#F3F4F6] tracking-tight">{module.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#090A0F] text-[#9CA3AF] hover:text-[#F3F4F6] border border-[#262C3D]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Module Focus Summary */}
        <div className="bg-[#090A0F] border border-[#262C3D] rounded-xl p-4 space-y-2">
          <span className="text-xs font-mono text-[#9CA3AF] uppercase block font-bold">
            Integrated Competency Standard
          </span>
          <p className="text-xs text-[#F3F4F6] leading-relaxed">{module.summary}</p>
          <div className="pt-2 border-t border-[#262C3D] flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
            <span>Focus Area:</span>
            <span className="text-[#00E599] font-bold">{module.focusArea}</span>
          </div>
        </div>

        {/* Exam Result Display */}
        {examResult ? (
          <div className="space-y-4">
            <div className="bg-[#090A0F] border border-[#00E599]/40 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#00E599]/10 border border-[#00E599]/30 flex items-center justify-center text-[#00E599]">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-[#9CA3AF] block">Module Examination Grade</span>
                  <span className="text-lg font-bold text-[#F3F4F6]">
                    {examResult.grade === 'MASTERED' ? 'MASTERED' : 'SATISFACTORY'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-mono font-bold text-[#00E599]">
                  {examResult.overallScore}%
                </span>
                <span className="text-[10px] font-mono text-[#9CA3AF] block">Score</span>
              </div>
            </div>

            {/* Session Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase font-bold text-[#9CA3AF]">
                Session Performance Breakdown
              </h4>
              <div className="space-y-1.5">
                {examResult.sessionScores.map((s, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-[#090A0F] border border-[#262C3D] flex items-center justify-between text-xs"
                  >
                    <span className="text-[#F3F4F6] font-medium">{s.sessionTitle}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[#00E599] font-bold">{s.score}%</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/30">
                        {s.grade}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#090A0F] border border-[#262C3D] rounded-xl p-6 text-center space-y-4">
            <ShieldCheck className="w-10 h-10 text-[#00E599] mx-auto" />
            <div className="space-y-1">
              <h4 className="text-base font-bold text-[#F3F4F6]">Ready for Examination</h4>
              <p className="text-xs text-[#9CA3AF]">
                The system will aggregate your session telemetry results to verify integrated driver competency.
              </p>
            </div>
            <button
              onClick={handleRunEvaluation}
              disabled={isEvaluating}
              className="px-6 py-2.5 rounded-xl bg-[#00E599] text-[#090A0F] hover:bg-[#00FFAB] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 mx-auto shadow-lg shadow-[#00E599]/20"
            >
              {isEvaluating ? (
                <span>Evaluating Session Data...</span>
              ) : (
                <>
                  <span>Begin Examination Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-[#262C3D] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#090A0F] text-[#9CA3AF] hover:text-[#F3F4F6] border border-[#262C3D] text-xs font-mono font-bold"
          >
            Close
          </button>
          {examResult && (
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-[#00E599] text-[#090A0F] hover:bg-[#00FFAB] font-mono text-xs font-bold transition-all flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Module Completion</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
