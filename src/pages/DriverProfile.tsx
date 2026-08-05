import React from 'react'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { ShieldCheck, HardDrive, Award, Activity, Clock, CheckCircle2 } from 'lucide-react'

export const DriverProfile: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-[#12151E] border border-[#262C3D] rounded-xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-[#00E599]/10 border-2 border-[#00E599] text-[#00E599] rounded-xl flex items-center justify-center font-mono font-bold text-2xl">
            APX
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-[#F3F4F6]">Driver #0041</h2>
              <Badge variant="success">Level 1 Cadet</Badge>
            </div>
            <p className="text-sm font-mono text-[#9CA3AF] mt-1">
              Moza R3 Hardware Direct Input • Xbox Forza Motorsport
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="info" className="px-3 py-1.5 text-sm">
            <ShieldCheck className="w-4 h-4" /> Academy Status: Active
          </Badge>
        </div>
      </div>

      {/* Driver Telemetry Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        <Card className="space-y-1">
          <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
            <span>Practice Time</span>
            <Clock className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <div className="text-2xl font-bold text-[#F3F4F6]">14.5 Hours</div>
          <span className="text-[11px] text-[#00E599]">Level 1 Target: 20 Hours</span>
        </Card>

        <Card className="space-y-1">
          <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
            <span>Brake Linearity</span>
            <Activity className="w-4 h-4 text-[#00E599]" />
          </div>
          <div className="text-2xl font-bold text-[#00E599]">95.8%</div>
          <span className="text-[11px] text-[#9CA3AF]">Passing Criterion: ≥ 95.0%</span>
        </Card>

        <Card className="space-y-1">
          <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
            <span>Sessions Passed</span>
            <CheckCircle2 className="w-4 h-4 text-[#FFB800]" />
          </div>
          <div className="text-2xl font-bold text-[#F3F4F6]">6 / 8</div>
          <span className="text-[11px] text-[#9CA3AF]">Module 1 & 2 Completed</span>
        </Card>

        <Card className="space-y-1">
          <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
            <span>Certification</span>
            <Award className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-[#9CA3AF]">Pending</div>
          <span className="text-[11px] text-[#9CA3AF]">Exam Unlocks at Mod 4</span>
        </Card>
      </div>

      {/* Hardware Calibration Specification */}
      <Card className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#262C3D] pb-3">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-[#00E599]" />
            <h3 className="text-lg font-bold text-[#F3F4F6]">Hardware & Peripheral Profile</h3>
          </div>
          <Badge variant="success">Telemetry Sync Verified</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="bg-[#1A1E2B] p-4 rounded border border-[#262C3D] space-y-1">
            <span className="text-[#9CA3AF] uppercase block">Wheel Base</span>
            <span className="text-[#F3F4F6] font-bold text-sm block">Moza R3 Direct Drive</span>
            <span className="text-gray-400 text-[11px]">Force Feedback: 3.9 Nm Peak</span>
          </div>

          <div className="bg-[#1A1E2B] p-4 rounded border border-[#262C3D] space-y-1">
            <span className="text-[#9CA3AF] uppercase block">Pedal Set</span>
            <span className="text-[#F3F4F6] font-bold text-sm block">Moza SR-P Lite Pedals</span>
            <span className="text-gray-400 text-[11px]">Brake Resistance: Performance Kit</span>
          </div>

          <div className="bg-[#1A1E2B] p-4 rounded border border-[#262C3D] space-y-1">
            <span className="text-[#9CA3AF] uppercase block">Simulation Software</span>
            <span className="text-[#F3F4F6] font-bold text-sm block">Forza Motorsport (2023)</span>
            <span className="text-gray-400 text-[11px]">Telemetry UDP Port: 5300</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
