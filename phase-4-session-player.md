# Task: Phase 4 — Session Player

## Objective
Deliver the complete instructional experience for APEX Sim Racing Academy. Render every learning session dynamically with Step engine navigation, interactive theory & visual content, coach notes, Moza R3 / Forza training prescription cards, step-by-step telemetry validation, learner reflections, autosave, and seamless session resume functionality.

## Roadmap Alignment
- Roadmap Section: Phase 4 — Session Player (Week 7–9)
- PRD Section: 35. Session Player & 36. Training Prescription

## Key Deliverables Checklist
- [x] 1. **Data Schemas & Type Definitions** (`src/types/curriculum.ts`)
  - Extended Step schema with `theoryText`, `coachNotes`, `visualContentUrl`, `visualCaption`, `learningObjectives`, `prescription`, `reflectionPrompt`.
  - `TrainingPrescription` interface (track, car, assists, wheel FFB setup, weather, fuel).
  - `SessionProgressState` interface for step indices, step reflections, and autosave timestamps.
- [x] 2. **Rich Session Content Database** (`src/data/sessionDetails.ts`)
  - Enriched instructional content, theory texts, coach notes, and hardware prescriptions for curriculum sessions.
- [x] 3. **Session Player Engine & Persistence** (`src/lib/sessionPlayerEngine.ts`, `src/services/sessionPlayerService.ts`)
  - Autosave step state & reflection notes locally & remotely.
  - Resume session helper (resolving last incomplete step).
  - Step lock/unlock validation rules.
- [x] 4. **Session Player UI Component Suite** (`src/components/session/`)
  - `SessionHeader.tsx`: Session header with title, module context, step counter, progress bar, and exit button.
  - `StepStepper.tsx`: Interactive telemetry-styled step index navigation stepper.
  - `SessionOverviewSection.tsx`: Summary, objectives, duration, car & track badge.
  - `TheorySection.tsx`: Rich theory content, visual content presentation, and Coach Notes card.
  - `PrescriptionCard.tsx`: Dedicated hardware setup card (Moza R3 wheel config, Forza Motorsport session settings).
  - `StepExecutionCard.tsx`: Interactive drill/lesson task execution card with telemetry targets & pass validation.
  - `ReflectionCard.tsx`: Learner self-reflection notes logger and confidence rating.
  - `SessionSummaryModal.tsx`: Session completion overlay with performance recap and next session prescription.
- [x] 5. **Session Player Page & Navigation Integration** (`src/pages/SessionPlayer.tsx`, `src/App.tsx`)
  - Dedicated `/session/:sessionId` route in `src/App.tsx`.
  - Link "Start Session" / "Resume Session" buttons in `SessionCard.tsx` and `CurriculumOverview.tsx` to launch the Session Player.
- [x] 6. **Build Verification & Quality Check** (`npm run build`)
