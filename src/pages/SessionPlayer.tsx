import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCurriculum } from '../context/CurriculumContext'
import { useAuth } from '../context/AuthContext'
import { Step, Session } from '../types/curriculum'
import { SessionAssessmentRecord } from '../types/assessment'
import { allCurricula } from '../data/allCurriculum'
import { getSessionDetailExtra } from '../data/sessionDetails'
import { getInitialActiveStepIndex } from '../lib/sessionPlayerEngine'
import { sessionPlayerService } from '../services/sessionPlayerService'
import { assessmentService } from '../services/assessmentService'
import { SessionHeader } from '../components/session/SessionHeader'
import { StepStepper } from '../components/session/StepStepper'
import { SessionOverviewSection } from '../components/session/SessionOverviewSection'
import { TheorySection } from '../components/session/TheorySection'
import { PrescriptionCard } from '../components/session/PrescriptionCard'
import { StepExecutionCard } from '../components/session/StepExecutionCard'
import { ReflectionCard } from '../components/session/ReflectionCard'
import { SessionSummaryModal } from '../components/session/SessionSummaryModal'
import { PerformanceEntryModal } from '../components/assessment/PerformanceEntryModal'
import { MasteryEvaluationCard } from '../components/assessment/MasteryEvaluationCard'
import { RemediationCard } from '../components/assessment/RemediationCard'
import { CoachConsole } from '../components/coaching/CoachConsole'
import { BookOpen, Sliders, PlayCircle, MessageSquare, Info, Trophy, PlusCircle } from 'lucide-react'

