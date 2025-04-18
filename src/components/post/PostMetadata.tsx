
import React from 'react';
import { format } from 'date-fns';
import UserAvatar from '../auth/UserAvatar';

interface PostMetadataProps {
  createdAt: string;
  author: {
    id: string;
    username: string | null;
    avatar_url: string | null;
  };
}

const PostMetadata: React.FC<PostMetadataProps> = ({ createdAt, author }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-celestial-softPurple text-sm">
        {format(new Date(createdAt), 'MMMM d, yyyy')}
      </div>
      {author && (
        <div className="flex items-center">
          <UserAvatar profile={{
            id: author.id,
            username: author.username,
            avatar_url: author.avatar_url,
            created_at: '',
          }} size="sm" />
          <span className="ml-2 text-sm text-celestial-softPurple">
            {author.username || 'Anonymous'}
          </span>
        </div>
      )}
    </div>
  );
};

export default PostMetadata;
