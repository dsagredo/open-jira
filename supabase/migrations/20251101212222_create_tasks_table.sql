/*
  # Create tasks table

  1. New Tables
    - `tasks`
      - `id` (bigint, primary key, auto-increment)
      - `description` (text, required)
      - `status` (text, required, default 'pending')
      - `created_at` (timestamptz, auto-generated)
  
  2. Security
    - Enable RLS on `tasks` table
    - Add policy for public access (for demo purposes)
  
  3. Realtime
    - Enable realtime for the tasks table
*/

CREATE TABLE IF NOT EXISTS tasks (
  id bigserial PRIMARY KEY,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
  ON tasks
  FOR SELECT
  USING (true);

CREATE POLICY "Enable insert access for all users"
  ON tasks
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable update access for all users"
  ON tasks
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable delete access for all users"
  ON tasks
  FOR DELETE
  USING (true);

ALTER PUBLICATION supabase_realtime ADD TABLE tasks;