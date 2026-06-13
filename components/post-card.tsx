'use client';

import Image from 'next/image';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { Post } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export function PostCard({ post, onLike, onComment, onShare }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    onLike?.(post.id);
  };

  const handleShare = (platform: string) => {
    const text = `Check out this post from ${post.author?.name}: ${post.content.substring(0, 100)}...`;
    const url = `${window.location.origin}`;

    if (platform === 'copy') {
      navigator.clipboard.writeText(`${url} - ${text}`);
      alert('Link copied to clipboard!');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    }
    
    setShowShareMenu(false);
    onShare?.(post.id);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent overflow-hidden">
            {post.author?.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.username}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-foreground">{post.author?.name}</p>
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                {post.vibe}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              @{post.author?.username} · {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-foreground leading-relaxed mb-3">{post.content}</p>

        {post.image && (
          <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4 bg-muted">
            <Image
              src={post.image}
              alt="Post image"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border bg-card/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>{likeCount} likes</span>
          <span>{post.comments} comments</span>
        </div>

        <div className="flex items-center justify-between gap-1 relative">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-muted-foreground hover:text-primary hover:bg-transparent"
            onClick={handleLike}
          >
            <Heart
              className={`w-4 h-4 mr-2 ${isLiked ? 'fill-destructive text-destructive' : ''}`}
            />
            Like
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-muted-foreground hover:text-primary hover:bg-transparent"
            onClick={() => onComment?.(post.id)}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Comment
          </Button>
          <div className="relative flex-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-muted-foreground hover:text-primary hover:bg-transparent"
              onClick={() => setShowShareMenu(!showShareMenu)}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            
            {showShareMenu && (
              <div className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-lg shadow-lg z-10 overflow-hidden">
                <button
                  onClick={() => handleShare('copy')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors"
                >
                  Copy Link
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors"
                >
                  Share on Twitter
                </button>
                <button
                  onClick={() => handleShare('facebook')}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors"
                >
                  Share on Facebook
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
