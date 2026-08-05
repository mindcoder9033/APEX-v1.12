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
  'sess-1-1': {
    targetBestLapSeconds: 108.0, // 1:48.000 (Maple Valley Full Circuit / Mazda MX-5 Miata)
    maxConsistencyDeltaSeconds: 3.5,
    minCleanLapRatio: 0.50 // 5 clean laps in 10-lap stint minimum
  },
  'step-1-1-1': {
    targetBestLapSeconds: 108.0,
    maxConsistencyDeltaSeconds: 3.5,
    minCleanLapRatio: 0.50
  },
  'step-1-1-2': {
    targetBestLapSeconds: 108.0,
    maxConsistencyDeltaSeconds: 3.0,
    minCleanLapRatio: 0.50
  },
  'step-1-1-3': {
    targetBestLapSeconds: 108.0,
    maxConsistencyDeltaSeconds: 2.5,
    minCleanLapRatio: 0.50
  },
  'sess-1-2-1': {
    targetBestLapSeconds: 90.0,
    maxConsistencyDeltaSeconds: 1.4,
    minCleanLapRatio: 0.80
  }
}

/**
  * Returns benchmark criteria for a given session ID (or reasonable fallback).
  */
export function getSessionCriteria(sessionId: string): AssessmentCriteria {
  return (
    DEFAULT_SESSION_CRITERIA[sessionId] || {
      targetBestLapSeconds: 108.0,
      maxConsistencyDeltaSeconds: 3.0,
      minCleanLapRatio: 0.50
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
    const avg = best + 1.2
    return {
      bestLap: formatSecondsToLapTime(best),
      avgLap: formatSecondsToLapTime(avg),
      cleanLaps: 8,
      totalLaps: 10,
      spins: 0,
      offTrackIncidents: 1,
      notes: 'Executed 8 clean laps with gentle steering and throttle inputs. Car felt stable and predictable.'
    }
  }

  // NEEDS_WORK telemetry
  const best = criteria.targetBestLapSeconds + 5.2
  const avg = best + 4.5
  return {
    bestLap: formatSecondsToLapTime(best),
    avgLap: formatSecondsToLapTime(avg),
    cleanLaps: 3,
    totalLaps: 10,
    spins: 3,
    offTrackIncidents: 5,
    notes: 'Pushed too hard early on resulting in 3 spins and 5 off-track excursions. Struggled with abrupt inputs.'
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
  const spins = entry.spins || 0
  const offTracks = entry.offTrackIncidents || 0

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

  const feedback: string[] = []
  let finalScore = 100
  let grade: MasteryGrade = 'UNSATISFACTORY'
  let remediationRequired = true

  // Session 1 Special Rules: Lap time is NOT assessed per spec
  const isSession1 = sessionId === 'sess-1-1' || sessionId.startsWith('step-1-1')

  if (isSession1) {
    // 5 clean laps required per spec
    let cleanlinessScore = Math.min(100, Math.round((cleanLaps / 5) * 100))
    let stabilityScore = Math.max(0, 100 - spins * 25 - offTracks * 15)

    finalScore = Math.round(cleanlinessScore * 0.6 + stabilityScore * 0.4)

    if (cleanLaps >= 5 && spins === 0 && offTracks <= 2) {
      grade = 'MASTERED'
      remediationRequired = false
      feedback.push(`Mastery achieved! Completed ${cleanLaps} clean laps with zero spins on Maple Valley.`)
      feedback.push('Demonstrated smooth input control and discipline over raw speed.')
    } else if (cleanLaps >= 4 && spins <= 1) {
      grade = 'SATISFACTORY'
      remediationRequired = false
      feedback.push(`Satisfactory stint with ${cleanLaps} clean laps. Minor stability adjustments recommended.`)
      feedback.push('Focus on maintaining a relaxed pace to reach 5 consecutive clean laps.')
    } else {
      grade = 'NEEDS_WORK'
      remediationRequired = true
      feedback.push(`Clean laps (${cleanLaps}/5 required) or incidents (${spins} spins, ${offTracks} off-tracks) require remediation.`)
      feedback.push('Remember Academy Rule 1: Smooth inputs create stable cars. Reduce pace by 10-15%.')
    }
  } else {
    // Standard evaluation for other sessions
    let paceScore = 100
    if (bestLapDelta > 0) {
      paceScore = Math.max(0, 100 - bestLapDelta * 12)
    }

    let consistencyScore = 100
    if (consistencyDelta > criteria.maxConsistencyDeltaSeconds) {
      const diff = consistencyDelta - criteria.maxConsistencyDeltaSeconds
      consistencyScore = Math.max(0, 100 - diff * 25)
    }

    let cleanScore = 100
    if (cleanLapRatio < criteria.minCleanLapRatio) {
      const gap = criteria.minCleanLapRatio - cleanLapRatio
      cleanScore = Math.max(0, 100 - gap * 200)
    }

    finalScore = Math.round(paceScore * 0.4 + consistencyScore * 0.3 + cleanScore * 0.3)

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

    if (bestLapDelta <= 0) {
      feedback.push(`Excellent pace! Best lap is ${Math.abs(bestLapDelta).toFixed(3)}s faster than target threshold.`)
    } else {
      feedback.push(`Pace is ${bestLapDelta.toFixed(3)}s behind benchmark. Focus on line consistency.`)
    }

    if (cleanLapRatio >= criteria.minCleanLapRatio) {
      feedback.push(`Strong vehicle control with ${(cleanLapRatio * 100).toFixed(0)}% clean lap ratio.`)
    } else {
      feedback.push(`Clean lap ratio (${(cleanLapRatio * 100).toFixed(0)}%) fell short of requirement.`)
    }
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
