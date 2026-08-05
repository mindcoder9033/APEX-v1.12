import { LevelCurriculum } from '../types/curriculum'

export const expertCurriculum: LevelCurriculum = {
  id: 'level-3-expert',
  levelName: 'EXPERT',
  title: 'Level 3 — Racecraft & Telemetry Optimization',
  subtitle: 'Overtaking, Defending, Micro-adjustments & Race Pace',
  objective: 'Perform advanced racing maneuvers, multi-car traffic management, telemetry trace analysis, and chassis fine-tuning under competitive pressure.',
  graduateProfile: 'An Expert graduate is a race-ready competitor capable of analyzing lap data and executing high-speed tactical overtakes cleanly.',
  prerequisiteLevel: 'INTERMEDIATE',
  modules: [
    {
      id: 'mod-3-1',
      moduleNumber: 1,
      title: 'Module 1: Advanced Telemetry Overlay & Micro-Adjustments',
      focusArea: 'Data-Driven Driving Precision',
      summary: 'Analyze delta-t graphs, speed trace derivative dips, and damper velocity metrics to shave split tenths.',
      sessions: [
        {
          id: 'sess-3-1-1',
          sessionNumber: 1,
          title: 'Session 1.1: Delta-T Speed Trace Diagnostics',
          description: 'Pinpoint minimum cornering speed drops and throttle pick-up delays vs benchmark telemetry.',
          car: '2023 Cadillac V-Series.R LMDh',
          track: 'Road America - Grand Prix Circuit',
          estimatedMinutes: 45,
          steps: [
            {
              id: 'step-3-1-1-1',
              stepNumber: 1,
              title: 'Speed Derivative & Throttle Delay Analysis',
              type: 'LESSON',
              objective: 'Identify 0.1s latency between apex minimum speed and initial throttle application.',
              passingCriteria: 'Review telemetry channel overlays.',
              instructions: [
                'Load MoTec / APEX Telemetry log.',
                'Compare throttle application timestamp against lateral G zero-crossing.'
              ]
            },
            {
              id: 'step-3-1-1-2',
              stepNumber: 2,
              title: 'Apex Minimum Speed Gain Drill',
              type: 'DRILL',
              objective: 'Increase V-min through Road America Kink by 2.5 MPH without losing exit traction.',
              passingCriteria: 'V-min gain >= 2.5 MPH.',
              instructions: [
                'Commit to higher entry speed into Turn 11.',
                'Sustain steady 15% maintenance throttle through apex.'
              ],
              telemetryThreshold: {
                metric: 'V-Min Speed Gain',
                targetValue: '>= 2.5 MPH'
              }
            }
          ]
        }
      ]
    },
    {
      id: 'mod-3-2',
      moduleNumber: 2,
      title: 'Module 2: Racecraft & Defensive Line Mechanics',
      focusArea: 'Tactical Multi-Car Positioning',
      summary: 'Master inside line defense, crossover counter-attacks, and slipstream timing.',
      prerequisites: ['mod-3-1'],
      sessions: [
        {
          id: 'sess-3-2-1',
          sessionNumber: 1,
          title: 'Session 2.1: Defensive Line & Crossover Apex',
          description: 'Defend inside brake zone into Turn 5 while positioning for immediate exit crossover.',
          car: '2023 Cadillac V-Series.R LMDh',
          track: 'Road America - Grand Prix Circuit',
          estimatedMinutes: 50,
          steps: [
            {
              id: 'step-3-2-1-1',
              stepNumber: 1,
              title: 'Defensive Line Braking Geometry',
              type: 'LESSON',
              objective: 'Learn why shallow entry angles mandate earlier braking and tighter turn-in arcs.',
              passingCriteria: 'Review tactical positioning diagrams.',
              instructions: ['Study defensive line geometry vs classic racing line exit vectors.']
            },
            {
              id: 'step-3-2-1-2',
              stepNumber: 2,
              title: 'Crossover Counter-Attack Assessment',
              type: 'ASSESSMENT',
              objective: 'Execute 3 clean crossover maneuvers out of Turn 5 within 0.200s reaction window.',
              passingCriteria: '3/3 successful clean passes.',
              instructions: [
                'Brake on inside line.',
                'Square off corner exit to accelerate past outside attacker on straightaway.'
              ],
              telemetryThreshold: {
                metric: 'Exit Velocity Advantage',
                targetValue: '> 3.0 MPH'
              }
            }
          ]
        }
      ]
    }
  ]
}
