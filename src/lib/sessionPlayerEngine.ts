import { Session, SessionStepProgress } from '../types/curriculum'
import { ProgressMap } from './curriculumEngine'

/**
 * Calculates the active step index for a session based on progressMap and devUnlockMode.
 */
export function getInitialActiveStepIndex(
  session: Session,
  progressMap: ProgressMap,
  savedProgress?: SessionStepProgress | null,
  devUnlockMode: boolean = false
): number {
  if (!session || !session.steps || session.steps.length === 0) return 0

  if (savedProgress && typeof savedProgress.currentStepIndex === 'number') {
    if (savedProgress.currentStepIndex >= 0 && savedProgress.currentStepIndex < session.steps.length) {
      return savedProgress.currentStepIndex
    }
  }

  if (devUnlockMode) return 0

  // Find first uncompleted step
  for (let i = 0; i < session.steps.length; i++) {
    const step = session.steps[i]
    if (!progressMap[step.id]) {
      return i
    }
  }

  return session.steps.length - 1
}

/**
 * Determines if a specific step in a session is locked for the driver.
 */
export function isStepLocked(
  stepIndex: number,
  session: Session,
  progressMap: ProgressMap,
  devUnlockMode: boolean = false
): boolean {
  if (devUnlockMode || stepIndex === 0) return false

  // Step is unlocked if all previous steps in this session are completed
  for (let i = 0; i < stepIndex; i++) {
    const prevStep = session.steps[i]
    if (!progressMap[prevStep.id]) {
      return true
    }
  }

  return false
}

/**
 * Calculates the step completion percentage for a session.
 */
export function getSessionStepCompletionStats(
  session: Session,
  progressMap: ProgressMap
): { totalSteps: number; completedSteps: number; percent: number; isCompleted: boolean } {
  if (!session || !session.steps || session.steps.length === 0) {
    return { totalSteps: 0, completedSteps: 0, percent: 0, isCompleted: false }
  }

  let completedSteps = 0
  for (const step of session.steps) {
    if (progressMap[step.id]) {
      completedSteps++
    }
  }

  const percent = Math.round((completedSteps / session.steps.length) * 100)
  const isCompleted = completedSteps === session.steps.length

  return {
    totalSteps: session.steps.length,
    completedSteps,
    percent,
    isCompleted
  }
}
