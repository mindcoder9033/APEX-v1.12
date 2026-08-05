import { LevelCurriculum } from '../types/curriculum'

export const beginnerCurriculum: LevelCurriculum = {
  id: 'level-1-beginner',
  levelName: 'BEGINNER',
  title: 'Level 1 — Driver Control',
  subtitle: 'Mastering the Car & Consistency',
  objective: 'Learn to control the vehicle consistently and generate repeatable, clean lap times without spins or abrupt inputs.',
  graduateProfile: 'A Beginner graduate is a consistent driver—not a fast driver.',
  modules: [
    {
      id: 'mod-1',
      moduleNumber: 1,
      title: 'Module 1: Moza R3 Hardware & Input Calibration',
      focusArea: 'Wheel & Pedal Ergonomics',
      summary: 'Establish baseline force feedback, pedal linearity, and seating posture for the Moza R3 on Forza Motorsport (2023).',
      isCompleted: true,
      isLocked: false,
      sessions: [
        {
          id: 'sess-1-1',
          sessionNumber: 1,
          title: 'Session 1.1: Pedal Range & Linearity',
          description: 'Calibrate brake and throttle deadzones in Moza Pit House to ensure 0-100% linear travel.',
          car: '2021 Hyundai Elantra N',
          track: 'Lime Rock Park - Full Circuit',
          estimatedMinutes: 20,
          isCompleted: true,
          isLocked: false,
          steps: [
            {
              id: 'step-1-1-1',
              stepNumber: 1,
              title: 'Pedal Travel Verification',
              type: 'LESSON',
              objective: 'Verify 0% resting pedal input and 100% full depression without force strain.',
              passingCriteria: 'Zero resting noise on brake channel.',
              instructions: [
                'Launch Moza Pit House on PC or Xbox App.',
                'Depress brake pedal firmly 5 times.',
                'Ensure maximum brake pressure matches natural leg force threshold.'
              ],
              isCompleted: true,
              isLocked: false
            },
            {
              id: 'step-1-1-2',
              stepNumber: 2,
              title: 'Threshold Brake Linearity Drill',
              type: 'DRILL',
              objective: 'Hold 80% brake input for 3 seconds on straightaway without locking ABS.',
              passingCriteria: 'Input variance < 4% across 5 attempts.',
              instructions: [
                'Drive on Lime Rock Park main straight at 80 MPH.',
                'Apply brake smoothly to 80% mark.',
                'Hold input steady without pumping pedals.'
              ],
              telemetryThreshold: {
                metric: 'Brake Linearity Variance',
                targetValue: '< 4%'
              },
              isCompleted: true,
              isLocked: false
            }
          ]
        }
      ]
    },
    {
      id: 'mod-2',
      moduleNumber: 2,
      title: 'Module 2: Smooth Steering & The Racing Line',
      focusArea: 'Vehicle Control & Geometry',
      summary: 'Learn smooth hands-at-9-and-3 steering input, geometric apex hitting, and entry speed management.',
      isCompleted: false,
      isLocked: false,
      sessions: [
        {
          id: 'sess-2-1',
          sessionNumber: 1,
          title: 'Session 2.1: Geometric Apex Consistency',
          description: 'Identify turn-in point, apex point, and tracking out point across Lime Rock Park Corners 1-3.',
          car: '2021 Hyundai Elantra N',
          track: 'Lime Rock Park - Classic',
          estimatedMinutes: 30,
          isCompleted: false,
          isLocked: false,
          steps: [
            {
              id: 'step-2-1-1',
              stepNumber: 1,
              title: 'Apex Hitting & Reference Markers',
              type: 'LESSON',
              objective: 'Understand why early turn-in causes run-off and late turn-in maximizes exit speed.',
              passingCriteria: 'Review lesson breakdown and telemetry diagrams.',
              instructions: [
                'Watch line geometry telemetry breakdown.',
                'Locate Turn 1 braking cone marker.'
              ],
              isCompleted: true,
              isLocked: false
            },
            {
              id: 'step-2-1-2',
              stepNumber: 2,
              title: '5-Lap Apex Repeatability Assessment',
              type: 'ASSESSMENT',
              objective: 'Complete 5 consecutive clean laps touching apex kerb within 30cm margin.',
              passingCriteria: '5/5 clean laps, apex variance < 30cm, zero off-track penalties.',
              instructions: [
                'Drive 5 consecutive laps without off-track warnings.',
                'Ensure smooth single steering arc per corner.'
              ],
              telemetryThreshold: {
                metric: 'Apex Deviation',
                targetValue: '< 30cm'
              },
              isCompleted: false,
              isLocked: false
            }
          ]
        }
      ]
    },
    {
      id: 'mod-3',
      moduleNumber: 3,
      title: 'Module 3: Trail Braking & Weight Transfer',
      focusArea: 'Pitch & Roll Dynamics',
      summary: 'Master smooth brake release to keep front tires loaded during turn-in.',
      isCompleted: false,
      isLocked: true,
      sessions: []
    },
    {
      id: 'mod-4',
      moduleNumber: 4,
      title: 'Module 4: Beginner Driver Certification Exam',
      focusArea: 'Academy Graduation',
      summary: 'Comprehensive 10-lap consistency evaluation under APEX objective coaching criteria.',
      isCompleted: false,
      isLocked: true,
      sessions: []
    }
  ]
}
