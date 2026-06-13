'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Topbar } from '@/components/topbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DEMO_USERS, CURRENT_USER_ID } from '@/lib/mock-data';
import { ImagePlus, X } from 'lucide-react';

const VIBES = ['Creative', 'Tech', 'Wellness', 'Music', 'Design', 'Business', 'Travel', 'Food'];

export default function CreatePostPage() {
  const router = useRouter();
  const currentUser = DEMO_USERS[CURRENT_USER_ID as keyof typeof DEMO_USERS];
  const [content, setContent] = useState('');
  const [vibe, setVibe] = useState(currentUser.vibe);
  const [image, setImage] = useState<string | null>(null);

  const handleSubmit = () => {
    if (content.trim()) {
      console.log('[v0] Post created:', {
        content,
        vibe,
        image,
      });
      router.push('/');
    }
  };

  const isValid = content.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Topbar currentUserId={CURRENT_USER_ID} />

      <main className="max-w-2xl mx-auto px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold mb-8">Create a Post</h1>

        <Card className="p-6 border border-border">
          {/* User Info */}
          <div className="flex gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent overflow-hidden flex-shrink-0">
              {currentUser.avatar && (
                <Image
                  src={currentUser.avatar}
                  alt={currentUser.username}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <p className="font-bold">{currentUser.name}</p>
              <p className="text-sm text-muted-foreground">@{currentUser.username}</p>
            </div>
          </div>

          {/* Content */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts, ideas, or experiences..."
            className="w-full h-40 p-4 bg-secondary/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none text-foreground placeholder-muted-foreground"
          />

          {/* Image Preview */}
          {image && (
            <div className="mt-4 relative w-full h-48 rounded-lg overflow-hidden bg-secondary/30">
              <Image
                src={image}
                alt="Preview"
                fill
                className="object-cover"
              />
              <button
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full hover:bg-destructive/90"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Vibe Selector */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-3">Select Your Vibe</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {VIBES.map((vibeOption) => (
                <button
                  key={vibeOption}
                  onClick={() => setVibe(vibeOption)}
                  className={`p-2 rounded-lg text-sm font-medium transition-all ${
                    vibe === vibeOption
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/30 text-foreground hover:bg-secondary/50'
                  }`}
                >
                  {vibeOption}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button
              onClick={() => setImage('https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop')}
              variant="outline"
              className="gap-2"
            >
              <ImagePlus className="w-4 h-4" />
              Add Image
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!isValid}
              className="flex-1"
            >
              Post
            </Button>
          </div>

          {/* Character Count */}
          <p className="mt-4 text-xs text-muted-foreground text-right">
            {content.length} characters
          </p>
        </Card>

        {/* Tips */}
        <Card className="mt-8 p-6 bg-secondary/30 border border-border">
          <h3 className="font-semibold mb-3">Tips for a Great Post</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Choose a vibe that matches your post content</li>
            <li>• Add images to increase engagement</li>
            <li>• Be authentic and share what matters to you</li>
            <li>• Respect the community guidelines</li>
          </ul>
        </Card>
      </main>
    </div>
  );
}
