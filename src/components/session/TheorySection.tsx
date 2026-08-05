import React from 'react'
import { BookOpen, Lightbulb, Image as ImageIcon } from 'lucide-react'
import { Step } from '../../types/curriculum'
import { SessionDetailExtra } from '../../data/sessionDetails'

interface TheorySectionProps {
  step: Step
  extraDetails: SessionDetailExtra
}

export const TheorySection: React.FC<TheorySectionProps> = ({ step, extraDetails }) => {
  const theoryContent = step.theoryText || extraDetails.theoryText
  const coachNotes = step.coachNotes || extraDetails.coachNotes
  const visualCaption = step.visualCaption || extraDetails.visualCaption
  const visualUrl = step.visualContentUrl || extraDetails.visualContentUrl

  return (
    <div className="space-y-6">
      {/* Main Theory Text Card */}
      <div className="bg-[#12151E] border border-[#262C3D] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#262C3D]">
          <BookOpen className="w-5 h-5 text-[#3B82F6]" />
          <h3 className="text-base font-bold text-[#F3F4F6]">Instructional Theory & Principles</h3>
          <span className="ml-auto text-xs font-mono text-[#9CA3AF]">APEX Telemetry Physics</span>
        </div>

        <div className="prose prose-invert max-w-none text-sm text-[#F3F4F6] space-y-4 leading-relaxed">
          {theoryContent.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Visual Content Card */}
      {visualUrl && (
        <div className="bg-[#12151E] border border-[#262C3D] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <ImageIcon className="w-4 h-4 text-[#00E599]" />
            <h4 className="text-sm font-bold text-[#F3F4F6]">Telemetry Visual Diagram</h4>
          </div>

          <div className="relative rounded-lg overflow-hidden border border-[#262C3D] bg-[#090A0F]">
            <img
              src={visualUrl}
              alt={visualCaption}
              className="w-full h-64 object-cover object-center opacity-90 hover:opacity-100 transition-opacity"
            />
            <div className="absolute bottom-0 inset-x-0 bg-[#090A0F]/90 backdrop-blur px-4 py-2 border-t border-[#262C3D]">
              <p className="text-xs font-mono text-[#00E599]">{visualCaption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Coach Notes Card */}
      {coachNotes && coachNotes.length > 0 && (
        <div className="bg-[#12151E] border border-[#FFB800]/40 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB800]/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-[#FFB800]" />
            <h3 className="text-base font-bold text-[#F3F4F6]">Instructor & Coach Notes</h3>
            <span className="ml-auto text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30 font-bold">
              Pro Technique
            </span>
          </div>

          <ul className="space-y-3">
            {coachNotes.map((note, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-[#090A0F] border border-[#262C3D] text-xs text-[#F3F4F6] leading-relaxed"
              >
                <span className="font-mono text-[#FFB800] font-bold shrink-0">0{idx + 1}.</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
