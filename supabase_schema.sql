-- =============================================
-- Expense & Income Tracker — Supabase Schema
-- Run in Supabase Dashboard > SQL Editor
-- =============================================

-- 1. expenses table (already created)
CREATE TABLE IF NOT EXISTS expenses (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  date        DATE        NOT NULL,
  category    TEXT        NOT NULL,
  amount      NUMERIC     NOT NULL,
  currency    TEXT        NOT NULL DEFAULT 'USD',
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. incomes table (NEW)
CREATE TABLE IF NOT EXISTS incomes (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  date        DATE        NOT NULL,
  source      TEXT        NOT NULL,
  amount      NUMERIC     NOT NULL,
  currency    TEXT        NOT NULL DEFAULT 'USD',
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- RLS for expenses
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read"   ON expenses;
DROP POLICY IF EXISTS "Allow public insert" ON expenses;
DROP POLICY IF EXISTS "Allow public delete" ON expenses;
CREATE POLICY "Allow public read"   ON expenses FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON expenses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete" ON expenses FOR DELETE USING (true);

-- RLS for incomes
ALTER TABLE incomes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read"   ON incomes FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON incomes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete" ON incomes FOR DELETE USING (true);
