import { SessionStepProgress } from '../types/curriculum'
import { supabase } from '../lib/supabase'

const SESSION_PLAYER_KEY_PREFIX = 'apex_session_state_'

export const sessionPlayerService = {
  /**
   * Retrieves active step index and reflections for a session from local storage.
   */
  getSessionState(sessionId: string): SessionStepProgress | null {
    try {
      const stored = localStorage.getItem(`${SESSION_PLAYER_KEY_PREFIX}${sessionId}`)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.warn(`Failed to parse session state for ${sessionId} from localStorage:`, e)
    }
    return null
  },

  /**
   * Saves active session state and reflections to local storage and attempts Supabase sync if profileId exists.
   */
  async saveSessionState(
    sessionId: string,
    currentStepIndex: number,
    reflections: Record<string, string>,
    confidenceRating?: number,
    profileId?: string
  ): Promise<SessionStepProgress> {
    const sessionState: SessionStepProgress = {
      sessionId,
      currentStepIndex,
      reflections,
      confidenceRating,
      lastSavedAt: new Date().toISOString()
    }

    try {
      localStorage.setItem(`${SESSION_PLAYER_KEY_PREFIX}${sessionId}`, JSON.stringify(sessionState))
    } catch (e) {
      console.warn(`Failed to save session state for ${sessionId} to localStorage:`, e)
    }

    if (profileId) {
      try {
        await supabase.from('session_reflections').upsert({
          profile_id: profileId,
          session_id: sessionId,
          step_index: currentStepIndex,
          reflections,
          confidence_rating: confidenceRating,
          updated_at: new Date().toISOString()
        })
      } catch (e) {
        console.warn(`Failed to sync session state for ${sessionId} to Supabase:`, e)
      }
    }

    return sessionState
  },

  /**
   * Clears saved session state for a session.
   */
  clearSessionState(sessionId: string): void {
    try {
      localStorage.removeItem(`${SESSION_PLAYER_KEY_PREFIX}${sessionId}`)
    } catch (e) {
      console.warn(`Failed to remove session state for ${sessionId} from localStorage:`, e)
    }
  }
}
