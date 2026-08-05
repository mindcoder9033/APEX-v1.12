import { LevelCurriculum } from '../types/curriculum'

export const intermediateCurriculum: LevelCurriculum = {
  id: 'level-2-intermediate',
  levelName: 'INTERMEDIATE',
  title: 'Level 2 — Vehicle Dynamics',
  subtitle: 'Rotation, Throttle Steering & Race Geometry',
  objective: 'Master load transfer dynamics, throttle-steer rotation, cornering phases, and car setup adjustments for optimal exit speed.',
  graduateProfile: 'An Intermediate graduate is a adaptable driver who manipulates vehicle yaw and tire load deliberately.',
  prerequisiteLevel: 'BEGINNER',
  modules: [
    {
      id: 'mod-2-1',
      moduleNumber: 1,
      title: 'Module 1: Rotation & Throttle Steering',
      focusArea: 'Yaw Modulation & Rear Rotation',
      summary: 'Learn to manipulate rear slip angle using lift-off oversteer and throttle application to point the car early.',
      sessions: [
        {
          id: 'sess-2-1-1',
          sessionNumber: 1,
          title: 'Session 1.1: Lift-Off Rotation Control',
          description: 'Induce controlled nose tuck-in using lift-off weight transfer at hairpin entries.',
          car: '2019 Porsche 718 Cayman GT4',
          track: 'Watkins Glen - Short Circuit',
          estimatedMinutes: 30,
          steps: [
            {
              id: 'step-2-1-1-1',
              stepNumber: 1,
              title: 'Yaw Velocity Dynamics',
              type: 'LESSON',
              objective: 'Understand how lifting throttle transfers weight forward and increases rear slip angle.',
              passingCriteria: 'Review yaw velocity telemetry graphs.',
              instructions: [
                'Analyze lift-off oversteer vectors.',
                'Identify turn-in point for Watkins Glen Turn 1.'
              ]
            },
            {
              id: 'step-2-1-1-2',
              stepNumber: 2,
              title: 'Throttle Lift Rotation Drill',
              type: 'DRILL',
              objective: 'Achieve 3 deg/sec higher yaw rate on entry using lift-off vs static throttle.',
              passingCriteria: 'Yaw rate increase > 2.5 deg/sec.',
              instructions: [
                'Approach turn at 70 MPH.',
                'Lift throttle 50% at turn-in to induce rotation.'
              ],
              telemetryThreshold: {
                metric: 'Entry Yaw Rate Gain',
                targetValue: '> 2.5 deg/sec'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'mod-2-2',
      moduleNumber: 2,
      title: 'Module 2: Slip Angle & Friction Circle Management',
      focusArea: 'Tire Grip Dynamics',
      summary: 'Combine braking, cornering, and acceleration forces at the boundary of maximum available friction.',
      prerequisites: ['mod-2-1'],
      sessions: [
        {
          id: 'sess-2-2-1',
          sessionNumber: 1,
          title: 'Session 2.1: Combined Friction Vector Drilling',
          description: 'Sustain 95%+ combined tire grip usage around high-speed sweepers.',
          car: '2019 Porsche 718 Cayman GT4',
          track: 'Watkins Glen - Full Course',
          estimatedMinutes: 40,
          steps: [
            {
              id: 'step-2-2-1-1',
              stepNumber: 1,
              title: 'Friction Circle Optimization',
              type: 'LESSON',
              objective: 'Maintain peak G-sum forces by smoothly transitioning longitudinal brake to lateral cornering grip.',
              passingCriteria: 'Review G-G diagram overlays.',
              instructions: ['Study G-G scatter plot analysis for Turn 5 sweep.']
            },
            {
              id: 'step-2-2-1-2',
              stepNumber: 2,
              title: 'G-Sum Sustainability Assessment',
              type: 'ASSESSMENT',
              objective: 'Maintain > 1.15 G total force for 80% of corner duration.',
              passingCriteria: 'G-sum average > 1.15G.',
              instructions: [
                'Carve through Watkins Glen Carousel.',
                'Avoid sudden input dips in the G-G diagram.'
              ],
              telemetryThreshold: {
                metric: 'Average Combined G-Sum',
                targetValue: '> 1.15G'
              }
            }
          ]
        }
      ]
    }
  ]
}
