
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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
