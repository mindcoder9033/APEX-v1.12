import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { User, HardDrive, CheckCircle2, AlertCircle } from 'lucide-react'

export const EditProfileTab: React.FC = () => {
  const { profile, updateProfile } = useAuth()

  const [driverName, setDriverName] = useState(profile?.driverName || '')
  const [gamertag, setGamertag] = useState(profile?.gamertag || '')
  const [bio, setBio] = useState(profile?.bio || '')
  const [wheelBase, setWheelBase] = useState(profile?.hardwareSetup.wheelBase || 'Moza R3 Direct Drive')
  const [pedalSet, setPedalSet] = useState(profile?.hardwareSetup.pedalSet || 'Moza SR-P Lite Pedals')
  const [platform, setPlatform] = useState(profile?.hardwareSetup.platform || 'Forza Motorsport (2023)')

  const [isSaved, setIsSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    if (!driverName.trim()) {
      setError('Driver Name cannot be empty.')
      setIsSubmitting(false)
      return
    }

    const res = await updateProfile({
      driverName: driverName.trim(),
      gamertag: gamertag.trim(),
      bio: bio.trim(),
      hardwareSetup: {
        wheelBase,
        pedalSet,
        platform,
      },
    })

    setIsSubmitting(false)
    if (res.error) {
      setError(res.error)
    } else {
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Driver Identity Details */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[#262C3D] pb-3">
          <User className="w-5 h-5 text-[#00E599]" />
          <h3 className="text-lg font-bold text-[#F3F4F6]">Driver Identity Specification</h3>
        </div>

        {error && (
          <div className="p-3 bg-[#FF3B30]/10 border border-[#FF3B30] text-[#FF3B30] rounded font-mono text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {isSaved && (
          <div className="p-3 bg-[#00E599]/10 border border-[#00E599] text-[#00E599] rounded font-mono text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Driver telemetry profile successfully saved and updated.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase text-[#9CA3AF]">
              Driver Full Name / Handle <span className="text-[#00E599]">*</span>
            </label>
            <input
              type="text"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="w-full bg-[#1A1E2B] border border-[#262C3D] focus:border-[#00E599] rounded px-3 py-2 text-sm text-[#F3F4F6] outline-none font-mono transition-colors"
              placeholder="e.g. Alex Vance"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase text-[#9CA3AF]">
              In-Game Gamertag
            </label>
            <input
              type="text"
              value={gamertag}
              onChange={(e) => setGamertag(e.target.value)}
              className="w-full bg-[#1A1E2B] border border-[#262C3D] focus:border-[#00E599] rounded px-3 py-2 text-sm text-[#F3F4F6] outline-none font-mono transition-colors"
              placeholder="e.g. ApexRacer41"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono uppercase text-[#9CA3AF]">
            Academy Focus & Driver Notes
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full bg-[#1A1E2B] border border-[#262C3D] focus:border-[#00E599] rounded px-3 py-2 text-sm text-[#F3F4F6] outline-none font-mono transition-colors"
            placeholder="Focusing on brake pressure modulation and apex commitment..."
          />
        </div>
      </Card>

      {/* Hardware Configuration */}
      <Card className="space-y-4">
        <div className="flex items-center gap-2 border-b border-[#262C3D] pb-3">
          <HardDrive className="w-5 h-5 text-[#3B82F6]" />
          <h3 className="text-lg font-bold text-[#F3F4F6]">Sim Rig Hardware Configuration</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase text-[#9CA3AF]">
              Wheel Base Hardware
            </label>
            <select
              value={wheelBase}
              onChange={(e) => setWheelBase(e.target.value)}
              className="w-full bg-[#1A1E2B] border border-[#262C3D] focus:border-[#00E599] rounded px-3 py-2 text-sm text-[#F3F4F6] outline-none font-mono transition-colors"
            >
              <option value="Moza R3 Direct Drive">Moza R3 Direct Drive (3.9 Nm)</option>
              <option value="Moza R5 Direct Drive">Moza R5 Direct Drive (5.5 Nm)</option>
              <option value="Fanatec Gran Turismo DD">Fanatec Gran Turismo DD Pro</option>
              <option value="Logitech G923 / G29">Logitech G923 / G29 Gear Drive</option>
              <option value="Thrustmaster T300RS">Thrustmaster T300RS Belt Drive</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase text-[#9CA3AF]">
              Pedal Assembly
            </label>
            <select
              value={pedalSet}
              onChange={(e) => setPedalSet(e.target.value)}
              className="w-full bg-[#1A1E2B] border border-[#262C3D] focus:border-[#00E599] rounded px-3 py-2 text-sm text-[#F3F4F6] outline-none font-mono transition-colors"
            >
              <option value="Moza SR-P Lite Pedals">Moza SR-P Lite Pedals</option>
              <option value="Moza SR-P Load Cell">Moza SR-P Load Cell Pedals</option>
              <option value="Fanatec CSL Load Cell">Fanatec CSL Load Cell</option>
              <option value="Logitech Pro Loadcell">Logitech Pro Pedals</option>
              <option value="Standard Potentiometer Pedals">Standard Potentiometer Pedals</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase text-[#9CA3AF]">
              Simulator Platform
            </label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full bg-[#1A1E2B] border border-[#262C3D] focus:border-[#00E599] rounded px-3 py-2 text-sm text-[#F3F4F6] outline-none font-mono transition-colors"
            >
              <option value="Forza Motorsport (2023)">Forza Motorsport (2023) - PC/Xbox</option>
              <option value="Assetto Corsa Competizione">Assetto Corsa Competizione</option>
              <option value="iRacing">iRacing Motorsport Simulator</option>
              <option value="Automobilista 2">Automobilista 2</option>
            </select>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving Telemetry Profile...' : 'Save Profile Changes'}
        </Button>
      </div>
    </form>
  )
}
