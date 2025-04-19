
import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CommentFormProps {
  postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('comments')
        .insert([{
          post_id: postId,
          user_id: user.id,
          content: content.trim()
        }]);

      if (error) throw error;
      
      setContent('');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      
      toast({
        title: "Comment added",
        description: "Your comment has been posted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Could not post comment",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <Textarea
        placeholder="Share your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px] bg-black/20 border-white/10 text-white placeholder:text-white/50"
      />
      <div className="mt-2 flex justify-end">
        <Button 
          type="submit"
          disabled={!content.trim() || isSubmitting}
        >
          Post Comment
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
