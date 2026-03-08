-- ═══════════════════════════════════════════════════════════════════
--  JNANA · ज्ञान · National Intelligence Platform
--  Supabase SQL Migration — v1.0.0
--  Run this entire file in: Supabase Dashboard → SQL Editor → Run
-- ═══════════════════════════════════════════════════════════════════

-- ── 1. USER PROFILES ──────────────────────────────────────────────
create table if not exists profiles (
  id                uuid references auth.users on delete cascade primary key,
  full_name         text,
  avatar_url        text,
  preferred_language text not null default 'en',
  preferred_domain  text not null default 'agriculture',
  state_code        text,
  total_queries     integer not null default 0,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "profiles: users manage own" on profiles
  for all using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, full_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email,'@',1)),
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ── 2. QUERY LOGS ─────────────────────────────────────────────────
create table if not exists query_logs (
  id          uuid not null default gen_random_uuid() primary key,
  created_at  timestamptz not null default now(),
  query_text  text not null,
  domain      text,
  language    text,
  emotion     text,
  response    text,
  user_id     uuid references auth.users on delete set null,
  session_id  text,
  helpful     boolean,
  state_code  text,
  district    text,
  duration_ms integer   -- pipeline execution time
);

alter table query_logs enable row level security;

-- Anyone can insert (anonymous + logged-in citizens)
create policy "query_logs: open insert"
  on query_logs for insert with check (true);

-- Users can read their own; public analytics on non-response fields
create policy "query_logs: own select"
  on query_logs for select
  using (user_id = auth.uid() or user_id is null);

-- Index for fast analytics queries
create index if not exists query_logs_created_at_idx on query_logs (created_at desc);
create index if not exists query_logs_domain_idx     on query_logs (domain);
create index if not exists query_logs_state_idx      on query_logs (state_code);
create index if not exists query_logs_user_idx       on query_logs (user_id);

-- ── 3. CITIZEN FEEDBACK ───────────────────────────────────────────
create table if not exists citizen_feedback (
  id           uuid not null default gen_random_uuid() primary key,
  created_at   timestamptz not null default now(),
  query_id     uuid references query_logs on delete cascade,
  feedback     text not null,        -- 'helpful' | 'not_helpful' | free text
  correction   text,                 -- "this didn't work because..."
  district     text,
  state        text,
  validated    boolean not null default false,
  validator_id uuid references auth.users on delete set null
);

alter table citizen_feedback enable row level security;
create policy "feedback: open insert" on citizen_feedback for insert with check (true);
create policy "feedback: open select" on citizen_feedback for select using (true);

-- ── 4. KNOWLEDGE CORRECTIONS (Citizen-Loop RAG) ───────────────────
create table if not exists knowledge_corrections (
  id              uuid not null default gen_random_uuid() primary key,
  created_at      timestamptz not null default now(),
  original_query  text not null,
  original_answer text,
  correction      text not null,
  domain          text,
  state_code      text,
  upvotes         integer not null default 0,
  validated       boolean not null default false,
  validated_by    uuid references auth.users on delete set null,
  validated_at    timestamptz
);

alter table knowledge_corrections enable row level security;
create policy "corrections: open insert" on knowledge_corrections for insert with check (true);
create policy "corrections: open select" on knowledge_corrections for select using (true);

-- ── 5. HELPER FUNCTIONS ───────────────────────────────────────────
-- Increment user query count
create or replace function increment_queries(user_id uuid)
returns void language plpgsql security definer as $$
begin
  update profiles set
    total_queries = total_queries + 1,
    updated_at    = now()
  where id = user_id;
end;
$$;

-- Get domain stats (for dashboard)
create or replace function get_domain_stats()
returns table(domain text, count bigint) language sql as $$
  select domain, count(*) as count
  from query_logs
  where domain is not null
    and created_at > now() - interval '24 hours'
  group by domain
  order by count desc;
$$;

-- Get state stats (for map)
create or replace function get_state_stats()
returns table(state_code text, count bigint) language sql as $$
  select state_code, count(*) as count
  from query_logs
  where state_code is not null
    and created_at > now() - interval '24 hours'
  group by state_code
  order by count desc;
$$;

-- ── 6. REALTIME ───────────────────────────────────────────────────
-- Enable realtime for live dashboard updates
alter publication supabase_realtime add table query_logs;
alter publication supabase_realtime add table citizen_feedback;

-- ── 7. SEED DATA (demo queries for dashboard) ─────────────────────
insert into query_logs (query_text, domain, language, emotion, state_code, helpful) values
  ('My crops failed this year, how do I apply for PM-KISAN relief?',        'agriculture', 'Hindi',   'Distressed', 'UP', true),
  ('What are my rights if my employer denies maternity leave?',             'legal',       'English', 'Angry',      'MH', true),
  ('How to get a BPL ration card in Tamil Nadu?',                           'governance',  'Tamil',   'Curious',    'TN', true),
  ('Nearest government hospital with free dialysis in Pune?',              'healthcare',  'Marathi', 'Distressed', 'MH', true),
  ('Steps to apply for Pradhan Mantri Awas Yojana housing scheme',         'governance',  'Hindi',   'Curious',    'RJ', null),
  ('How to file an RTI to know the status of my land mutation?',           'legal',       'English', 'Angry',      'DL', true),
  ('My child was denied school admission — RTE Act remedy?',               'education',   'Telugu',  'Angry',      'TS', true),
  ('Mudra loan eligibility for a small vegetable street vendor',           'finance',     'Kannada', 'Optimistic', 'KA', null)
on conflict do nothing;

-- ═══════════════════════════════════════════════════════════════════
--  ✓ Migration complete! JNANA database is ready.
--  Tables: profiles, query_logs, citizen_feedback, knowledge_corrections
--  Functions: handle_new_user, increment_queries, get_domain_stats, get_state_stats
--  Realtime: enabled on query_logs + citizen_feedback
-- ═══════════════════════════════════════════════════════════════════