export const SessionPlayer: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const {
    progressMap,
    toggleStepCompletion,
    devUnlockMode,
    toggleDevUnlockMode,
    resumeLearning
  } = useCurriculum()

  // Find target session and parent module from allCurricula
  const { session, module, level } = useMemo(() => {
    if (!sessionId) return { session: null, module: null, level: null }
    for (const lvl of allCurricula) {
      for (const mod of lvl.modules) {
        const sess = mod.sessions.find((s: Session) => s.id === sessionId)
        if (sess) {
          return { session: sess, module: mod, level: lvl }
        }
      }
    }
    return { session: null, module: null, level: null }
  }, [sessionId])

  const extraDetails = useMemo(() => {
    if (!session) return getSessionDetailExtra('', 'Session')
    return getSessionDetailExtra(session.id, session.title)
  }, [session])

  // Saved Session State (Active step index & reflections)
  const savedState = useMemo(() => {
    if (!session) return null
    return sessionPlayerService.getSessionState(session.id)
  }, [session?.id])

  // Assessment Record State
  const [assessmentRecord, setAssessmentRecord] = useState<SessionAssessmentRecord | null>(() => {
    if (!session) return null
    return assessmentService.getAssessmentRecord(session.id)
  })

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(() => {
    if (!session) return 0
    return getInitialActiveStepIndex(session, progressMap, savedState, devUnlockMode)
  })

  const [activeTab, setActiveTab] = useState<
    'EXECUTION' | 'ASSESSMENT' | 'THEORY' | 'PRESCRIPTION' | 'REFLECTION' | 'OVERVIEW'
  >('EXECUTION')

  const [reflections, setReflections] = useState<Record<string, string>>(
    () => savedState?.reflections || {}
  )
  const [confidenceRating, setConfidenceRating] = useState<number | undefined>(
    savedState?.confidenceRating
  )
  const [lastSavedText, setLastSavedText] = useState<string | undefined>()
  const [showSummaryModal, setShowSummaryModal] = useState(false)
  const [showEntryModal, setShowEntryModal] = useState(false)

  // Keep step index in valid range when session changes
  useEffect(() => {
    if (session) {
      const initIdx = getInitialActiveStepIndex(session, progressMap, savedState, devUnlockMode)
      setCurrentStepIndex(initIdx)
      setAssessmentRecord(assessmentService.getAssessmentRecord(session.id))
    }
  }, [session?.id])

  // Autosave active step & reflections
  const triggerAutosave = useCallback(
    async (stepIdx: number, reflMap: Record<string, string>, rating?: number) => {
      if (!session) return
      await sessionPlayerService.saveSessionState(
        session.id,
        stepIdx,
        reflMap,
        rating,
        user?.id
      )
      setLastSavedText(`Saved ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`)
    },
    [session?.id, user?.id]
  )

  const handleSelectStep = (idx: number) => {
    if (!session) return
    if (idx < 0 || idx >= session.steps.length) return
    setCurrentStepIndex(idx)
    triggerAutosave(idx, reflections, confidenceRating)
  }

  const handleToggleCurrentStep = async () => {
    if (!session) return
    const step = session.steps[currentStepIndex]
    if (!step) return
    await toggleStepCompletion(step.id, module?.id || '', session.id)

    // Automatically check if all steps complete to open summary modal
    const updatedMap = { ...progressMap, [step.id]: !progressMap[step.id] }
    const allStepsCompletedNow = session.steps.every((s: Step) => updatedMap[s.id])
    if (allStepsCompletedNow) {
      setShowSummaryModal(true)
    }
  }

  const handleSaveReflection = (text: string, rating?: number) => {
    if (!session) return
    const currentStep = session.steps[currentStepIndex]
    if (!currentStep) return

    const updatedReflections = { ...reflections, [currentStep.id]: text }
    setReflections(updatedReflections)
    if (rating !== undefined) setConfidenceRating(rating)
    triggerAutosave(currentStepIndex, updatedReflections, rating || confidenceRating)
  }

  const handleSubmitTelemetry = async (data: any) => {
    if (!session) return
    const record = await assessmentService.saveAssessmentEntry(session.id, session.title, data, user?.id)
    setAssessmentRecord(record)
    setShowEntryModal(false)
    setActiveTab('ASSESSMENT')
  }

  if (!session || !module || !level) {
    return (
      <div className="min-h-screen bg-[#08080A] text-[#F3F4F6] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Session Not Found</h2>
        <p className="text-sm text-[#9CA3AF] mb-6 font-learning">
          The requested training session ({sessionId}) does not exist in the APEX curriculum.
        </p>
        <button
          onClick={() => navigate('/curriculum')}
          className="px-4 py-2 rounded-lg bg-[#E10600] text-white font-mono text-xs font-bold shadow-lg shadow-[#E10600]/30"
        >
          Return to Curriculum Overview
        </button>
      </div>
    )
  }

  const currentStep = session.steps[currentStepIndex] || session.steps[0]
  const isCurrentStepCompleted = Boolean(progressMap[currentStep.id])
  const completedStepsCount = session.steps.filter((s: Step) => progressMap[s.id]).length

  const formattedPrescription = useMemo(() => {
    const raw = currentStep?.prescription || extraDetails?.prescription
    if (!raw) return undefined
    const assistsText =
      typeof raw.assists === 'string'
        ? raw.assists
        : raw.assists
        ? `ABS: ${raw.assists.abs}, TCS: ${raw.assists.tc}`
        : 'ABS On, TCS Off'
    return {
      track: raw.track || 'Lime Rock Park',
      car: raw.car || 'Hyundai Elantra N',
      assists: assistsText,
      weather: raw.weather || 'Clear / Dry'
    }
  }, [currentStep, extraDetails])

  return (
    <div className="min-h-screen bg-[#08080A] text-[#F3F4F6] flex flex-col font-sans selection:bg-[#E10600] selection:text-white">
      {/* Session Player Header */}
      <SessionHeader
        session={session}
        currentStepIndex={currentStepIndex}
        totalSteps={session.steps.length}
        completedStepsCount={completedStepsCount}
        onExit={() => navigate('/curriculum')}
        devUnlockMode={devUnlockMode}
        onToggleDevUnlock={toggleDevUnlockMode}
        lastSavedText={lastSavedText}
      />

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Step Navigation Stepper (3 cols) */}
        <aside className="lg:col-span-3 space-y-6">
          <StepStepper
            steps={session.steps}
            currentStepIndex={currentStepIndex}
            onSelectStep={handleSelectStep}
            progressMap={progressMap}
            session={session}
            devUnlockMode={devUnlockMode}
          />

          {/* Performance Entry Quick Trigger Card */}
          <div className="bg-[#121216] border border-[#262630] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF]">
              <span>Assessment Status</span>
              {assessmentRecord ? (
                <span className="text-[#E10600] font-bold">{assessmentRecord.result.grade}</span>
              ) : (
                <span className="text-[#FFB800]">Not Evaluated</span>
              )}
            </div>
            <button
              onClick={() => setShowEntryModal(true)}
              className="w-full py-2 px-3 rounded-lg bg-[#E10600]/10 hover:bg-[#E10600]/20 border border-[#E10600]/40 text-[#E10600] font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{assessmentRecord ? 'Update Telemetry Entry' : 'Log Performance Telemetry'}</span>
            </button>
          </div>

          {/* Module Context Card */}
          <div className="bg-[#121216] border border-[#262630] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF]">
              <span>Module Context</span>
              <span className="text-[#E10600]">Module {module.moduleNumber}</span>
            </div>
            <p className="text-xs font-bold text-[#F3F4F6]">{module.title}</p>
            <div className="pt-2 border-t border-[#262630] flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
              <span>Wheel Target:</span>
              <span className="text-[#E10600]">Moza R3 DD</span>
            </div>
          </div>
        </aside>

        {/* Right Column: Active View Area (9 cols) */}
        <section className="lg:col-span-9 space-y-6">
          {/* Navigation View Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#121216] p-1.5 rounded-xl border border-[#262630]">
            <button
              onClick={() => setActiveTab('EXECUTION')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'EXECUTION'
                  ? 'bg-[#E10600] text-white shadow-md shadow-[#E10600]/30'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1A1A20]'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Step Drill</span>
            </button>

            <button
              onClick={() => setActiveTab('ASSESSMENT')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'ASSESSMENT'
                  ? 'bg-[#E10600] text-white shadow-md shadow-[#E10600]/30'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1A1A20]'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Assessment</span>
            </button>

            <button
              onClick={() => setActiveTab('THEORY')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'THEORY'
                  ? 'bg-[#E10600] text-white shadow-md shadow-[#E10600]/30'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1A1A20]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Theory</span>
            </button>

            <button
              onClick={() => setActiveTab('PRESCRIPTION')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'PRESCRIPTION'
                  ? 'bg-[#E10600] text-white shadow-md shadow-[#E10600]/30'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1A1A20]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Prescription</span>
            </button>

            <button
              onClick={() => setActiveTab('REFLECTION')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'REFLECTION'
                  ? 'bg-[#E10600] text-white shadow-md shadow-[#E10600]/30'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1A1A20]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Reflection</span>
            </button>

            <button
              onClick={() => setActiveTab('OVERVIEW')}
              className={`py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'OVERVIEW'
                  ? 'bg-[#E10600] text-white shadow-md shadow-[#E10600]/30'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1A1A20]'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Briefing</span>
            </button>
          </div>

          {/* Active View + Coach Console Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
            <div className="xl:col-span-2 space-y-6">
              {activeTab === 'EXECUTION' && (
                <StepExecutionCard
                  step={currentStep}
                  stepIndex={currentStepIndex}
                  totalSteps={session.steps.length}
                  isCompleted={isCurrentStepCompleted}
                  onToggleComplete={handleToggleCurrentStep}
                  onNextStep={() => handleSelectStep(currentStepIndex + 1)}
                  onPrevStep={() => handleSelectStep(currentStepIndex - 1)}
                  hasNextStep={currentStepIndex < session.steps.length - 1}
                  hasPrevStep={currentStepIndex > 0}
                />
              )}

              {activeTab === 'ASSESSMENT' && (
                <div className="space-y-6">
                  {assessmentRecord ? (
                    <>
                      <MasteryEvaluationCard
                        result={assessmentRecord.result}
                        onReevaluate={() => setShowEntryModal(true)}
                      />

                      {assessmentRecord.remediationPlan && (
                        <RemediationCard
                          plan={assessmentRecord.remediationPlan}
                          onRetryDrill={() => {
                            setCurrentStepIndex(0)
                            setActiveTab('EXECUTION')
                          }}
                        />
                      )}
                    </>
                  ) : (
                    <div className="bg-[#121216] border border-[#262630] rounded-2xl p-8 text-center space-y-4">
                      <Trophy className="w-12 h-12 text-[#FFB800] mx-auto" />
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-[#F3F4F6]">Session Assessment Pending</h3>
                        <p className="text-xs text-[#9CA3AF] font-learning max-w-md mx-auto">
                          Log your lap times and clean lap count to receive an automated mastery evaluation and telemetry diagnostic report.
                        </p>
                      </div>
                      <button
                        onClick={() => setShowEntryModal(true)}
                        className="px-6 py-2.5 rounded-xl bg-[#E10600] text-white hover:bg-[#FF1E19] font-mono text-xs font-bold transition-all inline-flex items-center gap-2 shadow-lg shadow-[#E10600]/30"
                      >
                        <PlusCircle className="w-4 h-4" />
                        <span>Enter Performance Telemetry</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'THEORY' && (
                <TheorySection step={currentStep} extraDetails={extraDetails} />
              )}

              {activeTab === 'PRESCRIPTION' && (
                <PrescriptionCard prescription={currentStep.prescription || extraDetails.prescription} />
              )}

              {activeTab === 'REFLECTION' && (
                <ReflectionCard
                  step={currentStep}
                  extraDetails={extraDetails}
                  savedReflection={reflections[currentStep.id] || ''}
                  savedConfidence={confidenceRating}
                  onSaveReflection={handleSaveReflection}
                />
              )}

              {activeTab === 'OVERVIEW' && (
                <SessionOverviewSection session={session} extraDetails={extraDetails} />
              )}
            </div>

            {/* Persistent Contextual Coach Console */}
            <div className="xl:col-span-1">
              <CoachConsole
                currentObjective={currentStep.objective}
                prescription={formattedPrescription}
                coachAdvice={currentStep.coachNotes?.[0] || 'Focus on smooth pedal releases to maintain weight transfer balance across the front axle.'}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Completion Summary Modal */}
      {showSummaryModal && (
        <SessionSummaryModal
          session={session}
          totalSteps={session.steps.length}
          reflectionsCount={Object.keys(reflections).length}
          onReturnToCurriculum={() => navigate('/curriculum')}
          onNextPrescribedSession={() => {
            setShowSummaryModal(false)
            resumeLearning()
            navigate('/curriculum')
          }}
          onRestartSession={() => {
            setShowSummaryModal(false)
            setCurrentStepIndex(0)
          }}
        />
      )}

      {/* Performance Entry Dialog Modal */}
      {showEntryModal && (
        <PerformanceEntryModal
          sessionId={session.id}
          sessionTitle={session.title}
          isOpen={showEntryModal}
          onClose={() => setShowEntryModal(false)}
          onSubmit={handleSubmitTelemetry}
          existingEntry={assessmentRecord?.entry}
        />
      )}
    </div>
  )
}
