
import React, { useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Heart, Share2, Repeat2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase, Post as PostType, Like } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import UserAvatar from '../auth/UserAvatar';
import RepostModal from './RepostModal';

interface PostCardProps {
  post: PostType & { 
    profiles?: {
      username: string;
      avatar_url: string;
    }
  };
  isUserLiked?: boolean;
  featured?: boolean;
  isDetail?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  isUserLiked = false,
  featured = false,
  isDetail = false
}) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [liked, setLiked] = useState(isUserLiked);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [repostModalOpen, setRepostModalOpen] = useState(false);

  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like posts",
      });
      return;
    }

    try {
      if (liked) {
        // Unlike post
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('user_id', user.id)
          .eq('post_id', post.id);

        if (error) throw error;
        
        setLiked(false);
        setLikesCount(prev => Math.max(prev - 1, 0));
        
        toast({
          title: "Post unliked",
          description: "You've removed your like from this post",
        });
      } else {
        // Like post
        const { error } = await supabase
          .from('likes')
          .insert([
            { user_id: user.id, post_id: post.id }
          ]);

        if (error) throw error;
        
        setLiked(true);
        setLikesCount(prev => prev + 1);
        
        toast({
          title: "Post liked!",
          description: "You've liked this post",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/post/${post.id}`;
    
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.astro_fact,
        url: url,
      })
      .then(() => {
        toast({
          title: "Shared successfully!",
        });
      })
      .catch((error) => {
        // Copy to clipboard instead
        copyToClipboard(url);
      });
    } else {
      // Fallback to clipboard
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "Post link copied to clipboard",
        });
      })
      .catch(err => {
        toast({
          title: "Failed to copy",
          description: "Could not copy the link",
          variant: "destructive",
        });
      });
  };

  return (
    <>
      <motion.div 
        className={`glass rounded-lg overflow-hidden ${featured ? 'md:flex' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className={`p-6 md:p-8 ${featured ? 'md:w-1/2' : ''} border-b md:border-b-0 ${featured ? 'md:border-r' : ''} border-white/10`}>
          <div className="flex justify-between items-center mb-4">
            <div className="text-celestial-softPurple text-sm">
              {format(new Date(post.created_at), 'MMMM d, yyyy')}
            </div>
            {post.profiles && (
              <div className="flex items-center">
                <UserAvatar profile={{
                  id: post.author_id,
                  username: post.profiles.username,
                  avatar_url: post.profiles.avatar_url,
                  created_at: '',
                }} size="sm" />
                <span className="ml-2 text-sm text-celestial-softPurple">
                  {post.profiles.username || 'Anonymous'}
                </span>
              </div>
            )}
          </div>
          <h3 className="text-xl font-medium mb-4 text-celestial-skyBlue">Astronomy Fact</h3>
          <p className="text-gray-300">{post.astro_fact}</p>
        </div>
        
        <div className={`p-6 md:p-8 ${featured ? 'md:w-1/2' : ''}`}>
          <h3 className="font-playfair text-2xl text-celestial-purple mb-2">{post.title}</h3>
          <div className="mt-4 mb-6">
            {post.poem_text.split('\n').map((line, i) => (
              <p key={i} className={`${line === '' ? 'h-4' : ''} font-playfair text-gray-200 italic leading-relaxed`}>
                {line}
              </p>
            ))}
          </div>
          
          {!isDetail && (
            <div className="flex justify-end mt-4 space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`flex items-center gap-1 ${liked ? 'text-red-400' : 'text-celestial-softPurple'} hover:text-red-400`}
                onClick={handleLike}
              >
                <Heart className={liked ? 'fill-current' : ''} size={18} />
                <span>{likesCount}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-celestial-softPurple hover:text-celestial-skyBlue"
                onClick={handleShare}
              >
                <Share2 size={18} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-celestial-softPurple hover:text-celestial-purple"
                onClick={() => setRepostModalOpen(true)}
              >
                <Repeat2 size={18} />
                <span>{post.reposts_count || 0}</span>
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      <RepostModal 
        isOpen={repostModalOpen} 
        onClose={() => setRepostModalOpen(false)}
        post={post}
      />
    </>
  );
};

export default PostCard;
