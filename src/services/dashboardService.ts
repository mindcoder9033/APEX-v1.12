import { progressService } from './progressService'
import { assessmentService } from './assessmentService'
import { curriculumByLevel } from '../data/allCurriculum'
import { isStepCompleted, isSessionCompleted, ProgressMap } from '../lib/curriculumEngine'
import { SessionAssessmentRecord, ModuleExamResult } from '../types/assessment'
import { DriverLevel } from '../types/curriculum'

export interface DashboardMetrics {
  totalPracticeMinutes: number
  completionRatePercent: number
  masteryRatePercent: number
  cleanLapRatioPercent: number
  avgConsistencyDeltaSeconds: number
  totalSessionsCompleted: number
  totalEvaluatedSessions: number
}

export interface ActivityLogItem {
  id: string
  type: 'SESSION_ASSESSMENT' | 'MODULE_EXAM'
  title: string
  subtitle: string
  timestamp: string
  grade?: string
  score?: number
  passed?: boolean
  remediationRequired?: boolean
}

export interface InstructorFeedbackSummary {
  latestAssessment: SessionAssessmentRecord | null
  activeRemediationCount: number
  latestExam: ModuleExamResult | null
}

export const dashboardService = {
  /**
   * Computes comprehensive dashboard analytics metrics for a given level.
   */
  getDashboardMetrics(levelName: DriverLevel = 'BEGINNER'): DashboardMetrics {
    const progressMap: ProgressMap = progressService.getLocalProgress()
    const allAssessments = assessmentService.getAllLocalAssessments()
    const level = curriculumByLevel[levelName] || curriculumByLevel.BEGINNER

    let totalSteps = 0
    let completedSteps = 0
    let totalSessions = 0
    let completedSessions = 0

    if (level && level.modules) {
      level.modules.forEach((mod) => {
        totalSessions += mod.sessions.length
        mod.sessions.forEach((sess) => {
          if (isSessionCompleted(sess, progressMap)) {
            completedSessions++
          }
          totalSteps += sess.steps.length
          sess.steps.forEach((step) => {
            if (isStepCompleted(step.id, progressMap)) {
              completedSteps++
            }
          })
        })
      })
    }

    const completionRatePercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0

    // Assessment evaluations calculations
    const assessmentRecords = Object.values(allAssessments)
    const totalEvaluatedSessions = assessmentRecords.length

    let masteredOrSatisfactoryCount = 0
    let totalCleanLaps = 0
    let totalLaps = 0
    let totalConsistencyDeltaSum = 0
    let consistencyDeltaCount = 0

    assessmentRecords.forEach((record) => {
      if (record.result) {
        if (record.result.grade === 'MASTERED' || record.result.grade === 'SATISFACTORY') {
          masteredOrSatisfactoryCount++
        }
        if (typeof record.result.metrics?.consistencyDelta === 'number') {
          totalConsistencyDeltaSum += record.result.metrics.consistencyDelta
          consistencyDeltaCount++
        }
      }
      if (record.entry) {
        totalCleanLaps += record.entry.cleanLaps || 0
        totalLaps += record.entry.totalLaps || 0
      }
    })

    const masteryRatePercent =
      totalEvaluatedSessions > 0
        ? Math.round((masteredOrSatisfactoryCount / totalEvaluatedSessions) * 100)
        : completionRatePercent

    const cleanLapRatioPercent =
      totalLaps > 0 ? Math.round((totalCleanLaps / totalLaps) * 100) : 85

    const avgConsistencyDeltaSeconds =
      consistencyDeltaCount > 0
        ? parseFloat((totalConsistencyDeltaSum / consistencyDeltaCount).toFixed(2))
        : 0.85

    const totalPracticeMinutes = Math.max(
      completedSteps * 15 + totalLaps * 2,
      completedSteps > 0 ? completedSteps * 12 : 30
    )

    return {
      totalPracticeMinutes,
      completionRatePercent,
      masteryRatePercent,
      cleanLapRatioPercent,
      avgConsistencyDeltaSeconds,
      totalSessionsCompleted: completedSessions,
      totalEvaluatedSessions
    }
  },

  /**
   * Returns instructor feedback summary based on latest evaluations & remediation flags.
   */
  getInstructorFeedback(): InstructorFeedbackSummary {
    const assessments = Object.values(assessmentService.getAllLocalAssessments())
    const exams = Object.values(assessmentService.getAllLocalModuleExams())

    assessments.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime())
    exams.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())

    const latestAssessment = assessments[0] || null
    const latestExam = exams[0] || null

    const activeRemediationCount = assessments.filter((a) => a.result?.remediationRequired).length

    return {
      latestAssessment,
      activeRemediationCount,
      latestExam
    }
  },

  /**
   * Compiles recent activity feed timeline from assessments and module exams.
   */
  getRecentActivities(): ActivityLogItem[] {
    const assessments = Object.values(assessmentService.getAllLocalAssessments())
    const exams = Object.values(assessmentService.getAllLocalModuleExams())

    const items: ActivityLogItem[] = []

    assessments.forEach((rec) => {
      items.push({
        id: `assess-${rec.sessionId}-${rec.savedAt}`,
        type: 'SESSION_ASSESSMENT',
        title: `Session Evaluation: ${rec.sessionId}`,
        subtitle: `Best: ${rec.entry.bestLap} | Clean Laps: ${rec.entry.cleanLaps}/${rec.entry.totalLaps}`,
        timestamp: rec.savedAt,
        grade: rec.result.grade,
        score: rec.result.score,
        remediationRequired: rec.result.remediationRequired
      })
    })

    exams.forEach((ex) => {
      items.push({
        id: `exam-${ex.moduleId}-${ex.completedAt}`,
        type: 'MODULE_EXAM',
        title: `Module Exam: ${ex.moduleTitle}`,
        subtitle: `Overall Grade: ${ex.grade} (${ex.overallScore}%)`,
        timestamp: ex.completedAt,
        grade: ex.grade,
        score: ex.overallScore,
        passed: ex.passed
      })
    })

    items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    return items
  }
}
