import { TrainingPrescription } from '../types/curriculum'

export interface SessionDetailExtra {
  overviewText: string
  theoryText: string
  learningObjectives: string[]
  coachNotes: string[]
  visualCaption: string
  visualContentUrl?: string
  prescription: TrainingPrescription
  reflectionPrompt: string
}

export const defaultMozaPrescription: TrainingPrescription = {
  track: 'Lime Rock Park - Full Circuit',
  trackLayout: 'Full Circuit (1.50 miles / 2.41 km)',
  car: '2021 Hyundai Elantra N (FWD)',
  carSetup: 'Stock APEX Academy Baseline (B-498 Rating)',
  transmission: 'Manual without Clutch (Paddle Shift)',
  camera: 'Cockpit View / Dashboard (No Steering Wheel Visible)',
  assists: {
    abs: 'Sport / On',
    tc: 'Off',
    stm: 'Off',
    line: 'Braking Only / Off'
  },
  weather: 'Clear / Dry Track Surface (22°C Air, 32°C Track)',
  timeOfDay: '14:00 (Mid-Day Sunlight)',
  fuel: '50% Fuel Load (Approx. 25 Laps Range)',
  mozaWheelSettings: {
    ffbGain: '85% in Moza Pit House / 65% In-Game',
    wheelRotation: '540° Steering Angle',
    pedalDamping: '20% Mechanical Resistance'
  }
}

export const sessionDetailsMap: Record<string, SessionDetailExtra> = {
  'sess-1-1': {
    overviewText:
      'Session 1.1 focuses on establishing your foundational hardware connection. You will calibrate pedal travel, deadzones, and force feedback linearity on your Moza R3 Direct Drive system within Forza Motorsport.',
    theoryText: `Linear pedal control is the cornerstone of high-performance driving. Non-linear brake travel introduces muscle memory inconsistencies, causing unpredictable weight transfer during heavy deceleration. 
    
When calibrating the Moza R3 load cell or linear potentiometers, the initial 5% of brake pedal travel should filter out resting foot pressure, while 100% depression must require deliberate physical force without reaching your physical fatigue limit.`,
    learningObjectives: [
      'Eliminate resting foot noise on brake and throttle telemetry channels',
      'Establish a 1:1 physical-to-virtual pedal linearity travel curve',
      'Hold a steady 80% threshold brake pressure without triggering unwanted ABS chatter',
      'Develop muscle memory for precise 5% pedal modulation steps'
    ],
    coachNotes: [
      'Moza R3 Tip: Set brake minimum deadzone to 3% in Moza Pit House to prevent accidental dragging.',
      'Always wear driving shoes or rubberized socks for consistent pedal pressure sensation.',
      'Watch your telemetry telemetry bar in Forza: abrupt spiking indicates foot tension; smooth ramps indicate relaxed calf modulation.'
    ],
    visualCaption: 'Telemetry Trace: Linear Brake Application vs Abrupt Spiking',
    visualContentUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    prescription: {
      ...defaultMozaPrescription,
      track: 'Lime Rock Park - Full Circuit',
      car: '2021 Hyundai Elantra N (FWD)'
    },
    reflectionPrompt:
      'How consistent was your leg muscle memory when attempting to hold 80% brake pressure? Did you feel any foot fatigue or accidental pedal dragging?'
  },
  'sess-2-1': {
    overviewText:
      'Session 2.1 introduces cornering geometry, turning radii, and geometric apex hitting. You will practice smooth, single-arc steering inputs across Lime Rock Park Corners 1 through 3.',
    theoryText: `The Geometric Apex is the physical midpoint of an inside kerb on a constant-radius corner. Hitting the geometric apex allows the driver to maintain the largest possible turning radius, minimizing lateral tire load and maximizing cornering speed.
    
Turning in too early tightens the corner exit radius ("pinching the exit"), forcing excessive steering lock while applying power—a primary cause of snap oversteer or understeer off-track excursions.`,
    learningObjectives: [
      'Identify turn-in points, geometric apexes, and track-out reference markers',
      'Execute a single smooth steering input per corner rather than sawing at the wheel',
      'Maintain vehicle stability across kerb transitions without unsettling chassis balance',
      'Achieve 5 consecutive clean laps with zero off-track penalties'
    ],
    coachNotes: [
      'Look far ahead down the track—your hands automatically follow your eyes.',
      'Avoid sawing at the Moza R3 wheel mid-corner; if you need more turn-in, gently trail off the brake rather than adding emergency wheel angle.',
      'Clip the kerb gently; riding too high on Lime Rock Turn 1 kerbing will unsettle the Elantra N rear suspension.'
    ],
    visualCaption: 'Cornering Geometry: Early vs Geometric vs Late Apex Trajectories',
    visualContentUrl: 'https://images.unsplash.com/photo-1541348263662-e082662d82da?auto=format&fit=crop&w=1200&q=80',
    prescription: {
      ...defaultMozaPrescription,
      track: 'Lime Rock Park - Classic',
      car: '2021 Hyundai Elantra N (FWD)'
    },
    reflectionPrompt:
      'Were you able to maintain a single steering arc through Turn 1? Did you tend to turn in too early or late?'
  }
}

export function getSessionDetailExtra(sessionId: string, fallbackTitle: string): SessionDetailExtra {
  if (sessionDetailsMap[sessionId]) {
    return sessionDetailsMap[sessionId]
  }

  return {
    overviewText: `Comprehensive instructional training for ${fallbackTitle}. Follow step-by-step guidance, execute telemetry drills, and document your performance reflections.`,
    theoryText: `Mastering ${fallbackTitle} requires disciplined input control, visual anticipation, and smooth vehicle balance transitions. Focus on repeatability before attempting maximum speed.`,
    learningObjectives: [
      `Understand the core driving principles behind ${fallbackTitle}`,
      'Execute prescribed drills on track with high precision',
      'Maintain clean laps with consistent telemetry inputs',
      'Evaluate your technique against objective academy passing benchmarks'
    ],
    coachNotes: [
      'Keep your hands firmly at 9-and-3 on the Moza R3 wheel rim.',
      'Brake in a straight line before turning in to maximize tire grip budget.',
      'Check telemetry trace after every session to identify input variances.'
    ],
    visualCaption: `Telemetry Input Analysis & Line Diagram for ${fallbackTitle}`,
    visualContentUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
    prescription: defaultMozaPrescription,
    reflectionPrompt: `What was your primary technical focus during ${fallbackTitle}, and what area requires further refinement?`
  }
}
