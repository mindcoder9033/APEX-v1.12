import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { EditProfileTab } from '../components/profile/EditProfileTab'
import { SettingsTab } from '../components/profile/SettingsTab'
import {
  ShieldCheck,
  HardDrive,
  Award,
  Activity,
  Clock,
  CheckCircle2,
  BarChart3,
  User,
  Sliders,
  Mail,
  Zap,
} from 'lucide-react'

export const DriverProfile: React.FC = () => {
  const { profile, user, isAuthenticated, loginAsDemo } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()

  const activeTabParam = searchParams.get('tab') || 'stats'
  const [activeTab, setActiveTab] = useState<'stats' | 'edit' | 'settings'>(
    activeTabParam === 'settings' ? 'settings' : activeTabParam === 'edit' ? 'edit' : 'stats'
  )

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab === 'settings' || tab === 'edit' || tab === 'stats') {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleTabChange = (tab: 'stats' | 'edit' | 'settings') => {
    setActiveTab(tab)
    setSearchParams({ tab })
  }

  // Fallback to active profile or demo profile
  const currentProfile = profile || {
    id: 'demo-driver-0041',
    driverName: 'Driver #0041',
    gamertag: 'ApexRacer41',
    bio: 'Sim racing enthusiast targeting beginner certification on Moza R3 hardware.',
    hardwareSetup: {
      wheelBase: 'Moza R3 Direct Drive',
      pedalSet: 'Moza SR-P Lite Pedals',
      platform: 'Forza Motorsport (2023)',
    },
    currentLevel: 'BEGINNER' as const,
    activeModuleId: 'mod-1',
    completedSessionsCount: 6,
    totalPracticeHours: 14.5,
    brakeLinearityAvg: 95.8,
    certificationStatus: { beginnerCertified: false },
  }

  const initials = currentProfile.driverName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 3)
    .toUpperCase()

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-[#12151E] border border-[#262C3D] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-[#00E599]/10 border-2 border-[#00E599] text-[#00E599] rounded-xl flex items-center justify-center font-mono font-bold text-2xl shadow-[0_0_15px_rgba(0,229,153,0.2)]">
            {initials}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-bold text-[#F3F4F6]">{currentProfile.driverName}</h2>
              <Badge variant="success">
                {currentProfile.currentLevel === 'BEGINNER' ? 'Level 1 Cadet' : currentProfile.currentLevel}
              </Badge>
              {currentProfile.gamertag && (
                <span className="text-xs font-mono text-[#00E599] bg-[#00E599]/10 px-2 py-0.5 rounded border border-[#00E599]/30">
                  @{currentProfile.gamertag}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm font-mono text-[#9CA3AF] mt-1 flex items-center gap-2">
              <HardDrive className="w-3.5 h-3.5 text-[#3B82F6]" />
              <span>
                {currentProfile.hardwareSetup.wheelBase} • {currentProfile.hardwareSetup.platform}
              </span>
            </p>
            {user?.email && (
              <p className="text-[11px] font-mono text-gray-500 mt-0.5 flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-gray-400" />
                <span>{user.email}</span>
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="info" className="px-3 py-1.5 text-xs">
            <ShieldCheck className="w-4 h-4" /> Academy Passport: Active
          </Badge>
          {!isAuthenticated && (
            <button
              onClick={loginAsDemo}
              className="px-3 py-1.5 bg-[#00E599]/10 text-[#00E599] border border-[#00E599] rounded text-xs font-mono font-bold hover:bg-[#00E599]/20 transition-all flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" /> Initialize Demo
            </button>
          )}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[#262C3D] font-mono text-xs pb-1">
        <button
          onClick={() => handleTabChange('stats')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-bold transition-colors ${
            activeTab === 'stats'
              ? 'bg-[#12151E] text-[#00E599] border-t-2 border-x border-[#00E599] border-b-transparent'
              : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1A1E2B]'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Telemetry & Stats</span>
        </button>

        <button
          onClick={() => handleTabChange('edit')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-bold transition-colors ${
            activeTab === 'edit'
              ? 'bg-[#12151E] text-[#00E599] border-t-2 border-x border-[#00E599] border-b-transparent'
              : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1A1E2B]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Edit Hardware & Profile</span>
        </button>

        <button
          onClick={() => handleTabChange('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-bold transition-colors ${
            activeTab === 'settings'
              ? 'bg-[#12151E] text-[#00E599] border-t-2 border-x border-[#00E599] border-b-transparent'
              : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1A1E2B]'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Academy & UI Settings</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'stats' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Driver Telemetry Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
            <Card className="space-y-1">
              <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                <span>Practice Time</span>
                <Clock className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <div className="text-2xl font-bold text-[#F3F4F6]">
                {currentProfile.totalPracticeHours} Hours
              </div>
              <span className="text-[11px] text-[#00E599]">Level 1 Target: 20 Hours</span>
            </Card>

            <Card className="space-y-1">
              <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                <span>Brake Linearity</span>
                <Activity className="w-4 h-4 text-[#00E599]" />
              </div>
              <div className="text-2xl font-bold text-[#00E599]">
                {currentProfile.brakeLinearityAvg ?? 95.8}%
              </div>
              <span className="text-[11px] text-[#9CA3AF]">Passing Criterion: ≥ 95.0%</span>
            </Card>

            <Card className="space-y-1">
              <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                <span>Sessions Passed</span>
                <CheckCircle2 className="w-4 h-4 text-[#FFB800]" />
              </div>
              <div className="text-2xl font-bold text-[#F3F4F6]">
                {currentProfile.completedSessionsCount} / 8
              </div>
              <span className="text-[11px] text-[#9CA3AF]">Module 1 & 2 Completed</span>
            </Card>

            <Card className="space-y-1">
              <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                <span>Certification</span>
                <Award className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-[#9CA3AF]">
                {currentProfile.certificationStatus.beginnerCertified ? (
                  <span className="text-[#00E599]">Certified</span>
                ) : (
                  'Pending'
                )}
              </div>
              <span className="text-[11px] text-[#9CA3AF]">Exam Unlocks at Mod 4</span>
            </Card>
          </div>

          {/* Hardware Calibration Specification */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#262C3D] pb-3">
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-[#00E599]" />
                <h3 className="text-lg font-bold text-[#F3F4F6]">Hardware & Peripheral Profile</h3>
              </div>
              <Badge variant="success">Telemetry Sync Verified</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="bg-[#1A1E2B] p-4 rounded border border-[#262C3D] space-y-1">
                <span className="text-[#9CA3AF] uppercase block">Wheel Base</span>
                <span className="text-[#F3F4F6] font-bold text-sm block">
                  {currentProfile.hardwareSetup.wheelBase}
                </span>
                <span className="text-gray-400 text-[11px]">Direct Telemetry Feed: Active</span>
              </div>

              <div className="bg-[#1A1E2B] p-4 rounded border border-[#262C3D] space-y-1">
                <span className="text-[#9CA3AF] uppercase block">Pedal Set</span>
                <span className="text-[#F3F4F6] font-bold text-sm block">
                  {currentProfile.hardwareSetup.pedalSet}
                </span>
                <span className="text-gray-400 text-[11px]">Brake Curve Calibration: Linear</span>
              </div>

              <div className="bg-[#1A1E2B] p-4 rounded border border-[#262C3D] space-y-1">
                <span className="text-[#9CA3AF] uppercase block">Simulation Platform</span>
                <span className="text-[#F3F4F6] font-bold text-sm block">
                  {currentProfile.hardwareSetup.platform}
                </span>
                <span className="text-gray-400 text-[11px]">UDP Telemetry Output: Enabled</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'edit' && (
        <div className="animate-in fade-in">
          <EditProfileTab />
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="animate-in fade-in">
          <SettingsTab />
        </div>
      )}
    </div>
  )
}
