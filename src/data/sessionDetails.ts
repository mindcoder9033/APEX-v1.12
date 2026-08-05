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
  reflectionQuestions?: string[]
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
      'Welcome to APEX. Today is not about driving fast; today is about learning how to learn. Every professional racing driver begins with fundamentals—before speed comes discipline, before competition comes control. This session introduces the APEX Academy philosophy and establishes your baseline environment.',
    theoryText: `The Goal of Beginner Training:
The objective of the Beginner curriculum is NOT to produce fast lap times. The objective is to produce a driver who can keep the car under control, drive repeatable laps, follow the intended racing line, avoid unnecessary mistakes, and build confidence through consistency.

The Three Rules of APEX:
• Rule 1: Smooth inputs create stable cars. Abrupt steering, braking, or throttle application reduces control.
• Rule 2: Consistency is more valuable than one fast lap. Repeating similar laps builds genuine skill.
• Rule 3: Mistakes are information. Identify the cause, understand it, and improve.`,
    learningObjectives: [
      'Configure the prescribed driving environment on Maple Valley Full Circuit in the Mazda MX-5 Miata',
      'Develop disciplined habits and smooth steering, braking, and acceleration inputs',
      'Complete a minimum of 5 consecutive clean laps without spinning, leaving the circuit, or major collisions',
      'Understand and apply the APEX core philosophy: Slow is smooth, smooth is consistent, consistent becomes fast'
    ],
    coachNotes: [
      'Coach Briefing: Welcome to APEX. Today you are not trying to impress anyone. Ignore lap records, speed, and competition.',
      'Avoid turning the steering wheel abruptly or pressing throttle/brake pedals suddenly.',
      'Do not restart after every small mistake—every mistake is valuable telemetry information for your driver log.',
      'Academy Principle: Slow is smooth. Smooth is consistent. Consistent becomes fast.'
    ],
    visualCaption: 'Beginner Baseline: Mazda MX-5 Miata on Maple Valley Full Circuit',
    visualContentUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    prescription: {
      ...defaultMozaPrescription,
      track: 'Maple Valley - Full Circuit',
      trackLayout: 'Full Circuit (2.51 miles / 4.04 km)',
      car: 'Mazda MX-5 Miata',
      carSetup: 'Factory Default',
      transmission: 'Automatic',
      camera: 'Cockpit View (recommended)',
      assists: {
        abs: 'Preset (On)',
        tc: 'Preset (On)',
        stm: 'Preset (On)',
        line: 'Curriculum Preset'
      },
      weather: 'Clear',
      timeOfDay: 'Day',
      fuel: 'Default'
    },
    reflectionPrompt:
      'Complete your driver self-reflection across all 5 key practice questions below to record your technical progress.',
    reflectionQuestions: [
      '1. Which corner felt the most difficult?',
      '2. What caused your biggest mistake today?',
      '3. Did you ever feel rushed? When?',
      '4. Did you make abrupt steering, braking, or throttle inputs?',
      '5. What would you focus on improving during your next practice?'
    ]
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
