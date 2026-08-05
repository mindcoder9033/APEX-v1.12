import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Gauge,
  Compass,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  X,
  Activity,
  Cpu,
  Play
} from 'lucide-react'

interface SidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  isMobileOpen: boolean
  onCloseMobile: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile
}) => {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  const navItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      label: 'Academy Gate',
      path: '/',
      icon: Gauge,
      badge: 'LIVE'
    },
    {
      label: 'Curriculum',
      path: '/curriculum',
      icon: Compass,
      badge: '7 MODS'
    },
    {
      label: 'Driver Passport',
      path: '/profile',
      icon: UserCheck,
      badge: null
    }
  ]

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 bg-[#0E0E12] border-r border-[#262630]
          flex flex-col transition-all duration-300 ease-in-out
          ${/* Mobile Drawer positioning */ ''}
          ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'}
          ${/* Desktop Collapsible Widths */ ''}
          lg:${isCollapsed ? 'w-16' : 'w-64'}
        `}
      >
        {/* Sidebar Header / Brand Header */}
        <div className="h-16 px-4 border-b border-[#262630] flex items-center justify-between shrink-0">
          <Link
            to="/"
            onClick={onCloseMobile}
            className="flex items-center gap-3 group overflow-hidden"
          >
            <div className="w-8 h-8 bg-[#E10600] text-white rounded-md flex items-center justify-center font-bold text-lg shadow-[0_0_12px_rgba(225,6,0,0.4)] shrink-0">
              A
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="transition-opacity duration-200 whitespace-nowrap">
                <span className="font-bold text-base text-[#F3F4F6] tracking-wider block leading-tight font-sans">
                  APEX
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#9CA3AF] block leading-none">
                  Sim Racing
                </span>
              </div>
            )}
          </Link>

          {/* Mobile Close Button */}
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-md text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1A1A20] lg:hidden"
            aria-label="Close Mobile Navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 px-2 space-y-1.5 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onCloseMobile}
                title={isCollapsed && !isMobileOpen ? item.label : undefined}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono transition-all duration-150 relative group
                  ${
                    active
                      ? 'bg-[#1F1418] text-[#F3F4F6] border-l-2 border-[#E10600] font-semibold'
                      : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#16161D]'
                  }
                `}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-colors ${
                    active ? 'text-[#E10600]' : 'text-[#9CA3AF] group-hover:text-[#F3F4F6]'
                  }`}
                />
                
                {(!isCollapsed || isMobileOpen) && (
                  <div className="flex items-center justify-between w-full overflow-hidden whitespace-nowrap">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold tracking-wider ${
                          active
                            ? 'bg-[#E10600] text-white'
                            : 'bg-[#1A1A22] text-[#9CA3AF] border border-[#262630]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            )
          })}
        </div>

        {/* Telemetry Status Widget */}
        <div className="p-3 border-t border-[#262630] bg-[#121217]/50 shrink-0">
          {(!isCollapsed || isMobileOpen) ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-mono font-semibold text-emerald-400 tracking-wider">
                    TELEMETRY ONLINE
                  </span>
                </div>
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
              </div>

              <div className="p-2 bg-[#0B0B0E] rounded border border-[#262630] text-[10px] font-mono space-y-1 text-[#9CA3AF]">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3 h-3 text-[#3B82F6]" />
                    <span>WHEEL:</span>
                  </span>
                  <span className="text-[#F3F4F6] font-medium">Moza R3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <Play className="w-3 h-3 text-[#FFB800]" />
                    <span>SIM:</span>
                  </span>
                  <span className="text-[#F3F4F6] font-medium">Forza (2023)</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-1 gap-2" title="Telemetry Online: Moza R3 Wheel">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Toggle Footer */}
        <div className="hidden lg:flex items-center justify-end p-2 border-t border-[#262630] shrink-0">
          <button
            onClick={onToggleCollapse}
            className="w-full py-2 px-3 rounded-md text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-[#1A1A20] flex items-center justify-center gap-2 text-xs font-mono transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}
