import React from 'react'
import { Clock, Car, MapPin, Target, CheckCircle2, ShieldCheck } from 'lucide-react'
import { Session } from '../../types/curriculum'
import { SessionDetailExtra } from '../../data/sessionDetails'

interface SessionOverviewSectionProps {
  session: Session
  extraDetails: SessionDetailExtra
}

export const SessionOverviewSection: React.FC<SessionOverviewSectionProps> = ({
  session,
  extraDetails
}) => {
  return (
    <div className="space-y-6">
      {/* Hero Overview Card */}
      <div className="bg-[#12151E] border border-[#262C3D] rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E599]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-2.5 py-1 rounded bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/30 font-mono text-xs font-bold uppercase">
            Session Briefing
          </span>
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#9CA3AF] bg-[#090A0F] px-2.5 py-1 rounded border border-[#262C3D]">
            <Clock className="w-3.5 h-3.5 text-[#00E599]" />
            <span>Est. {session.estimatedMinutes} Mins</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#9CA3AF] bg-[#090A0F] px-2.5 py-1 rounded border border-[#262C3D]">
            <Car className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>{session.car}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#9CA3AF] bg-[#090A0F] px-2.5 py-1 rounded border border-[#262C3D]">
            <MapPin className="w-3.5 h-3.5 text-[#FFB800]" />
            <span>{session.track}</span>
          </div>
        </div>

        <h2 className="text-xl lg:text-2xl font-bold text-[#F3F4F6] tracking-tight mb-3">
          {session.title}
        </h2>
        <p className="text-sm text-[#9CA3AF] leading-relaxed max-w-4xl">
          {extraDetails.overviewText || session.description}
        </p>
      </div>

      {/* Learning Objectives Grid */}
      <div className="bg-[#12151E] border border-[#262C3D] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-[#00E599]" />
          <h3 className="text-base font-bold text-[#F3F4F6]">Session Learning Objectives</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {extraDetails.learningObjectives.map((obj, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3.5 rounded-lg bg-[#090A0F] border border-[#262C3D]"
            >
              <CheckCircle2 className="w-4 h-4 text-[#00E599] shrink-0 mt-0.5" />
              <span className="text-xs text-[#F3F4F6] leading-snug">{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Verification Notice */}
      <div className="bg-[#090A0F] border border-[#262C3D] rounded-xl p-4 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-[#00E599] shrink-0" />
        <p className="text-xs text-[#9CA3AF]">
          All training data and lap telemetry are benchmarked against APEX Academy baseline standards for the Moza R3 Direct Drive Wheel.
        </p>
      </div>
    </div>
  )
}
