export type DriverLevel = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'

export type StepType = 'LESSON' | 'DRILL' | 'ASSESSMENT'

export interface Step {
  id: string
  stepNumber: number
  title: string
  type: StepType
  objective: string
  passingCriteria: string
  instructions: string[]
  telemetryThreshold?: {
    metric: string
    targetValue: string
  }
  isCompleted?: boolean
  isLocked?: boolean
}

export interface Session {
  id: string
  sessionNumber: number
  title: string
  description: string
  car: string
  track: string
  estimatedMinutes: number
  steps: Step[]
  isCompleted?: boolean
  isLocked?: boolean
}

export interface Module {
  id: string
  moduleNumber: number
  title: string
  focusArea: string
  summary: string
  prerequisites?: string[]
  sessions: Session[]
  isCompleted?: boolean
  isLocked?: boolean
}

export interface LevelCurriculum {
  id: string
  levelName: DriverLevel
  title: string
  subtitle: string
  objective: string
  graduateProfile: string
  prerequisiteLevel?: DriverLevel
  modules: Module[]
}

export interface StepProgressRecord {
  stepId: string
  completed: boolean
  completedAt?: string
  telemetryData?: Record<string, unknown>
}

export interface LevelProgressSummary {
  levelId: DriverLevel
  totalModules: number
  completedModules: number
  totalSessions: number
  completedSessions: number
  totalSteps: number
  completedSteps: number
  percentComplete: number
  isUnlocked: boolean
  isCompleted: boolean
}

