/*
  # Add Chat History and File Upload Tables

  1. New Tables
    - chat_history
      - Stores all chat messages and interactions
      - Links to users and companies
    - file_uploads
      - Stores uploaded file metadata and links
      - Tracks financial documents and receipts
    - financial_analysis
      - Stores calculated financial metrics
      - Monthly and yearly profit/loss data

  2. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users
*/

-- Chat history table
CREATE TABLE IF NOT EXISTS chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  company_id uuid REFERENCES companies(id),
  message text NOT NULL,
  response text,
  message_type text NOT NULL DEFAULT 'text',
  context jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- File uploads table
CREATE TABLE IF NOT EXISTS file_uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  company_id uuid REFERENCES companies(id),
  file_name text NOT NULL,
  file_type text NOT NULL,
  file_url text NOT NULL,
  file_size integer NOT NULL,
  metadata jsonb,
  analysis_results jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;

-- Financial analysis table
CREATE TABLE IF NOT EXISTS financial_analysis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id),
  analysis_date date NOT NULL,
  period_type text NOT NULL, -- 'monthly' or 'yearly'
  total_income decimal(12,2) NOT NULL DEFAULT 0,
  total_expenses decimal(12,2) NOT NULL DEFAULT 0,
  net_profit decimal(12,2) NOT NULL DEFAULT 0,
  analysis_data jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE financial_analysis ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Users can view own chat history"
  ON chat_history
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    company_id IN (
      SELECT company_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can view own file uploads"
  ON file_uploads
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    company_id IN (
      SELECT company_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can view company financial analysis"
  ON financial_analysis
  FOR SELECT
  TO authenticated
  USING (
    company_id IN (
      SELECT company_id FROM users WHERE id = auth.uid()
    )
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_chat_history_user_id ON chat_history(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_history_company_id ON chat_history(company_id);
CREATE INDEX IF NOT EXISTS idx_file_uploads_user_id ON file_uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_file_uploads_company_id ON file_uploads(company_id);
CREATE INDEX IF NOT EXISTS idx_financial_analysis_company_id ON financial_analysis(company_id);