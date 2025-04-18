
import React from 'react';
import { Heart, Share2, Repeat2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';

interface PostActionsProps {
  liked: boolean;
  likesCount: number;
  repostsCount: number;
  onLike: () => Promise<void>;
  onShare: () => void;
  onRepost: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  liked,
  likesCount,
  repostsCount,
  onLike,
  onShare,
  onRepost,
}) => {
  const { toast } = useToast();
  const { user } = useAuth();

  const handleLike = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to like posts",
      });
      return;
    }
    await onLike();
  };

  return (
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
        onClick={onShare}
      >
        <Share2 size={18} />
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1 text-celestial-softPurple hover:text-celestial-purple"
        onClick={onRepost}
      >
        <Repeat2 size={18} />
        <span>{repostsCount || 0}</span>
      </Button>
    </div>
  );
};

export default PostActions;
