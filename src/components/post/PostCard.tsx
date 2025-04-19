import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { supabase, Post as PostType } from '@/lib/supabase';
import PostMetadata from './PostMetadata';
import PostActions from './PostActions';
import PoemContent from './PoemContent';
import RepostModal from './RepostModal';
import Comments from '../comments/Comments';

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
  const [liked, setLiked] = useState(isUserLiked);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [repostModalOpen, setRepostModalOpen] = useState(false);

  const handleLike = async () => {
    try {
      if (liked) {
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('user_id', post.author_id)
          .eq('post_id', post.id);

        if (error) throw error;
        
        setLiked(false);
        setLikesCount(prev => Math.max(prev - 1, 0));
        
        toast({
          title: "Post unliked",
          description: "You've removed your like from this post",
        });
      } else {
        const { error } = await supabase
          .from('likes')
          .insert([
            { user_id: post.author_id, post_id: post.id }
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
      .catch(() => {
        copyToClipboard(url);
      });
    } else {
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
          <PostMetadata 
            createdAt={post.created_at}
            author={{
              id: post.author_id,
              username: post.profiles?.username || null,
              avatar_url: post.profiles?.avatar_url || null
            }}
          />
          <h3 className="text-xl font-medium mb-4 text-celestial-skyBlue">Astronomy Fact</h3>
          <p className="text-gray-300">{post.astro_fact}</p>
        </div>
        
        <div className={`p-6 md:p-8 ${featured ? 'md:w-1/2' : ''}`}>
          <PoemContent 
            title={post.title}
            poemText={post.poem_text}
          />
          
          {isDetail ? (
            <Comments postId={post.id} />
          ) : (
            <PostActions
              liked={liked}
              likesCount={likesCount}
              repostsCount={post.reposts_count}
              commentsCount={post.comments_count || 0}
              onLike={handleLike}
              onShare={handleShare}
              onRepost={() => setRepostModalOpen(true)}
              postId={post.id}
            />
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
