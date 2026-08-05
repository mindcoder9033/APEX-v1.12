import React, { useState } from 'react'
import { MessageSquare, Save, Check, Gauge } from 'lucide-react'
import { Step } from '../../types/curriculum'
import { SessionDetailExtra } from '../../data/sessionDetails'

interface ReflectionCardProps {
  step: Step
  extraDetails: SessionDetailExtra
  savedReflection: string
  savedConfidence?: number
  onSaveReflection: (reflectionText: string, confidenceRating?: number) => void
}

export const ReflectionCard: React.FC<ReflectionCardProps> = ({
  step,
  extraDetails,
  savedReflection,
  savedConfidence = 4,
  onSaveReflection
}) => {
  const promptText = step.reflectionPrompt || extraDetails.reflectionPrompt
  const [reflectionText, setReflectionText] = useState(savedReflection || '')
  const [confidence, setConfidence] = useState(savedConfidence || 4)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    onSaveReflection(reflectionText, confidence)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2500)
  }

  return (
    <div className="bg-[#12151E] border border-[#262C3D] rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#262C3D]">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[#00E599]" />
          <div>
            <h3 className="text-base font-bold text-[#F3F4F6]">Driver Self-Reflection & Log</h3>
            <p className="text-xs text-[#9CA3AF]">
              Record technique observations and feel during this step
            </p>
          </div>
        </div>
        <span className="text-[11px] font-mono text-[#00E599]">Autosaved to Profile</span>
      </div>

      {/* Reflection Prompt Box */}
      <div className="bg-[#090A0F] border border-[#262C3D] rounded-lg p-4 space-y-2">
        <span className="text-[10px] font-mono text-[#00E599] uppercase font-bold block">
          Coach Guided Reflection Questions
        </span>
        {extraDetails.reflectionQuestions && extraDetails.reflectionQuestions.length > 0 ? (
          <ul className="space-y-1.5 text-xs text-[#F3F4F6] font-learning">
            {extraDetails.reflectionQuestions.map((q, idx) => (
              <li key={idx} className="leading-relaxed">
                {q}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-[#F3F4F6] italic">{promptText}</p>
        )}
      </div>

      {/* Textarea Input */}
      <div className="space-y-2">
        <label className="text-xs font-mono text-[#9CA3AF] uppercase block font-bold">
          Your Technique & Feel Notes
        </label>
        <textarea
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
          placeholder="e.g. Held smooth 80% brake pressure into Turn 1, but felt slight pedal vibration on third attempt..."
          rows={4}
          className="w-full bg-[#090A0F] border border-[#262C3D] focus:border-[#00E599] rounded-lg p-3 text-xs text-[#F3F4F6] placeholder-[#4B5563] focus:outline-none focus:ring-1 focus:ring-[#00E599] transition-all font-mono leading-relaxed"
        />
      </div>

      {/* Confidence Level Selector */}
      <div className="bg-[#090A0F] border border-[#262C3D] rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Gauge className="w-4 h-4 text-[#FFB800]" />
          <div>
            <span className="text-xs font-bold text-[#F3F4F6] block">Technique Confidence Level</span>
            <span className="text-[10px] text-[#9CA3AF]">Rate your input repeatability for this step</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setConfidence(lvl)}
              className={`w-9 h-9 rounded-lg font-mono text-xs font-bold border transition-all flex items-center justify-center ${
                confidence >= lvl
                  ? 'border-[#00E599] bg-[#00E599]/20 text-[#00E599]'
                  : 'border-[#262C3D] bg-[#12151E] text-[#4B5563] hover:text-[#9CA3AF]'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end">
        <button
          onClick={handleSave}
          className={`px-5 py-2.5 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-2 ${
            isSaved
              ? 'bg-[#00E599] text-[#090A0F]'
              : 'bg-[#12151E] border border-[#00E599] text-[#00E599] hover:bg-[#00E599]/10'
          }`}
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4" />
              <span>Notes Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Reflection</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
