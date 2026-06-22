const { getSupabaseAdmin } = require('./supabase');

async function initializeSchema() {
  const supabase = getSupabaseAdmin();
  console.log('--- INITIALIZING SECURE SCHEMA ---');

  const sql = `
    -- 1. Enable RLS Extensions
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- 2. Create Subscribers Table
    CREATE TABLE IF NOT EXISTS public.subscribers (
      id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      full_name TEXT,
      tier TEXT DEFAULT 'observer',
      is_flagged BOOLEAN DEFAULT false,
      referrer_id UUID REFERENCES public.subscribers(id),
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- 3. Create Crew Teams Table
    CREATE TABLE IF NOT EXISTS public.crew_teams (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      owner_id UUID REFERENCES public.subscribers(id) NOT NULL,
      team_name TEXT NOT NULL,
      milestone_progress INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- 4. Create Audit Log (Immutable)
    CREATE TABLE IF NOT EXISTS public.crew_audit_log (
      id BIGSERIAL PRIMARY KEY,
      actor_user_id UUID REFERENCES public.subscribers(id),
      event_type TEXT NOT NULL,
      metadata JSONB DEFAULT '{}'::jsonb,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- 5. Enable RLS on all tables
    ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.crew_teams ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.crew_audit_log ENABLE ROW LEVEL SECURITY;

    -- 6. Create RLS Policies
    
    -- Subscribers: Users can only read/update their own profile
    DO $$ BEGIN
      CREATE POLICY "Users can view own profile" ON public.subscribers
      FOR SELECT USING (auth.uid() = id);
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      CREATE POLICY "Users can update own profile" ON public.subscribers
      FOR UPDATE USING (auth.uid() = id);
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- Crew Teams: Members can only see their own team
    DO $$ BEGIN
      CREATE POLICY "Owners can view own team" ON public.crew_teams
      FOR SELECT USING (auth.uid() = owner_id);
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    -- Audit Logs: Users can only see logs where they are the actor
    DO $$ BEGIN
      CREATE POLICY "Users can view own audit logs" ON public.crew_audit_log
      FOR SELECT USING (auth.uid() = actor_user_id);
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `;

  // Since supabase-js doesn't have a direct 'sql' method for schema creation,
  // we normally use the Supabase SQL Editor. However, for automation, 
  // we'll provide the SQL block for the user to paste or use an RPC if available.
  console.log('SQL generated for secure schema. Please run the following in Supabase SQL Editor:');
  console.log(sql);
}

initializeSchema();
