-- APEX Sim Racing Academy - Phase 1 Foundation DDL
-- Creates driver profiles, levels, modules, sessions, and driver progress tracking.

CREATE TYPE driver_level_enum AS ENUM ('BEGINNER', 'INTERMEDIATE', 'EXPERT');
CREATE TYPE step_type_enum AS ENUM ('LESSON', 'DRILL', 'ASSESSMENT');

-- Driver Profiles Table
CREATE TABLE IF NOT EXISTS public.driver_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    driver_name VARCHAR(100) NOT NULL,
    gamertag VARCHAR(100),
    wheel_base VARCHAR(100) DEFAULT 'Moza R3',
    pedal_set VARCHAR(100) DEFAULT 'Moza SR-P Lite',
    platform VARCHAR(100) DEFAULT 'Forza Motorsport (2023)',
    current_level driver_level_enum DEFAULT 'BEGINNER',
    total_practice_hours NUMERIC(6,2) DEFAULT 0.0,
    beginner_certified BOOLEAN DEFAULT FALSE,
    certified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Curriculum Levels Table
CREATE TABLE IF NOT EXISTS public.curriculum_levels (
    id VARCHAR(50) PRIMARY KEY,
    level_name driver_level_enum UNIQUE NOT NULL,
    title VARCHAR(150) NOT NULL,
    objective TEXT NOT NULL,
    graduate_profile TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Curriculum Modules Table
CREATE TABLE IF NOT EXISTS public.curriculum_modules (
    id VARCHAR(50) PRIMARY KEY,
    level_id VARCHAR(50) REFERENCES public.curriculum_levels(id) ON DELETE CASCADE,
    module_number INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    focus_area VARCHAR(150) NOT NULL,
    summary TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Driver Progress Tracking Table
CREATE TABLE IF NOT EXISTS public.driver_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.driver_profiles(id) ON DELETE CASCADE,
    module_id VARCHAR(50) REFERENCES public.curriculum_modules(id) ON DELETE CASCADE,
    session_id VARCHAR(50) NOT NULL,
    step_id VARCHAR(50) NOT NULL,
    passed BOOLEAN DEFAULT FALSE,
    telemetry_data JSONB DEFAULT '{}'::jsonb,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.driver_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driver_progress ENABLE ROW LEVEL SECURITY;

-- Driver Profile RLS Policies
CREATE POLICY "Drivers can view own profile"
    ON public.driver_profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Drivers can update own profile"
    ON public.driver_profiles FOR UPDATE
    USING (auth.uid() = user_id);

-- Driver Progress RLS Policies
CREATE POLICY "Drivers can view own progress"
    ON public.driver_progress FOR SELECT
    USING (profile_id IN (SELECT id FROM public.driver_profiles WHERE user_id = auth.uid()));

CREATE POLICY "Drivers can insert own progress"
    ON public.driver_progress FOR INSERT
    WITH CHECK (profile_id IN (SELECT id FROM public.driver_profiles WHERE user_id = auth.uid()));
