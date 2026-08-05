import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { TodaysTrainingCard } from '../components/dashboard/TodaysTrainingCard'
import { InstructorFeedbackCard } from '../components/dashboard/InstructorFeedbackCard'
import { AcademyProgressCard } from '../components/dashboard/AcademyProgressCard'
import { AnalyticsGrid } from '../components/dashboard/AnalyticsGrid'
import { RecentActivityFeed } from '../components/dashboard/RecentActivityFeed'
import { ProgressBreakdown } from '../components/dashboard/ProgressBreakdown'
import { useCurriculum } from '../context/CurriculumContext'
import { useAuth } from '../context/AuthContext'
import {
  dashboardService,
  DashboardMetrics,
  InstructorFeedbackSummary,
  ActivityLogItem
} from '../services/dashboardService'
import { LayoutDashboard, Layers, Activity, Compass, UserCheck, ShieldCheck } from 'lucide-react'

export const Dashboard: React.FC = () => {
  const { prescribedTarget, activeLevelName, progressMap } = useCurriculum()
  const { profile } = useAuth()

  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'PROGRESS' | 'ANALYTICS'>('OVERVIEW')
  const [metrics, setMetrics] = useState<DashboardMetrics>(() =>
    dashboardService.getDashboardMetrics(activeLevelName)
  )
  const [feedback, setFeedback] = useState<InstructorFeedbackSummary>(() =>
    dashboardService.getInstructorFeedback()
  )
  const [activities, setActivities] = useState<ActivityLogItem[]>(() =>
    dashboardService.getRecentActivities()
  )

  // Refresh metrics when progressMap changes
  useEffect(() => {
    setMetrics(dashboardService.getDashboardMetrics(activeLevelName))
    setFeedback(dashboardService.getInstructorFeedback())
    setActivities(dashboardService.getRecentActivities())
  }, [progressMap, activeLevelName])

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#121216] border border-[#262630] rounded-xl p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full bg-[#E10600]/5 rounded-r-xl pointer-events-none blur-2xl" />
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2">
            <Badge variant="success">Active Academy License</Badge>
            <span className="text-xs font-mono text-[#9CA3AF]">
              Driver: <strong className="text-[#F3F4F6]">{profile?.driverName || 'Cadet Driver'}</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F3F4F6] font-sans tracking-tight">
            Academy Command <span className="text-[#E10600]">Dashboard</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#9CA3AF]">
            Daily training directives, objective telemetry evaluations, and curriculum progression status.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Link to="/curriculum">
            <Button variant="telemetry" size="sm" className="gap-1.5 text-xs">
              <Compass className="w-3.5 h-3.5" /> Full Curriculum
            </Button>
          </Link>
          <Link to="/profile">
            <Button variant="telemetry" size="sm" className="gap-1.5 text-xs">
              <UserCheck className="w-3.5 h-3.5" /> Driver Passport
            </Button>
          </Link>
        </div>
      </div>

      {/* Analytics KPI Bar */}
      <AnalyticsGrid metrics={metrics} />

      {/* Tab Navigation */}
      <div className="flex items-center border-b border-[#262630] gap-2 font-mono text-xs">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`flex items-center gap-2 py-2.5 px-4 font-semibold border-b-2 transition-colors ${
            activeTab === 'OVERVIEW'
              ? 'border-[#E10600] text-[#E10600]'
              : 'border-transparent text-[#9CA3AF] hover:text-[#F3F4F6]'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Daily Training Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('PROGRESS')}
          className={`flex items-center gap-2 py-2.5 px-4 font-semibold border-b-2 transition-colors ${
            activeTab === 'PROGRESS'
              ? 'border-[#E10600] text-[#E10600]'
              : 'border-transparent text-[#9CA3AF] hover:text-[#F3F4F6]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Detailed Progress Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('ANALYTICS')}
          className={`flex items-center gap-2 py-2.5 px-4 font-semibold border-b-2 transition-colors ${
            activeTab === 'ANALYTICS'
              ? 'border-[#E10600] text-[#E10600]'
              : 'border-transparent text-[#9CA3AF] hover:text-[#F3F4F6]'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Telemetry & Activity Log</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <TodaysTrainingCard target={prescribedTarget} />
            </div>
            <div>
              <InstructorFeedbackCard feedback={feedback} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AcademyProgressCard />
            <RecentActivityFeed activities={activities.slice(0, 5)} />
          </div>
        </div>
      )}

      {activeTab === 'PROGRESS' && <ProgressBreakdown />}

      {activeTab === 'ANALYTICS' && (
        <div className="space-y-6">
          <RecentActivityFeed activities={activities} />
          
          <Card className="bg-[#121216] border-[#262630] p-6 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#E10600]" />
              <h3 className="font-bold text-[#F3F4F6] text-base">
                Telemetry Analytics Engine & Consistency Standard
              </h3>
            </div>
            <p className="text-xs text-[#9CA3AF] font-learning leading-relaxed">
              APEX evaluates driver telemetry across strict objective boundaries: lap time target variance (&lt;1.5s delta), consistency variance, and clean lap ratio (&gt;70%). All evaluations are rendered without emotional bias to enforce true racing discipline.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
              <div className="bg-[#1A1A20] p-3 rounded border border-[#262630]">
                <span className="text-[#9CA3AF] block">Target Consistency:</span>
                <span className="text-[#E10600] font-bold text-sm">&lt; 1.00s Delta</span>
              </div>
              <div className="bg-[#1A1A20] p-3 rounded border border-[#262630]">
                <span className="text-[#9CA3AF] block">Clean Lap Requirement:</span>
                <span className="text-[#3B82F6] font-bold text-sm">&ge; 70% Clean</span>
              </div>
              <div className="bg-[#1A1A20] p-3 rounded border border-[#262630]">
                <span className="text-[#9CA3AF] block">Remediation Trigger:</span>
                <span className="text-[#FFB800] font-bold text-sm">&gt; 2 Failed Attempts</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
