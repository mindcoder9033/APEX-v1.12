import React from 'react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { TelemetryBar } from '../ui/TelemetryBar'
import { AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react'

export interface ObjectiveFeedbackProps {
  sessionTitle: string
  lapDeltaSeconds: number
  brakeReleaseVariance: number
  apexDeviationCm: number
  passed: boolean
  remediationRequired?: boolean
  recommendedAction: string
}

export const ObjectiveFeedbackCard: React.FC<ObjectiveFeedbackProps> = ({
  sessionTitle,
  lapDeltaSeconds,
  brakeReleaseVariance,
  apexDeviationCm,
  passed,
  remediationRequired = false,
  recommendedAction,
}) => {
  return (
    <Card accentBorder={passed} className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#9CA3AF]">
            Telemetry Analysis
          </span>
          <h4 className="text-lg font-bold text-[#F3F4F6] mt-0.5">{sessionTitle}</h4>
        </div>
        <Badge variant={passed ? 'success' : remediationRequired ? 'warning' : 'danger'}>
          {passed ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              Passed Criteria
            </>
          ) : remediationRequired ? (
            <>
              <RefreshCw className="w-3.5 h-3.5" />
              Remediation Required
            </>
          ) : (
            <>
              <AlertCircle className="w-3.5 h-3.5" />
              Criteria Unmet
            </>
          )}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-2 border-y border-[#262630] font-mono">
        <div className="p-3 bg-[#1A1A20] rounded border border-[#262630]">
          <span className="text-xs text-[#9CA3AF] block font-sans uppercase">Avg Lap Delta</span>
          <span className={`text-lg font-bold ${lapDeltaSeconds <= 0.5 ? 'text-[#E10600]' : 'text-[#FFB800]'}`}>
            +{lapDeltaSeconds.toFixed(3)}s
          </span>
          <span className="text-[11px] text-[#9CA3AF] block mt-0.5">Threshold: ≤ +0.500s</span>
        </div>

        <div className="p-3 bg-[#1A1A20] rounded border border-[#262630]">
          <span className="text-xs text-[#9CA3AF] block font-sans uppercase">Brake Release Var</span>
          <span className={`text-lg font-bold ${brakeReleaseVariance <= 5 ? 'text-[#E10600]' : 'text-[#FFB800]'}`}>
            {brakeReleaseVariance.toFixed(1)}%
          </span>
          <span className="text-[11px] text-[#9CA3AF] block mt-0.5">Threshold: ≤ 5.0%</span>
        </div>

        <div className="p-3 bg-[#1A1A20] rounded border border-[#262630]">
          <span className="text-xs text-[#9CA3AF] block font-sans uppercase">Apex Margin</span>
          <span className={`text-lg font-bold ${apexDeviationCm <= 30 ? 'text-[#E10600]' : 'text-[#FFB800]'}`}>
            {apexDeviationCm} cm
          </span>
          <span className="text-[11px] text-[#9CA3AF] block mt-0.5">Threshold: ≤ 30 cm</span>
        </div>
      </div>

      <div className="space-y-2">
        <TelemetryBar
          label="Brake Linearity Repeatability"
          value={100 - brakeReleaseVariance * 5}
          target={95}
          status={brakeReleaseVariance <= 5 ? 'optimal' : 'critical'}
        />
      </div>

      <div className="p-3 bg-[#1A1A20]/80 rounded border border-[#262630] text-sm">
        <span className="text-xs font-mono uppercase text-[#E10600] font-bold block mb-1">
          Objective Instruction
        </span>
        <p className="text-[#F3F4F6]">{recommendedAction}</p>
      </div>
    </Card>
  )
}
