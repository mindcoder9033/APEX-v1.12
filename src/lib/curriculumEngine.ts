import {
  LevelCurriculum,
  Module,
  Session,
  Step,
  DriverLevel,
  LevelProgressSummary
} from '../types/curriculum'
import { allCurricula, curriculumByLevel } from '../data/allCurriculum'

/**
 * Returns all available level curricula.
 */
export function getAllCurricula(): LevelCurriculum[] {
  return allCurricula
}


export type ProgressMap = Record<string, boolean> // stepId -> boolean (true = passed)

/**
 * Checks if a specific step is completed.
 */
export function isStepCompleted(stepId: string, progressMap: ProgressMap): boolean {
  return Boolean(progressMap[stepId])
}

/**
 * Checks if a session is completed (all steps in session completed).
 */
export function isSessionCompleted(session: Session, progressMap: ProgressMap): boolean {
  if (!session.steps || session.steps.length === 0) return false
  return session.steps.every((step) => isStepCompleted(step.id, progressMap))
}

/**
 * Checks if a module is completed (all sessions in module completed).
 */
export function isModuleCompleted(module: Module, progressMap: ProgressMap): boolean {
  if (!module.sessions || module.sessions.length === 0) return false
  return module.sessions.every((session) => isSessionCompleted(session, progressMap))
}

/**
 * Checks if a level is completed (all modules in level completed).
 */
export function isLevelCompleted(level: LevelCurriculum, progressMap: ProgressMap): boolean {
  if (!level.modules || level.modules.length === 0) return false
  return level.modules.every((module) => isModuleCompleted(module, progressMap))
}

/**
 * Checks if a Level is unlocked based on prerequisite completion or dev mode override.
 */
export function isLevelUnlocked(
  levelName: DriverLevel,
  progressMap: ProgressMap,
  devMode = false
): boolean {
  if (devMode || levelName === 'BEGINNER') return true

  if (levelName === 'INTERMEDIATE') {
    return isLevelCompleted(curriculumByLevel.BEGINNER, progressMap)
  }

  if (levelName === 'EXPERT') {
    return (
      isLevelCompleted(curriculumByLevel.BEGINNER, progressMap) &&
      isLevelCompleted(curriculumByLevel.INTERMEDIATE, progressMap)
    )
  }

  return false
}

/**
 * Checks if a Module is unlocked sequentially within its level.
 */
export function isModuleUnlocked(
  module: Module,
  level: LevelCurriculum,
  progressMap: ProgressMap,
  devMode = false
): boolean {
  if (devMode) return true
  if (!isLevelUnlocked(level.levelName, progressMap, devMode)) return false

  // Module 1 is always unlocked if level is unlocked
  if (module.moduleNumber === 1) return true

  // Module N is unlocked if Module N-1 is completed
  const previousModule = level.modules.find((m) => m.moduleNumber === module.moduleNumber - 1)
  if (!previousModule) return true

  return isModuleCompleted(previousModule, progressMap)
}

/**
 * Checks if a Session is unlocked sequentially within its module.
 */
export function isSessionUnlocked(
  session: Session,
  module: Module,
  level: LevelCurriculum,
  progressMap: ProgressMap,
  devMode = false
): boolean {
  if (devMode) return true
  if (!isModuleUnlocked(module, level, progressMap, devMode)) return false

  if (session.sessionNumber === 1) return true

  const previousSession = module.sessions.find((s) => s.sessionNumber === session.sessionNumber - 1)
  if (!previousSession) return true

  return isSessionCompleted(previousSession, progressMap)
}

/**
 * Checks if a Step is unlocked sequentially within its session.
 */
export function isStepUnlocked(
  step: Step,
  session: Session,
  module: Module,
  level: LevelCurriculum,
  progressMap: ProgressMap,
  devMode = false
): boolean {
  if (devMode) return true
  if (!isSessionUnlocked(session, module, level, progressMap, devMode)) return false

  if (step.stepNumber === 1) return true

  const previousStep = session.steps.find((st) => st.stepNumber === step.stepNumber - 1)
  if (!previousStep) return true

  return isStepCompleted(previousStep.id, progressMap)
}

/**
 * Computes level progress metrics.
 */
export function getLevelProgressSummary(
  levelName: DriverLevel,
  progressMap: ProgressMap,
  devMode = false
): LevelProgressSummary {
  const level = curriculumByLevel[levelName]
  let totalSteps = 0
  let completedSteps = 0
  let totalSessions = 0
  let completedSessions = 0
  let totalModules = 0
  let completedModules = 0

  if (level) {
    totalModules = level.modules.length
    level.modules.forEach((mod) => {
      if (isModuleCompleted(mod, progressMap)) {
        completedModules++
      }
      totalSessions += mod.sessions.length
      mod.sessions.forEach((sess) => {
        if (isSessionCompleted(sess, progressMap)) {
          completedSessions++
        }
        totalSteps += sess.steps.length
        sess.steps.forEach((step) => {
          if (isStepCompleted(step.id, progressMap)) {
            completedSteps++
          }
        })
      })
    })
  }

  const percentComplete = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0
  const isUnlocked = isLevelUnlocked(levelName, progressMap, devMode)
  const isCompleted = totalSteps > 0 && completedSteps === totalSteps

  return {
    levelId: levelName,
    totalModules,
    completedModules,
    totalSessions,
    completedSessions,
    totalSteps,
    completedSteps,
    percentComplete,
    isUnlocked,
    isCompleted
  }
}

export interface PrescribedTarget {
  level: LevelCurriculum
  module: Module
  session: Session
  step: Step
}

/**
 * Computes the recommended "Resume Learning" prescribed session and step.
 * Finds the first unlocked level, first unlocked module, first unlocked session, and first uncompleted step.
 */
export function getNextPrescribedTarget(
  progressMap: ProgressMap,
  currentLevelName: DriverLevel = 'BEGINNER',
  devMode = false
): PrescribedTarget | null {
  const targetLevel = curriculumByLevel[currentLevelName] || curriculumByLevel.BEGINNER
  if (!isLevelUnlocked(targetLevel.levelName, progressMap, devMode)) {
    return null
  }

  for (const mod of targetLevel.modules) {
    if (!isModuleUnlocked(mod, targetLevel, progressMap, devMode)) continue

    for (const sess of mod.sessions) {
      if (!isSessionUnlocked(sess, mod, targetLevel, progressMap, devMode)) continue

      for (const step of sess.steps) {
        if (!isStepCompleted(step.id, progressMap)) {
          return {
            level: targetLevel,
            module: mod,
            session: sess,
            step
          }
        }
      }
    }
  }

  // If all steps in current level are completed, fallback to first step of level
  if (targetLevel.modules[0]?.sessions[0]?.steps[0]) {
    return {
      level: targetLevel,
      module: targetLevel.modules[0],
      session: targetLevel.modules[0].sessions[0],
      step: targetLevel.modules[0].sessions[0].steps[0]
    }
  }

  return null
}
