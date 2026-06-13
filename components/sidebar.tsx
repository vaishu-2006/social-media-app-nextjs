'use client';

import Link from 'next/link';
import Image from 'next/image';
import { DEMO_USERS, CURRENT_USER_ID } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Film, BookMarked, Settings } from 'lucide-react';

interface SidebarProps {
  currentUser?: any;
}

export function Sidebar({ currentUser }: SidebarProps) {
  const user = currentUser || DEMO_USERS[CURRENT_USER_ID as keyof typeof DEMO_USERS];

  return (
    <div className="hidden lg:block w-80 space-y-6">
      {/* User Card */}
      <Card className="overflow-hidden border border-border">
        <div className="h-20 bg-gradient-to-r from-primary to-accent" />
        <div className="px-4 pb-4">
          <div className="flex justify-center -mt-10 mb-4">
            <Link href={`/profile/${user.id}`}>
              <div className="w-20 h-20 rounded-full border-4 border-background overflow-hidden bg-card shadow-lg cursor-pointer hover:opacity-80 transition-opacity">
                {user.avatar && (
                  <Image
                    src={user.avatar}
                    alt={user.username}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </Link>
          </div>
          <h3 className="font-bold text-center text-lg">{user.name}</h3>
          <p className="text-center text-sm text-muted-foreground mb-2">@{user.username}</p>
          <p className="text-center text-sm mb-3">{user.bio}</p>
          
          <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4 py-3 border-y border-border">
            <div>
              <p className="font-bold text-primary">{user.followers}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div>
              <p className="font-bold text-primary">{user.following}</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
            <div>
              <p className="font-bold text-accent">{user.vibe}</p>
              <p className="text-xs text-muted-foreground">Vibe</p>
            </div>
          </div>

          <Link href={`/profile/${user.id}`}>
            <Button className="w-full" variant="default">
              View Profile
            </Button>
          </Link>
        </div>
      </Card>

      {/* Quick Links */}
      <Card className="p-4 border border-border">
        <h3 className="font-semibold mb-4">Quick Links</h3>
        <div className="space-y-2">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              Your Feed
            </Button>
          </Link>
          <Link href="/reels">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Film className="w-4 h-4 mr-2" />
              Reels
            </Button>
          </Link>
          <Link href="/notifications">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              Notifications
            </Button>
          </Link>
          <Link href="/saved">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <BookMarked className="w-4 h-4 mr-2" />
              Saved Posts
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </Link>
        </div>
      </Card>

      {/* Trending Vibes */}
      <Card className="p-4 border border-border">
        <h3 className="font-semibold mb-4">Trending Vibes</h3>
        <div className="space-y-3">
          {['Creative', 'Tech', 'Wellness', 'Music', 'Design'].map((vibe) => (
            <div
              key={vibe}
              className="p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
            >
              <p className="font-medium text-sm">{vibe}</p>
              <p className="text-xs text-muted-foreground">Discover people</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
