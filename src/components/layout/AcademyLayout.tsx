import React, { useState, useEffect } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

interface AcademyLayoutProps {
  children: React.ReactNode
}

const SIDEBAR_STORAGE_KEY = 'apex_sidebar_collapsed'

export const AcademyLayout: React.FC<AcademyLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY)
    return saved !== null ? JSON.parse(saved) : false
  })

  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false)

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(isCollapsed))
  }, [isCollapsed])

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev)
  }

  const handleToggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev)
  }

  const handleCloseMobile = () => {
    setIsMobileOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#08080A] text-[#F3F4F6] flex flex-col bg-telemetry-grid">
      {/* Sidebar Navigation */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        isMobileOpen={isMobileOpen}
        onCloseMobile={handleCloseMobile}
      />

      {/* Main Content Area (Offset by sidebar width on desktop) */}
      <div
        className={`
          flex-1 flex flex-col transition-all duration-300 ease-in-out
          ${isCollapsed ? 'lg:pl-16' : 'lg:pl-64'}
        `}
      >
        <Header
          onToggleMobileSidebar={handleToggleMobileSidebar}
          isSidebarCollapsed={isCollapsed}
        />

        {/* Page Main Content Stream */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-[#121216] border-t border-[#262630] py-6 text-center text-xs font-mono text-[#9CA3AF]">
          <div className="max-w-7xl mx-auto px-4 space-y-2">
            <p>APEX Sim Racing Academy • F1 Red Telemetry Edition • Non-Gamified Objective Driver Development</p>
            <p className="text-[11px] text-gray-500 font-sans">
              "Consistency before speed. Slow is smooth, smooth is fast."
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
