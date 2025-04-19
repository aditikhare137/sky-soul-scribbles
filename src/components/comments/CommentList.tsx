
import React from 'react';
import { format } from 'date-fns';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import UserAvatar from '../auth/UserAvatar';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
    avatar_url: string;
  } | null;
}

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleDelete = async (commentId: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;
      
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      
      toast({
        title: "Comment deleted",
        description: "Your comment has been removed",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Could not delete comment",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 mt-6">
      {comments.map((comment) => (
        <div 
          key={comment.id} 
          className="bg-black/20 rounded-lg p-4 border border-white/10"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <UserAvatar 
                profile={{
                  id: comment.user_id,
                  username: comment.profiles?.username || null,
                  avatar_url: comment.profiles?.avatar_url || null,
                  created_at: comment.created_at
                }}
                size="sm"
              />
              <div>
                <p className="font-medium text-celestial-softPurple">
                  {comment.profiles?.username || 'Anonymous'}
                </p>
                <p className="text-xs text-white/60">
                  {format(new Date(comment.created_at), 'MMM d, yyyy • h:mm a')}
                </p>
              </div>
            </div>
            
            {user?.id === comment.user_id && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(comment.id)}
                className="text-white/60 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          <p className="mt-3 text-white/90 whitespace-pre-wrap">
            {comment.content}
          </p>
        </div>
      ))}
      
      {comments.length === 0 && (
        <p className="text-center text-white/60 py-8">
          No comments yet. Be the first to share your thoughts!
        </p>
      )}
    </div>
  );
};

export default CommentList;
