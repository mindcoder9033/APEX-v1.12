export type MasteryGrade = 'MASTERED' | 'SATISFACTORY' | 'NEEDS_WORK' | 'UNSATISFACTORY'

export type WeaknessCategory = 'PACING' | 'CONSISTENCY' | 'CONTROL'

export interface LapTimeEntry {
  bestLap: string // e.g. "1:32.450" or "92.45"
  avgLap: string // e.g. "1:33.810" or "93.81"
  cleanLaps: number // count of clean laps
  totalLaps: number // total laps in session
  spins?: number // count of spins in stint
  offTrackIncidents?: number // count of off-track excursions in stint
  notes?: string
}

export interface AssessmentCriteria {
  targetBestLapSeconds: number // target lap time in seconds
  maxConsistencyDeltaSeconds: number // max allowed delta (avgLap - bestLap) in seconds
  minCleanLapRatio: number // e.g. 0.70 for 70% clean laps
}

export interface AssessmentMetrics {
  bestLapSeconds: number
  avgLapSeconds: number
  bestLapDelta: number // bestLapSeconds - targetBestLapSeconds
  consistencyDelta: number // avgLapSeconds - bestLapSeconds
  cleanLapRatio: number // cleanLaps / totalLaps
}

export interface AssessmentResult {
  sessionId: string
  score: number // 0 to 100
  grade: MasteryGrade
  metrics: AssessmentMetrics
  feedback: string[]
  remediationRequired: boolean
  evaluatedAt: string
}

export interface RemediationPlan {
  remediationId: string
  sessionId: string
  weaknessCategory: WeaknessCategory
  title: string
  focusArea: string
  prescribedDrills: string[]
  coachAdvice: string
  recommendedAssists: string
  recommendedSetup: string
}

export interface SessionAssessmentRecord {
  sessionId: string
  entry: LapTimeEntry
  result: AssessmentResult
  remediationPlan?: RemediationPlan
  savedAt: string
}

export interface ModuleExamResult {
  moduleId: string
  moduleTitle: string
  completedAt: string
  overallScore: number
  passed: boolean
  grade: MasteryGrade
  sessionScores: Array<{
    sessionId: string
    sessionTitle: string
    score: number
    grade: MasteryGrade
  }>
  feedback: string[]
}
