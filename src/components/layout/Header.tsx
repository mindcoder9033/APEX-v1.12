import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { UserMenu } from './UserMenu'

interface HeaderProps {
  onToggleMobileSidebar?: () => void
  isSidebarCollapsed?: boolean
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileSidebar
}) => {
  return (
    <header className="bg-[#121216]/90 backdrop-blur-xs border-b border-[#262630] sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Side: Mobile Hamburger & Brand Logo */}
        <div className="flex items-center gap-3">
          {/* Mobile Sidebar Hamburger Toggle */}
          <button
            onClick={onToggleMobileSidebar}
            className="p-2 rounded-md text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1A1A20] lg:hidden transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo (Visible on mobile viewports) */}
          <Link to="/" className="flex items-center gap-3 group shrink-0 lg:hidden">
            <div className="w-8 h-8 bg-[#E10600] text-white rounded-md flex items-center justify-center font-bold text-lg shadow-[0_0_12px_rgba(225,6,0,0.4)] transition-transform group-hover:scale-105">
              A
            </div>
            <div>
              <span className="font-bold text-base text-[#F3F4F6] tracking-wider block leading-tight font-sans">
                APEX
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#9CA3AF] block leading-none">
                Sim Racing Academy
              </span>
            </div>
          </Link>
        </div>

        {/* Right Side: User Menu & Quick Controls */}
        <div className="flex items-center gap-3">
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
