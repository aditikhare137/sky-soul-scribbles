
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase, Post } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

interface RepostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
}

const RepostModal: React.FC<RepostModalProps> = ({ isOpen, onClose, post }) => {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to repost",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('reposts')
        .insert([
          {
            user_id: user.id,
            original_post_id: post.id,
            comment: comment || null
          }
        ]);

      if (error) throw error;

      // Update reposts count
      await supabase
        .from('posts')
        .update({ reposts_count: post.reposts_count + 1 })
        .eq('id', post.id);

      toast({
        title: "Reposted!",
        description: "You've shared this post with your followers",
      });
      
      setComment('');
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-celestial-darkPurple border border-celestial-purple/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-playfair text-celestial-purple">Repost "{post.title}"</DialogTitle>
          <DialogDescription className="text-celestial-softPurple/80">
            Share this poem with your own thoughts
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="glass p-4 rounded-md">
            <h4 className="font-medium text-celestial-skyBlue mb-2">Original poem by {post.author_id}</h4>
            <p className="text-sm text-celestial-softPurple/90 mb-2">{post.astro_fact.substring(0, 100)}...</p>
            <p className="font-playfair text-gray-200 italic">{post.poem_text.substring(0, 100)}...</p>
          </div>
          
          <Textarea
            placeholder="Add your thoughts about this poem (optional)"
            className="bg-white/5 border-white/20 resize-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button 
            className="bg-celestial-purple hover:bg-celestial-secondaryPurple"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Reposting...' : 'Repost'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RepostModal;
