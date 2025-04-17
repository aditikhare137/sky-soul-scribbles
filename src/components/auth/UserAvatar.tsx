
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Profile } from '@/lib/supabase';

interface UserAvatarProps {
  profile?: Profile | null;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar: React.FC<UserAvatarProps> = ({ profile, size = 'md' }) => {
  const sizeClass = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  }[size];
  
  const getInitials = () => {
    if (!profile?.username) return '?';
    return profile.username.substring(0, 2).toUpperCase();
  };

  return (
    <Avatar className={sizeClass}>
      <AvatarImage 
        src={profile?.avatar_url || ''} 
        alt={profile?.username || 'User'} 
      />
      <AvatarFallback className="bg-celestial-secondaryPurple">
        {getInitials()}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
