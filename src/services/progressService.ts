import { supabase } from '../lib/supabase'
import { ProgressMap } from '../lib/curriculumEngine'

const LOCAL_STORAGE_KEY = 'apex_driver_progress'

export const progressService = {
  /**
   * Reads progress state from local storage.
   */
  getLocalProgress(): ProgressMap {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.warn('Failed to parse local progress from localStorage:', e)
    }
    // Default seed progress for demo if empty: step 1-1-1 and 1-1-2 completed
    return {
      'step-1-1-1': true,
      'step-1-1-2': true
    }
  },

  /**
   * Saves progress map to local storage.
   */
  saveLocalProgress(progressMap: ProgressMap): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progressMap))
    } catch (e) {
      console.warn('Failed to save progress to localStorage:', e)
    }
  },

  /**
   * Fetches driver progress records from Supabase driver_progress table for logged-in user profile.
   */
  async fetchDriverProgress(profileId?: string): Promise<ProgressMap> {
    const localMap = this.getLocalProgress()

    if (!profileId) {
      return localMap
    }

    try {
      const { data, error } = await supabase
        .from('driver_progress')
        .select('step_id, passed')
        .eq('profile_id', profileId)

      if (error) {
        console.warn('Supabase fetch driver progress error:', error.message)
        return localMap
      }

      if (data && data.length > 0) {
        const remoteMap: ProgressMap = { ...localMap }
        data.forEach((row) => {
          if (row.step_id && row.passed) {
            remoteMap[row.step_id] = true
          }
        })
        this.saveLocalProgress(remoteMap)
        return remoteMap
      }
    } catch (e) {
      console.warn('Error connecting to Supabase for driver progress:', e)
    }

    return localMap
  },

  /**
   * Records or toggles step completion state in local storage & Supabase.
   */
  async setStepProgress(
    stepId: string,
    moduleId: string,
    sessionId: string,
    passed: boolean,
    profileId?: string
  ): Promise<ProgressMap> {
    const progress = this.getLocalProgress()
    progress[stepId] = passed
    this.saveLocalProgress(progress)

    if (profileId) {
      try {
        if (passed) {
          await supabase.from('driver_progress').insert({
            profile_id: profileId,
            module_id: moduleId,
            session_id: sessionId,
            step_id: stepId,
            passed: true
          })
        } else {
          await supabase
            .from('driver_progress')
            .delete()
            .eq('profile_id', profileId)
            .eq('step_id', stepId)
        }
      } catch (e) {
        console.warn('Failed to sync step completion to Supabase:', e)
      }
    }

    return progress
  },

  /**
   * Resets driver progress back to baseline.
   */
  resetProgress(): ProgressMap {
    const emptyMap: ProgressMap = {}
    this.saveLocalProgress(emptyMap)
    return emptyMap
  }
}
