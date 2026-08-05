import React, { useState } from 'react'
import { X, Trophy, Sparkles, Clock, ShieldCheck, FileText, CheckCircle } from 'lucide-react'
import { LapTimeEntry } from '../../types/assessment'
import { getDemoTelemetryPreset, getSessionCriteria, formatSecondsToLapTime } from '../../lib/assessmentEngine'

interface PerformanceEntryModalProps {
  sessionId: string
  sessionTitle: string
  isOpen: boolean
  onClose: () => void
  onSubmit: (entry: LapTimeEntry) => void
  existingEntry?: LapTimeEntry
}

export const PerformanceEntryModal: React.FC<PerformanceEntryModalProps> = ({
  sessionId,
  sessionTitle,
  isOpen,
  onClose,
  onSubmit,
  existingEntry
}) => {
  const criteria = getSessionCriteria(sessionId)

  const [bestLap, setBestLap] = useState<string>(
    existingEntry?.bestLap || formatSecondsToLapTime(criteria.targetBestLapSeconds - 0.4)
  )
  const [avgLap, setAvgLap] = useState<string>(
    existingEntry?.avgLap || formatSecondsToLapTime(criteria.targetBestLapSeconds + 0.8)
  )
  const [cleanLaps, setCleanLaps] = useState<number>(existingEntry?.cleanLaps ?? 8)
  const [totalLaps, setTotalLaps] = useState<number>(existingEntry?.totalLaps ?? 10)
  const [spins, setSpins] = useState<number>(existingEntry?.spins ?? 0)
  const [offTrackIncidents, setOffTrackIncidents] = useState<number>(existingEntry?.offTrackIncidents ?? 0)
  const [notes, setNotes] = useState<string>(existingEntry?.notes || '')
  const [errorText, setErrorText] = useState<string | null>(null)

  if (!isOpen) return null

  // Handle Demo Autofill
  const handleLoadDemoPreset = (presetType: 'MASTERED' | 'NEEDS_WORK') => {
    const preset = getDemoTelemetryPreset(sessionId, presetType)
    setBestLap(preset.bestLap)
    setAvgLap(preset.avgLap)
    setCleanLaps(preset.cleanLaps)
    setTotalLaps(preset.totalLaps)
    setSpins(preset.spins ?? 0)
    setOffTrackIncidents(preset.offTrackIncidents ?? 0)
    setNotes(preset.notes || '')
    setErrorText(null)
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()

    if (!bestLap.trim() || !avgLap.trim()) {
      setErrorText('Please enter both Best Lap and Average Lap times.')
      return
    }

    if (cleanLaps > totalLaps) {
      setErrorText('Clean laps cannot exceed total laps.')
      return
    }

    onSubmit({
      bestLap,
      avgLap,
      cleanLaps: Number(cleanLaps),
      totalLaps: Number(totalLaps),
      spins: Number(spins),
      offTrackIncidents: Number(offTrackIncidents),
      notes
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#12151E] border border-[#262C3D] rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#262C3D]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#00E599]/10 border border-[#00E599]/30 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-[#00E599]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-[#00E599] font-bold">
                Assessment Entry
              </span>
              <h3 className="text-lg font-bold text-[#F3F4F6] tracking-tight">{sessionTitle}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#090A0F] text-[#9CA3AF] hover:text-[#F3F4F6] border border-[#262C3D]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Demo Telemetry Quick Load Toolbar */}
        <div className="bg-[#090A0F] border border-[#262C3D] rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FFB800]" />
            <span className="text-xs font-mono text-[#9CA3AF]">Fast Demo Autofill:</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleLoadDemoPreset('MASTERED')}
              className="px-3 py-1 rounded bg-[#00E599]/10 hover:bg-[#00E599]/20 border border-[#00E599]/40 text-[#00E599] text-[11px] font-mono font-bold transition-all"
            >
              Mastered Telemetry
            </button>
            <button
              type="button"
              onClick={() => handleLoadDemoPreset('NEEDS_WORK')}
              className="px-3 py-1 rounded bg-[#FFB800]/10 hover:bg-[#FFB800]/20 border border-[#FFB800]/40 text-[#FFB800] text-[11px] font-mono font-bold transition-all"
            >
              Needs Work Telemetry
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmitForm} className="space-y-4">
          {errorText && (
            <div className="p-3 rounded-lg bg-[#FF3B30]/10 border border-[#FF3B30]/30 text-[#FF3B30] text-xs font-mono">
              {errorText}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {/* Best Lap */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#9CA3AF] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00E599]" />
                Best Lap Time (M:SS.sss)
              </label>
              <input
                type="text"
                value={bestLap}
                onChange={(e) => setBestLap(e.target.value)}
                placeholder="1:32.450"
                className="w-full bg-[#090A0F] border border-[#262C3D] focus:border-[#00E599] rounded-lg px-3 py-2 text-sm font-mono text-[#F3F4F6] outline-none transition-colors"
                required
              />
              <span className="text-[10px] font-mono text-[#9CA3AF]">
                Target: {formatSecondsToLapTime(criteria.targetBestLapSeconds)}
              </span>
            </div>

            {/* Average Lap */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#9CA3AF] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                Average Lap Time (M:SS.sss)
              </label>
              <input
                type="text"
                value={avgLap}
                onChange={(e) => setAvgLap(e.target.value)}
                placeholder="1:33.810"
                className="w-full bg-[#090A0F] border border-[#262C3D] focus:border-[#00E599] rounded-lg px-3 py-2 text-sm font-mono text-[#F3F4F6] outline-none transition-colors"
                required
              />
              <span className="text-[10px] font-mono text-[#9CA3AF]">
                Max Delta: +{criteria.maxConsistencyDeltaSeconds}s
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Clean Laps */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#9CA3AF] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00E599]" />
                Clean Laps Count
              </label>
              <input
                type="number"
                min="0"
                max={totalLaps}
                value={cleanLaps}
                onChange={(e) => setCleanLaps(parseInt(e.target.value) || 0)}
                className="w-full bg-[#090A0F] border border-[#262C3D] focus:border-[#00E599] rounded-lg px-3 py-2 text-sm font-mono text-[#F3F4F6] outline-none transition-colors"
                required
              />
            </div>

            {/* Total Laps */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#9CA3AF] flex items-center gap-1.5">
                Total Stint Laps
              </label>
              <input
                type="number"
                min="1"
                value={totalLaps}
                onChange={(e) => setTotalLaps(parseInt(e.target.value) || 10)}
                className="w-full bg-[#090A0F] border border-[#262C3D] focus:border-[#00E599] rounded-lg px-3 py-2 text-sm font-mono text-[#F3F4F6] outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Spins Count */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#9CA3AF] flex items-center gap-1.5">
                Number of Spins
              </label>
              <input
                type="number"
                min="0"
                value={spins}
                onChange={(e) => setSpins(parseInt(e.target.value) || 0)}
                className="w-full bg-[#090A0F] border border-[#262C3D] focus:border-[#00E599] rounded-lg px-3 py-2 text-sm font-mono text-[#F3F4F6] outline-none transition-colors"
              />
            </div>

            {/* Off-Track Incidents */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#9CA3AF] flex items-center gap-1.5">
                Off-Track Incidents
              </label>
              <input
                type="number"
                min="0"
                value={offTrackIncidents}
                onChange={(e) => setOffTrackIncidents(parseInt(e.target.value) || 0)}
                className="w-full bg-[#090A0F] border border-[#262C3D] focus:border-[#00E599] rounded-lg px-3 py-2 text-sm font-mono text-[#F3F4F6] outline-none transition-colors"
              />
            </div>
          </div>

          {/* Stint Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-[#9CA3AF] flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#FFB800]" />
              Driver Execution Notes & Reflection
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record your braking points, vehicle feedback, or off-track incidents..."
              className="w-full bg-[#090A0F] border border-[#262C3D] focus:border-[#00E599] rounded-lg px-3 py-2 text-xs text-[#F3F4F6] outline-none transition-colors resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-[#262C3D] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#090A0F] text-[#9CA3AF] hover:text-[#F3F4F6] border border-[#262C3D] text-xs font-mono font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#00E599] text-[#090A0F] hover:bg-[#00FFAB] font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-md shadow-[#00E599]/20"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Evaluate Performance</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
