import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Sliders, Eye, Bell, CheckCircle2 } from 'lucide-react'
import { AppTheme } from '../../types/driver'

export const SettingsTab: React.FC = () => {
  const { settings, updateSettings } = useAuth()

  const [theme, setTheme] = useState<AppTheme>(settings.theme)
  const [highContrast, setHighContrast] = useState(settings.highContrast)
  const [reducedMotion, setReducedMotion] = useState(settings.reducedMotion)
  const [fontScale, setFontScale] = useState(settings.fontScale)
  const [emailAlerts, setEmailAlerts] = useState(settings.emailAlerts)
  const [sessionReminders, setSessionReminders] = useState(settings.sessionReminders)
  const [telemetryReports, setTelemetryReports] = useState(settings.telemetryReports)

  const [isSaved, setIsSaved] = useState(false)

  const handleSave = async () => {
    await updateSettings({
      theme,
      highContrast,
      reducedMotion,
      fontScale,
      emailAlerts,
      sessionReminders,
      telemetryReports,
    })
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      {isSaved && (
        <div className="p-3 bg-[#00E599]/10 border border-[#00E599] text-[#00E599] rounded font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Academy preferences and UI settings saved successfully.</span>
        </div>
      )}

      {/* Theme & Visual Preset */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[#262C3D] pb-3">
          <Sliders className="w-5 h-5 text-[#00E599]" />
          <h3 className="text-lg font-bold text-[#F3F4F6]">Visual & Cockpit Theme Preset</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`p-4 rounded-lg border text-left space-y-2 transition-all ${
              theme === 'dark'
                ? 'bg-[#12151E] border-[#00E599] shadow-[0_0_15px_rgba(0,229,153,0.15)]'
                : 'bg-[#1A1E2B] border-[#262C3D] hover:border-[#9CA3AF]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#F3F4F6]">Dark Cockpit</span>
              <span className="w-3 h-3 rounded-full bg-[#00E599]" />
            </div>
            <p className="text-[11px] text-[#9CA3AF]">
              Default dark carbon theme designed for low ambient light sim rigs.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setTheme('telemetry-amber')}
            className={`p-4 rounded-lg border text-left space-y-2 transition-all ${
              theme === 'telemetry-amber'
                ? 'bg-[#12151E] border-[#FFB800] shadow-[0_0_15px_rgba(255,184,0,0.15)]'
                : 'bg-[#1A1E2B] border-[#262C3D] hover:border-[#9CA3AF]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#F3F4F6]">Telemetry Amber</span>
              <span className="w-3 h-3 rounded-full bg-[#FFB800]" />
            </div>
            <p className="text-[11px] text-[#9CA3AF]">
              High-vigilance amber accents inspired by MotEC pitlane telemetry consoles.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setTheme('contrast')}
            className={`p-4 rounded-lg border text-left space-y-2 transition-all ${
              theme === 'contrast'
                ? 'bg-[#12151E] border-[#3B82F6] shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                : 'bg-[#1A1E2B] border-[#262C3D] hover:border-[#9CA3AF]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#F3F4F6]">High Contrast Blue</span>
              <span className="w-3 h-3 rounded-full bg-[#3B82F6]" />
            </div>
            <p className="text-[11px] text-[#9CA3AF]">
              Maximum legibility contrast blue highlights for sunlight glare conditions.
            </p>
          </button>
        </div>
      </Card>

      {/* Accessibility Settings */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[#262C3D] pb-3">
          <Eye className="w-5 h-5 text-[#3B82F6]" />
          <h3 className="text-lg font-bold text-[#F3F4F6]">Accessibility Options</h3>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <label className="flex items-center justify-between p-3 bg-[#1A1E2B] rounded border border-[#262C3D] cursor-pointer">
            <div>
              <span className="text-[#F3F4F6] font-bold block">High Contrast Borders</span>
              <span className="text-[11px] text-[#9CA3AF]">
                Enhances contrast on input telemetry charts and border dividers.
              </span>
            </div>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="w-4 h-4 accent-[#00E599]"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-[#1A1E2B] rounded border border-[#262C3D] cursor-pointer">
            <div>
              <span className="text-[#F3F4F6] font-bold block">Reduced UI Motion</span>
              <span className="text-[11px] text-[#9CA3AF]">
                Disables animated transitions and decorative pulse effects.
              </span>
            </div>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="w-4 h-4 accent-[#00E599]"
            />
          </label>

          <div className="p-3 bg-[#1A1E2B] rounded border border-[#262C3D] space-y-1">
            <span className="text-[#F3F4F6] font-bold block">Telemetry Font Scale</span>
            <div className="flex items-center gap-4 pt-1">
              <button
                type="button"
                onClick={() => setFontScale('normal')}
                className={`px-3 py-1 rounded border text-xs ${
                  fontScale === 'normal'
                    ? 'bg-[#00E599] text-[#090A0F] font-bold border-[#00E599]'
                    : 'bg-[#12151E] text-[#9CA3AF] border-[#262C3D]'
                }`}
              >
                Standard (14px)
              </button>
              <button
                type="button"
                onClick={() => setFontScale('large')}
                className={`px-3 py-1 rounded border text-xs ${
                  fontScale === 'large'
                    ? 'bg-[#00E599] text-[#090A0F] font-bold border-[#00E599]'
                    : 'bg-[#12151E] text-[#9CA3AF] border-[#262C3D]'
                }`}
              >
                Expanded Telemetry (16px)
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Notifications Settings */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[#262C3D] pb-3">
          <Bell className="w-5 h-5 text-[#FFB800]" />
          <h3 className="text-lg font-bold text-[#F3F4F6]">Academy Notification Dispatch</h3>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <label className="flex items-center justify-between p-3 bg-[#1A1E2B] rounded border border-[#262C3D] cursor-pointer">
            <div>
              <span className="text-[#F3F4F6] font-bold block">Email Session Reminders</span>
              <span className="text-[11px] text-[#9CA3AF]">
                Receive drill progression reminders for scheduled practice sessions.
              </span>
            </div>
            <input
              type="checkbox"
              checked={sessionReminders}
              onChange={(e) => setSessionReminders(e.target.checked)}
              className="w-4 h-4 accent-[#00E599]"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-[#1A1E2B] rounded border border-[#262C3D] cursor-pointer">
            <div>
              <span className="text-[#F3F4F6] font-bold block">Weekly Telemetry Digest</span>
              <span className="text-[11px] text-[#9CA3AF]">
                Summary of brake linearity scores, practice hours, and module unlock status.
              </span>
            </div>
            <input
              type="checkbox"
              checked={telemetryReports}
              onChange={(e) => setTelemetryReports(e.target.checked)}
              className="w-4 h-4 accent-[#00E599]"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-[#1A1E2B] rounded border border-[#262C3D] cursor-pointer">
            <div>
              <span className="text-[#F3F4F6] font-bold block">Certification System Alerts</span>
              <span className="text-[11px] text-[#9CA3AF]">
                Critical notifications when Level 1 exam prerequisites are met.
              </span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 accent-[#00E599]"
            />
          </label>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} variant="primary">
          Save UI Preferences
        </Button>
      </div>
    </div>
  )
}
