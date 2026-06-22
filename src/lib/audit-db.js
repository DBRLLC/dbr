const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function auditDatabase() {
  console.log('--- AUDITING SUPABASE DATABASE ---');
  
  // Try to list tables using the info schema via a raw SQL-like approach if possible
  // Or just try to see if a common table exists
  const commonTables = ['subscribers', 'team_members', 'crew_teams', 'company_settings'];
  
  for (const table of commonTables) {
    const { error } = await supabase.from(table).select('*').limit(1);
    if (error) {
      if (error.code === '42P01') {
        console.log(`Table [${table}] does NOT exist.`);
      } else {
        console.log(`Table [${table}] exists but error: ${error.message}`);
      }
    } else {
      console.log(`Table [${table}] EXISTS and is accessible.`);
    }
  }
}

auditDatabase();
