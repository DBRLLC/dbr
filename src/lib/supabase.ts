import { createClient } from '@supabase/supabase-js';

// Centralized configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Standard client for client-side usage (uses Anon Key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side security tasks (RLS management, etc.)
// ONLY use this in server-side code (API routes, Server Actions)
export const getSupabaseAdmin = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is missing');
  }
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

// Common verification logic for RLS policies
export const verifyRls = async (tableName: string) => {
  const admin = getSupabaseAdmin();
  const { data, error } = await admin.rpc('check_rls_status', { table_name: tableName });
  return { data, error };
};
