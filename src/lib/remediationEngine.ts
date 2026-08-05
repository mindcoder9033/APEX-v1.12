import { AssessmentResult, RemediationPlan, WeaknessCategory } from '../types/assessment'

/**
  * Generates an adaptive remediation plan based on assessment metrics and grade.
  */
export function generateRemediationPlan(
  result: AssessmentResult,
  sessionTitle: string = 'Session'
): RemediationPlan {
  const { metrics, sessionId } = result

  // Diagnose primary weakness category
  let weaknessCategory: WeaknessCategory = 'PACING'
  if (metrics.cleanLapRatio < 0.70) {
    weaknessCategory = 'CONTROL'
  } else if (metrics.consistencyDelta > 2.0) {
    weaknessCategory = 'CONSISTENCY'
  } else {
    weaknessCategory = 'PACING'
  }

  const remediationId = `rem-${sessionId}-${Date.now()}`

  if (weaknessCategory === 'CONTROL') {
    return {
      remediationId,
      sessionId,
      weaknessCategory: 'CONTROL',
      title: `Remediation Drill: Vehicle Control & Track Boundaries (${sessionTitle})`,
      focusArea: 'Track Limit Discipline & Smooth Steering Inputs',
      prescribedDrills: [
        'Run 5 consecutive laps staying strictly inside track boundaries at 80% pace.',
        'Focus on smooth wheel inputs rather than aggressive entry speed.',
        'Use visual reference points (curbs, markers) to position car accurately before corner turn-in.'
      ],
      coachAdvice:
        'You lost significant mastery points due to off-track penalties. In racing, clean laps build confidence and consistency before raw speed.',
      recommendedAssists: 'Set Traction Control to Medium and ABS to Factory to stabilize car balance.',
      recommendedSetup: 'Increase rear wing angle by +1 degree and lower front tire pressure by -0.5 PSI for improved stability.'
    }
  }

  if (weaknessCategory === 'CONSISTENCY') {
    return {
      remediationId,
      sessionId,
      weaknessCategory: 'CONSISTENCY',
      title: `Remediation Drill: Braking Marker Consistency (${sessionTitle})`,
      focusArea: 'Repeatable Braking Markers & Rhythm',
      prescribedDrills: [
        'Pick 1 fixed brake marker (e.g. 100m board) for Turn 1 and hit it 5 laps in a row.',
        'Practice trail-braking smoothly into the apex rather than abrupt, late lockups.',
        'Maintain a steady lap-to-lap delta within 0.5 seconds.'
      ],
      coachAdvice:
        'Your lap times fluctuate significantly between laps. Focus on hitting the exact same braking marker on every single lap.',
      recommendedAssists: 'Enable Brake Line overlay for 3 laps to recalibrate braking reference points.',
      recommendedSetup: 'Adjust Brake Bias to 54% Front to prevent unexpected rear lockups during trail-braking.'
    }
  }

  // PACING weakness
  return {
    remediationId,
    sessionId,
    weaknessCategory: 'PACING',
    title: `Remediation Drill: Apex Speed & Throttle Application (${sessionTitle})`,
    focusArea: 'Corner Exit Speed & Throttle Pick-up',
    prescribedDrills: [
      'Focus on early throttle pickup at the corner apex to maximize exit speed onto straights.',
      'Smoothly unwind wheel lock as you apply throttle out of slow corners.',
      'Check telemetry speed at straightaway mid-point to verify higher exit speed.'
    ],
    coachAdvice:
      'Your pace is off target. The majority of lap time is lost on corner exits. Get the car rotated earlier so you can feed power smoothly.',
    recommendedAssists: 'Keep Assists on Low to allow full throttle response out of corners.',
    recommendedSetup: 'Slightly decrease rear differential acceleration lock for smoother exit traction.'
  }
}
