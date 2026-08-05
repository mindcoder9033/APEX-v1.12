import React from 'react'
import { Sliders, HardDrive, ShieldCheck, Sun, Fuel, Cpu } from 'lucide-react'
import { TrainingPrescription } from '../../types/curriculum'

interface PrescriptionCardProps {
  prescription: TrainingPrescription
}

export const PrescriptionCard: React.FC<PrescriptionCardProps> = ({ prescription }) => {
  return (
    <div className="bg-[#12151E] border border-[#262C3D] rounded-xl p-6 space-y-6">
      {/* Prescription Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#262C3D]">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#00E599]" />
          <div>
            <h3 className="text-base font-bold text-[#F3F4F6]">Training Prescription</h3>
            <p className="text-xs text-[#9CA3AF]">
              Mandated session configuration for Forza Motorsport (2023)
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded bg-[#00E599]/10 text-[#00E599] border border-[#00E599]/30 font-bold">
          Moza R3 Verified
        </span>
      </div>

      {/* Grid Layout of Prescription Specs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Track & Vehicle */}
        <div className="bg-[#090A0F] border border-[#262C3D] rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00E599] uppercase font-bold">
            <HardDrive className="w-4 h-4" />
            <span>Track & Vehicle</span>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <span className="text-[#9CA3AF] block font-mono text-[10px] uppercase">Track Layout</span>
              <span className="text-[#F3F4F6] font-semibold">{prescription.trackLayout || prescription.track}</span>
            </div>
            <div>
              <span className="text-[#9CA3AF] block font-mono text-[10px] uppercase">Car Model</span>
              <span className="text-[#F3F4F6] font-semibold">{prescription.car}</span>
            </div>
            <div>
              <span className="text-[#9CA3AF] block font-mono text-[10px] uppercase">Car Setup</span>
              <span className="text-[#F3F4F6] font-mono">{prescription.carSetup}</span>
            </div>
          </div>
        </div>

        {/* Driving Assists */}
        <div className="bg-[#090A0F] border border-[#262C3D] rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#3B82F6] uppercase font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Driving Assists</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-[#12151E] p-2 rounded border border-[#262C3D]">
              <span className="text-[#9CA3AF] text-[10px] block">ABS</span>
              <span className="text-[#00E599] font-bold">{prescription.assists.abs}</span>
            </div>
            <div className="bg-[#12151E] p-2 rounded border border-[#262C3D]">
              <span className="text-[#9CA3AF] text-[10px] block">Traction Ctrl</span>
              <span className="text-[#FFB800] font-bold">{prescription.assists.tc}</span>
            </div>
            <div className="bg-[#12151E] p-2 rounded border border-[#262C3D]">
              <span className="text-[#9CA3AF] text-[10px] block">Stability</span>
              <span className="text-[#FF3B30] font-bold">{prescription.assists.stm}</span>
            </div>
            <div className="bg-[#12151E] p-2 rounded border border-[#262C3D]">
              <span className="text-[#9CA3AF] text-[10px] block">Racing Line</span>
              <span className="text-[#F3F4F6] font-bold">{prescription.assists.line}</span>
            </div>
          </div>
        </div>

        {/* Environment & Controls */}
        <div className="bg-[#090A0F] border border-[#262C3D] rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FFB800] uppercase font-bold">
            <Sun className="w-4 h-4" />
            <span>Session Environment</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#9CA3AF]">Transmission:</span>
              <span className="text-[#F3F4F6] font-mono">{prescription.transmission}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#9CA3AF]">Camera:</span>
              <span className="text-[#F3F4F6] font-mono">{prescription.camera}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#9CA3AF]">Weather:</span>
              <span className="text-[#F3F4F6] font-mono">{prescription.weather}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#9CA3AF]">Fuel Load:</span>
              <span className="text-[#00E599] font-mono font-bold flex items-center gap-1">
                <Fuel className="w-3 h-3" />
                {prescription.fuel}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Moza R3 Hardware Direct Drive Settings */}
      {prescription.mozaWheelSettings && (
        <div className="bg-[#090A0F] border border-[#00E599]/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#00E599] uppercase font-bold">
            <Cpu className="w-4 h-4" />
            <span>Moza R3 Hardware Calibration</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-[#12151E] p-3 rounded border border-[#262C3D] flex justify-between items-center">
              <span className="text-[#9CA3AF]">FFB Gain:</span>
              <span className="text-[#00E599] font-bold">{prescription.mozaWheelSettings.ffbGain}</span>
            </div>
            <div className="bg-[#12151E] p-3 rounded border border-[#262C3D] flex justify-between items-center">
              <span className="text-[#9CA3AF]">Wheel Angle:</span>
              <span className="text-[#00E599] font-bold">{prescription.mozaWheelSettings.wheelRotation}</span>
            </div>
            <div className="bg-[#12151E] p-3 rounded border border-[#262C3D] flex justify-between items-center">
              <span className="text-[#9CA3AF]">Pedal Damping:</span>
              <span className="text-[#00E599] font-bold">{prescription.mozaWheelSettings.pedalDamping}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
