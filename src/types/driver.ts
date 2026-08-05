export type DriverLevel = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'

export interface DriverHardwareSetup {
  wheelBase: string // e.g. "Moza R3 Direct Drive"
  pedalSet: string  // e.g. "Moza SR-P Lite Pedals"
  platform: string  // e.g. "Forza Motorsport (2023)"
}

export interface DriverProfile {
  id: string
  userId?: string
  driverName: string
  email?: string
  gamertag: string
  bio?: string
  hardwareSetup: DriverHardwareSetup
  currentLevel: DriverLevel
  activeModuleId: string
  completedSessionsCount: number
  totalPracticeHours: number
  brakeLinearityAvg?: number
  certificationStatus: {
    beginnerCertified: boolean
    certifiedAt?: string
  }
  createdAt?: string
  updatedAt?: string
}

export type AppTheme = 'dark' | 'telemetry-amber' | 'contrast'

export interface UserSettings {
  theme: AppTheme
  highContrast: boolean
  reducedMotion: boolean
  fontScale: 'normal' | 'large'
  emailAlerts: boolean
  sessionReminders: boolean
  telemetryReports: boolean
}
