'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Reel } from '@/lib/types';
import { Heart, MessageCircle, Share2, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ReelPlayerProps {
  reel: Reel;
  onLike?: (reelId: string) => void;
}

export function ReelPlayer({ reel, onLike }: ReelPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(reel.liked || false);
  const [likeCount, setLikeCount] = useState(reel.likes);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    onLike?.(reel.id);
  };

  return (
    <Card className="overflow-hidden border border-border flex flex-col h-full max-h-96">
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-black group overflow-hidden">
        <video
          ref={videoRef}
          src={reel.videoUrl}
          className="w-full h-full object-cover"
          onEnded={() => setIsPlaying(false)}
          poster={reel.thumbnail}
        />

        {/* Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="lg"
            className="rounded-full w-16 h-16 p-0"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </Button>
        </div>

        {/* Mute Button */}
        <button
          onClick={handleMute}
          className="absolute top-3 right-3 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-white" />
          ) : (
            <Volume2 className="w-4 h-4 text-white" />
          )}
        </button>

        {/* View Count */}
        <div className="absolute bottom-3 left-3 text-white text-xs bg-black/50 px-2 py-1 rounded">
          {reel.views.toLocaleString()} views
        </div>
      </div>

      {/* Info & Actions */}
      <div className="flex-1 flex flex-col p-4">
        <div className="flex items-start gap-3 mb-3">
          {reel.author?.avatar && (
            <Image
              src={reel.author.avatar}
              alt={reel.author.username}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{reel.author?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{reel.title}</p>
            <p className="text-xs text-muted-foreground line-clamp-2">{reel.description}</p>
          </div>
          <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full whitespace-nowrap">
            {reel.vibe}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 justify-between mt-auto pt-3 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-xs text-muted-foreground hover:text-primary"
            onClick={handleLike}
          >
            <Heart
              className={`w-3 h-3 mr-1 ${isLiked ? 'fill-destructive text-destructive' : ''}`}
            />
            {likeCount}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-xs text-muted-foreground hover:text-primary"
          >
            <MessageCircle className="w-3 h-3 mr-1" />
            {reel.comments}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-xs text-muted-foreground hover:text-primary"
          >
            <Share2 className="w-3 h-3 mr-1" />
            Share
          </Button>
        </div>
      </div>
    </Card>
  );
}
