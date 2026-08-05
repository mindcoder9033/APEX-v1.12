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
      title: 'Module 1: Foundations of Vehicle Control',
      focusArea: 'Vehicle Control & Discipline',
      summary: 'Establish prescribed driving environment, learn the APEX discipline philosophy, and execute clean lap practice.',
      sessions: [
        {
          id: 'sess-1-1',
          sessionNumber: 1,
          title: 'Session 1 — Welcome to the Academy',
          description: 'Configure prescribed driving environment, complete initial controlled laps, and establish consistency over speed.',
          car: 'Mazda MX-5 Miata',
          track: 'Maple Valley - Full Circuit',
          estimatedMinutes: 45,
          steps: [
            {
              id: 'step-1-1-1',
              stepNumber: 1,
              title: 'Exercise 1 — Become Familiar with the Car',
              type: 'LESSON',
              objective: 'Become comfortable with steering, braking, and throttle response.',
              passingCriteria: 'Complete 3 relaxed laps while observing vehicle balance and input response.',
              instructions: [
                'Drive three relaxed laps around Maple Valley Full Circuit.',
                'Ignore lap times completely.',
                'Observe steering sensitivity, brake response, throttle response, and vehicle balance.'
              ]
            },
            {
              id: 'step-1-1-2',
              stepNumber: 2,
              title: 'Exercise 2 — Drive Smoothly',
              type: 'DRILL',
              objective: 'Reduce unnecessary vehicle movement through gentle, controlled inputs.',
              passingCriteria: 'Complete 5 consecutive laps with smooth steering, gentle braking, and steady acceleration.',
              instructions: [
                'Complete five consecutive laps.',
                'Focus on gentle steering, gentle braking, and gentle acceleration.',
                'Do not attempt to increase speed—maintain a relaxed pace.'
              ],
              telemetryThreshold: {
                metric: 'Input Modulation',
                targetValue: 'Smooth Ramps (Zero Spikes)'
              }
            },
            {
              id: 'step-1-1-3',
              stepNumber: 3,
              title: 'Exercise 3 — Stay on the Track',
              type: 'ASSESSMENT',
              objective: 'Complete clean laps without spins, off-track excursions, or collisions.',
              passingCriteria: 'Complete 5 consecutive clean laps without spinning, leaving the circuit, or major collisions.',
              instructions: [
                'Drive until you complete 5 consecutive clean laps.',
                'Avoid spinning, leaving the circuit, or significant collisions.',
                'Log lap times, clean lap count, spins, and off-track incidents upon stint completion.'
              ],
              telemetryThreshold: {
                metric: 'Clean Laps Stint',
                targetValue: '5 Consecutive Clean Laps'
              }
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
      prerequisites: ['mod-1'],
      sessions: [
        {
          id: 'sess-2-1',
          sessionNumber: 1,
          title: 'Session 2.1: Geometric Apex Consistency',
          description: 'Identify turn-in point, apex point, and tracking out point across Lime Rock Park Corners 1-3.',
          car: '2021 Hyundai Elantra N',
          track: 'Lime Rock Park - Classic',
          estimatedMinutes: 30,
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
              ]
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
              }
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
      prerequisites: ['mod-2'],
      sessions: [
        {
          id: 'sess-3-1',
          sessionNumber: 1,
          title: 'Session 3.1: Trail Braking Release Rate',
          description: 'Practice trailing off the brake pedal proportionally as steering angle increases.',
          car: '2021 Hyundai Elantra N',
          track: 'Lime Rock Park - Chicane',
          estimatedMinutes: 35,
          steps: [
            {
              id: 'step-3-1-1',
              stepNumber: 1,
              title: 'Front Weight Transfer Mechanics',
              type: 'LESSON',
              objective: 'Learn how gentle trail braking keeps weight on front tires for sharp turn-in response.',
              passingCriteria: 'Understand tire load diagram.',
              instructions: [
                'Study weight transfer force vectors.',
                'Practice smooth foot release rate off the brake pedal.'
              ]
            },
            {
              id: 'step-3-1-2',
              stepNumber: 2,
              title: 'Trail Brake Modulation Drill',
              type: 'DRILL',
              objective: 'Maintain 15% brake pressure through turn-in until apex cone.',
              passingCriteria: 'Smooth decay curve without step drops.',
              instructions: [
                'Brake hard at 100m marker.',
                'Smoothly bleed off brake pressure from 100% down to 10% through entry turn.'
              ],
              telemetryThreshold: {
                metric: 'Brake Release Rate Decay',
                targetValue: 'Linear (< 5% step drop)'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'mod-4',
      moduleNumber: 4,
      title: 'Module 4: Beginner Driver Certification Exam',
      focusArea: 'Academy Graduation',
      summary: 'Comprehensive 10-lap consistency evaluation under APEX objective coaching criteria.',
      prerequisites: ['mod-3'],
      sessions: [
        {
          id: 'sess-4-1',
          sessionNumber: 1,
          title: 'Session 4.1: Final Graduation Assessment',
          description: '10 consecutive clean laps within 1.0 second lap time variance window.',
          car: '2021 Hyundai Elantra N',
          track: 'Lime Rock Park - Full Circuit',
          estimatedMinutes: 45,
          steps: [
            {
              id: 'step-4-1-1',
              stepNumber: 1,
              title: 'Certification Pre-flight Check',
              type: 'LESSON',
              objective: 'Review all graduation telemetry metrics: apex consistency, linearity, and lap variance.',
              passingCriteria: 'Verify driver readiness score.',
              instructions: [
                'Review past module performance metrics.',
                'Set tire pressures to calibrated warm targets (32 PSI).'
              ]
            },
            {
              id: 'step-4-1-2',
              stepNumber: 2,
              title: '10-Lap Consistency Graduation Exam',
              type: 'ASSESSMENT',
              objective: 'Complete 10 clean laps with lap time variance < 0.800 seconds.',
              passingCriteria: '10/10 valid laps, lap delta variance < 0.800s, zero track limit violations.',
              instructions: [
                'Run 10 laps without resetting.',
                'Prioritize smooth inputs and early throttle application over single-lap speed.'
              ],
              telemetryThreshold: {
                metric: '10-Lap Variance',
                targetValue: '< 0.800s'
              }
            }
          ]
        }
      ]
    }
  ]
}
