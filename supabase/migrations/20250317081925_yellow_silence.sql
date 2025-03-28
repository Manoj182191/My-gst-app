/*
  # Initial Schema Setup for GST Accounting System

  1. New Tables
    - users
      - Core user information and authentication
    - companies
      - Company/business details
    - customers
      - Customer information
    - suppliers
      - Supplier/vendor information
    - products
      - Product catalog
    - inventory
      - Stock management
    - invoices
      - Sales invoices
    - invoice_items
      - Line items for invoices
    - purchase_orders
      - Purchase orders
    - purchase_order_items
      - Line items for purchase orders
    - transactions
      - Financial transactions
    - tax_rates
      - GST rates and configurations

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Restrict access based on company association

  3. Relationships
    - Companies have many users
    - Invoices belong to companies and customers
    - Purchase orders belong to companies and suppliers
    - Products belong to companies
    - Transactions linked to invoices/purchase orders
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  role text NOT NULL DEFAULT 'staff',
  company_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  gstin text UNIQUE,
  pan text,
  address text,
  city text,
  state text,
  pincode text,
  country text DEFAULT 'India',
  phone text,
  email text,
  website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id),
  name text NOT NULL,
  gstin text,
  email text,
  phone text,
  address text,
  city text,
  state text,
  pincode text,
  country text DEFAULT 'India',
  credit_limit decimal(12,2) DEFAULT 0,
  outstanding_balance decimal(12,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id),
  name text NOT NULL,
  gstin text,
  email text,
  phone text,
  address text,
  city text,
  state text,
  pincode text,
  country text DEFAULT 'India',
  credit_limit decimal(12,2) DEFAULT 0,
  outstanding_balance decimal(12,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id),
  name text NOT NULL,
  description text,
  sku text,
  hsn_code text,
  unit text NOT NULL,
  sale_price decimal(12,2) NOT NULL,
  purchase_price decimal(12,2) NOT NULL,
  tax_rate decimal(5,2) NOT NULL,
  min_stock_level integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Inventory table
CREATE TABLE IF NOT EXISTS inventory (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id),
  company_id uuid NOT NULL REFERENCES companies(id),
  quantity integer NOT NULL DEFAULT 0,
  warehouse text DEFAULT 'main',
  last_counted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id),
  customer_id uuid NOT NULL REFERENCES customers(id),
  invoice_number text NOT NULL,
  invoice_date date NOT NULL,
  due_date date NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  subtotal decimal(12,2) NOT NULL DEFAULT 0,
  tax_amount decimal(12,2) NOT NULL DEFAULT 0,
  total_amount decimal(12,2) NOT NULL DEFAULT 0,
  notes text,
  terms text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, invoice_number)
);

ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Invoice items table
CREATE TABLE IF NOT EXISTS invoice_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid NOT NULL REFERENCES invoices(id),
  product_id uuid NOT NULL REFERENCES products(id),
  quantity integer NOT NULL,
  unit_price decimal(12,2) NOT NULL,
  tax_rate decimal(5,2) NOT NULL,
  tax_amount decimal(12,2) NOT NULL,
  total_amount decimal(12,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;

-- Purchase orders table
CREATE TABLE IF NOT EXISTS purchase_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id),
  supplier_id uuid NOT NULL REFERENCES suppliers(id),
  po_number text NOT NULL,
  po_date date NOT NULL,
  expected_delivery_date date,
  status text NOT NULL DEFAULT 'draft',
  subtotal decimal(12,2) NOT NULL DEFAULT 0,
  tax_amount decimal(12,2) NOT NULL DEFAULT 0,
  total_amount decimal(12,2) NOT NULL DEFAULT 0,
  notes text,
  terms text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(company_id, po_number)
);

ALTER TABLE purchase_orders ENABLE ROW LEVEL SECURITY;

-- Purchase order items table
CREATE TABLE IF NOT EXISTS purchase_order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_order_id uuid NOT NULL REFERENCES purchase_orders(id),
  product_id uuid NOT NULL REFERENCES products(id),
  quantity integer NOT NULL,
  unit_price decimal(12,2) NOT NULL,
  tax_rate decimal(5,2) NOT NULL,
  tax_amount decimal(12,2) NOT NULL,
  total_amount decimal(12,2) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE purchase_order_items ENABLE ROW LEVEL SECURITY;

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES companies(id),
  date date NOT NULL,
  type text NOT NULL,
  amount decimal(12,2) NOT NULL,
  reference_type text NOT NULL,
  reference_id uuid NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Tax rates table
CREATE TABLE IF NOT EXISTS tax_rates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rate decimal(5,2) NOT NULL,
  type text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE tax_rates ENABLE ROW LEVEL SECURITY;

-- Add RLS policies

-- Users policies
CREATE POLICY "Users can view own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR company_id IN (
    SELECT id FROM companies WHERE id = users.company_id
  ));

-- Companies policies
CREATE POLICY "Users can view own company"
  ON companies
  FOR SELECT
  TO authenticated
  USING (id IN (
    SELECT company_id FROM users WHERE id = auth.uid()
  ));

-- Customers policies
CREATE POLICY "Users can view company customers"
  ON customers
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT company_id FROM users WHERE id = auth.uid()
  ));

-- Suppliers policies
CREATE POLICY "Users can view company suppliers"
  ON suppliers
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT company_id FROM users WHERE id = auth.uid()
  ));

-- Products policies
CREATE POLICY "Users can view company products"
  ON products
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT company_id FROM users WHERE id = auth.uid()
  ));

-- Inventory policies
CREATE POLICY "Users can view company inventory"
  ON inventory
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT company_id FROM users WHERE id = auth.uid()
  ));

-- Invoices policies
CREATE POLICY "Users can view company invoices"
  ON invoices
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT company_id FROM users WHERE id = auth.uid()
  ));

-- Invoice items policies
CREATE POLICY "Users can view company invoice items"
  ON invoice_items
  FOR SELECT
  TO authenticated
  USING (invoice_id IN (
    SELECT id FROM invoices WHERE company_id IN (
      SELECT company_id FROM users WHERE id = auth.uid()
    )
  ));

-- Purchase orders policies
CREATE POLICY "Users can view company purchase orders"
  ON purchase_orders
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT company_id FROM users WHERE id = auth.uid()
  ));

-- Purchase order items policies
CREATE POLICY "Users can view company purchase order items"
  ON purchase_order_items
  FOR SELECT
  TO authenticated
  USING (purchase_order_id IN (
    SELECT id FROM purchase_orders WHERE company_id IN (
      SELECT company_id FROM users WHERE id = auth.uid()
    )
  ));

-- Transactions policies
CREATE POLICY "Users can view company transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (company_id IN (
    SELECT company_id FROM users WHERE id = auth.uid()
  ));

-- Tax rates policies
CREATE POLICY "Everyone can view tax rates"
  ON tax_rates
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_company_id ON users(company_id);
CREATE INDEX IF NOT EXISTS idx_customers_company_id ON customers(company_id);
CREATE INDEX IF NOT EXISTS idx_suppliers_company_id ON suppliers(company_id);
CREATE INDEX IF NOT EXISTS idx_products_company_id ON products(company_id);
CREATE INDEX IF NOT EXISTS idx_inventory_company_id ON inventory(company_id);
CREATE INDEX IF NOT EXISTS idx_invoices_company_id ON invoices(company_id);
CREATE INDEX IF NOT EXISTS idx_purchase_orders_company_id ON purchase_orders(company_id);
CREATE INDEX IF NOT EXISTS idx_transactions_company_id ON transactions(company_id);