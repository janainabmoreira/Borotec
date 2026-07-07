import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured =
  supabaseUrl &&
  supabaseUrl !== 'https://SEU_PROJETO.supabase.co' &&
  supabaseAnonKey &&
  supabaseAnonKey !== 'sua_anon_key_aqui';
