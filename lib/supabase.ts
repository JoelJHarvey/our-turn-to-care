/**
 * Supabase Client for OurTurnToCare
 *
 * This creates a browser-side Supabase client using the public (anon) key.
 * The database has Row Level Security (RLS) enabled with public read access,
 * so this is safe to use in the browser for reading facility and cost data.
 *
 * SETUP: Make sure your .env.local has these two variables:
 *   NEXT_PUBLIC_SUPABASE_URL=https://yrkloxsglvejwowmtpmb.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Single shared client instance for the whole app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
