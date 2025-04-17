
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { supabase, Post } from '@/lib/supabase';
import PostCard from './post/PostCard';
import { useAuth } from '@/contexts/AuthContext';

const SkyArchives: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(2);
  const { user } = useAuth();
  
  const fetchPosts = async () => {
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
      .limit(10);
      
    if (error) throw error;
    return data;
  };
  
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['archivePosts'],
    queryFn: fetchPosts,
  });

  // Get user likes for the posts
  const { data: userLikes } = useQuery({
    queryKey: ['userLikes', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('likes')
        .select('post_id')
        .eq('user_id', user.id);
        
      if (error) throw error;
      return data.map(like => like.post_id);
    },
    enabled: !!user,
  });
  
  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 2, posts?.length || 0));
  };

  // Placeholder data for empty state
  const placeholderData = [
    {
      id: "placeholder-1",
      created_at: new Date().toISOString(),
      title: "The Moon's Whisper",
      astro_fact: "The Moon is slowly moving away from Earth at a rate of about 3.8 centimeters per year.",
      poem_text: "Silver guardian in night's embrace,\nSlowly drifting through starry space.\nA silent reminder of time's vast flow,\nWith each year, another inch you go.",
      author_id: "system",
      likes_count: 0,
      reposts_count: 0,
      profiles: {
        username: "Astro-Poetry",
        avatar_url: null
      }
    },
    {
      id: "placeholder-2",
      created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      title: "Stellar Nursery",
      astro_fact: "The Orion Nebula is one of the brightest nebulae in the sky and is visible to the naked eye. It's a stellar nursery where new stars are being born.",
      poem_text: "Cosmic cradle of stellar birth,\nWhere infant suns ignite with mirth.\nGaseous clouds in beauty curled,\nDreaming of planets, moons, and worlds.",
      author_id: "system",
      likes_count: 0,
      reposts_count: 0,
      profiles: {
        username: "Astro-Poetry",
        avatar_url: null
      }
    }
  ];

  const displayPosts = posts?.length ? posts : placeholderData;
  const isUserLiked = (postId: string) => userLikes?.includes(postId) || false;

  return (
    <section id="archives" className="py-16 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-playfair text-center mb-3 text-white">
            <span className="text-gradient">Sky Archives</span>
          </h2>
          <p className="text-center text-celestial-softPurple/80 mb-8 max-w-2xl mx-auto">
            Explore previous celestial moments and their poetic echoes
          </p>
          
          <div className="flex justify-center mb-12">
            <Button variant="outline" className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span>Filter by Date</span>
            </Button>
          </div>
        </motion.div>
        
        {isLoading ? (
          <div className="space-y-8">
            {[1, 2].map(i => (
              <div key={i} className="glass rounded-lg overflow-hidden animate-pulse">
                <div className="p-6">
                  <div className="h-4 bg-white/10 rounded w-1/4 mb-4"></div>
                  <div className="h-6 bg-white/10 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
                  <div className="h-4 bg-white/10 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400">Error loading archive posts. Please try again later.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {displayPosts.slice(0, visibleCount).map((post: any) => (
              <PostCard
                key={post.id}
                post={post}
                isUserLiked={isUserLiked(post.id)}
              />
            ))}
          </div>
        )}
        
        {visibleCount < displayPosts.length && (
          <div className="flex justify-center mt-10">
            <Button
              onClick={loadMore}
              className="bg-celestial-purple hover:bg-celestial-secondaryPurple"
            >
              Load More Entries
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkyArchives;
