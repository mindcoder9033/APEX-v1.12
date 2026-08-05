import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { User, LogOut, ShieldCheck, ChevronDown, Sliders } from 'lucide-react'
import { Badge } from '../ui/Badge'

export const UserMenu: React.FC = () => {
  const { isAuthenticated, profile, user, logout, loginAsDemo } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setIsOpen(false)
    await logout()
    navigate('/')
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center gap-3 font-mono text-xs">
        <button
          onClick={loginAsDemo}
          className="text-[#9CA3AF] hover:text-[#E10600] transition-colors underline"
          title="Instant sandbox demo access"
        >
          Demo Driver
        </button>
        <Link
          to="/login"
          className="px-3 py-1.5 text-[#F3F4F6] bg-[#121216] border border-[#262630] hover:border-[#E10600] rounded transition-colors"
        >
          Sign In
        </Link>
        <Link
          to="/register"
          className="px-3 py-1.5 bg-[#E10600] text-white font-bold rounded hover:bg-[#FF1E19] transition-colors shadow-md shadow-[#E10600]/30"
        >
          Enrol
        </Link>
      </div>
    )
  }

  const initials = profile?.driverName
    ? profile.driverName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 3)
        .toUpperCase()
    : 'APX'

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-[#121216] border border-[#262630] hover:border-[#E10600] px-3 py-1.5 rounded-lg transition-colors text-left"
      >
        <div className="w-8 h-8 rounded bg-[#E10600]/10 border border-[#E10600] text-[#E10600] font-mono font-bold flex items-center justify-center text-xs">
          {initials}
        </div>
        <div className="hidden sm:block">
          <div className="text-xs font-bold text-[#F3F4F6] leading-tight">
            {profile?.driverName || 'Driver'}
          </div>
          <div className="text-[10px] font-mono text-[#9CA3AF]">
            {profile?.gamertag ? `@${profile.gamertag}` : user?.email}
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-[#9CA3AF]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#121216] border border-[#262630] rounded-xl shadow-2xl z-50 py-2 font-mono text-xs text-[#F3F4F6] animate-in fade-in slide-in-from-top-2">
          {/* Header */}
          <div className="px-4 py-3 border-b border-[#262630] space-y-1">
            <div className="font-bold text-sm text-[#F3F4F6]">{profile?.driverName}</div>
            <div className="text-[11px] text-[#9CA3AF] truncate">{user?.email}</div>
            <div className="pt-1 flex items-center gap-1.5">
              <Badge variant="success" className="text-[10px] py-0.5 px-2">
                Level 1 Cadet
              </Badge>
              <span className="text-[10px] text-[#E10600] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Certified Telemetry
              </span>
            </div>
          </div>

          {/* Links */}
          <div className="py-1">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#1A1A20] transition-colors"
            >
              <User className="w-4 h-4 text-[#E10600]" />
              <span>Driver Profile & Telemetry</span>
            </Link>

            <Link
              to="/profile?tab=settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#1A1A20] transition-colors"
            >
              <Sliders className="w-4 h-4 text-[#3B82F6]" />
              <span>Academy & UI Settings</span>
            </Link>
          </div>

          {/* Hardware setup snippet */}
          <div className="px-4 py-2.5 bg-[#08080A]/60 border-t border-b border-[#262630] text-[10px] text-[#9CA3AF] space-y-0.5">
            <span className="block font-bold text-[#F3F4F6] uppercase text-[9px]">
              Hardware Rig
            </span>
            <div className="truncate">{profile?.hardwareSetup.wheelBase}</div>
            <div className="truncate text-gray-400">{profile?.hardwareSetup.platform}</div>
          </div>

          {/* Logout */}
          <div className="pt-1">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-colors text-left font-bold"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out Driver</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
