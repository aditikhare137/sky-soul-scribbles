
import React from 'react';
import { Heart, Share2, Repeat2, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

interface PostActionsProps {
  liked: boolean;
  likesCount: number;
  repostsCount: number;
  commentsCount: number;
  onLike: () => Promise<void>;
  onShare: () => void;
  onRepost: () => void;
  postId?: string;
}

const PostActions: React.FC<PostActionsProps> = ({
  liked,
  likesCount,
  repostsCount,
  commentsCount,
  onLike,
  onShare,
  onRepost,
  postId
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
      
      {postId ? (
        <Link to={`/post/${postId}#comments`}>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1 text-celestial-softPurple hover:text-celestial-purple"
          >
            <MessageSquare size={18} />
            <span>{commentsCount}</span>
          </Button>
        </Link>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-1 text-celestial-softPurple hover:text-celestial-purple"
        >
          <MessageSquare size={18} />
          <span>{commentsCount}</span>
        </Button>
      )}
      
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
