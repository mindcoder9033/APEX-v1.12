export type DriverLevel = 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'

export interface DriverProfile {
  id: string
  driverName: string
  gamertag: string
  hardwareSetup: {
    wheelBase: string // e.g. "Moza R3"
    pedalSet: string  // e.g. "Moza Lite Pedals"
    platform: string  // e.g. "Xbox Series X / Forza Motorsport (2023)"
  }
  currentLevel: DriverLevel
  activeModuleId: string
  completedSessionsCount: number
  totalPracticeHours: number
  certificationStatus: {
    beginnerCertified: boolean
    certifiedAt?: string
  }
}
