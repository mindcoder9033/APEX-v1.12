-- Phase 5 Assessment & Remediation Engine Migration Schema

-- 1. Session Assessments Table
CREATE TABLE IF NOT EXISTS public.session_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    session_id TEXT NOT NULL,
    best_lap TEXT NOT NULL,
    avg_lap TEXT NOT NULL,
    clean_laps INT NOT NULL DEFAULT 0,
    total_laps INT NOT NULL DEFAULT 10,
    score INT NOT NULL DEFAULT 0,
    grade TEXT NOT NULL DEFAULT 'NEEDS_WORK',
    remediation_required BOOLEAN NOT NULL DEFAULT false,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (profile_id, session_id)
);

-- Enable RLS
ALTER TABLE public.session_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own session assessments"
ON public.session_assessments FOR SELECT
USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert/update own session assessments"
ON public.session_assessments FOR ALL
USING (auth.uid() = profile_id);

-- 2. Module Exams Table
CREATE TABLE IF NOT EXISTS public.module_exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    module_id TEXT NOT NULL,
    overall_score INT NOT NULL DEFAULT 0,
    grade TEXT NOT NULL DEFAULT 'NEEDS_WORK',
    passed BOOLEAN NOT NULL DEFAULT false,
    evaluated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (profile_id, module_id)
);

-- Enable RLS
ALTER TABLE public.module_exams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can select own module exams"
ON public.module_exams FOR SELECT
USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert/update own module exams"
ON public.module_exams FOR ALL
USING (auth.uid() = profile_id);
