import React from 'react'
import { Header } from './Header'

interface AcademyLayoutProps {
  children: React.ReactNode
}

export const AcademyLayout: React.FC<AcademyLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#08080A] text-[#F3F4F6] flex flex-col bg-telemetry-grid">
      <Header />
      
      {/* Academy Principles Ticker */}
      <div className="bg-[#121216]/90 border-b border-[#262630] py-1.5 px-4 text-center font-mono text-xs text-[#9CA3AF] flex items-center justify-center gap-4">
        <span><strong className="text-[#E10600]">APEX RULE:</strong> Mastery Before Progression</span>
        <span className="hidden sm:inline text-[#262630]">|</span>
        <span className="hidden sm:inline"><strong className="text-[#3B82F6]">HARDWARE:</strong> Moza R3 Wheel</span>
        <span className="hidden md:inline text-[#262630]">|</span>
        <span className="hidden md:inline"><strong className="text-[#FFB800]">SIMULATOR:</strong> Forza Motorsport (2023)</span>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-[#121216] border-t border-[#262630] py-6 text-center text-xs font-mono text-[#9CA3AF]">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>APEX Sim Racing Academy • F1 Red Telemetry Edition • Non-Gamified Objective Driver Development</p>
          <p className="text-[11px] text-gray-500">"Consistency before speed. Slow is smooth, smooth is fast."</p>
        </div>
      </footer>
    </div>
  )
}
