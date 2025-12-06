/*
  # Add completed column to tasks table

  1. Changes
    - Add `completed` column to `tasks` table
      - Type: boolean
      - Default: false
      - Not null
  
  2. Purpose
    - Track completion status of tasks
    - Provides a clear boolean indicator for completed tasks
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'completed'
  ) THEN
    ALTER TABLE tasks ADD COLUMN completed boolean NOT NULL DEFAULT false;
  END IF;
END $$;
