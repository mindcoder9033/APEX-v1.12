import {
  LapTimeEntry,
  AssessmentCriteria,
  AssessmentResult,
  AssessmentMetrics,
  MasteryGrade
} from '../types/assessment'

/**
  * Parses lap time strings formatted as "MM:SS.sss" or "SS.sss" into total seconds.
  */
export function parseLapTimeToSeconds(timeStr: string): number {
  if (!timeStr || typeof timeStr !== 'string') return 0
  const trimmed = timeStr.trim()
  if (!trimmed) return 0

  if (trimmed.includes(':')) {
    const parts = trimmed.split(':')
    const minutes = parseFloat(parts[0]) || 0
    const seconds = parseFloat(parts[1]) || 0
    return minutes * 60 + seconds
  }

  return parseFloat(trimmed) || 0
}

/**
  * Formats total seconds into standard "M:SS.sss" format.
  */
export function formatSecondsToLapTime(totalSeconds: number): string {
  if (isNaN(totalSeconds) || totalSeconds <= 0) return '0:00.000'
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = (totalSeconds % 60).toFixed(3)
  const paddedSeconds = (totalSeconds % 60) < 10 ? `0${seconds}` : seconds
  return `${minutes}:${paddedSeconds}`
}

/**
  * Default assessment criteria targets for curriculum sessions.
  */
export const DEFAULT_SESSION_CRITERIA: Record<string, AssessmentCriteria> = {
  'sess-1-1-1': {
    targetBestLapSeconds: 93.0, // 1:33.000 (Lime Rock Park / Beginner track)
    maxConsistencyDeltaSeconds: 2.0,
    minCleanLapRatio: 0.70
  },
  'sess-1-1-2': {
    targetBestLapSeconds: 92.5,
    maxConsistencyDeltaSeconds: 1.8,
    minCleanLapRatio: 0.75
  },
  'sess-1-1-3': {
    targetBestLapSeconds: 91.5,
    maxConsistencyDeltaSeconds: 1.5,
    minCleanLapRatio: 0.80
  },
  'sess-1-2-1': {
    targetBestLapSeconds: 90.0,
    maxConsistencyDeltaSeconds: 1.4,
    minCleanLapRatio: 0.80
  },
  'sess-1-2-2': {
    targetBestLapSeconds: 89.0,
    maxConsistencyDeltaSeconds: 1.2,
    minCleanLapRatio: 0.85
  },
  'sess-1-2-3': {
    targetBestLapSeconds: 88.0,
    maxConsistencyDeltaSeconds: 1.0,
    minCleanLapRatio: 0.90
  }
}

/**
  * Returns benchmark criteria for a given session ID (or reasonable fallback).
  */
export function getSessionCriteria(sessionId: string): AssessmentCriteria {
  return (
    DEFAULT_SESSION_CRITERIA[sessionId] || {
      targetBestLapSeconds: 92.0,
      maxConsistencyDeltaSeconds: 1.8,
      minCleanLapRatio: 0.75
    }
  )
}

/**
  * Demo Telemetry Presets for one-click testing & demo.
  */
export function getDemoTelemetryPreset(sessionId: string, quality: 'MASTERED' | 'NEEDS_WORK' = 'MASTERED'): LapTimeEntry {
  const criteria = getSessionCriteria(sessionId)
  if (quality === 'MASTERED') {
    const best = criteria.targetBestLapSeconds - 0.6
    const avg = best + 0.8
    return {
      bestLap: formatSecondsToLapTime(best),
      avgLap: formatSecondsToLapTime(avg),
      cleanLaps: 9,
      totalLaps: 10,
      notes: 'Executed clean apex hits at turns 1 and 3. Smooth throttle application on exit.'
    }
  }

  // NEEDS_WORK telemetry
  const best = criteria.targetBestLapSeconds + 4.2
  const avg = best + 3.5
  return {
    bestLap: formatSecondsToLapTime(best),
    avgLap: formatSecondsToLapTime(avg),
    cleanLaps: 4,
    totalLaps: 10,
    notes: 'Struggled with braking point consistency and track limit penalties at turn 2.'
  }
}

/**
  * Evaluates learner lap time entry against target benchmark criteria.
  */
