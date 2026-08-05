import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { DriverProfile, UserSettings, AppTheme } from '../types/driver'

const DEFAULT_PROFILE: DriverProfile = {
  id: 'demo-driver-0041',
  userId: 'user-demo-uuid-0041',
  driverName: 'Driver #0041',
  email: 'driver0041@apex-academy.sim',
  gamertag: 'ApexRacer41',
  bio: 'Sim racing enthusiast targeting beginner certification on Moza R3 hardware.',
  hardwareSetup: {
    wheelBase: 'Moza R3 Direct Drive',
    pedalSet: 'Moza SR-P Lite Pedals',
    platform: 'Forza Motorsport (2023)',
  },
  currentLevel: 'BEGINNER',
  activeModuleId: 'mod-1',
  completedSessionsCount: 6,
  totalPracticeHours: 14.5,
  brakeLinearityAvg: 95.8,
  certificationStatus: {
    beginnerCertified: false,
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'dark',
  highContrast: false,
  reducedMotion: false,
  fontScale: 'normal',
  emailAlerts: true,
  sessionReminders: true,
  telemetryReports: true,
}

interface AuthContextType {
  user: { id: string; email: string } | null
  profile: DriverProfile | null
  settings: UserSettings
  isAuthenticated: boolean
  isLoading: boolean
  isSupabaseConnected: boolean
  login: (email: string, pass: string) => Promise<{ error?: string }>
  register: (
    email: string,
    pass: string,
    driverName: string,
    gamertag?: string,
    hardware?: Partial<DriverProfile['hardwareSetup']>
  ) => Promise<{ error?: string }>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error?: string; successMessage?: string }>
  updateProfile: (updates: Partial<DriverProfile>) => Promise<{ error?: string }>
  updateSettings: (updates: Partial<UserSettings>) => Promise<{ error?: string }>
  loginAsDemo: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const LOCAL_STORAGE_SESSION_KEY = 'apex_session_user'
const LOCAL_STORAGE_PROFILE_KEY = 'apex_driver_profile'
const LOCAL_STORAGE_SETTINGS_KEY = 'apex_user_settings'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)
  const [profile, setProfile] = useState<DriverProfile | null>(null)
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false)

  // Initialize session & settings
  useEffect(() => {
    let isMounted = true

    const initializeAuth = async () => {
      // Check if real Supabase environment variables exist
      const hasRealSupabase =
        import.meta.env.VITE_SUPABASE_URL &&
        !import.meta.env.VITE_SUPABASE_URL.includes('placeholder') &&
        import.meta.env.VITE_SUPABASE_ANON_KEY &&
        !import.meta.env.VITE_SUPABASE_ANON_KEY.includes('placeholder')

      if (hasRealSupabase) {
        try {
          const { data: sessionData } = await supabase.auth.getSession()
          if (sessionData.session?.user) {
            setIsSupabaseConnected(true)
            const supaUser = sessionData.session.user
            setUser({ id: supaUser.id, email: supaUser.email || '' })
            await fetchSupabaseProfileAndSettings(supaUser.id)
            if (isMounted) setIsLoading(false)
            return
          }
        } catch (e) {
          console.warn('Supabase Auth error, falling back to local session state.', e)
        }
      }

      // Local storage fallback state
      const savedUser = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY)
      const savedProfile = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY)
      const savedSettings = localStorage.getItem(LOCAL_STORAGE_SETTINGS_KEY)

      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch {
          setUser(null)
        }
      }

      if (savedProfile) {
        try {
          setProfile(JSON.parse(savedProfile))
        } catch {
          setProfile(DEFAULT_PROFILE)
        }
      } else if (savedUser) {
        setProfile(DEFAULT_PROFILE)
      }

      if (savedSettings) {
        try {
          setSettings(JSON.parse(savedSettings))
        } catch {
          setSettings(DEFAULT_SETTINGS)
        }
      }

      if (isMounted) setIsLoading(false)
    }

    initializeAuth()

    // Supabase Auth listener if available
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setIsSupabaseConnected(true)
        setUser({ id: session.user.id, email: session.user.email || '' })
        await fetchSupabaseProfileAndSettings(session.user.id)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setProfile(null)
      }
    })

    return () => {
      isMounted = false
      authListener.subscription.unsubscribe()
    }
  }, [])

  const fetchSupabaseProfileAndSettings = async (userId: string) => {
    try {
      const { data: prof } = await supabase
        .from('driver_profiles')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (prof) {
        setProfile({
          id: prof.id,
          userId: prof.user_id,
          driverName: prof.driver_name,
          gamertag: prof.gamertag || 'Racer',
          hardwareSetup: {
            wheelBase: prof.wheel_base || 'Moza R3 Direct Drive',
            pedalSet: prof.pedal_set || 'Moza SR-P Lite Pedals',
            platform: prof.platform || 'Forza Motorsport (2023)',
          },
          currentLevel: prof.current_level || 'BEGINNER',
          activeModuleId: 'mod-1',
          completedSessionsCount: 6,
          totalPracticeHours: parseFloat(prof.total_practice_hours || '0'),
          certificationStatus: {
            beginnerCertified: prof.beginner_certified || false,
            certifiedAt: prof.certified_at,
          },
        })
      }

      const { data: sett } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (sett) {
        setSettings({
          theme: (sett.theme as AppTheme) || 'dark',
          highContrast: sett.high_contrast || false,
          reducedMotion: sett.reduced_motion || false,
          fontScale: sett.font_scale || 'normal',
          emailAlerts: sett.email_alerts ?? true,
          sessionReminders: sett.session_reminders ?? true,
          telemetryReports: sett.telemetry_reports ?? true,
        })
      }
    } catch (e) {
      console.warn('Error fetching Supabase profile:', e)
    }
  }

  const login = async (email: string, pass: string) => {
    setIsLoading(true)
    if (isSupabaseConnected) {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pass })
      setIsLoading(false)
      if (error) return { error: error.message }
      return {}
    }

    // Local fallback authentication
    const demoUser = { id: 'user-0041', email }
    const updatedProfile: DriverProfile = {
      ...DEFAULT_PROFILE,
      email,
    }

    setUser(demoUser)
    setProfile(updatedProfile)
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(demoUser))
    localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(updatedProfile))
    setIsLoading(false)
    return {}
  }

  const register = async (
    email: string,
    pass: string,
    driverName: string,
    gamertag: string = '',
    hardware?: Partial<DriverProfile['hardwareSetup']>
  ) => {
    setIsLoading(true)
    if (isSupabaseConnected) {
      const { error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: {
            driver_name: driverName,
            gamertag,
          },
        },
      })
      setIsLoading(false)
      if (error) return { error: error.message }
      return {}
    }

    // Local fallback registration
    const newUserId = `user-${Math.random().toString(36).substr(2, 6)}`
    const newUser = { id: newUserId, email }
    const newProfile: DriverProfile = {
      ...DEFAULT_PROFILE,
      id: `driver-${newUserId}`,
      userId: newUserId,
      driverName,
      email,
      gamertag: gamertag || driverName.replace(/\s+/g, ''),
      hardwareSetup: {
        wheelBase: hardware?.wheelBase || 'Moza R3 Direct Drive',
        pedalSet: hardware?.pedalSet || 'Moza SR-P Lite Pedals',
        platform: hardware?.platform || 'Forza Motorsport (2023)',
      },
      completedSessionsCount: 0,
      totalPracticeHours: 0,
    }

    setUser(newUser)
    setProfile(newProfile)
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(newUser))
    localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(newProfile))
    setIsLoading(false)
    return {}
  }

  const logout = async () => {
    setIsLoading(true)
    if (isSupabaseConnected) {
      await supabase.auth.signOut()
    }
    setUser(null)
    setProfile(null)
    localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY)
    localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY)
    setIsLoading(false)
  }

  const resetPassword = async (email: string) => {
    if (isSupabaseConnected) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) return { error: error.message }
      return { successMessage: 'Password reset link dispatched to email.' }
    }
    return { successMessage: 'Simulated password reset instructions generated for ' + email }
  }

  const updateProfile = async (updates: Partial<DriverProfile>) => {
    if (!profile) return { error: 'No active profile to update.' }
    const merged: DriverProfile = {
      ...profile,
      ...updates,
      hardwareSetup: {
        ...profile.hardwareSetup,
        ...(updates.hardwareSetup || {}),
      },
      updatedAt: new Date().toISOString(),
    }

    setProfile(merged)
    localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(merged))

    if (isSupabaseConnected && user) {
      try {
        await supabase
          .from('driver_profiles')
          .update({
            driver_name: merged.driverName,
            gamertag: merged.gamertag,
            wheel_base: merged.hardwareSetup.wheelBase,
            pedal_set: merged.hardwareSetup.pedalSet,
            platform: merged.hardwareSetup.platform,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id)
      } catch (e) {
        console.warn('Could not sync profile to Supabase', e)
      }
    }

    return {}
  }

  const updateSettings = async (updates: Partial<UserSettings>) => {
    const merged = { ...settings, ...updates }
    setSettings(merged)
    localStorage.setItem(LOCAL_STORAGE_SETTINGS_KEY, JSON.stringify(merged))

    if (isSupabaseConnected && user) {
      try {
        await supabase
          .from('user_settings')
          .update({
            theme: merged.theme,
            high_contrast: merged.highContrast,
            reduced_motion: merged.reducedMotion,
            font_scale: merged.fontScale,
            email_alerts: merged.emailAlerts,
            session_reminders: merged.sessionReminders,
            telemetry_reports: merged.telemetryReports,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id)
      } catch (e) {
        console.warn('Could not sync settings to Supabase', e)
      }
    }

    return {}
  }

  const loginAsDemo = () => {
    const demoUser = { id: 'user-demo-0041', email: 'driver0041@apex-academy.sim' }
    setUser(demoUser)
    setProfile(DEFAULT_PROFILE)
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(demoUser))
    localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(DEFAULT_PROFILE))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        settings,
        isAuthenticated: !!user,
        isLoading,
        isSupabaseConnected,
        login,
        register,
        logout,
        resetPassword,
        updateProfile,
        updateSettings,
        loginAsDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
