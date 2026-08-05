import React from 'react'
import { Badge } from '../ui/Badge'
import { Car, MapPin, ShieldCheck } from 'lucide-react'

export interface LessonHeaderProps {
  levelTitle: string
  moduleTitle: string
  car: string
  track: string
  hardware: string
}

export const LessonHeader: React.FC<LessonHeaderProps> = ({
  levelTitle,
  moduleTitle,
  car,
  track,
  hardware,
}) => {
  return (
    <div className="bg-[#121216] border border-[#262630] rounded-xl p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Badge variant="success">{levelTitle}</Badge>
          <span className="text-xs font-mono text-[#9CA3AF]">• Objective Academy</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#E10600] bg-[#E10600]/10 px-3 py-1 rounded-full border border-[#E10600]/30 font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>{hardware} Calibrated</span>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-[#F3F4F6]">{moduleTitle}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#262630] text-xs font-mono text-[#9CA3AF]">
        <div className="flex items-center gap-2 bg-[#1A1A20] p-2.5 rounded-lg border border-[#262630]">
          <Car className="w-4 h-4 text-[#3B82F6]" />
          <span>Vehicle: <strong className="text-[#F3F4F6]">{car}</strong></span>
        </div>
        <div className="flex items-center gap-2 bg-[#1A1A20] p-2.5 rounded-lg border border-[#262630]">
          <MapPin className="w-4 h-4 text-[#FFB800]" />
          <span>Track: <strong className="text-[#F3F4F6]">{track}</strong></span>
        </div>
      </div>
    </div>
  )
}
