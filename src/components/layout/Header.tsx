import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Gauge, Compass, UserCheck } from 'lucide-react'
import { UserMenu } from './UserMenu'

export const Header: React.FC = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-[#12151E] border-b border-[#262C3D] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 bg-[#00E599] text-[#090A0F] rounded flex items-center justify-center font-bold text-xl shadow-[0_0_12px_rgba(0,229,153,0.3)] transition-transform group-hover:scale-105">
            A
          </div>
          <div>
            <span className="font-bold text-lg text-[#F3F4F6] tracking-wider block leading-tight font-sans">
              APEX
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#9CA3AF] block leading-none">
              Sim Racing Academy
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/"
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono transition-colors ${
              isActive('/')
                ? 'bg-[#1A1E2B] text-[#00E599] border border-[#00E599]/30 font-semibold'
                : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1A1E2B]'
            }`}
          >
            <Gauge className="w-4 h-4" />
            <span className="hidden sm:inline">Academy Gate</span>
          </Link>

          <Link
            to="/curriculum"
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono transition-colors ${
              isActive('/curriculum')
                ? 'bg-[#1A1E2B] text-[#00E599] border border-[#00E599]/30 font-semibold'
                : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1A1E2B]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Curriculum</span>
          </Link>

          <Link
            to="/profile"
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono transition-colors ${
              isActive('/profile')
                ? 'bg-[#1A1E2B] text-[#00E599] border border-[#00E599]/30 font-semibold'
                : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1A1E2B]'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Driver Passport</span>
          </Link>
        </nav>

        {/* User Menu / Authentication Actions */}
        <div className="flex items-center">
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
