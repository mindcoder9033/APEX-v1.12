import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { UserPlus, HardDrive, AlertCircle, ArrowRight } from 'lucide-react'

export const Register: React.FC = () => {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [driverName, setDriverName] = useState('')
  const [gamertag, setGamertag] = useState('')
  const [wheelBase, setWheelBase] = useState('Moza R3 Direct Drive')
  const [pedalSet, setPedalSet] = useState('Moza SR-P Lite Pedals')
  const [platform, setPlatform] = useState('Forza Motorsport (2023)')

  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password.trim() || !driverName.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    setIsSubmitting(true)
    const res = await register(email.trim(), password, driverName.trim(), gamertag.trim(), {
      wheelBase,
      pedalSet,
      platform,
    })
    setIsSubmitting(false)

    if (res.error) {
      setError(res.error)
    } else {
      navigate('/profile')
    }
  }

  return (
    <div className="max-w-lg mx-auto py-10 space-y-6">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-[#00E599]/10 border border-[#00E599] text-[#00E599] rounded-xl flex items-center justify-center mx-auto">
          <UserPlus className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-[#F3F4F6]">Academy Driver Enrolment</h1>
        <p className="text-xs font-mono text-[#9CA3AF]">
          Create your academy passport to begin Level 1 Cadet curriculum.
        </p>
      </div>

      <Card className="space-y-6">
        {error && (
          <div className="p-3 bg-[#FF3B30]/10 border border-[#FF3B30] text-[#FF3B30] rounded font-mono text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-mono">
          {/* Driver Account Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase text-[#00E599] border-b border-[#262C3D] pb-1">
              1. Account Identity
            </h3>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase text-[#9CA3AF]">
                Driver Name <span className="text-[#00E599]">*</span>
              </label>
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                className="w-full bg-[#1A1E2B] border border-[#262C3D] focus:border-[#00E599] rounded px-3 py-2 text-sm text-[#F3F4F6] outline-none transition-colors"
                placeholder="e.g. Alex Vance"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs uppercase text-[#9CA3AF]">
                  Email <span className="text-[#00E599]">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1A1E2B] border border-[#262C3D] focus:border-[#00E599] rounded px-3 py-2 text-sm text-[#F3F4F6] outline-none transition-colors"
                  placeholder="driver@domain.com"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase text-[#9CA3AF]">
                  In-Game Gamertag
                </label>
                <input
                  type="text"
                  value={gamertag}
                  onChange={(e) => setGamertag(e.target.value)}
                  className="w-full bg-[#1A1E2B] border border-[#262C3D] focus:border-[#00E599] rounded px-3 py-2 text-sm text-[#F3F4F6] outline-none transition-colors"
                  placeholder="e.g. ApexCadet"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase text-[#9CA3AF]">
                Password <span className="text-[#00E599]">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1A1E2B] border border-[#262C3D] focus:border-[#00E599] rounded px-3 py-2 text-sm text-[#F3F4F6] outline-none transition-colors"
                placeholder="Minimum 6 characters"
                required
              />
            </div>
          </div>

          {/* Hardware Configuration Section */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold uppercase text-[#3B82F6] border-b border-[#262C3D] pb-1 flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5" /> 2. Sim Rig Specification
            </h3>

            <div className="space-y-1.5">
              <label className="block text-xs uppercase text-[#9CA3AF]">Wheel Base</label>
              <select
                value={wheelBase}
                onChange={(e) => setWheelBase(e.target.value)}
                className="w-full bg-[#1A1E2B] border border-[#262C3D] focus:border-[#00E599] rounded px-3 py-2 text-sm text-[#F3F4F6] outline-none transition-colors"
              >
                <option value="Moza R3 Direct Drive">Moza R3 Direct Drive (Recommended standard)</option>
                <option value="Moza R5 Direct Drive">Moza R5 Direct Drive</option>
                <option value="Fanatec Gran Turismo DD">Fanatec Gran Turismo DD Pro</option>
                <option value="Logitech G923 / G29">Logitech G923 / G29</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs uppercase text-[#9CA3AF]">Pedal Set</label>
                <select
                  value={pedalSet}
                  onChange={(e) => setPedalSet(e.target.value)}
                  className="w-full bg-[#1A1E2B] border border-[#262C3D] focus:border-[#00E599] rounded px-3 py-2 text-sm text-[#F3F4F6] outline-none transition-colors"
                >
                  <option value="Moza SR-P Lite Pedals">Moza SR-P Lite Pedals</option>
                  <option value="Moza SR-P Load Cell">Moza SR-P Load Cell</option>
                  <option value="Fanatec CSL Load Cell">Fanatec CSL Load Cell</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase text-[#9CA3AF]">Platform</label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-[#1A1E2B] border border-[#262C3D] focus:border-[#00E599] rounded px-3 py-2 text-sm text-[#F3F4F6] outline-none transition-colors"
                >
                  <option value="Forza Motorsport (2023)">Forza Motorsport (2023)</option>
                  <option value="Assetto Corsa Competizione">Assetto Corsa Competizione</option>
                  <option value="iRacing">iRacing</option>
                </select>
              </div>
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full justify-center mt-4" disabled={isSubmitting}>
            {isSubmitting ? (
              'Enrolling Driver...'
            ) : (
              <span className="flex items-center gap-2">
                Create Academy Passport <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>
      </Card>

      <div className="text-center text-xs font-mono text-[#9CA3AF]">
        Already enrolled?{' '}
        <Link to="/login" className="text-[#00E599] font-bold hover:underline">
          Sign In
        </Link>
      </div>
    </div>
  )
}
