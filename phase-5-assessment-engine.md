# Task Plan: Phase 5 — Assessment Engine

## Goal Description
Implement the **Assessment Engine** and **Adaptive Remediation Engine** for APEX Sim Racing Academy. This phase empowers learners to enter performance data (Best Lap, Average Lap, Clean Laps, Notes), receive automated mastery evaluations against telemetry criteria, view detailed session results & breakdown metrics, receive adaptive targeted remediation drills when mastery is not met, and take Module Examinations to prove integrated competency before progressing.

## Roadmap & PRD Alignment
- **Roadmap Section:** Phase 5 — Assessment Engine (Week 10–11)
- **PRD Sections:** 38. Assessment Engine, 39. Adaptive Remediation Engine, 40. Progress & Mastery Tracking

---

## Deliverables & Architecture

### 1. Data Schemas & Types (`src/types/assessment.ts`)
- `LapTimeEntry`: `bestLap` (string/seconds), `avgLap` (string/seconds), `cleanLaps` (number), `totalLaps` (number), `notes` (string).
- `AssessmentCriteria`: `targetBestLap` (seconds), `maxConsistencyDelta` (seconds), `minCleanLapRatio` (number: 0-1).
- `MasteryGrade`: `'MASTERED' | 'SATISFACTORY' | 'NEEDS_WORK' | 'UNSATISFACTORY'`.
- `AssessmentResult`: `sessionId`, `score` (0-100), `grade`, `metrics` (bestLapDelta, consistencyDelta, cleanLapRatio), `feedback` (string[]), `remediationRequired` (boolean), `createdAt`.
- `RemediationPlan`: `remediationId`, `sessionId`, `weaknessCategory` ('PACING' | 'CONSISTENCY' | 'CONTROL'), `focusArea`, `prescribedDrills` (string[]), `coachAdvice`, `assistAdjustments`.
- `ModuleExamResult`: `moduleId`, `examDate`, `overallScore`, `passed`, `masteryBreakdown` (Record<string, MasteryGrade>).

### 2. Core Assessment & Remediation Logic (`src/lib/assessmentEngine.ts` & `src/lib/remediationEngine.ts`)
- `assessmentEngine.ts`:
  - `parseLapTimeToSeconds(timeStr: string): number` helper for `1:32.450` parsing.
  - `formatSecondsToLapTime(seconds: number): string` helper for `92.45` formatting.
  - `evaluatePerformance(entry: LapTimeEntry, criteria: AssessmentCriteria): AssessmentResult` multi-metric grading function.
  - Pre-populated default assessment benchmark criteria per session/step.
- `remediationEngine.ts`:
  - `generateRemediationPlan(result: AssessmentResult, sessionTitle: string): RemediationPlan` diagnostic decision tree that converts weaknesses into targeted practice drills and coach recommendations.

### 3. Assessment Service & Local/Remote Persistence (`src/services/assessmentService.ts`)
- Save/load assessment entries and results to `localStorage` (`apex_assessment_history`).
- Sync with Supabase table `session_assessments` and `module_exams` if logged in.
- Integration helper to update overall driver mastery score and session completion status.

### 4. Assessment UI Component Suite (`src/components/assessment/`)
- `PerformanceEntryModal.tsx`: Performance data entry dialog with quick demo preset telemetry autofill ("Load Demo Telemetry", manual inputs for Best Lap, Avg Lap, Clean Laps, Notes).
- `MasteryEvaluationCard.tsx`: Rich metrics display showing Grade badge, Score meter, Target vs Actual lap time comparison, consistency gauge, and clean lap ratio.
- `RemediationCard.tsx`: Tailored adaptive remediation alert box presenting diagnosed weakness, recommended drill prescription, and retry prompt.
- `ModuleExamModal.tsx`: Interactive End-of-Module Examination dialog synthesizing all session scores in a module, presenting integrated competency check, and awarding Module Mastery.

### 5. Session Player & Curriculum Integration (`src/pages/SessionPlayer.tsx`, `src/pages/CurriculumOverview.tsx`)
- In `SessionPlayer.tsx`:
  - Add "Performance Entry & Assessment" trigger button / tab for assessment steps.
  - Display `MasteryEvaluationCard` and `RemediationCard` upon submitting performance data or completing assessment steps.
- In `CurriculumOverview.tsx`:
  - Show mastery badges (`MASTERED`, `SATISFACTORY`, `NEEDS WORK`) next to completed sessions and modules.
  - Add "Take Module Exam" trigger for completed modules.

### 6. Database Migration (`supabase/migrations/20260805000002_phase5_assessment.sql`)
- SQL migration schema creating `session_assessments` and `module_exams` tables with RLS security policies.

---

## Verification Plan
1. **Automated Testing & Build**: Run `npm run build` to verify clean TypeScript compilation and zero build errors.
2. **Performance Entry Verification**: Test submitting lap times (e.g. `1:31.500` vs target `1:32.000`) and verifying correct lap time parsing and metrics calculation.
3. **Mastery Grading Verification**: Verify `MASTERED` outcome for high performance, `SATISFACTORY` for passing, and `NEEDS_WORK` for slow lap times or low clean lap counts.
4. **Adaptive Remediation Trigger**: Verify that submitting sub-par performance automatically generates a targeted remediation plan with specific drill instructions.
5. **Module Examination Flow**: Verify completing module exam evaluates integrated scores and updates module completion status.
