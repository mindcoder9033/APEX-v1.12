-- APEX Sim Racing Academy - Phase 2 Authentication & User Settings DDL
-- Creates user_settings table, updates driver_profiles with preference attributes, and sets up trigger for auto-profile creation.

-- User Settings Table
CREATE TABLE IF NOT EXISTS public.user_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    theme VARCHAR(50) DEFAULT 'dark',
    high_contrast BOOLEAN DEFAULT FALSE,
    reduced_motion BOOLEAN DEFAULT FALSE,
    font_scale VARCHAR(20) DEFAULT 'normal',
    email_alerts BOOLEAN DEFAULT TRUE,
    session_reminders BOOLEAN DEFAULT TRUE,
    telemetry_reports BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for user_settings
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own settings"
    ON public.user_settings FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
    ON public.user_settings FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
    ON public.user_settings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Trigger Function to Automatically Initialize Driver Profile and Settings on Signup
CREATE OR REPLACE FUNCTION public.handle_new_user_signup()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.driver_profiles (user_id, driver_name, gamertag)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'driver_name', 'Driver #' || SUBSTRING(NEW.id::text, 1, 4)),
        NEW.raw_user_meta_data->>'gamertag'
    );

    INSERT INTO public.user_settings (user_id)
    VALUES (NEW.id);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create Trigger on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_signup();
