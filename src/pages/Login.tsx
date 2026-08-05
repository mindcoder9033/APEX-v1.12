import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Shield, AlertCircle, ArrowRight, Lock } from 'lucide-react'

export const Login: React.FC = () => {
  const { login, loginAsDemo, isSupabaseConnected } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const from = (location.state as any)?.from?.pathname || '/profile'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password.trim()) {
      setError('Please enter both your email address and password.')
      return
    }

    setIsSubmitting(true)
    const res = await login(email.trim(), password)
    setIsSubmitting(false)

    if (res.error) {
      setError(res.error)
    } else {
      navigate(from, { replace: true })
    }
  }

  const handleDemoClick = () => {
    loginAsDemo()
    navigate('/profile', { replace: true })
  }

  return (
    <div className="max-w-md mx-auto py-12 space-y-6">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-[#00E599]/10 border border-[#00E599] text-[#00E599] rounded-xl flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-[#F3F4F6]">Driver Authentication</h1>
        <p className="text-xs font-mono text-[#9CA3AF]">
          Sign in to access your telemetry records and academy progression.
        </p>
      </div>

      <Card className="space-y-6">
        {/* Status Indicator */}
        <div className="flex items-center justify-between text-[11px] font-mono border-b border-[#262C3D] pb-3">
          <span className="text-[#9CA3AF]">Auth Telemetry Status</span>
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              isSupabaseConnected
                ? 'bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/30'
                : 'bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30'
            }`}
          >
            {isSupabaseConnected ? 'Cloud Supabase Connected' : 'Local Sandbox Mode Active'}
          </span>
        </div>

        {error && (
          <div className="p-3 bg-[#FF3B30]/10 border border-[#FF3B30] text-[#FF3B30] rounded font-mono text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-mono">
          <div className="space-y-1.5">
            <label className="block text-xs uppercase text-[#9CA3AF]">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1A1E2B] border border-[#262C3D] focus:border-[#00E599] rounded px-3 py-2 text-sm text-[#F3F4F6] outline-none transition-colors"
              placeholder="driver@apex-academy.sim"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs uppercase text-[#9CA3AF]">Password</label>
              <Link
                to="/forgot-password"
                className="text-[11px] text-[#00E599] hover:underline transition-all"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1A1E2B] border border-[#262C3D] focus:border-[#00E599] rounded px-3 py-2 text-sm text-[#F3F4F6] outline-none transition-colors"
              placeholder="••••••••••••"
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full justify-center" disabled={isSubmitting}>
            {isSubmitting ? (
              'Authenticating...'
            ) : (
              <span className="flex items-center gap-2">
                Authenticate Driver Passport <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>

        {/* Demo Quick Access */}
        <div className="pt-2 border-t border-[#262C3D] space-y-3">
          <div className="text-center text-xs font-mono text-[#9CA3AF]">
            First time at the academy or testing locally?
          </div>

          <button
            type="button"
            onClick={handleDemoClick}
            className="w-full py-2.5 px-4 bg-[#1A1E2B] border border-[#262C3D] hover:border-[#00E599] text-[#F3F4F6] rounded text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Shield className="w-4 h-4 text-[#00E599]" />
            <span>Launch Sandbox Session as Driver #0041</span>
          </button>
        </div>
      </Card>

      <div className="text-center text-xs font-mono text-[#9CA3AF]">
        Don't have an academy passport yet?{' '}
        <Link to="/register" className="text-[#00E599] font-bold hover:underline">
          Enrol as New Cadet
        </Link>
      </div>
    </div>
  )
}
