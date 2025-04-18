
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase, Post } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import StarBackground from '../components/StarBackground';
import PostCard from '../components/post/PostCard';

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(`
            *,
            profiles (
              username,
              avatar_url
            )
          `)
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        setPost(data);
        
        // Check if the current user has liked the post
        if (user) {
          const { data: likeData, error: likeError } = await supabase
            .from('likes')
            .select('*')
            .eq('post_id', id)
            .eq('user_id', user.id)
            .single();
            
          if (!likeError && likeData) {
            setIsLiked(true);
          }
        }
      } catch (error: any) {
        toast({
          title: "Error fetching post",
          description: error.message || "Could not load the post",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id, user, toast]);

  useEffect(() => {
    if (post?.title) {
      document.title = `${post.title} | Astro-Poetry Journal`;
    }
    
    return () => {
      document.title = "Astro-Poetry Journal | Today's Sky, Today's Soul";
    };
  }, [post]);

  return (
    <div className="relative min-h-screen overflow-x-hidden pt-20 pb-16">
      <StarBackground />
      
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20">
        <nav className="flex justify-between items-center max-w-7xl mx-auto p-4">
          <a href="/" className="font-playfair font-bold text-xl text-white">Astro-Poetry</a>
          <div className="space-x-6">
            <a href="/#daily" className="text-celestial-softPurple hover:text-white transition-colors">Today's Poem</a>
            <a href="/#archives" className="text-celestial-softPurple hover:text-white transition-colors">Archives</a>
            <a href="/#submit" className="text-celestial-softPurple hover:text-white transition-colors">Submit</a>
          </div>
        </nav>
      </header>
      
      <main className="max-w-4xl mx-auto px-6">
        <Link to="/">
          <Button variant="ghost" className="mb-6 -ml-2 text-celestial-softPurple hover:text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        
        {loading ? (
          <div className="glass p-8 rounded-lg animate-pulse">
            <div className="h-6 bg-white/10 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-full mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-3/4"></div>
          </div>
        ) : post ? (
          <PostCard post={post} isUserLiked={isLiked} featured={true} isDetail={true} />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-playfair text-white mb-4">Post Not Found</h2>
            <p className="text-celestial-softPurple/80">This poem may have been removed or doesn't exist.</p>
          </div>
        )}
      </main>
      
      <footer className="py-10 px-6 border-t border-white/10 mt-16">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-celestial-softPurple/70 text-sm">
            © {new Date().getFullYear()} Astro-Poetry Journal | Today's Sky, Today's Soul
          </p>
          <p className="mt-2 text-celestial-softPurple/50 text-xs">
            Connecting the cosmos with creativity, one poem at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PostDetail;
