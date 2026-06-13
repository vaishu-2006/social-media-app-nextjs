'use client';

import { useCallback, useState } from 'react';
import { Post, User, Comment } from '@/lib/types';
import { PostCard } from './post-card';
import { CommentsModal } from './comments-modal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Flame, Clock, Sparkles } from 'lucide-react';
import { sortFeedByMode, FeedSortMode } from '@/lib/feed-utils';
import { DEMO_COMMENTS } from '@/lib/mock-data';

interface FeedProps {
  posts: Post[];
  currentUser: User;
  onPostLike?: (postId: string) => void;
  onPostComment?: (postId: string) => void;
}

export function Feed({ posts, currentUser, onPostLike, onPostComment }: FeedProps) {
  const [sortMode, setSortMode] = useState<FeedSortMode>('same-vibe');
  const [selectedPostForComments, setSelectedPostForComments] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>(DEMO_COMMENTS);

  const sortedPosts = useCallback(() => {
    return sortFeedByMode(posts, currentUser.vibe, sortMode);
  }, [posts, currentUser.vibe, sortMode])();

  const handleCommentReply = (commentId: string, replyText: string) => {
    console.log(`[v0] Reply to comment ${commentId}: ${replyText}`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Sort Controls */}
      <Card className="mb-6 p-4 border border-border">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={sortMode === 'same-vibe' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortMode('same-vibe')}
            className="gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Same Vibe
          </Button>
          <Button
            variant={sortMode === 'trending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortMode('trending')}
            className="gap-2"
          >
            <Flame className="w-4 h-4" />
            Trending
          </Button>
          <Button
            variant={sortMode === 'latest' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSortMode('latest')}
            className="gap-2"
          >
            <Clock className="w-4 h-4" />
            Latest
          </Button>
        </div>
      </Card>

      {/* Posts */}
      <div className="space-y-4">
        {sortedPosts.length > 0 ? (
          sortedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={onPostLike}
              onComment={() => setSelectedPostForComments(post.id)}
              onShare={() => console.log(`[v0] Shared post ${post.id}`)}
            />
          ))
        ) : (
          <Card className="p-8 text-center text-muted-foreground border border-border">
            <p>No posts yet. Be the first to share your vibe!</p>
          </Card>
        )}
      </div>

      {/* Comments Modal */}
      <CommentsModal
        isOpen={selectedPostForComments !== null}
        onClose={() => setSelectedPostForComments(null)}
        comments={comments}
        onReply={handleCommentReply}
      />
    </div>
  );
}
