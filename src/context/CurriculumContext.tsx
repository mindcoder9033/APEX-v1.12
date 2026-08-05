import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  DriverLevel,
  LevelCurriculum,
  Module,
  Session,
  LevelProgressSummary
} from '../types/curriculum'
import { curriculumByLevel } from '../data/allCurriculum'
import {
  ProgressMap,
  getLevelProgressSummary,
  getNextPrescribedTarget,
  PrescribedTarget
} from '../lib/curriculumEngine'
import { progressService } from '../services/progressService'
import { useAuth } from './AuthContext'

export type CurriculumFlowStep = 'level' | 'module' | 'session'

interface CurriculumContextType {
  activeLevelName: DriverLevel
  setActiveLevelName: (level: DriverLevel) => void
  activeModuleId: string
  setActiveModuleId: (id: string) => void
  activeSessionId: string
  setActiveSessionId: (id: string) => void
  flowStep: CurriculumFlowStep
  setFlowStep: (step: CurriculumFlowStep) => void
  selectLevelAndAdvance: (level: DriverLevel) => void
  selectModuleAndAdvance: (moduleId: string) => void
  goBackStep: () => void
  progressMap: ProgressMap
  devUnlockMode: boolean
  toggleDevUnlockMode: () => void
  activeLevel: LevelCurriculum
  activeModule: Module
  activeSession: Session | undefined
  levelSummary: LevelProgressSummary
  prescribedTarget: PrescribedTarget | null
  toggleStepCompletion: (stepId: string, moduleId: string, sessionId: string) => Promise<void>
  resumeLearning: () => void
  resetAllProgress: () => void
}

const CurriculumContext = createContext<CurriculumContextType | undefined>(undefined)

export const CurriculumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile } = useAuth()
  const [activeLevelName, setActiveLevelName] = useState<DriverLevel>('BEGINNER')
  const [flowStep, setFlowStep] = useState<CurriculumFlowStep>('level')
  const [progressMap, setProgressMap] = useState<ProgressMap>(() => progressService.getLocalProgress())
  const [devUnlockMode, setDevUnlockMode] = useState<boolean>(false)

  // Load user progress from remote/local service
  useEffect(() => {
    let mounted = true
    progressService.fetchDriverProgress(profile?.id).then((map) => {
      if (mounted) {
        setProgressMap(map)
      }
    })
    return () => {
      mounted = false
    }
  }, [profile?.id])

  const activeLevel = curriculumByLevel[activeLevelName] || curriculumByLevel.BEGINNER

  const [activeModuleId, setActiveModuleId] = useState<string>(
    activeLevel.modules[0]?.id || 'mod-1'
  )

  // Keep activeModule in sync when activeLevel changes
  useEffect(() => {
    if (activeLevel.modules.length > 0) {
      const firstMod = activeLevel.modules[0]
      setActiveModuleId(firstMod.id)
      if (firstMod.sessions.length > 0) {
        setActiveSessionId(firstMod.sessions[0].id)
      }
    }
  }, [activeLevelName])

  const activeModule =
    activeLevel.modules.find((m) => m.id === activeModuleId) || activeLevel.modules[0]

  const [activeSessionId, setActiveSessionId] = useState<string>(
    activeModule?.sessions[0]?.id || 'sess-1-1'
  )

  // Keep activeSession in sync when activeModule changes
  useEffect(() => {
    if (activeModule && activeModule.sessions.length > 0) {
      setActiveSessionId(activeModule.sessions[0].id)
    }
  }, [activeModuleId])

  const activeSession = activeModule?.sessions.find((s) => s.id === activeSessionId)

  const levelSummary = getLevelProgressSummary(activeLevelName, progressMap, devUnlockMode)
  const prescribedTarget = getNextPrescribedTarget(progressMap, activeLevelName, devUnlockMode)

  const selectLevelAndAdvance = useCallback((level: DriverLevel) => {
    setActiveLevelName(level)
    setFlowStep('module')
  }, [])

  const selectModuleAndAdvance = useCallback((moduleId: string) => {
    setActiveModuleId(moduleId)
    setFlowStep('session')
  }, [])

  const goBackStep = useCallback(() => {
    setFlowStep((prev) => {
      if (prev === 'session') return 'module'
      if (prev === 'module') return 'level'
      return 'level'
    })
  }, [])

  const toggleDevUnlockMode = () => {
    setDevUnlockMode((prev) => !prev)
  }

  const toggleStepCompletion = async (stepId: string, moduleId: string, sessionId: string) => {
    const isCurrentlyPassed = Boolean(progressMap[stepId])
    const newMap = await progressService.setStepProgress(
      stepId,
      moduleId,
      sessionId,
      !isCurrentlyPassed,
      profile?.id
    )
    setProgressMap({ ...newMap })
  }

  const resumeLearning = useCallback(() => {
    const target = getNextPrescribedTarget(progressMap, activeLevelName, devUnlockMode)
    if (target) {
      setActiveLevelName(target.level.levelName)
      setActiveModuleId(target.module.id)
      setActiveSessionId(target.session.id)
      setFlowStep('session')
    }
  }, [progressMap, activeLevelName, devUnlockMode])

  const resetAllProgress = () => {
    const resetMap = progressService.resetProgress()
    setProgressMap(resetMap)
  }

  return (
    <CurriculumContext.Provider
      value={{
        activeLevelName,
        setActiveLevelName,
        activeModuleId,
        setActiveModuleId,
        activeSessionId,
        setActiveSessionId,
        flowStep,
        setFlowStep,
        selectLevelAndAdvance,
        selectModuleAndAdvance,
        goBackStep,
        progressMap,
        devUnlockMode,
        toggleDevUnlockMode,
        activeLevel,
        activeModule,
        activeSession,
        levelSummary,
        prescribedTarget,
        toggleStepCompletion,
        resumeLearning,
        resetAllProgress
      }}
    >
      {children}
    </CurriculumContext.Provider>
  )
}

export const useCurriculum = (): CurriculumContextType => {
  const context = useContext(CurriculumContext)
  if (!context) {
    throw new Error('useCurriculum must be used within a CurriculumProvider')
  }
  return context
}

