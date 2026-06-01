-- ============================================
-- FITNIX COMPLETE SUPABASE SCHEMA
-- Run this entire file in Supabase SQL Editor
-- ============================================

-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- ============================================
-- USERS & AUTH
-- ============================================

CREATE TABLE IF NOT EXISTS users_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  birth_date DATE,
  gender TEXT CHECK (gender IN ('male', 'female')),
  height_cm NUMERIC(5,1),
  weight_kg NUMERIC(5,1),
  goal TEXT CHECK (goal IN ('gain', 'loss', 'maintain')),
  location TEXT CHECK (location IN ('gym', 'home')),
  workout_days INTEGER DEFAULT 4,
  food_protein TEXT,
  food_carbs TEXT,
  food_fats TEXT,
  onboarding_completed BOOLEAN DEFAULT false,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  gumroad_id TEXT UNIQUE,
  status TEXT CHECK (status IN ('active', 'cancelled', 'expired', 'pending')) DEFAULT 'pending',
  plan_type TEXT CHECK (plan_type IN ('monthly', 'quarterly')) NOT NULL,
  start_date TIMESTAMPTZ DEFAULT now(),
  end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Pending users (approval queue)
CREATE TABLE IF NOT EXISTS pending_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  goal TEXT,
  location TEXT,
  workout_days INTEGER,
  plan_type TEXT,
  requested_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ
);

-- ============================================
-- WORKOUTS
-- ============================================

CREATE TABLE IF NOT EXISTS user_workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  week_start DATE NOT NULL,
  workout_data JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS workout_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  workout_id UUID REFERENCES user_workouts(id) ON DELETE CASCADE,
  day TEXT NOT NULL,
  exercise_name TEXT NOT NULL,
  muscle_group TEXT,
  sets_completed INTEGER DEFAULT 0,
  reps_completed TEXT,
  weight_kg NUMERIC(5,1),
  completed BOOLEAN DEFAULT false,
  logged_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- MEAL PLANS
-- ============================================

CREATE TABLE IF NOT EXISTS meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  goal TEXT NOT NULL,
  daily_calories INTEGER,
  protein_g NUMERIC(6,1),
  carbs_g NUMERIC(6,1),
  fats_g NUMERIC(6,1),
  water_ml INTEGER,
  plan_data JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- BODY ANALYSIS
-- ============================================

CREATE TABLE IF NOT EXISTS body_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  front_photo_url TEXT,
  side_photo_url TEXT,
  back_photo_url TEXT,
  analysis_data JSONB,
  body_fat_estimate NUMERIC(4,1),
  muscle_mass_estimate NUMERIC(4,1),
  posture_notes TEXT,
  symmetry_score INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- EXERCISE MEDIA
-- ============================================

CREATE TABLE IF NOT EXISTS exercise_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  muscle_group TEXT NOT NULL,
  exercise_name TEXT,
  media_type TEXT CHECK (media_type IN ('image', 'video')),
  storage_url TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- AI KNOWLEDGE
-- ============================================

CREATE TABLE IF NOT EXISTS ai_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  file_type TEXT,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id UUID REFERENCES ai_documents(id) ON DELETE CASCADE,
  chunk_index INT NOT NULL,
  content TEXT NOT NULL,
  embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES ai_conversations(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('user', 'assistant', 'system')) NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_system_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_pending_users_email ON pending_users(email);
CREATE INDEX IF NOT EXISTS idx_pending_users_status ON pending_users(status);
CREATE INDEX IF NOT EXISTS idx_workout_logs_user_id ON workout_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_workout_logs_workout_id ON workout_logs(workout_id);
CREATE INDEX IF NOT EXISTS idx_meal_plans_user_id ON meal_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_body_analyses_user_id ON body_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_exercise_media_muscle ON exercise_media(muscle_group);
CREATE INDEX IF NOT EXISTS idx_ai_chunks_document_id ON ai_chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_ai_messages_conversation_id ON ai_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user_id ON ai_conversations(user_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Users profiles
ALTER TABLE users_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own profile" ON users_profiles;
CREATE POLICY "Users can view own profile" ON users_profiles
  FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can insert own profile" ON users_profiles;
CREATE POLICY "Users can insert own profile" ON users_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update own profile" ON users_profiles;
CREATE POLICY "Users can update own profile" ON users_profiles
  FOR UPDATE USING (auth.uid() = id);

-- Subscriptions
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own subscriptions" ON subscriptions;
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- Pending users
ALTER TABLE pending_users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert pending" ON pending_users
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage pending" ON pending_users
  USING (auth.uid() IN (SELECT id FROM users_profiles));

-- Workouts
ALTER TABLE user_workouts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own workouts" ON user_workouts
  USING (auth.uid() = user_id);

ALTER TABLE workout_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own logs" ON workout_logs
  USING (auth.uid() = user_id);

-- Meal plans
ALTER TABLE meal_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own meal plans" ON meal_plans
  USING (auth.uid() = user_id);

-- Body analyses
ALTER TABLE body_analyses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own analyses" ON body_analyses
  USING (auth.uid() = user_id);

-- Exercise media (public read)
ALTER TABLE exercise_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read exercise media" ON exercise_media
  FOR SELECT USING (true);
CREATE POLICY "Admins manage exercise media" ON exercise_media
  USING (auth.uid() IN (SELECT id FROM users_profiles));

-- AI tables
ALTER TABLE ai_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read documents" ON ai_documents FOR SELECT USING (true);

ALTER TABLE ai_chunks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read chunks" ON ai_chunks FOR SELECT USING (true);

ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own conversations" ON ai_conversations
  USING (auth.uid() = user_id);

ALTER TABLE ai_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own messages" ON ai_messages
  USING (auth.uid() = (SELECT user_id FROM ai_conversations WHERE id = conversation_id));

ALTER TABLE ai_system_prompts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read prompts" ON ai_system_prompts
  FOR SELECT USING (true);

-- ============================================
-- STORAGE BUCKETS
-- ============================================

INSERT INTO storage.buckets (id, name, public) VALUES
  ('body_photos', 'body_photos', true),
  ('exercise_media', 'exercise_media', true),
  ('avatar', 'avatar', true),
  ('knowledge_files', 'knowledge_files', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload own body photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'body_photos' AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can view own body photos" ON storage.objects
  FOR SELECT USING (bucket_id = 'body_photos');

CREATE POLICY "Public read exercise media" ON storage.objects
  FOR SELECT USING (bucket_id = 'exercise_media');

CREATE POLICY "Admins upload exercise media" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'exercise_media');

CREATE POLICY "Public read knowledge files" ON storage.objects
  FOR SELECT USING (bucket_id = 'knowledge_files');

-- ============================================
-- TRIGGERS
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_profiles_updated_at BEFORE UPDATE ON users_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER ai_documents_updated_at BEFORE UPDATE ON ai_documents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER ai_system_prompts_updated_at BEFORE UPDATE ON ai_system_prompts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER exercise_media_updated_at BEFORE UPDATE ON exercise_media
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- DEFAULT DATA
-- ============================================

INSERT INTO ai_system_prompts (key, content) VALUES
  ('master', 'أنت مدرب Fitnix AI - المدرب الشخصي الذكي الأول باللغة العربية. رد فقط على أسئلة اللياقة والتغذية.')
ON CONFLICT (key) DO NOTHING;
