```sql
CREATE TABLE IF NOT EXISTS app_afdb_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  task_text text NOT NULL,
  is_complete boolean NOT NULL DEFAULT FALSE,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_app_afdb_tasks_user_id ON app_afdb_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_app_afdb_tasks_is_complete ON app_afdb_tasks(is_complete);

ALTER TABLE app_afdb_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS select_app_afdb_tasks ON app_afdb_tasks;
CREATE POLICY select_app_afdb_tasks ON app_afdb_tasks FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS insert_app_afdb_tasks ON app_afdb_tasks;
CREATE POLICY insert_app_afdb_tasks ON app_afdb_tasks FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS update_app_afdb_tasks ON app_afdb_tasks;
CREATE POLICY update_app_afdb_tasks ON app_afdb_tasks FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS delete_app_afdb_tasks ON app_afdb_tasks;
CREATE POLICY delete_app_afdb_tasks ON app_afdb_tasks FOR DELETE USING (auth.uid() = user_id);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'app_afdb_tasks'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.app_afdb_tasks;
  END IF;
END $$;
```