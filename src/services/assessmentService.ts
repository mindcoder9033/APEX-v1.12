import { supabase } from '../lib/supabase'
import {
  SessionAssessmentRecord,
  ModuleExamResult,
  LapTimeEntry,
  AssessmentResult,
  RemediationPlan
} from '../types/assessment'
import { evaluatePerformance } from '../lib/assessmentEngine'
import { generateRemediationPlan } from '../lib/remediationEngine'

const LOCAL_STORAGE_ASSESSMENTS_KEY = 'apex_session_assessments'
const LOCAL_STORAGE_MODULE_EXAMS_KEY = 'apex_module_exams'

export const assessmentService = {
  /**
   * Retrieves all session assessment records from local storage.
   */
  getAllLocalAssessments(): Record<string, SessionAssessmentRecord> {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_ASSESSMENTS_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.warn('Failed to parse session assessments from localStorage:', e)
    }
    return {}
  },

  /**
   * Gets single assessment record for a session.
   */
  getAssessmentRecord(sessionId: string): SessionAssessmentRecord | null {
    const all = this.getAllLocalAssessments()
    return all[sessionId] || null
  },

  /**
   * Evaluates performance entry and saves session assessment record locally & to Supabase.
   */
  async saveAssessmentEntry(
    sessionId: string,
    sessionTitle: string,
    entry: LapTimeEntry,
    profileId?: string
  ): Promise<SessionAssessmentRecord> {
    const result: AssessmentResult = evaluatePerformance(sessionId, entry)

    let remediationPlan: RemediationPlan | undefined = undefined
    if (result.remediationRequired) {
      remediationPlan = generateRemediationPlan(result, sessionTitle)
    }

    const record: SessionAssessmentRecord = {
      sessionId,
      entry,
      result,
      remediationPlan,
      savedAt: new Date().toISOString()
    }

    // Save Local Storage
    const all = this.getAllLocalAssessments()
    all[sessionId] = record
    try {
      localStorage.setItem(LOCAL_STORAGE_ASSESSMENTS_KEY, JSON.stringify(all))
    } catch (e) {
      console.warn('Failed to save assessment to localStorage:', e)
    }

    // Remote sync to Supabase if logged in
    if (profileId) {
      try {
        await supabase.from('session_assessments').upsert({
          profile_id: profileId,
          session_id: sessionId,
          best_lap: entry.bestLap,
          avg_lap: entry.avgLap,
          clean_laps: entry.cleanLaps,
          total_laps: entry.totalLaps,
          score: result.score,
          grade: result.grade,
          remediation_required: result.remediationRequired,
          notes: entry.notes || '',
          updated_at: new Date().toISOString()
        })
      } catch (e) {
        console.warn('Failed to sync assessment record to Supabase:', e)
      }
    }

    return record
  },

  /**
   * Retrieves module exam results from local storage.
   */
  getAllLocalModuleExams(): Record<string, ModuleExamResult> {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_MODULE_EXAMS_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.warn('Failed to parse module exams from localStorage:', e)
    }
    return {}
  },

  /**
   * Gets exam result for a specific module.
   */
  getModuleExam(moduleId: string): ModuleExamResult | null {
    const exams = this.getAllLocalModuleExams()
    return exams[moduleId] || null
  },

  /**
   * Saves module exam result.
   */
  async saveModuleExam(
    result: ModuleExamResult,
    profileId?: string
  ): Promise<ModuleExamResult> {
    const exams = this.getAllLocalModuleExams()
    exams[result.moduleId] = result

    try {
      localStorage.setItem(LOCAL_STORAGE_MODULE_EXAMS_KEY, JSON.stringify(exams))
    } catch (e) {
      console.warn('Failed to save module exam to localStorage:', e)
    }

    if (profileId) {
      try {
        await supabase.from('module_exams').upsert({
          profile_id: profileId,
          module_id: result.moduleId,
          overall_score: result.overallScore,
          grade: result.grade,
          passed: result.passed,
          evaluated_at: result.completedAt
        })
      } catch (e) {
        console.warn('Failed to sync module exam to Supabase:', e)
      }
    }

    return result
  }
}
