'use client';

import { useState } from 'react';
import Image from 'next/image';
import { User } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ImagePlus, Send } from 'lucide-react';

interface CreatePostCardProps {
  currentUser: User;
  onPost: (content: string) => void;
}

export function CreatePostCard({ currentUser, onPost }: CreatePostCardProps) {
  const [content, setContent] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (content.trim()) {
      onPost(content);
      setContent('');
      setIsOpen(false);
    }
  };

  return (
    <Card className="p-4 border border-border">
      <div className="flex gap-4">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent overflow-hidden">
            {currentUser.avatar && (
              <Image
                src={currentUser.avatar}
                alt={currentUser.username}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="flex-1">
          <div
            className="rounded-lg bg-secondary/30 border border-border cursor-pointer hover:border-primary/50 transition-colors p-3"
            onClick={() => setIsOpen(true)}
          >
            {isOpen ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`What's on your mind, ${currentUser.name}?`}
                className="w-full h-24 bg-transparent border-0 focus:outline-none resize-none text-foreground placeholder-muted-foreground"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <p className="text-muted-foreground text-sm">
                {`What's on your mind, ${currentUser.name}?`}
              </p>
            )}
          </div>

          {isOpen && (
            <div className="mt-3 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <ImagePlus className="w-4 h-4" />
                Add Image
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsOpen(false);
                    setContent('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmit}
                  disabled={!content.trim()}
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                  Post
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
