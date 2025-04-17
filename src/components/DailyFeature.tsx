
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import PostCard from './post/PostCard';

const DailyFeature: React.FC = () => {
  const { user } = useAuth();

  // Fetch the most recent post
  const { data: latestPost, isLoading } = useQuery({
    queryKey: ['dailyPost'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:author_id (
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
        
      if (error) {
        // If no posts exist, return the default post
        return {
          id: "default",
          date: new Date(),
          title: "Daybreak's Diamond",
          created_at: new Date().toISOString(),
          astro_fact: "Today Venus appears at its greatest brightness in the morning sky, shining at magnitude -4.5. The 'morning star' is 39° away from the Sun and can be seen in the eastern sky before sunrise.",
          poem_text: "In eastern skies before the dawn,\nA diamond burns through purple haze.\nVenus, bright, defies the sun—\nCelestial jewel of morning's gaze.\n\nWhile stars retreat to day's advance,\nShe stands alone, refusing night.\nLike hope that glows through circumstance,\nA brilliant point of lasting light.",
          author_id: "system",
          likes_count: 0,
          reposts_count: 0,
          profiles: {
            username: "Eleanor Starfield",
            avatar_url: null
          }
        };
      }
      
      return data;
    },
  });

  // Check if user has liked today's post
  const { data: isLiked } = useQuery({
    queryKey: ['dailyPostLike', latestPost?.id, user?.id],
    queryFn: async () => {
      if (!user || !latestPost) return false;
      
      const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', latestPost.id)
        .eq('user_id', user.id)
        .single();
        
      return !error && !!data;
    },
    enabled: !!user && !!latestPost && latestPost.id !== 'default',
  });

  return (
    <section id="daily" className="py-16 px-6 relative">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-playfair text-center mb-3 text-white">
          <span className="text-gradient">Today's Celestial Verse</span>
        </h2>
        <p className="text-center text-celestial-softPurple/80 mb-12 max-w-2xl mx-auto">
          Where astronomical wonders inspire poetic reflection
        </p>
        
        <div className="mt-10">
          {isLoading ? (
            <div className="glass rounded-lg overflow-hidden animate-pulse md:flex">
              <div className="p-6 md:p-8 md:w-1/2 border-b md:border-b-0 md:border-r border-white/10">
                <div className="h-4 bg-white/10 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-white/10 rounded w-1/2 mb-6"></div>
                <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
              </div>
              <div className="p-6 md:p-8 md:w-1/2">
                <div className="h-6 bg-white/10 rounded w-2/3 mb-6"></div>
                <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-4/5 mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
              </div>
            </div>
          ) : latestPost ? (
            <PostCard 
              post={latestPost}
              isUserLiked={!!isLiked}
              featured={true}
            />
          ) : null}
        </div>
      </motion.div>
    </section>
  );
};

export default DailyFeature;
