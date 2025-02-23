// /lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_API_KEY) throw new Error("Supabase URL or API key is missing or invalid.");

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_API_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;