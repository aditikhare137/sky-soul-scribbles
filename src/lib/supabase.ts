
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if the URL is missing and provide a more helpful error
if (!supabaseUrl) {
  console.error('Supabase URL is missing! Make sure to set the VITE_SUPABASE_URL environment variable.');
}

if (!supabaseAnonKey) {
  console.error('Supabase Anon Key is missing! Make sure to set the VITE_SUPABASE_ANON_KEY environment variable.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database
export type Profile = {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type Post = {
  id: string;
  created_at: string;
  title: string;
  astro_fact: string;
  poem_text: string;
  author_id: string;
  likes_count: number;
  reposts_count: number;
};

export type Like = {
  id: string;
  created_at: string;
  user_id: string;
  post_id: string;
};

export type Repost = {
  id: string;
  created_at: string;
  user_id: string;
  original_post_id: string;
  comment: string | null;
};
