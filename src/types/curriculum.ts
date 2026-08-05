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
  sessions: Session[]
  isCompleted?: boolean
  isLocked?: boolean
}

export interface LevelCurriculum {
  id: string
  levelName: 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'
  title: string
  subtitle: string
  objective: string
  graduateProfile: string
  modules: Module[]
}
