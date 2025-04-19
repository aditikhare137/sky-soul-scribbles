
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  "https://igndnzvlhtziaoqumsnt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnbmRuenZsaHR6aWFvcXVtc250Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MTM1ODAsImV4cCI6MjA2MDQ4OTU4MH0.61RtwLNhvsDEt6SYyl4XHOnuLthNB9h1apilQQPQOlM"
);

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
  comments_count: number;
  profiles?: {
    username: string | null;
    avatar_url: string | null;
  };
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
