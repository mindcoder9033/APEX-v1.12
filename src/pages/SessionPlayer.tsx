import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCurriculum } from '../context/CurriculumContext'
import { useAuth } from '../context/AuthContext'
import { Step, Session } from '../types/curriculum'
import { allCurricula } from '../data/allCurriculum'
import { getSessionDetailExtra } from '../data/sessionDetails'
import { getInitialActiveStepIndex, isStepLocked } from '../lib/sessionPlayerEngine'
import { sessionPlayerService } from '../services/sessionPlayerService'
import { SessionHeader } from '../components/session/SessionHeader'
import { StepStepper } from '../components/session/StepStepper'
import { SessionOverviewSection } from '../components/session/SessionOverviewSection'
import { TheorySection } from '../components/session/TheorySection'
import { PrescriptionCard } from '../components/session/PrescriptionCard'
import { StepExecutionCard } from '../components/session/StepExecutionCard'
import { ReflectionCard } from '../components/session/ReflectionCard'
import { SessionSummaryModal } from '../components/session/SessionSummaryModal'
import { BookOpen, Sliders, PlayCircle, MessageSquare, Info } from 'lucide-react'

export const SessionPlayer: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>()
  const navigate = useNavigate()
  const { profile } = useAuth()
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

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(() => {
    if (!session) return 0
    return getInitialActiveStepIndex(session, progressMap, savedState, devUnlockMode)
  })

  const [activeTab, setActiveTab] = useState<'EXECUTION' | 'OVERVIEW' | 'THEORY' | 'PRESCRIPTION' | 'REFLECTION'>(
    'EXECUTION'
  )

  const [reflections, setReflections] = useState<Record<string, string>>(
    () => savedState?.reflections || {}
  )
  const [confidenceRating, setConfidenceRating] = useState<number | undefined>(
    savedState?.confidenceRating
  )
  const [lastSavedText, setLastSavedText] = useState<string | undefined>()
  const [showSummaryModal, setShowSummaryModal] = useState(false)

  // Keep step index in valid range when session changes
  useEffect(() => {
    if (session) {
      const initIdx = getInitialActiveStepIndex(session, progressMap, savedState, devUnlockMode)
      setCurrentStepIndex(initIdx)
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
        profile?.id
      )
      const now = new Date()
      setLastSavedText(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    },
    [session?.id, profile?.id]
  )

  // Handle Step Selection
  const handleSelectStep = (index: number) => {
    if (!session) return
    if (!isStepLocked(index, session, progressMap, devUnlockMode)) {
      setCurrentStepIndex(index)
      triggerAutosave(index, reflections, confidenceRating)
    }
  }

  // Handle Step Completion Toggle
  const handleToggleCurrentStep = async () => {
    if (!session || !module) return
    const step = session.steps[currentStepIndex]
    if (!step) return

    await toggleStepCompletion(step.id, module.id, session.id)

    // Autosave state
    triggerAutosave(currentStepIndex, reflections, confidenceRating)

    // Check if session completed
    const allCompleted = session.steps.every(
      (s: Step) => s.id === step.id ? !progressMap[s.id] : progressMap[s.id]
    )

    if (allCompleted) {
      setShowSummaryModal(true)
    } else if (currentStepIndex < session.steps.length - 1) {
      // Auto advance to next step if completing
      const nextIdx = currentStepIndex + 1
      setCurrentStepIndex(nextIdx)
      triggerAutosave(nextIdx, reflections, confidenceRating)
    }
  }

  const handleSaveReflection = (text: string, rating?: number) => {
    if (!session) return
    const currentStep = session.steps[currentStepIndex]
    const updatedReflections = { ...reflections, [currentStep?.id || 'general']: text }
    setReflections(updatedReflections)
    if (rating) setConfidenceRating(rating)
    triggerAutosave(currentStepIndex, updatedReflections, rating)
  }

  if (!session || !module || !level) {
    return (
      <div className="min-h-screen bg-[#090A0F] text-[#F3F4F6] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl font-bold mb-2">Session Not Found</h2>
        <p className="text-sm text-[#9CA3AF] mb-6">
          The requested training session ({sessionId}) does not exist in the APEX curriculum.
        </p>
        <button
          onClick={() => navigate('/curriculum')}
          className="px-4 py-2 rounded-lg bg-[#00E599] text-[#090A0F] font-mono text-xs font-bold"
        >
          Return to Curriculum Overview
        </button>
      </div>
    )
  }

  const currentStep = session.steps[currentStepIndex] || session.steps[0]
  const isCurrentStepCompleted = Boolean(progressMap[currentStep.id])
  const completedStepsCount = session.steps.filter((s: Step) => progressMap[s.id]).length

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F3F4F6] flex flex-col font-sans selection:bg-[#00E599] selection:text-[#090A0F]">
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
        {/* Left Column: Step Navigation Stepper (4 cols) */}
        <aside className="lg:col-span-4 space-y-6">
          <StepStepper
            steps={session.steps}
            currentStepIndex={currentStepIndex}
            onSelectStep={handleSelectStep}
            progressMap={progressMap}
            session={session}
            devUnlockMode={devUnlockMode}
          />

          {/* Module & Hardware Quick Reference Card */}
          <div className="bg-[#12151E] border border-[#262C3D] rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#9CA3AF]">
              <span>Module Context</span>
              <span className="text-[#00E599]">Module {module.moduleNumber}</span>
            </div>
            <p className="text-xs font-bold text-[#F3F4F6]">{module.title}</p>
            <div className="pt-2 border-t border-[#262C3D] flex items-center justify-between text-[11px] font-mono text-[#9CA3AF]">
              <span>Wheel Target:</span>
              <span className="text-[#00E599]">Moza R3 DD</span>
            </div>
          </div>
        </aside>

        {/* Right Column: Active View Area (8 cols) */}
        <section className="lg:col-span-8 space-y-6">
          {/* Navigation View Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#12151E] p-1.5 rounded-xl border border-[#262C3D]">
            <button
              onClick={() => setActiveTab('EXECUTION')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'EXECUTION'
                  ? 'bg-[#00E599] text-[#090A0F]'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#090A0F]'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Step Drill</span>
            </button>

            <button
              onClick={() => setActiveTab('THEORY')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'THEORY'
                  ? 'bg-[#00E599] text-[#090A0F]'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#090A0F]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Theory</span>
            </button>

            <button
              onClick={() => setActiveTab('PRESCRIPTION')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'PRESCRIPTION'
                  ? 'bg-[#00E599] text-[#090A0F]'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#090A0F]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Prescription</span>
            </button>

            <button
              onClick={() => setActiveTab('REFLECTION')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'REFLECTION'
                  ? 'bg-[#00E599] text-[#090A0F]'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#090A0F]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Reflection</span>
            </button>

            <button
              onClick={() => setActiveTab('OVERVIEW')}
              className={`py-2 px-3 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'OVERVIEW'
                  ? 'bg-[#00E599] text-[#090A0F]'
                  : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#090A0F]'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Briefing</span>
            </button>
          </div>

          {/* Active View Component Rendering */}
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
    </div>
  )
}
