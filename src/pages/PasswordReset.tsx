import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { KeyRound, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'

export const PasswordReset: React.FC = () => {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!email.trim()) {
      setError('Please enter your enrolled email address.')
      return
    }

    setIsSubmitting(true)
    const res = await resetPassword(email.trim())
    setIsSubmitting(false)

    if (res.error) {
      setError(res.error)
    } else {
      setSuccess(res.successMessage || 'Password reset request dispatched.')
    }
  }

  return (
    <div className="max-w-md mx-auto py-12 space-y-6 font-mono">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-[#00E599]/10 border border-[#00E599] text-[#00E599] rounded-xl flex items-center justify-center mx-auto">
          <KeyRound className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-[#F3F4F6]">Reset Driver Password</h1>
        <p className="text-xs text-[#9CA3AF]">
          Enter your registered email address to receive password recovery instructions.
        </p>
      </div>

      <Card className="space-y-4">
        {error && (
          <div className="p-3 bg-[#FF3B30]/10 border border-[#FF3B30] text-[#FF3B30] rounded text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-3 bg-[#00E599]/10 border border-[#00E599] text-[#00E599] rounded text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs uppercase text-[#9CA3AF]">Enrolled Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1A1E2B] border border-[#262C3D] focus:border-[#00E599] rounded px-3 py-2 text-sm text-[#F3F4F6] outline-none transition-colors"
              placeholder="driver@apex-academy.sim"
              required
            />
          </div>

          <Button type="submit" variant="primary" className="w-full justify-center" disabled={isSubmitting}>
            {isSubmitting ? 'Dispatching Reset Signal...' : 'Send Recovery Instructions'}
          </Button>
        </form>

        <div className="pt-2 border-t border-[#262C3D] text-center">
          <Link
            to="/login"
            className="text-xs text-[#9CA3AF] hover:text-[#00E599] inline-flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Driver Login
          </Link>
        </div>
      </Card>
    </div>
  )
}
