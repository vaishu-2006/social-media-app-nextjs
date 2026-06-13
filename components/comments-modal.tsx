'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Comment, User } from '@/lib/types';
import { Heart, MessageCircle, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  onReply: (commentId: string, reply: string) => void;
}

export function CommentsModal({
  isOpen,
  onClose,
  comments,
  onReply,
}: CommentsModalProps) {
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  const handleReplySubmit = (commentId: string) => {
    if (replyText.trim()) {
      onReply(commentId, replyText);
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const toggleLike = (commentId: string) => {
    const newLiked = new Set(likedComments);
    if (newLiked.has(commentId)) {
      newLiked.delete(commentId);
    } else {
      newLiked.add(commentId);
    }
    setLikedComments(newLiked);
  };

  if (!isOpen) return null;

  const renderCommentThread = (comment: Comment, depth = 0) => (
    <div key={comment.id} className={`${depth > 0 ? 'ml-8 mt-3' : ''}`}>
      <div className="flex gap-3">
        {comment.author?.avatar && (
          <Image
            src={comment.author.avatar}
            alt={comment.author.username}
            width={36}
            height={36}
            className="w-9 h-9 rounded-full"
          />
        )}
        <div className="flex-1">
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="font-semibold text-sm">{comment.author?.name}</p>
            <p className="text-sm text-foreground mt-1">{comment.content}</p>
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
            <button
              onClick={() => toggleLike(comment.id)}
              className={`flex items-center gap-1 cursor-pointer transition-colors ${
                likedComments.has(comment.id) ? 'text-primary' : 'hover:text-primary'
              }`}
            >
              <Heart className="w-3 h-3" />
              {comment.likes}
            </button>
            {depth === 0 && (
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Reply
              </button>
            )}
          </div>

          {replyingTo === comment.id && (
            <div className="mt-3 flex gap-2">
              <input
                autoFocus
                type="text"
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                size="sm"
                onClick={() => handleReplySubmit(comment.id)}
                disabled={!replyText.trim()}
              >
                Reply
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setReplyingTo(null);
                  setReplyText('');
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-3">
          {comment.replies.map((reply) => renderCommentThread(reply, depth + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center">
      <Card className="w-full md:w-2xl max-h-[80vh] overflow-hidden flex flex-col rounded-t-2xl md:rounded-2xl border border-border">
        <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-card">
          <h2 className="text-lg font-semibold">Comments ({comments.length})</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => renderCommentThread(comment))
          )}
        </div>

        <div className="border-t border-border p-4 bg-card">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Add a comment..."
              className="flex-1 px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="sm">Post</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