export function evaluatePerformance(
  sessionId: string,
  entry: LapTimeEntry,
  customCriteria?: AssessmentCriteria
): AssessmentResult {
  const criteria = customCriteria || getSessionCriteria(sessionId)

  const bestLapSec = parseLapTimeToSeconds(entry.bestLap)
  const avgLapSec = parseLapTimeToSeconds(entry.avgLap)
  const cleanLaps = entry.cleanLaps || 0
  const totalLaps = entry.totalLaps || 10

  const cleanLapRatio = totalLaps > 0 ? cleanLaps / totalLaps : 0
  const bestLapDelta = bestLapSec - criteria.targetBestLapSeconds
  const consistencyDelta = avgLapSec > bestLapSec ? avgLapSec - bestLapSec : 0

  const metrics: AssessmentMetrics = {
    bestLapSeconds: bestLapSec,
    avgLapSeconds: avgLapSec,
    bestLapDelta,
    consistencyDelta,
    cleanLapRatio
  }

  // Score Calculations (Base 100)
  // Pace score (40%): target lap time vs actual
  let paceScore = 100
  if (bestLapDelta > 0) {
    paceScore = Math.max(0, 100 - bestLapDelta * 12)
  }

  // Consistency score (30%): consistency delta vs max threshold
  let consistencyScore = 100
  if (consistencyDelta > criteria.maxConsistencyDeltaSeconds) {
    const diff = consistencyDelta - criteria.maxConsistencyDeltaSeconds
    consistencyScore = Math.max(0, 100 - diff * 25)
  }

  // Cleanliness score (30%): ratio vs minCleanLapRatio
  let cleanScore = 100
  if (cleanLapRatio < criteria.minCleanLapRatio) {
    const gap = criteria.minCleanLapRatio - cleanLapRatio
    cleanScore = Math.max(0, 100 - gap * 200)
  }

  const finalScore = Math.round(paceScore * 0.4 + consistencyScore * 0.3 + cleanScore * 0.3)

  // Grade Determination
  let grade: MasteryGrade = 'UNSATISFACTORY'
  let remediationRequired = true

  if (finalScore >= 88 && bestLapDelta <= 0.5 && cleanLapRatio >= criteria.minCleanLapRatio) {
    grade = 'MASTERED'
    remediationRequired = false
  } else if (finalScore >= 70 && bestLapDelta <= 2.5 && cleanLapRatio >= criteria.minCleanLapRatio - 0.1) {
    grade = 'SATISFACTORY'
    remediationRequired = false
  } else if (finalScore >= 50) {
    grade = 'NEEDS_WORK'
    remediationRequired = true
  } else {
    grade = 'UNSATISFACTORY'
    remediationRequired = true
  }

  // Detailed Feedback Items
  const feedback: string[] = []

  if (bestLapDelta <= 0) {
    feedback.push(`Excellent pace! Best lap is ${Math.abs(bestLapDelta).toFixed(3)}s faster than the target threshold.`)
  } else if (bestLapDelta <= 1.5) {
    feedback.push(`Pace is near target (${bestLapDelta.toFixed(3)}s off benchmark). Minor line optimizations will achieve mastery.`)
  } else {
    feedback.push(`Pace is ${bestLapDelta.toFixed(3)}s behind benchmark. Review brake markers and trail-braking technique.`)
  }

  if (consistencyDelta <= criteria.maxConsistencyDeltaSeconds) {
    feedback.push(`High lap-to-lap consistency (delta ${consistencyDelta.toFixed(3)}s within max threshold of ${criteria.maxConsistencyDeltaSeconds}s).`)
  } else {
    feedback.push(`Inconsistent lap times (${consistencyDelta.toFixed(3)}s delta exceeds target ${criteria.maxConsistencyDeltaSeconds}s). Work on repeatable braking points.`)
  }

  if (cleanLapRatio >= criteria.minCleanLapRatio) {
    feedback.push(`Strong vehicle control with ${(cleanLapRatio * 100).toFixed(0)}% clean lap ratio.`)
  } else {
    feedback.push(`Clean lap ratio (${(cleanLapRatio * 100).toFixed(0)}%) fell short of the ${(criteria.minCleanLapRatio * 100).toFixed(0)}% requirement due to off-track penalties.`)
  }

  return {
    sessionId,
    score: finalScore,
    grade,
    metrics,
    feedback,
    remediationRequired,
    evaluatedAt: new Date().toISOString()
  }
}
