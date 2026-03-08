import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = (supabaseUrl && supabaseKey && !supabaseUrl.includes('xxxx'))
  ? createClient(supabaseUrl, supabaseKey)
  : null

const safe = async (fn) => {
  if (!supabase) return { data: null, error: null }
  try { return await fn() } catch (e) { return { data: null, error: e } }
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const auth = {
  signUp: (email, password, name) => safe(() =>
    supabase.auth.signUp({ email, password, options: { data: { full_name: name } } })
  ),
  signIn: (email, password) => safe(() =>
    supabase.auth.signInWithPassword({ email, password })
  ),
  signInWithGoogle: () => safe(() =>
    supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin } })
  ),
  signOut: () => safe(() => supabase.auth.signOut()),
  getUser: () => safe(() => supabase.auth.getUser()),
  onAuthChange: (cb) => {
    if (!supabase) return { data: { subscription: { unsubscribe: () => {} } } }
    return supabase.auth.onAuthStateChange(cb)
  },
  resetPassword: (email) => safe(() =>
    supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset` })
  ),
}

// ── Query Logs ────────────────────────────────────────────────────────────────
// SQL to create (run in Supabase SQL editor):
// create table query_logs (
//   id uuid default gen_random_uuid() primary key,
//   created_at timestamptz default now(),
//   query_text text not null,
//   domain text, language text, emotion text, response text,
//   user_id uuid references auth.users(id),
//   session_id text, helpful boolean,
//   state_code text, district text
// );
// alter table query_logs enable row level security;
// create policy "open_insert" on query_logs for insert with check (true);
// create policy "open_select" on query_logs for select using (true);

export const queryLogs = {
  insert: (log) => safe(() => supabase.from('query_logs').insert([log])),
  getRecent: (limit = 20) => safe(() =>
    supabase.from('query_logs').select('*').order('created_at', { ascending: false }).limit(limit)
  ),
  getByUser: (userId) => safe(() =>
    supabase.from('query_logs').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(50)
  ),
  markHelpful: (id, helpful) => safe(() =>
    supabase.from('query_logs').update({ helpful }).eq('id', id)
  ),
  getStatsByDomain: () => safe(() =>
    supabase.from('query_logs').select('domain').not('domain', 'is', null)
  ),
  getStatsByState: () => safe(() =>
    supabase.from('query_logs').select('state_code, domain, created_at').not('state_code', 'is', null)
  ),
  getRecentCount: () => safe(() =>
    supabase.from('query_logs').select('id', { count: 'exact' }).gte('created_at', new Date(Date.now() - 86400000).toISOString())
  ),
}

// ── Citizen Feedback ──────────────────────────────────────────────────────────
export const feedback = {
  submit: (data) => safe(() => supabase.from('citizen_feedback').insert([data])),
}

// ── User Profiles ─────────────────────────────────────────────────────────────
// create table profiles (
//   id uuid references auth.users primary key,
//   full_name text, avatar_url text, preferred_language text default 'en',
//   state_code text, total_queries int default 0, created_at timestamptz default now()
// );
// create policy "profiles_self" on profiles for all using (auth.uid() = id);

export const profiles = {
  get: (userId) => safe(() =>
    supabase.from('profiles').select('*').eq('id', userId).single()
  ),
  upsert: (profile) => safe(() =>
    supabase.from('profiles').upsert([profile], { onConflict: 'id' })
  ),
  incrementQueries: (userId) => safe(() =>
    supabase.rpc('increment_queries', { user_id: userId })
  ),
}
