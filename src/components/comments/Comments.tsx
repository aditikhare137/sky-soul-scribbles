
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { MessageSquare } from 'lucide-react';

interface CommentsProps {
  postId: string;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const { user } = useAuth();
  
  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true });
        
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-20 bg-white/5 rounded"></div>
      <div className="h-20 bg-white/5 rounded"></div>
    </div>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-playfair text-celestial-purple mb-6 flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Comments ({comments?.length || 0})
      </h3>
      
      {user ? (
        <CommentForm postId={postId} />
      ) : (
        <div className="text-center p-4 border border-white/10 rounded-lg">
          <p className="text-celestial-softPurple mb-4">Sign in to join the discussion</p>
          <Button variant="outline">Sign In</Button>
        </div>
      )}
      
      <CommentList comments={comments || []} />
    </div>
  );
};

export default Comments;
